let _
import { z } from 'zod'
_
import { cachedFile, messageHandler, packageJson, zSchema } from './types.js'
_
import {
	CLIENT_SRC, CLIENT_SRC_SOCKET, ESLINT_CJS, GITIGNORE, GLOBAL_FNS_TS, GLOBAL_VARS_TS,
	SERVER_EVENTS_TS, SERVER_REF_TS, TSCONFIG_JSON, TYPES_IO_TS, TYPES_Z_TS, zMyEnv
} from './constants.js'
_
import {
	getCachedFiles, checkCodeThatCouldBeUpdated, compareArrays, getEnviromentVariables, getFilesAndFoldersNames,
	importFileFromProject, nullAs, pick, successLog, surroundedString, zodCheck_curry, zRegexGenerator
} from './btr.js'

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

	await checkUtilsVersion()
	await checkPackageJsons()
	await checkVueDevFiles()
	await checkVsCodeSettings()

	checkAllExportedFunctionsAreDescribed()
	checkBasicValidAdminCommands()
	checkClientFilesDontReferenceLocalStorageDirectly()
	checkClientIndexTs()
	checkClientSocketTs()
	checkClientStoreTs()
	checkEnviromentVariables()
	checkFilesAndFolderStructure()
	checkFilesAreIdentical(ESLINT_CJS, inBtrUtils(ESLINT_CJS))
	checkFilesAreIdentical(TSCONFIG_JSON, inBtrUtils(TSCONFIG_JSON))
	checkFilesAreIdentical('./client/src/__admin.vue', externalTemplatePath('__admin.vue'))
	checkFilesAreIdentical('./client/src/__chartJs.ts', externalTemplatePath('__chartJs.ts'))
	checkFilesAreIdentical('./client/src/__simpleConfirmationModal.vue', externalTemplatePath('__simpleConfirmationModal.vue'))
	checkGitIgnore()
	checkImportsAreFromTheRightBtrFile()
	checkInitTsCallsRefTsAndIoTs()
	checkLocalImportsHaveJsExtention()
	checkLoginTsEmitsInitData()
	checkServerEventsTs()
	checkServerRefTs()
	checkSocketEvents()
	checkServerAndClientFilesLogTheirInitialization()
	checkSpecificMatchesInAppVue()
	checkSpecificMatchesGlobalFnsTs()
	checkSpecificMatchesInTypesIoTs()
	checkSpecificMatchesInTypesTs()
	checkStructureAndMatchesOfVueFiles()

	checkCodeThatCouldBeUpdated([serverTsFiles, clientTsFiles, clientVueFiles].flat())

	errors.length ? errorHandler('\n\n' + errors.map((e, i) => i + '. ' + e).join('\n\n') + '\n\n') : successLog('all basicProjectChecks passed')
	return !errors.length
}

function asConsecutiveLines(lines: string[]) {
	return lines.join('\r\n')
}

