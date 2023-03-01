let _
import inquirer from 'inquirer'
_
import { execSync, execFile } from 'child_process'	//DELETETHISFORCLIENT
_
import { maybePromise, validNpmVersion } from './types/types.js'
_
import { npmVersionOptions, utilsRepoName } from './constants/constants.js'
_
import {
	checkCodeThatCouldBeUpdated, colorLog, errorLog, fsReadFileAsync, fsWriteFileAsync,
	getCachedFiles, inquirePromptCommands, mapObject, prompCommitMessageAndPush, selfFilter, successLog
} from './btr.js'

const warnings: string[] = []

const functions: Record<string, { description: string, fn: () => maybePromise<void> }> = {
	check: { description: 'btr-check the files in this very package', fn: btrCheckPackageAndReportResult },
	publish: { description: '1: Transpile all. 2: Git commit + push. 3: npm version + PUBLISH', fn: publish },
	test: { description: 'Transpile and run test/run.ts', fn: transpileAndRunTestRunTs },
	transpileAll: { description: 'Transpile base files, check for btr-warnings and if they pass, emit the client versions', fn: transpileAll },
	transpileBase: { description: 'Transpile the file bases, NOT for production', fn: transpileBaseFiles },
}

function getPromptableScripts() {
	return mapObject(functions,)
}

inquirePromptCommands(scripts)

//TODO: find the filepaths for getCachedFiles DYNAMICALLY
async function btrCheckPackage() {
	checkCodeThatCouldBeUpdated(await getCachedFiles(warnings, ['./basicProjectChecks.ts', './btr.ts', './npmRun.ts']))
}

async function btrCheckPackageAndReportResult() {
	await btrCheckPackage()
	warnings.length ? successLog('No btr-errors detected') : colorLog('red', warnings.length + ' warnings')
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
	if (warnings.length) { errorLog('btr-warnings detected, fix them before attempting to transpile again') }

	const filename = 'btr.ts'
	const lines = (await fsReadFileAsync(filename)).
		replaceAll(/from '\.\/(?=constants|types)/, 'from \'./').
		replaceAll('bigConsoleError', 'colorLog').
		split('\n')

	selfFilter(lines, line => !/DELETETHISFORCLIENT/.test(line)) //regexHere

	const cutPoint = lines.findIndex(x => /DELETEEVERYTHINGBELOW/.test(x)) //regexHere
	lines.splice(cutPoint, lines.length)
	lines.push('export const colorLog = (color: string, message: string) => console.log(`%c${message}`, `color: ${color};`)') //@btr-ignore

	await fsWriteFileAsync(`./client/${filename}`, lines.join('\n'))

	transpileFile(['client/btr.ts'], './client')
	successLog('browser versions emitted')
}

function transpileAndRunTestRunTs() {
	transpileFile(['./test/run.ts'], './test/transpiled')
	execFile('./test/transpiled/test/run.ts')
}

function transpileBaseFiles() {
	transpileFile(['./btr.ts'], '.')
}

function transpileFile(sourceFiles: string[], outputDirectory: string) {
	colorLog('white', 'Transpiling the following file(s): ' + sourceFiles)
	execSync(`tsc --target esnext ${sourceFiles.join(' ')} --outDir ${outputDirectory}`)
	colorLog('white', 'Done transpiling!')
}