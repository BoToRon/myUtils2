let _
_ //			tsc --target esnext dev/commands.ts --outDir ./dev/transpiled			//@btr-ignore
_ // 			node dev/transpiled/dev/commands.js			2
_
import inquirer from 'inquirer'
_
import { unlinkSync } from 'fs'
_
import { recordOfCommands } from '../types.js'
_
import { execSync, execFile } from 'child_process'
_
import { basicProjectChecks } from '../basicProjectChecks.js'
_
import { utilsRepoName, npmVersionOptions, TSC_FLAGS } from '../constants.js'
_
import {
	allPromises, asyncForEach, checkCodeThatCouldBeUpdated, checkFileExists, checkNoBtrErrorsOrWarnings, colorLog, copyToClipboard,
	delay, doNothing, errorLog, fsReadFileAsync, fsWriteFileAsync, getCachedFiles, getFilesAndFoldersNames, inquirePromptCommands,
	killProcess, logEmptyLine, mapCommandsForInquirePrompt, questionAsPromise, safeRegexMatch, selfFilter, successLog
} from '../btr.js'

type sharedCommand = 'check' | 'test' | 'EXIT'
type command_forPackage = sharedCommand | 'publishOnly' | 'transpileAll' | 'transpileBase' | 'transpile_commit_and_PUBLISH'
type command_forProject = sharedCommand | 'btr' | 'build-client' | 'build-server' | 'build-all' | 'localtunnel' | 'nodemon' | 'transpile' | 'vue'
type validNpmVersion = typeof npmVersionOptions[number]

const fileWithRef = 'ref'
const serverFolder_dist = '../dist'
const PACKAGE_DOT_JSON = 'package.json'

const errors: string[] = []
const packageJsonContent = await fsReadFileAsync(PACKAGE_DOT_JSON)
const isPackage = JSON.parse(packageJsonContent).name === '@botoron/utils'
const tsFilePaths = getFilesAndFoldersNames('.', null).filter(path => path.includes('.ts') && !path.includes('client/'))

process.env['prevent_divine_init'] = 'true'

const sharedCommands: recordOfCommands<sharedCommand> = {
	check: { description: 'btr-check the files in this very project', fn: btrCheckFilesAndReportResult },
	test: { description: 'Transpile and run test/run.ts', fn: transpileAndRunTestRunTs },
	EXIT: { description: 'Quit the command line', fn: quitCommandLineProgram }
}

const commands_forPackage: recordOfCommands<command_forPackage> = {
	...sharedCommands,
	publishOnly: { description: 'npm version + npm publish', fn: package_publishOnly },
	transpileAll: { description: 'Transpile base files if they pass all checks and emit the client versions', fn: package_transpileAll },
	transpileBase: { description: 'Transpile the file bases, NOT for production', fn: package_transpileBaseFiles },
	transpile_commit_and_PUBLISH: { description: '1) Transpile all. 2) Git commit + push. 3) npm version + PUBLISH', fn: package_transpile_git_andPublish },
}

const commands_forProject: recordOfCommands<command_forProject> = {
	...sharedCommands,
	btr: { description: 'Install/update @botoron/utils', fn: project_installBtrUtils },
	'build-client': { description: 'Build the client files onto the ../dist/public', fn: project_buildClientFilesWithVite },
	'build-server': { description: 'Build the server files onto ../dist', fn: project_buildServerFiles },
	'build-all': { description: 'Transpile and copy/paste all files needed for ../dist', fn: project_buildAll },
	localtunnel: { description: 'Expose vite\'s port through a tunnel', fn: project_forwardVitesPort },
	nodemon: { description: 'Init Nodemon', fn: project_initNodemon },
	transpile: { description: 'Transpile the files in ./server onto ./test', fn: project_btrCheckAndTranspileToTestFolder },
	vue: { description: 'Move to the client folder and init vite', fn: project_initVite },
}