function checkBasicValidAdminCommands() {
	checkMatchInSpecificFile(GLOBAL_VARS_TS, 'export const adminCommands = [\'getSockets\', \'help\', \'ref\',')
	checkMatchInSpecificFile(TYPES_Z_TS, 'export const zValidAdminCommands = z.enum(adminCommands)')
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
function checkStructureAndMatchesOfVueFiles() {
	if (DEV_OR_PROD !== 'DEV') { return true }

	clientVueFiles.forEach(file => {
		[
			asConsecutiveLines([
				'export default defineComponent({',
				'\tmounted() {',
				`\t\ttrackVueComponent('${filepathToComponentName()}', this as never, window as never)`
			]),
			'<style scoped>'
		].forEach(wantedMatch => checkMatchInSpecificFile(file.path, wantedMatch))

		function filepathToComponentName() { return file.path.replace(/\.\/client\/src\/_?/, '').replace('.vue', '') }
	})
}

function checkClientFilesDontReferenceLocalStorageDirectly() {
	[clientTsFiles, clientVueFiles].flat().forEach(file => {
		const { path, content } = file
		if (!content.includes('localStorage.')) { return }
		addToErrors(path, 'use updateStoreAndLocalStorageKey (with updateStoreAndLocalStorageKey) instead of referencing localStorage directly')
	})
}

function checkClientIndexTs() {
	[
		asConsecutiveLines([
			'let _',
			'import Vue from \'vue\'',
			'_',
			'import App from \'./App.vue\'',
			'_',
			'import { useStore } from \'./store.js\'',
			'_',
			'import \'bootstrap/dist/css/bootstrap.css\'',
			'_',
			'import \'bootstrap-vue/dist/bootstrap-vue.css\'',
			'_',
			'import { createPinia, PiniaVuePlugin } from \'pinia\'',
			'_',
			'import { BootstrapVue, IconsPlugin } from \'bootstrap-vue\'',
			'_',
			'import { clientSocketLogOnAny, getAppLog, logInitialization, newToast_client_curry } from \'@botoron/utils/client/btr.js\'',
			'_',
			'logInitialization(\'./client/src/index.ts\')',
			'',
			'//components',
		]),
		'import admin from \'./__admin.vue\'',
		'import simpleConfirmationModal from \'./__simpleConfirmationModal.vue\'',
		'Vue.component(\'component_simpleConfirmationModal\', simpleConfirmationModal)',
		'Vue.component(\'component_admin\', admin)',
		asConsecutiveLines([
			'Vue.use(PiniaVuePlugin)',
			'Vue.use(BootstrapVue)',
			'Vue.use(IconsPlugin)',
			'',
			'const vueApp = new Vue({ pinia: createPinia(), render: (h) => h(App), }).$mount(\'#app\')',
			'useStore().newToast = newToast_client_curry(vueApp.$bvToast)',
			'useStore().bvModal = vueApp.$bvModal',
			'',
			'if (import.meta.env.DEV) { clientSocketLogOnAny(useStore) }',
			'getAppLog(window as never, useStore as never)',
			'useStore().login()',
		])
	].forEach(x => checkMatchInSpecificFile(CLIENT_SRC + '/index.ts', x))
}

function checkClientSocketTs() {
	[
		asConsecutiveLines([
			'export const socket: clientSocket = import.meta.env.PROD ? io() : io(\'http://localhost:3000/\')',
			'socket.on(\'globalAlert\', globalAlert => useStore().globalAlert = globalAlert)',
			'socket.on(\'initData\','
		])
	].forEach(x => checkMatchInSpecificFile(CLIENT_SRC_SOCKET, x))
}

function checkClientStoreTs() {
	[
		asConsecutiveLines([
			'declare global {',
			'\tinterface Window {',
			'\t\tappLog: ReturnType<typeof getAppLog>',
			'\t\tvueComponents: Record<'
		]),
		'const { myLocalStorage, localStorageSet } = getLocalStorageAndSetter({',
		asConsecutiveLines([
			'export const useStore = defineStore(\'data\', {',
			'\tstate: () => ({',
			'\t\tsocket,',
			'\t\t...myLocalStorage,',
			'\t\tview: \'main\' as validView,',
			'\t\tbvModal: <bvModal>nullAs(),',
			'\t\tnewToast: <newToastFn>nullAs(),',
			'\t\tsocketEvents: [] as socketEventInfo[],',
			'\t\tadminFetch: { command: \'\', data: null } as adminFetch,',
			'\t\tglobalAlert: { message: \'\', show: false } as globalAlert,',
			'',
			'\t\tsimpleConfirmationModal: {',
			'\t\t\ttitle: \'\',',
			'\t\t\tconfirmFn: doNothing,',
			'\t\t\tconfirmationType: \'positive\' as \'positive\' | \'negative\',',
			'\t\t\topen(title: string, confirmFn: () => void) { this.title = title; this.confirmFn = confirmFn }',
			'\t\t},'
		]),
		asConsecutiveLines([
			'\tactions: {',
			'\t\tlogin() { socket.emit',
		]),
		asConsecutiveLines([
			'\t\ttriggerModal(id: validModalId, action: \'show\' | \'hide\') { triggerModal(useStore, id, action) },',
			'\t\tupdateStoreAndLocalStorageKey<K extends keyof T, T extends typeof myLocalStorage>(key: K, value: T[K]) {',
			'\t\t\t//@ts-expect-error ts doesn\'t automatically realize all keys of myLocalStorage also are present in useStore()',
			'\t\t\tuseStore()[key] = value; localStorageSet(key, value)',
			'\t\t},'
		])
	].forEach(x => checkMatchInSpecificFile('./client/src/store.ts', x))
}

/**Check if all the desired enviroment keys are defined */
function checkEnviromentVariables() {

	const myEnv = pick(getEnviromentVariables(), ['ADMIN_PASSWORD', 'APP_NAME', 'DEV_OR_PROD', 'ERIS_TOKEN', 'MONGO_URI', 'PORT'])

	zodCheck_curry((error: string) => addToErrors('.env', error))(zMyEnv, myEnv)

	/* DEV_OR_PROD: "DEV" | "PROD";
	 ADMIN_PASSWORD: string;
	 PORT: "3000";
	 ERIS_TOKEN: string;
	 MONGO_URI: string;
	 APP_NAME: string; */
}

function checkFilesAreIdentical(path: string, pathToTemplate: string) {
	const file = getFromCachedFiles([path]).find(x => !x.path.includes('@botoron')) as cachedFile
	const template = getFromCachedFiles([pathToTemplate])[0] as cachedFile

	if (withoutSlash_r_n(file.content) === withoutSlash_r_n(template.content)) { return }

	addToErrors(path, 'File should be identical to the one at ' + pathToTemplate)
	function withoutSlash_r_n(content: string) { return content.replace(/\r|\n/g, '') } //regexHere
}

/**Check the structure of the project */
function checkFilesAndFolderStructure() {

	const currentFilesAndFolders = getFilesAndFoldersNames('.', null)

	const desiredFilesAndFolders = [
		SERVER_EVENTS_TS, SERVER_REF_TS, './server/__socketOnAdmin.ts', './server/fns.ts', './server/init.ts', './server/login.ts', //server files
		ESLINT_CJS, GITIGNORE, TSCONFIG_JSON, './.env', './.git', './package-lock.json', './package.json', './TODO.md', //solo-files
		'./dev/checks.ts', './dev/commands.ts',  //2. extend btr's checks, 1. run dev commands
		GLOBAL_VARS_TS, GLOBAL_FNS_TS,  //functions and constants for both server and client
		TYPES_IO_TS, TYPES_Z_TS, './types/types.d.ts',  //types and schemas
		'./test',	//file for testing transpiled files pre-building

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
			addToErrors(path, `Local import(${match}) is missing .js at the end`)
		})
	})
}

