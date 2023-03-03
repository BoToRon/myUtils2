

let _
_ //			tsc --target esnext dev/commands.ts --outDir ./dev/transpiled 
_ // 			node dev/transpiled/dev/commands.js
import fs from 'fs'
_
import { z } from 'zod'
_
import inquirer from 'inquirer'
_
import { execSync, execFile } from 'child_process'	//DELETETHISFORCLIENT
_
import { basicProjectChecks } from '../basicProjectChecks'
_
import { btr_commands, validNpmVersion } from '../types.js'
_
import { utilsRepoName, npmVersionOptions } from '../constants'
_
import {
	checkCodeThatCouldBeUpdated, colorLog, copyToClipboard_server, delay, divine, errorLog, fsReadFileAsync, fsWriteFileAsync, getCachedFiles,
	getFilesAndFoldersNames, inquirePromptCommands, killProcess, logEmptyLine, mapCommandsForInquirePrompt, questionAsPromise, selfFilter, successLog, transpileFiles, zodCheck_curry
} from '../btr.js'

const fileWithRef = 'ref'
const serverFolder_dist = '../dist'
const PACKAGE_DOT_JSON = 'package.json'

const errors: string[] = []
const warningsCount = { count: 0 }
const packageJsonContent = await fsReadFileAsync(PACKAGE_DOT_JSON)
const isPackage = JSON.parse(packageJsonContent).name === '@botoron/utils'
const tsFilePaths = getFilesAndFoldersNames('.', null).filter(path => path.includes('.ts'))

process.env['prevent_divine_init'] = 'true'

const sharedCommands: btr_commands = {
	check: { description: 'btr-check the files in this very project', fn: btrCheckFilesAndReportResult },
	test: { description: 'Transpile and run test/run.ts', fn: transpileAndRunTestRunTs },
	EXIT: { description: 'Quit the command line', fn: quitCommandLineProgram }
}

const commands_forPackage: btr_commands = {
	...sharedCommands,
	publishOnly: { description: 'npm version + npm publish', fn: package_publish },
	transpileAll: { description: 'Transpile base files, check for btr-errors and if they pass, emit the client versions', fn: package_transpileAll },
	transpileBase: { description: 'Transpile the file bases, NOT for production', fn: package_transpileBaseFiles },
	transpile_commit_and_PUBLISH: { description: '1) Transpile all. 2) Git commit + push. 3) npm version + PUBLISH', fn: package_publish },
}

const commands_forProject: btr_commands = {
	...sharedCommands,
	btr: { description: 'Install/update @botoron/utils', fn: project_installBtrUtils },
	'build-client': { description: 'Build the client files onto the ../dist/public', fn: project_buildClientFilesWithVite },
	'build-server': { description: 'Build the server files onto ../dist', fn: project_buildServerFiles },
	'build-all': { description: 'Transpile and copy/paste all files needed for ../dist', fn: project_buildAll },
	localtunnel: { description: 'Expose vite\'s port through a tunnel', fn: project_forwardVitesPort },
	nodemon: { description: 'Init Nodemon', fn: project_initNodemon },
	transpile: { description: 'Transpile the files in ./server onto ./test', fn: project_btrCheckAndTranspileToTestFolder },
	vue: { description: 'Move to the client folder and init vite', fn: project_initVite },
	EXIT: { description: 'Quit the command line', fn: quitCommandLineProgram },
}

inquirePromptCommands(mapCommandsForInquirePrompt(isPackage ? commands_forPackage : commands_forProject), true)

//GENERAL USE

function transpileAndRunTestRunTs() { transpileFiles(['./test/run.ts'], './test/transpiled'); execFile('./test/transpiled/test/run.ts') }
async function btrCheck() { checkCodeThatCouldBeUpdated(await getCachedFiles(errors, tsFilePaths), warningsCount) }
function quitCommandLineProgram() { killProcess('devForProject\'s commands terminated') }
async function btrCheckFilesAndReportResult() {
	await btrCheck()
	errors.length ? colorLog('red', errors.length + ' errors') : successLog('No btr-errors detected')
}