runCommands(isPackage ? commands_forPackage : commands_forProject)

//function declarations below

function runCommands(commands: recordOfCommands<string>) { inquirePromptCommands(mapCommandsForInquirePrompt(commands), true) }
async function package_transpileBaseFiles() { await transpileFiles(tsFilePaths.filter(path => !/\w\//.test(path)), '.') }
function project_buildAll() { project_buildClientFilesWithVite(); project_buildServerFiles() }
function quitCommandLineProgram() { killProcess('devForProject\'s commands terminated') }
function project_buildClientFilesWithVite() { execSync('cd client & npm run build') }
function project_initNodemon() { execSync('nodemon test/server/init.js') }
function project_installBtrUtils() { execSync('npm i @botoron/utils') }
function project_initVite() { execSync('cd client & npm run dev') }
async function btrCheckFilesAndReportResult() { await btrCheck() }
function project_forwardVitesPort() { execSync('lt --port 5173') }

async function btrCheck() {
	const warningsCount = { count: 0 }
	checkCodeThatCouldBeUpdated(await getCachedFiles(errors, tsFilePaths), warningsCount)
	return checkNoBtrErrorsOrWarnings(errors, warningsCount)
}

async function getVersioningFromPrompt() {
	return (await inquirer.
		prompt({
			name: 'versioning',
			type: 'list',
			message: 'Select an NPM versioning:',
			choices: npmVersionOptions
		})
	).versioning as validNpmVersion
}

async function package_publishOnly() {
	execSync(`npm version ${await getVersioningFromPrompt()}`)

	successLog('package version\'d')
	execSync('npm publish')
	successLog('package publish\'d')
}

async function package_transpileAll() {
	if (!await btrCheck()) { return }
	package_transpileBaseFiles()

	const filename = 'btr.ts'
	const lines = (await fsReadFileAsync(filename)).replace('eris.Client', 'unknown').split('\n')

	selfFilter(lines, line => !/DELETETHISFORCLIENT/.test(line)) //regexHere
	lines.splice(lines.findIndex(x => /DELETEEVERYTHINGBELOW/.test(x)), lines.length) //regexHere

	lines.push('const clipboard = { write: doNothing }')
	lines.push('const fsWriteFileAsync = doNothing')
	lines.push('const chalk = {}')

	await fsWriteFileAsync(`./client/${filename}`, lines.join('\n'))
	await transpileFiles([`client/${filename}`], './client')
	await fixRelativeImports()

	successLog('browser versions emitted')

	async function fixRelativeImports() {
		async function doIt(x: string) { await replaceStringInFile(x, /from '\.\/(?=constants|types)/g, '..') }
		const clientFiles = [`./client/${filename}`, `./client/${filename.replace('.ts', '.js')}`]
		await allPromises(clientFiles, doIt)
	}
}

async function package_transpile_git_andPublish() {
	await package_transpileAll()
	await prompCommitMessageAndPush(utilsRepoName)

	execSync(`npm version ${await getVersioningFromPrompt()}`)
	successLog('package version\'d')

	execSync('npm publish')
	successLog('package publish\'d')
}

async function project_btrCheckAndTranspileToTestFolder() {
	if (!await btrCheck()) { return }

	await transpileFiles(['server/init.ts'], './test')
	await fsWriteFileAsync('test/package.json', packageJsonContent)
	successLog('files transpiled to ./test')
}

async function project_buildServerFiles() {
	if (!await basicProjectChecks()) { return }

	fsWriteFileAsync('types.ts', await fsReadFileAsync('types.d.ts'))
	await transpileFiles(['types.ts'], '.')
	unlinkSync('types.ts')

	await copyFileToDist('.env')
	await copyFileToDist('.gitignore')
	await copyFileToDist(PACKAGE_DOT_JSON)

	await transpileFiles(['server/init.ts', 'server/io.ts'], serverFolder_dist)
	await replaceStringInFile(`${serverFolder_dist}/server/${fileWithRef}.js`, 'devOrProd = \'dev\'', 'devOrProd = \'prod\'')

	execSync('cd ../dist')
	await prompCommitMessageAndPush('(project)-dist')
	try { execSync('npm install'); successLog('(server) Build sucessful!') } catch (e) { errorLog(`${e}`) }

	async function copyFileToDist(filename: string) {
		let content = await fsReadFileAsync(filename)
		if (filename === PACKAGE_DOT_JSON) { deleteAllPackageJsonScriptsExceptStart_andReplaceSlashSrcWithSlashDist() }
		await fsWriteFileAsync('../dist/' + filename, content)

		function deleteAllPackageJsonScriptsExceptStart_andReplaceSlashSrcWithSlashDist() {
			content = content.
				replace('-src', '-dist').
				replace(/"scripts": {[^}]{1,}/, '"scripts": { "start": "node server/init.js"') //regexHere
		}
	}
}

async function prompCommitMessageAndPush(repoName: string) {
	const commitType = await getCommitTypeFromPrompt()

	//order for these 3 below matters
	logDetailsForPrompt()
	const commitMessage = await questionAsPromise('Enter a commit message:')
	copyToClipboard(commitType + ': ' + commitMessage)
	gitAddCommitPush()

	async function getCommitTypeFromPrompt() {
		return (await inquirer.
			prompt({
				name: 'versioning',
				type: 'list',
				message: 'Select an NPM versioning:',
				choices: ['fix', 'feat', 'build', 'chore', 'ci', 'docs', 'refactor', 'style', 'test']
			})
		).versioning as string
	}

	function gitAddCommitPush() {
		execAndLog('git add .')
		colorLog('cyan', 'Commit message copied to clipboard, paste it in the editor, save and close.')
		execSync('git commit')
		execAndLog('git push')

		function execAndLog(command: string) { execSync(command); successLog(command) }
	}

	function logDetailsForPrompt() {
		delay(500).then(() => { //@btr-ignore
			colorLog('yellow', '50-character limits ends at that line: * * * * * |')
			colorLog('green', repoName)
			logEmptyLine()
		})
	}
}

async function replaceStringInFile(filepath: string, oldString: string | RegExp, newString: string) {
	await fsWriteFileAsync(filepath, (await fsReadFileAsync(filepath)).replace(oldString, newString))
}

async function transpileAndRunTestRunTs() {
	await transpileFiles(['./test/run.ts'], './test/transpiled')
	execFile('./test/transpiled/test/run.ts')
}

async function transpileFiles(sourceFilesArr: string[], outputDirectory: string) {
	if (!sourceFilesArr.length) { killProcess('transpileFiles\'s sourceFiles argument should NOT be an empty array!') }

	const allJsFilenames = sourceFilesArr.map(filename => `${outputDirectory}/${safeRegexMatch(filename, /\w{1,}(?=\.ts)/g, 0)}.js`)
	await asyncForEach(allJsFilenames, false, deleteOldJsVersion)

	const sourceFiles = sourceFilesArr.join(' ')
	const command = `tsc ${TSC_FLAGS} ${sourceFiles} --outDir ${outputDirectory}`
	colorLog('cyan', command)
	try { execSync(command) } catch { doNothing() }

	const allFilesWereTranspiled = (await allPromises(allJsFilenames, checkFileExists)).every(x => x)
	allFilesWereTranspiled ? successLog('Transpilation successful') : killProcess('Transpilation failed: ' + sourceFiles)
	return allFilesWereTranspiled

	async function deleteOldJsVersion(filepath: string) {
		const fileExists = await checkFileExists(filepath)
		colorLog('magenta', (fileExists ? 'Deleting' : 'File doesn\'t exist') + ': ' + filepath)
		if (fileExists) { unlinkSync(filepath) }
	}
}