function checkLoginTsEmitsInitData() {
	checkMatchInSpecificFile('./server/login.ts', 'socket.emit(\'initData\',')
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
			dev: z.literal('tsc --target esnext dev/commands.ts --outDir ./dev/transpiled & node dev/transpiled/dev/commands.js'),
			git: z.literal('npm run npmScript --command_project=git'),
			localtunnel: z.literal('lt --port 5173'),
			nodemon: z.literal('nodemon test/server/init.js'),
			npmScript: z.literal('node node_modules/@botoron/utils/npmRun.js'),
			start: z.literal('node test/server/init.js'),
			test: z.literal('ts-node-esm --transpileOnly test.ts'),
			transpile: z.literal('npm run npmScript --command_project=transpile'),
			vue: z.literal('cd client & npm run dev'),
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
			'eslint-plugin-sonarjs': z.string(),
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
			'\tsocket.onAny(args => ref.debugLog(\'logSocketOnAny\', { args }))',
			'\tref.debugLog(\'logWhenSocketConnects\', { id: x.id })',
		]),
		'export const ioInitialized = true'
	].forEach(line => checkMatchInSpecificFile(SERVER_EVENTS_TS, line))
}

/**Check the properties and initialization of server/ref.ts */
function checkServerRefTs() {
	[
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
	].forEach(line => checkMatchInSpecificFile(SERVER_REF_TS, line))
}

