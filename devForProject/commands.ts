//					tsc --target esnext devForPackage/commands.ts --outDir ./devForPackage/transpiled 
// 					node devForPackage/transpiled/devForPackage/commands.js

let _
import fs from 'fs'
_
import inquirer from 'inquirer'
_
import { execSync, execFile } from 'child_process'	//DELETETHISFORCLIENT
_
import { basicProjectChecks } from '../basicProjectChecks'
_
import { btr_commands, validNpmVersion } from '../types.js'
_
import { npmVersionOptions, utilsRepoName } from '../constants.js'
_
import {
	checkCodeThatCouldBeUpdated, colorLog, delay, divine, errorLog, fsReadFileAsync, fsWriteFileAsync, getCachedFiles,
	getFilesAndFoldersNames, inquirePromptCommands, killProcess, mapCommandsForInquirePrompt, successLog, transpileFiles
} from '../btr.js'

process.env['prevent_divine_init'] = 'true'

const PACKAGE_DOT_JSON = 'package.json'
const serverFolder_dist = '../dist'
const fileWithRef = 'ref'

const errors: string[] = []
const warningsCount = { count: 0 }
const tsFilePaths = getFilesAndFoldersNames('.', null).filter(path => path.includes('.ts'))

const functions: btr_commands = {
	btr: { description: 'Install/update @botoron/utils', fn: installBtrUtils },
	'build-client': { description: 'Build the client files onto the ../dist/public', fn: buildClientFilesWitVite },
	'build-server': { description: 'Build the server files onto ../dist', fn: buildServerFiles },
	check: { description: 'btr-check the files in this very project', fn: btrCheckProjectAndReportResult },
	localtunnel: { description: 'Expose vite\'s port through a tunnel', fn: forwardVitesPort },
	nodemon: { description: 'Init Nodemon', fn: initNodemon },
	test: { description: 'Transpile and run test/run.ts', fn: transpileAndRunTestRunTs },
	transpile: { description: 'Transpile the files in ./server onto ./test', fn: btrCheckAndTranspileToTestFolder },
	vue: { description: 'Move to the client folder and init vite', fn: initVite },
	EXIT: { description: 'Quit the command line', fn: quitCommandLineProgram },
	//'build-all': { description: 'Transpile and copy/paste all files needed for ../dist', fn: xxxxxxxxxxxxxxxxxxx },
}

inquirePromptCommands(mapCommandsForInquirePrompt(functions), true)

function transpileAndRunTestRunTs() { transpileFiles(['./test/run.ts'], './test/transpiled'); execFile('./test/transpiled/test/run.ts') }
async function btrCheckProject() { checkCodeThatCouldBeUpdated(await getCachedFiles(errors, tsFilePaths), warningsCount) }
function quitCommandLineProgram() { killProcess('devForProject\'s commands terminated') }
function buildClientFilesWitVite() { execSync('cd client & npm run build') }
function initNodemon() { execSync('nodemon test/server/init.js') }
function installBtrUtils() { execSync('npm i @botoron/utils') }
function forwardVitesPort() { execSync('lt --port 5173') }
function initVite() { execSync('cd client & npm run dev') }

async function btrCheckProjectAndReportResult() {
	await btrCheckProject()
	errors.length ? colorLog('red', errors.length + ' errors') : successLog('No btr-errors detected')
}

async function btrCheckAndTranspileToTestFolder() {
	await btrCheckProject()
	if (errors.length || warningsCount.count > 1) { errorLog('btr-errors detected, fix them before attempting to transpile again'); return }
	if (!(await checkCanTranspile('dev'))) { return }

	execSync('tsc --target esnext server/init.ts --outDir ./test')
	const packageJsonContent = await fsReadFileAsync(PACKAGE_DOT_JSON)
	await fsWriteFileAsync('test/package.json', packageJsonContent)
	successLog('files transpiled to ./test')
}

async function buildServerFiles() {
	await basicProjectChecks(divine.error)
	if (!(await checkCanTranspile('prod'))) { return }

	if (!(await check_devOrProd_ofRef('server/' + fileWithRef + '.ts', false))) { return }
	await transpileTypesFile()
	await copyFileToDis('.env')
	await copyFileToDis('.gitignore')
	await copyFileToDis(PACKAGE_DOT_JSON) //TODO: make it so the "-src" in the name is replaced with "-dist"

	execSync(`tsc --target esnext server/init.ts server/io.ts --outDir ${serverFolder_dist}`)
	await check_devOrProd_ofRef(serverFolder_dist + '/server/' + fileWithRef + '.js', true)
	successLog('(server) Build sucessful!')

	async function check_devOrProd_ofRef(filePath: string, toggleForProduction: boolean) {
		let fileContent = await fsReadFileAsync(filePath)
		if (!checkFor('devOrProd = \'dev\'', 'devOrProd = \'prod\'')) { return }
		if (toggleForProduction) { await fsWriteFileAsync(filePath, fileContent) }
		return true

		function checkFor(forSrc: string, forDist: string) {
			if (!fileContent.includes(forSrc)) { killProcess(`main.ts.ref must include: (${forSrc})`); return }
			if (toggleForProduction) { fileContent = fileContent.replace(forSrc, forDist) }
			return true
		}
	}

	async function copyFileToDis(filename: string) {
		let content = await fsReadFileAsync(filename)
		if (filename === PACKAGE_DOT_JSON) { deleteAllPackageJsonScriptsExceptStart() }
		await fsWriteFileAsync('../dist/' + filename, content)

		function deleteAllPackageJsonScriptsExceptStart() {
			//TODO: automatically git push and install npm dependencies when transpiling?
			content = content.replace(/"scripts": {[^}]{1,}/, `"scripts": { //regexHere
		"start": "node server/init.js",
		"git": "git add . & git commit & git push",
	`)
		}
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

async function checkCanTranspile(shouldBe: 'dev' | 'prod') {
	const answer = (await fsReadFileAsync(`test/server/${fileWithRef}.js`)).includes(`const devOrProd = '${shouldBe}' as 'dev' | 'prod'`)
	if (!answer) { errorLog(`ref's devOrProd should be set to '${shouldBe}' for this type of transpilation`) }
	return answer
}
