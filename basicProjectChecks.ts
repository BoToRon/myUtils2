let _
import fs from 'fs'
_
import { z } from 'zod'
_
import { cachedFile, messageHandler, nullable, packageJson, zSchema } from './types/types.js'
_
import {
	getCachedFiles, checkCodeThatCouldBeUpdated, compareArrays, getEnviromentVariables, importFileFromProject,
	nullAs, successLog, surroundedString, zodCheck_curry, zRegexGenerator, fsReadFileAsync
} from './btr.js'
_
import {
	CLIENT_SRC, CLIENT_SRC_SOCKET, ESLINT_CJS, GITIGNORE,
	GLOBAL_VARS, SERVER_REF_TS, TSCONFIG_JSON, TYPES_IO_TS, zMyEnv,
} from './constants/constants.js'
_

function zodCheck_toErrors<T>(path: string, schema: zSchema<T>, data: T) { zodCheck_curry((e: string) => addToErrors(path, e))(schema, data) }
function addToErrors(path: string, error: string) { errors.push(`(at ${path}): ${error}`) }
function inBtrUtils(path: string) { return './node_modules/@botoron/utils/' + path }

let errorHandler = <messageHandler>nullAs()
let DEV_OR_PROD = <'DEV' | 'PROD'>nullAs()

const errors: string[] = []
const cachedFiles: cachedFile[] = []

const clientVueFiles: cachedFile[] = []
const clientTsFiles: cachedFile[] = []
const serverTsFiles: cachedFile[] = []

/** Check the version of @botoron/utils, the enviroment variables and various config files */
export async function basicProjectChecks(errHandler: messageHandler) {
	errorHandler = errHandler
	DEV_OR_PROD = getEnviromentVariables().DEV_OR_PROD
	await fillCachedFiles()

	clientVueFiles.push(...getFromCachedFiles([CLIENT_SRC, '.vue']))
	clientTsFiles.push(...getFromCachedFiles([CLIENT_SRC, '.ts']))
	serverTsFiles.push(...getFromCachedFiles(['./server', '.ts']))

	await allPromises()

	errors.length ? errorHandler('\n\n' + errors.join('\n\n') + '\n\n') : successLog('all basicProjectChecks passed')
	return !errors.length

	function allPromises() {

		checkBasicValidAdminCommands()
		checkClientFilesDontReferenceLocalStorageDirectly()
		checkClientSocketTs()
		checkClientStoreTs()
		checkEnviromentVariables()
		checkFilesAndFolderStructure()
		checkGitIgnore()
		checkImportsAreFromTheRightBtrFile()
		checkInitTsCallsRefTsAndIoTs()
		checkLocalImportsHaveJsExtention()
		checkServerEventsTs()
		checkServerRefTs()
		checkSocketEvents()
		checkServerAndClientFilesLogTheirInitialization()
		checkSpecificMatchesInTypesIoTs()
		checkSpecificMatchesInTypesTs()

		return Promise.all([
			checkAllExportedFunctionsAreDescribed(),
			checkAllVueComponentsAreTrackeable(),
			checkCodeThatCouldBeUpdated([serverTsFiles, clientTsFiles, clientVueFiles].flat()),
			checkFilesAreIdentical(ESLINT_CJS, inBtrUtils(ESLINT_CJS)),
			checkFilesAreIdentical(TSCONFIG_JSON, inBtrUtils(TSCONFIG_JSON)),
			checkPackageJsons(),
			checkUtilsVersion(),
			checkVsCodeSettings(),
			checkVueDevFiles(),
		])
	}
}

function asConsecutiveLines(lines: string[]) {
	return lines.join('\r\n')
}

function checkBasicValidAdminCommands() {
	checkMatchInSpecificFile(GLOBAL_VARS, 'export const adminCommands = [\'getSockets\', \'help\', \'ref\',')
	checkMatchInSpecificFile('./types/z.ts', 'export const zValidAdminCommands = z.enum(adminCommands)')
}

