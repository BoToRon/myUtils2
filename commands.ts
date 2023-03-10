let _
import { resolve } from 'path'
_
import inquirer from 'inquirer'
_
import { unlinkSync } from 'fs'
_
import { execSync, execFile } from 'child_process'
_
import { basicProjectChecks } from './basicProjectChecks.js'
_
import { npmVersionOptions, PACKAGE_DOT_JSON, TSC_FLAGS } from './constants.js'
_
import { maybePromise, recordOfCommands, validMongoCollection } from './types.js'
_
import {
	allPromises, arrayToObject, asyncForEach, checkCodeThatCouldBeUpdated, checkFileExists, checkNoBtrErrorsOrWarnings, colorLog,
	consoleLogFull, copyToClipboard, delay, doNothing, errorLog, fsReadFileAsync, fsWriteFileAsync, getCachedFiles, getContentOfPackageJson, mongo_getEntireCollection, getFilesAndFoldersNames, isMyUtilsPackage, killProcess, logEmptyLine, mapCommandsForInquirePrompt,
	objectKeys, questionAsPromise, safeRegexMatch, selfFilter, successLog,
} from './btr.js'

const fileWithRef = 'ref'
const serverFolder_dist = '../dist'
const rootTsFilenames = getFilepaths('.', path => path.includes('.ts') && !/(client\/|\.d\.ts)/.test(path))

const errors: string[] = []
process.env['prevent_divine_init'] = 'true'

const sharedCommands = getSharedCommands()
const isUtilsPackage = await isMyUtilsPackage()
const commands_forPackage = getCommands_forPackage()
const commands_forProject = getCommands_forProject()

if (isUtilsPackage) { await runCommands(commands_forPackage) }

//function declarations below

export async function projectCommandsHandler(mongoCollections: Readonly<string[]>, commandsSpecificOfProject: recordOfCommands<string>) {
	await runCommands({
		...getSeparator('BASIC COMMANDS'),
		...sharedCommands,
		...getSeparator('CUSTOM SPECIFIC FOR THIS PROJECT'),
		...commandsSpecificOfProject,
		...getSeparator('MONGO LOG COMMANDS'),
		...getLogAll_forAllMongoCollections(),
		...getSeparator('DEFAULT COMMANDS FOR PROJECTS'),
		...commands_forProject,
	})

	function getLogAll_forAllMongoCollections() {
		return arrayToObject(mongoCollections, (key: string) => ({
			description: `Log the entire '${key}' mongo collection`,
			fn: async () => consoleLogFull(await mongo_getEntireCollection(key as validMongoCollection))
		}))
	}

	function getSeparator(name: string) {
		return { ['-'.repeat(100 - name.length) + name]: { description: '-'.repeat(50), fn: doNothing } }
	}
}

async function runCommands(commands: recordOfCommands<string>) { await inquirePromptCommands(mapCommandsForInquirePrompt(commands), true) }
async function project_buildAll() { project_buildClientFilesWithVite(); await project_buildServerFiles() }
function quitCommandLineProgram() { killProcess('devForProject\'s commands terminated') }
function project_buildClientFilesWithVite() { execSync('cd client & npm run build') }
function execAndLog(command: string) { execSync(command); successLog(command) }
function project_initNodemon() { execSync('nodemon test/server/init.js') }
function project_initVite() { execSync('cd client & npm run dev') }
async function btrCheckFilesAndReportResult() { await btrCheck() }
function project_forwardVitesPort() { execSync('lt --port 5173') }

async function btrCheck() {
	if (!isUtilsPackage) { return await basicProjectChecks() }

	const warningsCount = { count: 0 }
	checkCodeThatCouldBeUpdated(await getCachedFiles(errors, rootTsFilenames), warningsCount)
	return checkNoBtrErrorsOrWarnings(errors, warningsCount)
}

async function chooseFromPrompt<T extends string>(message: string, choices: Readonly<T[]>) {
	return (await inquirer.prompt({ name: 'choice', type: 'list', pageSize: 99, message, choices })).choice as T //@btr-ignore
}

