//					tsc --target esnext dev/commands.ts --outDir ./dev/transpiled 
// 					node dev/transpiled/dev/commands.js

let _
import inquirer from 'inquirer'
_
import { execSync, execFile } from 'child_process'	//DELETETHISFORCLIENT
_
import { btr_commands, validNpmVersion } from '../types.js'
_
import { npmVersionOptions, utilsRepoName, warningsCount_generator } from '../constants.js'
_
import {
	checkCodeThatCouldBeUpdated, colorLog, errorLog, fsReadFileAsync, fsWriteFileAsync, getCachedFiles, getFilesAndFoldersNames,
	inquirePromptCommands, mapCommandsForInquirePrompt, prompCommitMessageAndPush, selfFilter, successLog, transpileFile
} from '../btr.js'

const errors: string[] = []

const functions: btr_commands = {
	check: { description: 'btr-check the files in this very package', fn: btrCheckPackageAndReportResult },
	publish: { description: '1) Transpile all. 2) Git commit + push. 3) npm version + PUBLISH', fn: publish },
	test: { description: 'Transpile and run test/run.ts', fn: transpileAndRunTestRunTs },
	transpileAll: { description: 'Transpile base files, check for btr-errors and if they pass, emit the client versions', fn: transpileAll },
	transpileBase: { description: 'Transpile the file bases, NOT for production', fn: transpileBaseFiles },
}

process.env['prevent_divine_init'] = 'true'
inquirePromptCommands(mapCommandsForInquirePrompt(functions), true)

//function declarations below

function transpileAndRunTestRunTs() { transpileFile(['./test/run.ts'], './test/transpiled'); execFile('./test/transpiled/test/run.ts') }
function transpileBaseFiles() { transpileFile(['./btr.ts'], '.') }

async function btrCheckPackage() {
	checkCodeThatCouldBeUpdated(await getCachedFiles(errors, getFilesAndFoldersNames('.', null).filter(path => path.includes('ts'))))
}

async function btrCheckPackageAndReportResult() {
	await btrCheckPackage()
	errors.length ? colorLog('red', errors.length + ' errors') : successLog('No btr-errors detected')
}

async function publish() {
	transpileAll()
	prompCommitMessageAndPush(utilsRepoName)

	const versioning = (await inquirer.
		prompt({
			name: 'versioning',
			type: 'list',
			message: 'Select an NPM versioning:',
			choices: npmVersionOptions
		})
	).versioning as validNpmVersion

	execSync(`npm version ${versioning}`)
	successLog('package version\'d')

	execSync('npm publish')
	successLog('package publish\'d')
}

async function transpileAll() {
	transpileBaseFiles()
	btrCheckPackage()

	if (thereAreErrorsOrWarnings()) { errorLog('btr-errors detected, fix them before attempting to transpile again'); return }

	const filename = 'btr.ts'
	const lines = await getLinesInBtrTs()

	selfFilter(lines, line => !/DELETETHISFORCLIENT/.test(line)) //regexHere

	const cutPoint = lines.findIndex(x => /DELETEEVERYTHINGBELOW/.test(x)) //regexHere
	lines.splice(cutPoint, lines.length)
	lines.push('export const colorLog = (color: string, message: string) => console.log(`%c${message}`, `color: ${color};`) //@btr-ignore')

	await fsWriteFileAsync(`./client/${filename}`, lines.join('\n'))

	transpileFile(['client/btr.ts'], './client')
	successLog('browser versions emitted')

	async function getLinesInBtrTs() {
		return (await fsReadFileAsync(filename)).
			replaceAll(/from '\.\/(?=constants|types)/, 'from \'./').
			replaceAll('bigConsoleError', 'colorLog').
			split('\n')
	}

	function thereAreErrorsOrWarnings() {
		return errors.length || warningsCount_generator.next().value > 1
	}
}