/**Check all the top-level functions in main .ts server files have a description */
function checkAllExportedFunctionsAreDescribed() {
	if (DEV_OR_PROD !== 'DEV') { return true }

	serverTsFiles.forEach(file => {
		const lines = file.content.split('\n')

		const uncommentedTopLevelFunctions = lines.reduce((acc, line, index) => {
			const isTopLevelFunction = /^export (async|function)/.test(line) //regexHere
			if (!isTopLevelFunction) { return acc }

			const isCommented = /\*\//.test(lines[index - 1] as string)
			if (isCommented) { return acc }

			acc.push(line.slice(0, line.length - 5).replace(/(export ){0,}(async |function |\(.{1,})/g, '')) //regexHere
			return acc
		}, [] as string[])

		if (!uncommentedTopLevelFunctions.length) { return }
		addToErrors(file.path, `Uncommented exported functions [${uncommentedTopLevelFunctions.join(', ')}]`)
	})
}

/**Check all the vue components are trackable by the window */
function checkAllVueComponentsAreTrackeable() {
	if (DEV_OR_PROD !== 'DEV') { return true }
	clientVueFiles.forEach(file => {
		const wantedMatch = 'trackVueComponent(' //) <--here to not mess with the colour of parentheses
		if (!file.content.includes(wantedMatch)) { addToErrors(file.path, `${file} must include "${wantedMatch}"`) }
	})
}

function checkClientFilesDontReferenceLocalStorageDirectly() {
	[clientTsFiles, clientVueFiles].flat().forEach(file => {
		const { path, content } = file
		if (!content.includes('localStorage.')) { return }
		addToErrors(path, 'use updateStoreAndLocalStorageKey (with updateStoreAndLocalStorageKey) instead of referencing localStorage directly')
	})
}

function checkClientSocketTs() {
	[
		asConsecutiveLines([
			'export const socket: clientSocket = import.meta.env.PROD ? io() : io(\'http://localhost:3000/\')',
			'if (import.meta.env.DEV) { clientSocketLongOnAny(socket, useStore().socketEvents) }'
		]),
		asConsecutiveLines([
			'socket.on(\'autoLogin\', () => useStore().login())',
			'socket.on(\'globalAlert\', globalAlert => useStore().globalAlert = globalAlert)',
			'socket.on(\'initInfo\','
		])
	].forEach(x => checkMatchInSpecificFile(CLIENT_SRC_SOCKET, x))
}

function checkClientStoreTs() {
	[
		asConsecutiveLines([
			'declare global {',
			'\tinterface Window {',
			'appLog: ReturnType<typeof getAppLog>',
			'vueComponents: Record<'
		]),
		'const { myLocalStorage, localStorageSet } = getLocalStorageAndSetter({',
		asConsecutiveLines([
			'\t\tupdateStoreAndLocalStorageKey<K extends keyof T, T extends typeof myLocalStorage>(key: K, value: T[K]) {',
			'\t\t\t//@ts-expect-error ts doesn\'t automatically realize all keys of myLocalStorage also are present in useStore()',
			'\t\t\tuseStore()[key] = value; localStorageSet(key, value)',
			'\t\t},'
		]),
		'getAppLog(window as never, useStore as never)',
	].forEach(x => checkMatchInSpecificFile('./client/src/store.ts', x))
}

/**Check if all the desired enviroment keys are defined */
function checkEnviromentVariables() {
	zodCheck_curry((error: string) => addToErrors('.env', error), false)(zMyEnv, getEnviromentVariables())
}

async function checkFilesAreIdentical(path: string, pathToTemplate: string) {
	const file = getFromCachedFiles([path])[0] as cachedFile
	const sampleFile = await fsReadFileAsync(pathToTemplate)
	if (withoutSlash_r_n(file.content) === withoutSlash_r_n(sampleFile)) { return true }

	addToErrors(path, 'File should be identical to the one at ' + pathToTemplate)
	function withoutSlash_r_n(content: string) { return content.replace(/\r|\n/g, '') } //regexHere
}

/**Check the structure of the project */
function checkFilesAndFolderStructure() {

	const currentFilesAndFolders = getFilesAndFoldersNames('.', null)

	const desiredFilesAndFolders = [
		'./dev', './test',	//folders for generating data and testing the server before building, respectively
		ESLINT_CJS, GITIGNORE, TSCONFIG_JSON, './.env', './.git', './package-lock.json', './package.json', './TODO.md', //solo-files
		SERVER_REF_TS, './server/events.ts', './server/fns.ts', './server/init.ts',  //server files
		GLOBAL_VARS, './global/fns.ts',  //functions and constants for both server and client
		TYPES_IO_TS, './types/types.d.ts', './types/z.ts', //types and schemas

		'./client/env.d.ts', './client/index.html', './client/node_modules', './client/package-lock.json', './client/package.json',
		'./client/tsconfig.config.json', './client/tsconfig.json', './client/vite.config.ts', './client/vue.config.js', //required client files

		CLIENT_SRC_SOCKET, './client/src/App.vue', './client/src/assets', './client/src/index.ts', './client/src/store.ts',  //client files
	]

	const { missingItems } = compareArrays(desiredFilesAndFolders, currentFilesAndFolders)
	if (!missingItems.length) { return }
	addToErrors('checks.checkFilesAndFolderStructure', `The following files/directories are missing: [${missingItems.join(', ')}]`)
}

/**Check all files/folders that should be ignored by default are so */
function checkGitIgnore() {
	const currentIgnores = (getFromCachedFiles([GITIGNORE])[0] as cachedFile).content.split('\r\n')
	const desiredIgnores = ['.env', 'client/node_modules', 'node_modules', 'test/*']
	const missingItems = compareArrays(desiredIgnores, currentIgnores).missingItems

	if (missingItems.length) { addToErrors('.gitignore', `Must include the following: [${missingItems.join(', ')}]`) }
}

function checkImportsAreFromTheRightBtrFile() {
	[clientTsFiles, clientVueFiles].flat().forEach(file => doCheck('client', file))
	serverTsFiles.forEach(file => doCheck('server', file))

	function doCheck(filetype: 'server' | 'client', file: cachedFile) {
		const { path, content } = file
		if (!content.includes('@botoron/utils')) { return }

		if (filetype === 'server' && content.includes('@botoron/utils/client')) {
			return addToErrors(path, 'Server file should not be exporting from @botoron/utils/client')
		}

		if (filetype === 'client' && !content.includes('@botoron/utils/client/btr.js')) {
			return addToErrors(path, 'Client file should be exporting from @botoron/utils/client/btr.js')
		}
	}
}

function checkInitTsCallsRefTsAndIoTs() {
	checkMatchInSpecificFile('./server/init.ts', 'successLog(stringify({ refInitialized: true, ioInitialized }))')
}

function checkLocalImportsHaveJsExtention() {
	[serverTsFiles, clientTsFiles, clientVueFiles].flat().forEach(file => {
		const { path, content } = file
		const localImports = content.match(/from '\..{1,}/g) //regexHere
		if (!localImports) { return }

		localImports.forEach(match => {
			if (match.includes('.js\'')) { return }
			if (match.includes('.vue\'')) { return }
			addToErrors(path, `Local import(${match}) is missing.js at the end`)
		})
	})
}

function checkMatchInSpecificFile(filepath: string, wantedMatch: string) {
	const { content } = (getFromCachedFiles([filepath])[0] as cachedFile)
	if (!content.includes(wantedMatch)) { addToErrors(filepath, `"${surroundedString(wantedMatch, ' ', 10)}" is missing)`) }
}

/**Check the scripts in a project's package json all fit the established schema */
async function checkPackageJsons() {
	const packageJsonOfProjectRoot = (<packageJson>await importFileFromProject('package', 'json'))
	const packageJsonOfProjectClient = (<packageJson>await importFileFromProject('client/package', 'json'))

	const desiredPackageJsonClientSchema = z.object({
		name: z.string(),
		version: z.string(),
		devDependencies: z.object({}),
		scripts: z.object({
			dev: z.literal('vite'),
			build: z.literal('vite build --emptyOutDir')
		}).strict(),
		dependencies: z.object({
			'bootstrap-vue': z.string(),
			'chart.js': z.string(),
			'chartjs-adapter-date-fns': z.string(),
			'date-fns': z.string(),
			pinia: z.string(),
			vue: z.string(),
			'vue-chartjs': z.string(),
		}),
	})

	const desiredPackageJsonRootSchema = z.object({
		name: z.string().regex(...zRegexGenerator(/-(src|dist)$/, false)), //regexHere
		author: z.literal('BoToRon'),
		description: z.string().min(10),
		license: z.literal('ISC'),
		main: z.literal('test/server/init.js'),
		type: z.literal('module'),
		version: z.string(),
		engines: z.object({ node: z.literal('>=18.0.0') }).strict(),
		scripts: z.object({
			btr: z.literal('npm i @botoron/utils'),
			'btr-u': z.literal('npm uninstall @botoron/utils'),
			'build-server': z.literal('npm run npmScript --command_project=build'),
			'build-client': z.literal('cd client & npm run build'),
			'build-all': z.literal('tsc --target esnext server/init.ts --outDir ../dist & cd client & npm run build-only && cd ..'),
			check: z.literal('npm run npmScript --command_project=check'),
			localtunnel: z.literal('lt --port 5173'),
			nodemon: z.literal('nodemon test/server/init.js'),
			npmScript: z.literal('node node_modules/@botoron/utils/npmRun.js'),
			start: z.literal('node test/server/init.js'),
			test: z.literal('ts-node-esm --transpileOnly test.ts'),
			transpile: z.literal('npm run npmScript --command_project=transpile'),
			vue: z.literal('cd client & npm run dev'),
			git: z.literal('npm run npmScript --command_project=git')
		}).strict(),
		dependencies: z.object({
			'@botoron/utils': z.string(),
			//'magic-regexp': z.string(),
			'socket.io': z.string(),
			'socket.io-client': z.string(),
			'zod-validation-error': z.string()
		}),
		devDependencies: z.object({
			'@types/express': z.string(),
			'@typescript-eslint/eslint-plugin': z.string(),
			'@typescript-eslint/parser': z.string(),
			dotenv: z.string(),
			eslint: z.string(),
			'eslint-plugin-vue': z.string(),
			nodemon: z.string(),
		})
	})

	zodCheck_toErrors('./client/package.json', desiredPackageJsonClientSchema, packageJsonOfProjectClient)
	zodCheck_toErrors('./package.json', desiredPackageJsonRootSchema, packageJsonOfProjectRoot)
}

function checkServerEventsTs() {
	[
		asConsecutiveLines([
			'io.on(\'connection\', x => {',
			'\tconst socket = x as serverSocket',
			'\tref.DB_misc.updateOne({}, { $inc: { pageVisits: 1 } }).then(() => ref.pageVisits++)',
			'socket.onAny(args => ref.debugLog(\'logSocketOnAny\', { args }))',
			'ref.debugLog(\'logWhenSocketConnects\', { id: x.id })',
		]),
		'export const ioInitialized = true'
	].forEach(line => checkMatchInSpecificFile(SERVER_REF_TS, line))
}

/**Check the properties and initialization of server/ref.ts */
function checkServerRefTs() {
	[
		'const mongoClient = await getMongoClient()',
		'const devOrProd = \'dev\' as \'dev\' | \'prod\'',
		asConsecutiveLines([
			'const { debugOptions: debug, debugLog } = getDebugOptionsAndLog(devOrProd, {',
			'\tlogSocketOnAny: [true, false],',
			'\tlogWhenSocketConnects: [true, false],'
		]),
		'export const ref = {',
		'temp: {} as Record<string, unknown>, //for admin-debugging purposes',
		'debug, debugLog, devOrProd,',
		'sockets: [] as serverSocket[],',
		'alert: { message: \'\', show: false } as globalAlert,',
		'DB_misc: mongoCollection(\'misc\'),',
		'pageVisits: (await mongoCollection(\'misc\').findOne({}) as unknown as mongoMisc).pageVisits,',
		asConsecutiveLines([
			'/**Shorthand for mongoClient.db(DATABASE).collection(COLLECTION) */',
			'function mongoCollection(name: string) { return mongoClient.db('])
	].forEach(line => checkMatchInSpecificFile(SERVER_REF_TS, line))
}

/**Check all socket events are handled aka socket.on(<EVENTNAME>) */
function checkSocketEvents() {
	const filepath = TYPES_IO_TS
	const linesInTypesIo = (getFromCachedFiles([filepath])[0] as cachedFile).content.split('\n')
	checkSocketOnOfInterface('ServerToClientEvents', CLIENT_SRC_SOCKET)
	checkSocketOnOfInterface('ClientToServerEvents', './server/events.ts')

	function checkSocketOnOfInterface(nameOfInterface: string, pathToHandlingFile: string) {

		const handlingFile = (getFromCachedFiles([pathToHandlingFile])[0] as cachedFile).content
		let isKeyOfWantedInterface = false

		linesInTypesIo.forEach(line => {
			if (line.includes(`export interface ${nameOfInterface}`)) { isKeyOfWantedInterface = true; return }
			if (/^\}/.test(line)) { isKeyOfWantedInterface = false } //"{"" <-- here so it doesn't mess with the color of brackets //regexHere
			if (!isKeyOfWantedInterface) { return }

			if (!/^\t\w/.test(line)) { return } //regexHere
			const event = (line.match(/(?<=\t)\w{1,}/) || [''])[0] //regexHere

			if (handlingFile.includes(`socket.on('${event}'`)) { return }
			errors.push(`${nameOfInterface}'s " ${event} " is declared but not handled in ${pathToHandlingFile}`)
		})
	}
}

function checkServerAndClientFilesLogTheirInitialization() {
	[serverTsFiles, clientTsFiles, clientVueFiles].flat().forEach(file => {
		const { path, content } = file
		const wantedMatch = `logInitialization('${path}')`
		if (!content.includes(wantedMatch)) { addToErrors(path, `"${surroundedString(wantedMatch, ' ', 10)}" is missing`) }
	})
}

function checkSpecificMatchesInTypesIoTs() {
	[
		'export type socket_c2s_event = keyof ClientToServerEvents',
		'admin: (adminKey: string, command: string) => void',
		'commandResult: (commandUsed: string, result: unknown) => void',
		'export type socket_s2c_event = keyof ServerToClientEvents',
		asConsecutiveLines([
			'export type clientSocket = socket_client<ServerToClientEvents, ClientToServerEvents>',
			'export const io = new Server<ClientToServerEvents, ServerToClientEvents>(getStartedHttpServer(), { cors: { origin: \'*\' } })',
			'export interface serverSocket extends socket_server<ClientToServerEvents, ServerToClientEvents'
		])
	].forEach(event => checkMatchInSpecificFile(TYPES_IO_TS, event))
}

function checkSpecificMatchesInTypesTs() {
	[
		asConsecutiveLines([
			'/**imported from utils */',
			'declare global {',
			'	type fieldsForColumnOfTable = btr_fieldsForColumnOfTable',
			'	type globalAlert = btr_globalAlert',
			'	type language = btr_language',
			'	type newToastFn = btr_newToastFn',
			'	type socketEventInfo = btr_socketEventInfo',
			'	type trackedVueComponent = btr_trackedVueComponent',
			'	type validVariant = btr_validVariant',
			'}'
		]),
		asConsecutiveLines(['/**infered from zod */', 'declare global']),
		'type validAdminCommands = z.infer<typeof zValidAdminCommands>',
		asConsecutiveLines(['/**exclusive to this project */', 'declare global']),
		'type mongoMisc = { adminKey: string, pageVisits: number',
	].forEach(x => checkMatchInSpecificFile('./types/types.d.ts', x))
}

/**Check if the project is using the latest version of "myUtils" */
async function checkUtilsVersion() {
	const latestVersion = await getLatestVersion()
	const installedVersion = (await import('./package.json', { assert: { type: 'json' } })).default.version
	const isOutdated = versionValue(latestVersion) > versionValue(installedVersion)

	if (isOutdated) { errorHandler(`Outdated "utils" package. (${installedVersion} vs ${latestVersion}) PLEASE UPDATE: npm run btr`) }

	/**Check if the project is using the latest version of "@botoron/utils" */
	async function getLatestVersion() {
		const response: { objects: [{ package: packageJson }] } = (await new Promise((resolve) => {
			try {
				fetch('http://registry.npmjs.com/-/v1/search?text=@botoron/utils&size=1').
					then(res => res.json().then((x) => resolve(x)))
			}
			catch { return { objects: [{ package: { version: '0' } }] } }
		}))
		return response.objects[0].package.version
	}

	function versionValue(version: string) {
		const [major, minor, patch] = version.split('.').map(x => Number(x)) as [number, number, number]
		return (major * 99 * 99) + (minor * 99) + patch
	}
}

async function checkVsCodeSettings() {
	const vsSettingsOfProject = await importFileFromProject('.vscode/settings', 'json')
	const desiredVsSettings = z.object({
		'dotenv.enableAutocloaking': z.literal(true),
		'peacock.color': z.string(),
		'typelens.unusedcolor': z.literal('#f44'),
		'workbench.colorCustomizations': z.object({}),
	})

	zodCheck_toErrors('.vscode/settings.json', desiredVsSettings, vsSettingsOfProject)
}

/**Turn off that damn skipLibCheck that comes on by default */
async function checkVueDevFiles() {
	if (DEV_OR_PROD !== 'DEV') { return true }

	await Promise.all(['env.d.ts', 'tsconfig.config.json', 'tsconfig.json', 'vite.config.ts', 'vue.config.js'].map(filename => {
		const fullpath = './client/' + filename
		const pathToTemplate = 'node_modules/@botoron/utils/templateFiles/' + filename
		return checkFilesAreIdentical(fullpath, pathToTemplate)
	}))
}

async function fillCachedFiles() {
	const clientVueFilePaths = getFilesAndFoldersNames(CLIENT_SRC, '.vue')
	const clientTsFilePaths = getFilesAndFoldersNames(CLIENT_SRC, '.ts')
	const serverTsFilePaths = getFilesAndFoldersNames('./server', '.ts')
	const typeFilePaths = getFilesAndFoldersNames('./types', '.ts')
	const tsConfigs = [inBtrUtils(TSCONFIG_JSON), TSCONFIG_JSON]
	const eslintConfigs = [inBtrUtils(ESLINT_CJS), ESLINT_CJS]

	const vueDevFiles = [
		'env.d.ts', 'node_modules/@vue/tsconfig/tsconfig.json', 'tsconfig.config.json',
		'tsconfig.json', 'vite.config.ts', 'vue.config.js'
	].map(x => './client/' + x)

	cachedFiles.push(...await getCachedFiles(errors, [
		clientTsFilePaths, clientVueFilePaths, eslintConfigs, GITIGNORE,
		GLOBAL_VARS, serverTsFilePaths, tsConfigs, typeFilePaths, vueDevFiles
	].flat()))
}

/**Get all the file and folders within a folder, stopping at predefined folders */
function getFilesAndFoldersNames(directory: string, extension: nullable<'.ts' | '.vue'>) {
	const results: string[] = []

	fs.readdirSync(directory).forEach((file) => {
		file = directory + '/' + file
		const stat = fs.statSync(file)

		const stopHere = /node_modules|dev|git|test|assets/.test(file) //regexHere
		if (stat && stat.isDirectory() && !stopHere) { results.push(...getFilesAndFoldersNames(file, null)) }
		else { results.push(file) }
	})

	return extension ? results.filter(path => path.includes(extension)) : results
}

function getFromCachedFiles(obligatoryMatches: string[]): cachedFile[] {
	const foundFiles = cachedFiles.filter(file => obligatoryMatches.every(match => file.path.includes(match)))
	if (foundFiles.length) { return foundFiles }
	addToErrors('checks.getFromCachedFiles', `No file cached with the requested obligatory matches(${obligatoryMatches}) was found`)
	return [{ path: 'FAILSAFE', content: '' }]
} 