function getCommands_forPackage() {
	return {
		...sharedCommands,
		transpileAll: { description: 'Transpile base files if they pass all checks and emit the client versions', fn: package_transpileAll },
		versionAndPublish: { description: 'npm version + npm publish', fn: package_versionAndPublish },
	}
}

function getCommands_forProject() {
	return {
		btr: { description: 'Install/update @botoron/utils', fn: project_installBtrUtils_setValidMongoCollections_andKillCommandLine },
		'build-client': { description: 'Build the client files onto the ../dist/public', fn: project_buildClientFilesWithVite },
		'build-server': { description: 'Build the server files onto ../dist', fn: project_buildServerFiles },
		'build-all': { description: 'Transpile and copy/paste all files needed for ../dist', fn: project_buildAll },
		localtunnel: { description: 'Expose vite\'s port through a tunnel', fn: project_forwardVitesPort },
		nodemon: { description: 'Init Nodemon', fn: project_initNodemon },
		transpile: { description: 'Transpile the files in ./server onto ./test', fn: project_btrCheckAndTranspileToTestFolder },
		vue: { description: 'Move to the client folder and init vite', fn: project_initVite },
	}
}

function getFilepaths(directory: string, predicate: (string: string) => boolean) {
	return getFilesAndFoldersNames(directory, null).filter(path => predicate(path))
}

function getSharedCommands() {
	return {
		check: { description: 'btr-check the files in this very project', fn: btrCheckFilesAndReportResult },
		test: { description: 'Transpile and run test/run.ts', fn: transpileAndRunTestRunTs },
		EXIT: { description: 'Quit the command line', fn: quitCommandLineProgram }
	}
}

async function inquirePromptCommands<
	K extends string,
	F extends () => maybePromise<unknown>
>(
	fns: Record<K, F>,
	promptAgainAfterEachFn: boolean //TODO: this parameter is only ever passed as true, hard-code it instead?
) {
	const choice = await chooseFromPrompt('Run a function:', objectKeys(fns))
	await fns[choice]()
	if (!promptAgainAfterEachFn) { return }
	await inquirePromptCommands(fns, promptAgainAfterEachFn)
}

async function package_versionAndPublish() {
	execAndLog(`npm version ${await chooseFromPrompt('Select an NPM versioning:', npmVersionOptions)}`)
	execAndLog('npm publish')
}