/**Check all socket events are handled aka socket.on(<EVENTNAME>) */
function checkSocketEvents() {
	const filepath = TYPES_IO_TS
	const linesInTypesIo = (getFromCachedFiles([filepath])[0] as cachedFile).content.split('\n')
	checkSocketOnOfInterface('ServerToClientEvents', CLIENT_SRC_SOCKET)
	checkSocketOnOfInterface('ClientToServerEvents', SERVER_EVENTS_TS)

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
	[serverTsFiles, clientTsFiles, clientVueFiles].flat().
		forEach(file => {
			const { path, content } = file
			const wantedMatch = `logInitialization('${path}')`
			if (!content.includes(wantedMatch)) { addToErrors(path, `"${surroundedString(wantedMatch, ' ', 10)}" is missing`) }
		})
}

function checkSpecificMatchesInAppVue() {
	[
		asConsecutiveLines([
			'<template>',
			'\t<b-container id="app" class="justify-content-center" v-cloak>',
			'',
			'\t\t<b-alert style="margin-top: 10px; z-index:200" v-model="globalAlert.show" variant="warning" dismissible>',
			'\t\t\t<br>',
			'\t\t\t<div style="border-bottom: 1px solid #333;"></div>',
			'\t\t\t<h1>{{ globalAlert.message }}</h1>',
			'\t\t\t<div style="border-bottom: 1px solid #333;"></div>',
			'\t\t\t<br>',
			'\t\t</b-alert>'
		])
	].forEach(x => checkMatchInSpecificFile(CLIENT_SRC + '/App.vue', x))
}

function checkSpecificMatchesGlobalFnsTs() {
	checkMatchInSpecificFile(GLOBAL_FNS_TS, asConsecutiveLines([
		'/**Shorthand for mongoClient.db(DATABASE).collection(COLLECTION) */',
		'export function mongoCollection(name: validMongoCollection) { return mongoClient.db('
	])) //) <--to not mess with colours)
}

function checkSpecificMatchesInTypesIoTs() {
	[
		asConsecutiveLines([
			'import { Server, Socket as socket_server } from \'socket.io\'',
			'import { Socket as socket_client } from \'socket.io-client\'',
			'import { getStartedHttpServer } from \'@botoron/utils\'',
			'',
			'export type socket_s2c_event = keyof ServerToClientEvents',
			'export interface ServerToClientEvents {',
			'\tglobalAlert: (alert: globalAlert) => void',
			'\tcommandResult: (commandUsed: string, result: unknown) => void',
		]),
		'\tinitData:',
		'\ttoast:',
		asConsecutiveLines([
			'export type socket_c2s_event = keyof ClientToServerEvents',
			'export interface ClientToServerEvents {',
			'\tadmin: (adminKey: string, command: validAdminCommand) => void',
			''
		]),
		asConsecutiveLines([
			'export type clientSocket = socket_client<ServerToClientEvents, ClientToServerEvents>',
			'export const io = new Server<ClientToServerEvents, ServerToClientEvents>(getStartedHttpServer(), { cors: { origin: \'*\' } })',
			'export type serverSocket = socket_server<ClientToServerEvents, ServerToClientEvents, object, {',
		])
	].forEach(event => checkMatchInSpecificFile(TYPES_IO_TS, event))
}

