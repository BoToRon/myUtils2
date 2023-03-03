//					tsc --target esnext devForPackage/commands.ts --outDir ./devForPackage/transpiled 
// 					node devForPackage/transpiled/devForPackage/commands.js

let _
import inquirer from 'inquirer'
_
import { execSync, execFile } from 'child_process'	//DELETETHISFORCLIENT
_
import { basicProjectChecks } from '../basicProjectChecks'
_
import { btr_commands, validNpmVersion } from '../types.js'
_
import { npmVersionOptions, utilsRepoName, warningsCount_generator } from '../constants.js'
_
import {
	checkCodeThatCouldBeUpdated, colorLog, divine, errorLog, fsReadFileAsync, fsWriteFileAsync, getCachedFiles,
	getFilesAndFoldersNames, inquirePromptCommands, killProcess, mapCommandsForInquirePrompt, successLog, transpileFiles
} from '../btr.js'

const errors: string[] = []
process.env['prevent_divine_init'] = 'true'
const tsFilePaths = getFilesAndFoldersNames('.', null).filter(path => path.includes('.ts'))

const functions: btr_commands = {
	btr: { description: 'Install/update @botoron/utils', fn: installBtrUtils },
	'build-client': { description: 'Build the client files onto the ../dist/public', fn: buildClientFilesWitVite },

	check: { description: 'btr-check the files in this very project', fn: btrCheckProjectAndReportResult },
	localtunnel: { description: 'Expose vite\'s port through a tunnel', fn: forwardVitesPort },
	nodemon: { description: 'Init Nodemon', fn: initNodemon },
	test: { description: 'Transpile and run test/run.ts', fn: transpileAndRunTestRunTs },
	transpile: { description: 'Transpile the files in ./server onto ./test', fn: btrCheckAndTranspileToTestFolder },
	vue: { description: 'Move to the client folder and init vite', fn: initVite },

	EXIT: { description: 'Quit the command line', fn: quitCommandLineProgram },

	'build-server': { description: 'Build the server files onto ../dist', fn: transpileServerFiles },
	//'build-all': { description: 'Transpile and copy/paste all files needed for ../dist', fn: xxxxxxxxxxxxxxxxxxx },
}

inquirePromptCommands(mapCommandsForInquirePrompt(functions), true)

function transpileAndRunTestRunTs() { transpileFiles(['./test/run.ts'], './test/transpiled'); execFile('./test/transpiled/test/run.ts') }
async function btrCheckProject() { checkCodeThatCouldBeUpdated(await getCachedFiles(errors, tsFilePaths)) }
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
	if (thereAreErrorsOrWarnings()) { errorLog('btr-errors detected, fix them before attempting to transpile again'); return }

	execSync('tsc --target esnext server/init.ts --outDir ./test')
	const packageJsonContent = await fsReadFileAsync('package.json')
	await fsWriteFileAsync('test/package.json', packageJsonContent)
	successLog('files transpiled to ./test')

	function thereAreErrorsOrWarnings() {
		return errors.length || warningsCount_generator.next().value > 1
	}
}

async function transpileServerFiles() {
	await basicProjectChecks(divine.error)

	const serverFolder_dist = '../dist'
	const fileWithRef = 'ref'

	async function canTranspileCheckAndHandle() {

		const canTranspile = await getCanTranspile()
		if (!canTranspile) { killProcess(`CANT TRANSPILE, ${fileWithRef}.js has debugging: on`) }

		if (npmCommand === 'build') { transpileToDistFolder_plusCopyOverOtherFiles() }

		async function getCanTranspile() {
			try { return !/debugging: true/.test(await fsReadFileAsync(`test/server/${fileWithRef}.js`)) } //regexHere
			catch { return true }
		}

		async function transpileToDistFolder_plusCopyOverOtherFiles() {
			if (!(await checkDevPropsOfRef('server/' + fileWithRef + '.ts', false))) { return }
			await transpileTypesFile()
			await copyFileToDis('.env')
			await copyFileToDis('.gitignore')
			await copyFileToDis(PACKAGE_DOT_JSON) //TODO: make it so the "-src" in the name is replaced with "-dist"

			execSync(`tsc --target esnext server/init.ts server/io.ts --outDir ${serverFolder_dist}`)
			await checkDevPropsOfRef(serverFolder_dist + '/server/' + fileWithRef + '.js', true)
			successLog('(server) Build sucessful!')

			async function checkDevPropsOfRef(filePath: string, toggleForProduction: boolean) {
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
					content = content.replace(/"scripts": {[^}]{1,}/, `"scripts": { //regexHere
		"start": "node server/init.js",
		"git": "git add . & git commit & git push",
		"btr": "npm i @botoron/utils"
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
	}
}