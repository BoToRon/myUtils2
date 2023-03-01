let _
import fs from 'fs'
_
import { exec } from 'child_process'	//DELETETHISFORCLIENT
_
import { basicProjectChecks } from './basicProjectChecks.js' //DELETETHISFORCLIENT
_
import { validNpmCommand_package, validNpmCommand_project } from './types/types.js'
_
import {
	PACKAGE_DOT_JSON, utilsRepoName, zValidNpmCommand_package,
	zValidNpmCommand_project, zValidVersionIncrement
} from './constants/constants.js'
_
import {
	colorLog, command_package, command_project, delay, divine, fsReadFileAsync, fsWriteFileAsync, getEnviromentVariables,
	killProcess, prompCommitMessageAndPush, questionAsPromise, selfFilter, successLog, zodCheckAndHandle, zodCheck_curry
} from './btr.js'
_

if (command_package) { zodCheckAndHandle(zValidNpmCommand_package, command_package, npmRun_package, [command_package], divine.error) }
if (command_project) { zodCheckAndHandle(zValidNpmCommand_project, command_project, npmRun_project, [command_project], divine.error) }

/**Easily run the scripts of this (utils) repo's package.json */
export function npmRun_package(npmCommand: validNpmCommand_package) {

	console.log({ npmCommand }) //@btr-ignore

	if (npmCommand === 'transpile-all') { transpileAllFiles(printProcessOver) }
	if (npmCommand === 'all') { transpileAllFiles(promptVersioning) }

	function printProcessOver() {
		colorLog('magenta', 'Process over')
	}
}

/**Run convenient scripts for and from a project's root folder */
//TODO: delete the rule-disabling below and move this function into its own file
// eslint-disable-next-line sonarjs/cognitive-complexity 
export async function npmRun_project(npmCommand: validNpmCommand_project) {
	await basicProjectChecks(divine.error)
	if (npmCommand === 'check') { return }

	const { APP_NAME } = getEnviromentVariables()
	const serverFolder_dist = '../dist'
	const serverFolder_src = './test'
	const fileWithRef = 'ref'

	if (npmCommand === 'git') { prompCommitMessageAndPush(`${APP_NAME}`) }
	if (['build', 'transpile'].includes(npmCommand)) { canTranspileCheckAndHandle() }

	async function canTranspileCheckAndHandle() {

		const canTranspile = await getCanTranspile()
		if (!canTranspile) { killProcess(`CANT TRANSPILE, ${fileWithRef}.js has debugging: on`) }

		if (npmCommand === 'build') { transpileToDistFolder_plusCopyOverOtherFiles() }
		if (npmCommand === 'transpile') { transpileServerFilesToTestFolder() }

		async function getCanTranspile() {
			try { return !/debugging: true/.test(await fsReadFileAsync(`test/server/${fileWithRef}.js`)) } //regexHere
			catch { return true }
		}

		function transpileServerFilesToTestFolder() {
			exec(`tsc --target esnext server/init.ts --outDir ${serverFolder_src}`, async () => {
				const packageJson = await fsReadFileAsync(PACKAGE_DOT_JSON)
				await fsWriteFileAsync('test/package.json', packageJson)
				successLog(`files transpiled to ${serverFolder_src}`)
			})
		}

		async function transpileToDistFolder_plusCopyOverOtherFiles() {
			if (!(await checkDevPropsOfRef('server/' + fileWithRef + '.ts', false))) { return }
			await transpileTypesFile()
			await copyFileToDis('.env')
			await copyFileToDis('.gitignore')
			await copyFileToDis(PACKAGE_DOT_JSON) //TODO: make it so the "-src" in the name is replaced with "-dist"

			exec(`tsc --target esnext server/init.ts server/io.ts --outDir ${serverFolder_dist}`, async () => {
				await checkDevPropsOfRef(serverFolder_dist + '/server/' + fileWithRef + '.js', true)
				successLog('(server) Build sucessful!')
			})

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
							exec('tsc --target esnext types.ts', () => {
								successLog('types.d.ts transpiled to root folder!')
								fs.unlinkSync('types.ts')
								delay(1000).then(() => resolve(true))
							})
						})
					})
				})
			}
		}
	}
}