function checkSpecificMatchesInTypesTs() {
	[
		asConsecutiveLines([
			'/**imported from utils */',
			'declare global {',
			'\ttype adminFetch = btr_adminFetch',
			'\ttype bvModal = btr_bvModal',
			'\ttype fieldsForColumnOfTable = btr_fieldsForColumnOfTable',
			'\ttype globalAlert = btr_globalAlert',
			'\ttype language = btr_language',
			'\ttype newToastFn = btr_newToastFn',
			'\ttype socketEventInfo = btr_socketEventInfo',
			'\ttype trackedVueComponent = btr_trackedVueComponent',
			'\ttype validVariant = btr_validVariant',
			'}'
		]),
		asConsecutiveLines([
			'/**infered from zod */',
			'declare global'
		]),
		'type validAdminCommand = z.infer<typeof zValidAdminCommands>',
		asConsecutiveLines([
			'/**exclusive to this project */',
			'declare global'
		]),
		'type mongoMisc = { adminKey: string, pageVisits: number',
		'type validModalId = \'modal-',
		'type validMongoCollection = \'misc\'',
		'type validView = \'admin\' |',
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

function externalTemplatePath(filename: string) {
	return '../../_templateFiles/' + filename
}

async function fillCachedFiles() {
	const vueTemplates = ['admin', 'simpleConfirmationModal'].map(x => externalTemplatePath(`__${x}.vue`))
	const tsTemplates = ['chartJs', 'socketOnAdmin'].map(x => externalTemplatePath(`__${x}.ts`))
	const nodeModulesVueTsConfig = './client/node_modules/@vue/tsconfig/tsconfig.json'
	const clientVueFilePaths = getFilesAndFoldersNames(CLIENT_SRC, '.vue')
	const clientTsFilePaths = getFilesAndFoldersNames(CLIENT_SRC, '.ts')
	const serverTsFilePaths = getFilesAndFoldersNames('./server', '.ts')
	const typeFilePaths = getFilesAndFoldersNames('./types', '.ts')
	const globalFiles = getFilesAndFoldersNames('./global', '.ts')
	const tsConfigs = [inBtrUtils(TSCONFIG_JSON), TSCONFIG_JSON]
	const eslintConfigs = [inBtrUtils(ESLINT_CJS), ESLINT_CJS]
	const devFiles = getFilesAndFoldersNames('./dev', '.ts')

	await fillCachedFilesVar()
	fillCachedFileGroups()

	async function fillCachedFilesVar() {
		cachedFiles.push(...await getCachedFiles(errors, [
			clientTsFilePaths, clientVueFilePaths, devFiles, eslintConfigs, GITIGNORE, globalFiles,
			GLOBAL_VARS_TS, nodeModulesVueTsConfig, serverTsFilePaths, tsConfigs, typeFilePaths,
			tsTemplates.flat(), vueTemplates.flat(),
			['env.d.ts', 'tsconfig.config.json', 'tsconfig.json', 'vite.config.ts', 'vue.config.js'].
				map(x => ['./client/' + x, './node_modules/@botoron/utils/templateFiles/' + x]).flat()
		].flat()))
	}

	function fillCachedFileGroups() {
		clientVueFiles.push(...getFromCachedFiles([CLIENT_SRC, '.vue']))
		clientTsFiles.push(...getFromCachedFiles([CLIENT_SRC, '.ts']))
		serverTsFiles.push(
			...getFromCachedFiles(['./dev/commands.ts']),
			...getFromCachedFiles([GLOBAL_FNS_TS]),
			...getFromCachedFiles(['./server', '.ts']),
			...getFromCachedFiles([TYPES_Z_TS]),
		)
	}
}

function getFromCachedFiles(obligatoryMatches: string[]): cachedFile[] {
	const foundFiles = cachedFiles.filter(file => obligatoryMatches.every(match => file.path.includes(match)))
	if (foundFiles.length) { return foundFiles }
	addToErrors(
		'checks.getFromCachedFiles',
		`No file cached with the requested obligatory matches(${obligatoryMatches}) was found, was it added by "fillCachedFiles" ?`
	)
	return [{ path: 'FAILSAFE', content: '' }]
}

function zodCheck_toErrors<T>(path: string, schema: zSchema<T>, data: T) {
	zodCheck_curry((e: string) => addToErrors(path, e))(schema, data)
}