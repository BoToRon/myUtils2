//					tsc --target esnext devForPackage/commands.ts --outDir ./devForPackage/transpiled 
// 					node devForPackage/transpiled/devForPackage/commands.js

let _
import { z } from 'zod'
_
import inquirer from 'inquirer'
_
import { execSync, execFile } from 'child_process'	//DELETETHISFORCLIENT
_
import { btr_commands, validNpmVersion } from '../types.js'
_
import { npmVersionOptions, utilsRepoName, warningsCount_generator } from '../constants.js'
_
import {
	checkCodeThatCouldBeUpdated, colorLog, copyToClipboard_server, delay, errorLog, fsReadFileAsync, fsWriteFileAsync,
	getCachedFiles, getFilesAndFoldersNames, inquirePromptCommands, killProcess, logEmptyLine, mapCommandsForInquirePrompt,
	questionAsPromise, selfFilter, successLog, transpileFiles, zodCheck_curry
} from '../btr.js'

const errors: string[] = []
const tsFilePaths = getFilesAndFoldersNames('.', null).filter(path => path.includes('.ts'))

const functions: btr_commands = {
	check: { description: 'btr-check the files in this very package', fn: btrCheckPackageAndReportResult },
	publishOnly: { description: 'npm version + npm publish', fn: publish },
	test: { description: 'Transpile and run test/run.ts', fn: transpileAndRunTestRunTs },
	transpileAll: { description: 'Transpile base files, check for btr-errors and if they pass, emit the client versions', fn: transpileAll },
	transpileBase: { description: 'Transpile the file bases, NOT for production', fn: transpileBaseFiles },
	transpile_commit_and_PUBLISH: { description: '1) Transpile all. 2) Git commit + push. 3) npm version + PUBLISH', fn: publish },
	EXIT: { description: 'Quit the command line', fn: quitCommandLineProgram }
}

process.env['prevent_divine_init'] = 'true'
inquirePromptCommands(mapCommandsForInquirePrompt(functions), true)

//function declarations below

function transpileAndRunTestRunTs() { transpileFiles(['./test/run.ts'], './test/transpiled'); execFile('./test/transpiled/test/run.ts') }
async function btrCheckPackage() { checkCodeThatCouldBeUpdated(await getCachedFiles(errors, tsFilePaths)) }
function transpileBaseFiles() { transpileFiles(tsFilePaths.filter(path => !/\w\//.test(path)), '.') }
function quitCommandLineProgram() { killProcess('devForPackage\'s commands terminated') }

async function btrCheckPackageAndReportResult() {
	await btrCheckPackage()
	errors.length ? colorLog('red', errors.length + ' errors') : successLog('No btr-errors detected')
}

async function publish() {
	await transpileAll()
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

async function transpileAll() {
	await btrCheckPackage()
	if (thereAreErrorsOrWarnings()) { errorLog('btr-errors detected, fix them before attempting to transpile again'); return }
	transpileBaseFiles()

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

	function thereAreErrorsOrWarnings() {
		return errors.length || warningsCount_generator.next().value > 1
	}
}