async function package_transpileAll() {
	if (!await btrCheck()) { return }
	console.log({ rootTsFilenames }) //@btr-ignore
	await transpileFiles(rootTsFilenames.filter(path => !/\w\//.test(path)), '.')

	const filename = 'btr.ts'
	const lines = await getContentWithAllThingsErisStrippedOut()
	selfFilter(lines, line => !/DELETETHISFORCLIENT/.test(line)) //regexHere
	lines.splice(lines.findIndex(x => /DELETEEVERYTHINGBELOW/.test(x)), lines.length) //regexHere

	lines.push('const clipboard = { write: doNothing }')
	lines.push('const chalk: Record<string, any> = {}')
	lines.push('const fsWriteFileAsync = doNothing')
	lines.push('const util = <any>nullAs()')

	await fsWriteFileAsync(`./client/${filename}`, lines.join('\n'))
	await transpileFiles([`client/${filename}`], './client')
	await fixRelativeImports()

	successLog('browser versions emitted')
	colorLog('yellow', 'You may now Commit & Push and then run the "versionAndPublish" command')

	async function fixRelativeImports() {
		async function doIt(x: string) { await replaceStringInFile(x, /from '\.\/(?=constants|types)/g, 'from \'../') }
		const clientFiles = [`/client/${filename}`, `/client/${filename.replace('.ts', '.js')}`]
		await allPromises(clientFiles, doIt)
	}

	async function getContentWithAllThingsErisStrippedOut() {
		return (await fsReadFileAsync(filename)).
			replace(/\/\/divineForNode_start(\n|.){1,}.\/\/divineForNode_end/, '').
			replace('return isNode ? forNode : forClient', '').
			replace('const forClient =', 'return').
			replace(/eris\.Client/, 'unknown').
			split('\n')
	}
}

async function project_btrCheckAndTranspileToTestFolder() {
	if (!await btrCheck()) { return }

	await transpileFiles(['server/init.ts'], './test')
	await fsWriteFileAsync('test/package.json', await getContentOfPackageJson())
	successLog('files transpiled to ./test')
}

async function project_buildServerFiles() {
	if (!await basicProjectChecks()) { return }

	await fsWriteFileAsync('types.ts', await fsReadFileAsync('types.d.ts'))
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

	async function prompCommitMessageAndPush(repoName: string) {
		const commitType = await getCommitType()

		//order for these 3 below matters
		logDetailsForPrompt()
		const commitMessage = await questionAsPromise('Enter a commit message:')
		copyToClipboard(commitType + ': ' + commitMessage)

		execAndLog('git add .')
		colorLog('cyan', 'Commit message copied to clipboard, paste it in the editor, save and close.')
		execSync('git commit')
		execAndLog('git push')

		async function getCommitType() {
			await chooseFromPrompt('Define the type of commit:', ['fix', 'feat', 'build', 'chore', 'ci', 'docs', 'refactor', 'style', 'test'])
		}

		function logDetailsForPrompt() {
			delay(500).then(() => { //@btr-ignore
				colorLog('yellow', '50-character limits ends at that line: * * * * * |')
				colorLog('green', repoName)
				logEmptyLine()
			})
		}
	}
}

async function project_installBtrUtils_setValidMongoCollections_andKillCommandLine() {
	execSync('npm uninstall @botoron/utils')
	execSync('npm i @botoron/utils')

	await asyncForEach(
		getFilepaths('./node_modules/@botoron/utils/', path => path.includes('.ts') && !/(client\/|\.d\.ts)/.test(path)),
		false,
		(filename) => replacePlaceholdingVarsForActualImports(filename.slice(1))
	)

	killProcess('Reinit command line to apply updates')

	async function replacePlaceholdingVarsForActualImports(filepath: string) {
		//TODO: create more placeholders than just mongoCollections?
		const mongoCollection_actualPath = 'import { mongoCollections } from \'../../../global/vars.js\''
		const mongoCollections_placeholder = 'const mongoCollections = [\'SAMPLE_MONGO_COLLECTION_NAME\'] as const //placeholder - DONOTEDIT'

		await replaceStringInFile(filepath, mongoCollections_placeholder, mongoCollection_actualPath)
	}
}

async function replaceStringInFile(filepath: string, oldString: string | RegExp, newString: string) {
	console.log('replacing string', { filepath, oldString, newString }) //@btr-ignore
	const fullFilepath = resolve() + filepath
	const content = await fsReadFileAsync(fullFilepath)
	console.log({ fullFilepath, content }) //@btr-ignore
	await fsWriteFileAsync(fullFilepath, content.replace(oldString, newString))
	console.log('string replaced', { filepath, oldString, newString }) //@btr-ignore
	console.log('') //@btr-ignore
	console.log('') //@btr-ignore
	//await fsWriteFileAsync(filepath, (await fsReadFileAsync(filepath)).replace(oldString, newString))
}

async function transpileAndRunTestRunTs() {
	await transpileFiles(['./test/run.ts'], './test/transpiled')
	execFile('./test/transpiled/test/run.ts')
}

async function transpileFiles(sourceFilesArr: string[], outputDirectory: string) {
	if (!sourceFilesArr.length) { killProcess('transpileFiles\'s sourceFiles argument should NOT be an empty array!') }

	console.log({ sourceFilesArr }) //@btr-ignore

	const allJsFilenames = sourceFilesArr.map(filename => `${outputDirectory}/${safeRegexMatch(filename, /\w{1,}(?=\.ts)/g, 0)}.js`) //regexHere
	await asyncForEach(allJsFilenames, false, deleteOldJsVersion)

	const sourceFiles = sourceFilesArr.join(' ')
	const command = `tsc ${TSC_FLAGS} ${sourceFiles} --outDir ${outputDirectory} `
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

//TODO: delete all things console.log() //@btr-ignore