//FOR PACKAGE ONLY
async function package_publish() {
	await package_transpileAll()
	await prompCommitMessageAndPush(utilsRepoName)

	execSync(`npm version ${await getVersioningFromPrompt()}`)
	successLog('package version\'d')

	execSync('npm publish')
	successLog('package publish\'d')

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

	async function prompCommitMessageAndPush(repoName: string): Promise<boolean> {
		const commitType = await getCommitTypeFromPrompt()

		//order for these 3 below matters
		logDetailsForPrompt()
		const commitMessage = await questionAsPromise('Enter a commit message:')
		copyToClipboard_server(commitType + ': ' + commitMessage)

		if (!zodCheck_curry(killProcess)(z.string().min(15).max(50), commitMessage)) { return prompCommitMessageAndPush(repoName) }
		return await gitAddCommitPush()

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

		function gitAddCommitPush(): Promise<boolean> {
			return new Promise(resolve => {
				execAndLog('git add .')
				colorLog('cyan', 'Commit message copied to clipboard, paste it in the editor, save and close.')
				execSync('git commit')
				execAndLog('git push')
				resolve(true)

				function execAndLog(command: string) { execSync(command); successLog(command) }
			})
		}

		function logDetailsForPrompt() {
			delay(500).then(() => {
				colorLog('yellow', '50-character limits ends at that line: * * * * * |')
				colorLog('green', repoName)
				logEmptyLine()
			})
		}
	}
}

function package_transpileBaseFiles() {
	transpileFiles(tsFilePaths.filter(path => !/\w\//.test(path)), '.')
}

async function package_transpileAll() {
	await btrCheck()
	if (errors.length || warningsCount.count > 1) { errorLog('btr-errors detected, fix them before attempting to transpile again'); return }
	package_transpileBaseFiles()

	const filename = 'btr.ts'
	const lines = await getLinesInBtrTs()

	selfFilter(lines, line => !/DELETETHISFORCLIENT/.test(line)) //regexHere

	const cutPoint = lines.findIndex(x => /DELETEEVERYTHINGBELOW/.test(x)) //regexHere
	lines.splice(cutPoint, lines.length)
	lines.push('export const colorLog = (color: string, message: string) => console.log(`%c${message}`, `color: ${color};`) //@btr-ignore')

	await fsWriteFileAsync(`./client/${filename}`, lines.join('\n'))

	transpileFiles(['client/btr.ts'], './client')
	successLog('browser versions emitted')

	async function getLinesInBtrTs() {
		return (await fsReadFileAsync(filename)).
			replaceAll(/from '\.\/(?=constants|types)/g, 'from \'../').
			replaceAll(/bigConsoleError/g, 'colorLog').
			split('\n')
	}
}

//FOR PROJECT ONLY

function project_buildClientFilesWithVite() { execSync('cd client & npm run build') }
function project_buildAll() { project_buildClientFilesWithVite(); project_buildServerFiles() }
function project_initNodemon() { execSync('nodemon test/server/init.js') }
function project_installBtrUtils() { execSync('npm i @botoron/utils') }
function project_initVite() { execSync('cd client & npm run dev') }
function project_forwardVitesPort() { execSync('lt --port 5173') }

async function project_btrCheckAndTranspileToTestFolder() {
	await btrCheck()
	if (errors.length || warningsCount.count > 1) { errorLog('btr-errors detected, fix them before attempting to transpile again'); return }

	execSync('tsc --target esnext server/init.ts --outDir ./test')
	await fsWriteFileAsync('test/package.json', packageJsonContent)
	successLog('files transpiled to ./test')
}

async function project_buildServerFiles() {
	await basicProjectChecks(divine.error)
	await transpileTypesFile()
	await copyFileToDist('.env')
	await copyFileToDist('.gitignore')
	await copyFileToDist(PACKAGE_DOT_JSON)

	execSync(`tsc --target esnext server/init.ts server/io.ts --outDir ${serverFolder_dist}`)
	await toggle_devOrProd_inRef()
	successLog('(server) Build sucessful!')

	async function copyFileToDist(filename: string) {
		let content = await fsReadFileAsync(filename)
		if (filename === PACKAGE_DOT_JSON) { deleteAllPackageJsonScriptsExceptStart_andReplaceSlashSrcWithSlashDist() }
		await fsWriteFileAsync('../dist/' + filename, content)

		function deleteAllPackageJsonScriptsExceptStart_andReplaceSlashSrcWithSlashDist() {
			//TODO: automatically git push and install npm dependencies when transpiling?
			content = content.
				replace('-src', '-dist').
				replace(/"scripts": {[^}]{1,}/, `"scripts": { //regexHere
		"start": "node server/init.js",
		"git": "git add . & git commit & git push",
	`)
		}
	}

	async function toggle_devOrProd_inRef() {
		const filepath = serverFolder_dist + '/server/' + fileWithRef + '.js'
		await fsWriteFileAsync(filepath, (await fsReadFileAsync(filepath)).replace('devOrProd = \'dev\'', 'devOrProd = \'prod\''))
	}

	async function transpileTypesFile() {
		return await new Promise(resolve => {
			fsReadFileAsync('types.d.ts').then(typesFile => {
				fsWriteFileAsync('types.ts', typesFile).then(() => {
					execSync('tsc --target esnext types.ts')
					successLog('types.d.ts transpiled to root folder!')
					fs.unlinkSync('types.ts')
					delay(1000).then(() => resolve(true))
				})
			})
		})
	}
}