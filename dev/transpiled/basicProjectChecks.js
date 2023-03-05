"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicProjectChecks = void 0;
let _;
const zod_1 = require("zod");
_;
_;
const constants_js_1 = require("./constants.js");
_;
const btr_js_1 = require("./btr.js");
let DEV_OR_PROD = (0, btr_js_1.nullAs)();
const errors = [];
const cachedFiles = [];
const clientVueFiles = [];
const clientTsFiles = [];
const serverTsFiles = [];
async function basicProjectChecks() {
    DEV_OR_PROD = (0, btr_js_1.getEnviromentVariables)().DEV_OR_PROD;
    await fillCachedFiles();
    await checkUtilsVersion();
    await checkPackageJsons();
    await checkVueDevFiles();
    await checkVsCodeSettings();
    //1. Obligatory project structure
    checkFilesAndFolderStructure();
    checkObligatoryTemplateFilesAreIdentical();
    //2. Obligatory specific-files matches
    checkSpecificMatches_AppVue();
    checkSpecificMatches_clientIndexTs();
    checkSpecificMatches_clientSocketTs();
    checkSpecificMatches_clientStoreTs();
    checkSpecificMatches_globalFnsTs();
    checkSpecificMatches_typesIoTs();
    checkSpecificMatches_typesTypesTs();
    checkSpecificMatches_serverEventsTs();
    checkSpecificMatches_serverInitTs();
    checkSpecificMatches_serverLoginTs();
    checkSpecificMatches_serverRefTs();
    checkBasicValidAdminCommands();
    //3. Help prevent bugs
    checkClientFilesDontReferenceLocalStorageDirectly();
    checkEnviromentVariables();
    checkImportsAreFromTheRightBtrFile();
    checkLocalImportsHaveJsExtention();
    checkSocketEvents();
    checkGitIgnore();
    //4. Preferences
    checkAllExportedFunctionsAreDescribed();
    checkServerAndClientFilesLogTheirInitialization();
    checkTrackabilityAndStyleScopeOfVueFiles();
    //5. Warnings
    const warningsCount = { count: 0 };
    (0, btr_js_1.checkCodeThatCouldBeUpdated)([serverTsFiles, clientTsFiles, clientVueFiles].flat(), warningsCount);
    //6. The Answer
    return (0, btr_js_1.checkNoBtrErrorsOrWarnings)(errors, warningsCount);
}
exports.basicProjectChecks = basicProjectChecks;
function zodCheck_toErrors(path, schema, data) { (0, btr_js_1.zodCheck_curry)((e) => addToErrors(path, e))(schema, data); }
function checkSpecificMatches_serverLoginTs() { checkMatchInSpecificFile('./server/login.ts', 'socket.emit(\'initData\','); }
function externalTemplatePath(filename) { return '../../_templateFiles/' + filename; }
function addToErrors(path, error) { errors.push(`(at ${path}): ${error}`); }
function inBtrUtils(path) { return './node_modules/@botoron/utils/' + path; }
function asConsecutiveLines(lines) { return lines.join('\r\n'); }
function checkBasicValidAdminCommands() {
    checkMatchInSpecificFile(constants_js_1.GLOBAL_VARS_TS, 'export const adminCommands = [\'getSockets\', \'help\', \'ref\',');
    checkMatchInSpecificFile(constants_js_1.TYPES_Z_TS, 'export const zValidAdminCommands = z.enum(adminCommands)');
}
/**Check all the top-level functions in main .ts server files have a description */
function checkAllExportedFunctionsAreDescribed() {
    if (DEV_OR_PROD !== 'DEV') {
        return true;
    }
    serverTsFiles.forEach(file => {
        const lines = file.content.split('\n');
        const uncommentedTopLevelFunctions = lines.reduce((acc, line, index) => {
            const isTopLevelFunction = /^export (async|function)/.test(line); //regexHere
            if (!isTopLevelFunction) {
                return acc;
            }
            const isCommented = /\*\//.test(lines[index - 1]);
            if (isCommented) {
                return acc;
            }
            acc.push(line.slice(0, line.length - 5).replace(/(export ){0,}(async |function |\(.{1,})/g, '')); //regexHere
            return acc;
        }, []);
        if (!uncommentedTopLevelFunctions.length) {
            return;
        }
        addToErrors(file.path, `Uncommented exported functions [${uncommentedTopLevelFunctions.join(', ')}]`);
    });
}
function checkClientFilesDontReferenceLocalStorageDirectly() {
    [clientTsFiles, clientVueFiles].flat().forEach(file => {
        const { path, content } = file;
        if (!content.includes('localStorage.')) {
            return;
        }
        addToErrors(path, 'use updateStoreAndLocalStorageKey (with updateStoreAndLocalStorageKey) instead of referencing localStorage directly');
    });
}
/**Check if all the desired enviroment keys are defined */
function checkEnviromentVariables() {
    const myEnv = (0, btr_js_1.pick)((0, btr_js_1.getEnviromentVariables)(), ['ADMIN_PASSWORD', 'APP_NAME', 'DEV_OR_PROD', 'ERIS_TOKEN', 'MONGO_URI', 'PORT']);
    (0, btr_js_1.zodCheck_curry)((error) => addToErrors('.env', error))(constants_js_1.zMyEnv, myEnv);
    /* DEV_OR_PROD: "DEV" | "PROD";
     ADMIN_PASSWORD: string;
     PORT: "3000";
     ERIS_TOKEN: string;
     MONGO_URI: string;
     APP_NAME: string; */
}
function checkFilesAreIdentical(path, pathToTemplate) {
    const file = getFromCachedFiles([path]).find(x => !x.path.includes('@botoron'));
    const template = getFromCachedFiles([pathToTemplate])[0];
    if (withoutSlash_r_n(file.content) === withoutSlash_r_n(template.content)) {
        return;
    }
    addToErrors(path, 'File should be identical to the one at ' + pathToTemplate);
    function withoutSlash_r_n(content) { return content.replace(/\r|\n/g, ''); } //regexHere
}
/**Check the structure of the project */
function checkFilesAndFolderStructure() {
    const currentFilesAndFolders = (0, btr_js_1.getFilesAndFoldersNames)('.', null);
    const desiredFilesAndFolders = [
        constants_js_1.SERVER_EVENTS_TS, constants_js_1.SERVER_REF_TS, './server/__socketOnAdmin.ts', './server/fns.ts', './server/init.ts', './server/login.ts',
        constants_js_1.ESLINT_CJS, constants_js_1.GITIGNORE, constants_js_1.TSCONFIG_JSON, './.env', './.git', './package-lock.json', './package.json', './TODO.md',
        './dev/checks.ts', './dev/commands.ts',
        constants_js_1.GLOBAL_VARS_TS, constants_js_1.GLOBAL_FNS_TS,
        constants_js_1.TYPES_IO_TS, constants_js_1.TYPES_Z_TS, './types/types.d.ts',
        './test',
        './client/env.d.ts', './client/index.html', './client/node_modules', './client/package-lock.json', './client/package.json',
        './client/tsconfig.config.json', './client/tsconfig.json', './client/vite.config.ts', './client/vue.config.js',
        constants_js_1.CLIENT_SRC_SOCKET, './client/src/App.vue', './client/src/assets', './client/src/index.ts', './client/src/store.ts', //client files
    ];
    const { missingItems } = (0, btr_js_1.compareArrays)(desiredFilesAndFolders, currentFilesAndFolders);
    if (!missingItems.length) {
        return;
    }
    addToErrors('checks.checkFilesAndFolderStructure', `The following files/directories are missing: [${missingItems.join(', ')}]`);
}
/**Check all files/folders that should be ignored by default are so */
function checkGitIgnore() {
    const currentIgnores = getFromCachedFiles([constants_js_1.GITIGNORE])[0].content.split('\r\n');
    const desiredIgnores = ['.env', 'client/node_modules', 'node_modules', 'test/*'];
    const missingItems = (0, btr_js_1.compareArrays)(desiredIgnores, currentIgnores).missingItems;
    if (missingItems.length) {
        addToErrors('.gitignore', `Must include the following: [${missingItems.join(', ')}]`);
    }
}
function checkImportsAreFromTheRightBtrFile() {
    [clientTsFiles, clientVueFiles].flat().forEach(file => doCheck('client', file));
    serverTsFiles.forEach(file => doCheck('server', file));
    function doCheck(filetype, file) {
        const { path, content } = file;
        if (!content.includes('@botoron/utils')) {
            return;
        }
        if (filetype === 'server' && content.includes('@botoron/utils/client')) {
            return addToErrors(path, 'Server file should not be exporting from @botoron/utils/client');
        }
        if (filetype === 'client' && !content.includes('@botoron/utils/client/btr.js')) {
            return addToErrors(path, 'Client file should be exporting from @botoron/utils/client/btr.js');
        }
    }
}
function checkLocalImportsHaveJsExtention() {
    [serverTsFiles, clientTsFiles, clientVueFiles].flat().forEach(file => {
        const { path, content } = file;
        const localImports = content.match(/from '\..{1,}/g); //regexHere
        if (!localImports) {
            return;
        }
        localImports.forEach(match => {
            if (match.includes('.js\'')) {
                return;
            }
            if (match.includes('.vue\'')) {
                return;
            }
            addToErrors(path, `Local import(${match}) is missing .js at the end`);
        });
    });
}
function checkMatchInSpecificFile(filepath, wantedMatch) {
    const { content } = getFromCachedFiles([filepath])[0];
    if (!content.includes(wantedMatch)) {
        addToErrors(filepath, `"${(0, btr_js_1.surroundedString)(wantedMatch, ' ', 10)}" is missing)`);
    }
}
function checkObligatoryTemplateFilesAreIdentical() {
    checkFilesAreIdentical(constants_js_1.ESLINT_CJS, inBtrUtils(constants_js_1.ESLINT_CJS));
    checkFilesAreIdentical(constants_js_1.TSCONFIG_JSON, inBtrUtils(constants_js_1.TSCONFIG_JSON));
    const obligatoryClientSrcFiles = ['__admin.vue', '__chartJs.ts', '__simpleConfirmationModal.vue'];
    obligatoryClientSrcFiles.forEach(filename => checkFilesAreIdentical(constants_js_1.CLIENT_SRC + '/' + filename, externalTemplatePath(filename)));
}
/**Check the scripts in a project's package json all fit the established schema */
async function checkPackageJsons() {
    const packageJsonOfProjectRoot = await (0, btr_js_1.importFileFromProject)('package', 'json');
    const packageJsonOfProjectClient = await (0, btr_js_1.importFileFromProject)('client/package', 'json');
    const desiredPackageJsonClientSchema = zod_1.z.object({
        name: zod_1.z.string(),
        version: zod_1.z.string(),
        devDependencies: zod_1.z.object({}),
        scripts: zod_1.z.object({
            dev: zod_1.z.literal('vite'),
            build: zod_1.z.literal('vite build --emptyOutDir')
        }).strict(),
        dependencies: zod_1.z.object({
            'bootstrap-vue': zod_1.z.string(),
            'chart.js': zod_1.z.string(),
            'chartjs-adapter-date-fns': zod_1.z.string(),
            'date-fns': zod_1.z.string(),
            pinia: zod_1.z.string(),
            vue: zod_1.z.string(),
            'vue-chartjs': zod_1.z.string(),
        }),
    });
    const desiredPackageJsonRootSchema = zod_1.z.object({
        name: zod_1.z.string().regex(...(0, btr_js_1.zRegexGenerator)(/-(src|dist)$/, false)),
        author: zod_1.z.literal('BoToRon'),
        description: zod_1.z.string().min(10),
        license: zod_1.z.literal('ISC'),
        main: zod_1.z.literal('test/server/init.js'),
        type: zod_1.z.literal('module'),
        version: zod_1.z.string(),
        engines: zod_1.z.object({ node: zod_1.z.literal('>=18.0.0') }).strict(),
        dependencies: (0, btr_js_1.zRecord)(['@botoron/utils', 'socket.io', 'socket.io-client', 'zod-validation-error'], zod_1.z.string()),
        devDependencies: (0, btr_js_1.zRecord)(['@types/express', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser',
            'dotenv', 'eslint', 'eslint-plugin-sonarjs', 'eslint-plugin-vue', 'inquirer', 'nodemon'], zod_1.z.string()),
        scripts: zod_1.z.object({
            dev: zod_1.z.literal(`tsc ${constants_js_1.TSC_FLAGS} dev/commands.ts --outDir ./dev/transpiled & node dev/transpiled/dev/commands.js`), //@btr-ignore
        }).strict(),
    });
    zodCheck_toErrors('./client/package.json', desiredPackageJsonClientSchema, packageJsonOfProjectClient);
    zodCheck_toErrors('./package.json', desiredPackageJsonRootSchema, packageJsonOfProjectRoot);
}
/**Check all socket events are handled aka socket.on(<EVENTNAME>) */
function checkSocketEvents() {
    const filepath = constants_js_1.TYPES_IO_TS;
    const linesInTypesIo = getFromCachedFiles([filepath])[0].content.split('\n');
    checkSocketOnOfInterface('ServerToClientEvents', constants_js_1.CLIENT_SRC_SOCKET);
    checkSocketOnOfInterface('ClientToServerEvents', constants_js_1.SERVER_EVENTS_TS);
    function checkSocketOnOfInterface(nameOfInterface, pathToHandlingFile) {
        const handlingFile = getFromCachedFiles([pathToHandlingFile])[0].content;
        let isKeyOfWantedInterface = false;
        linesInTypesIo.forEach(line => {
            if (line.includes(`export interface ${nameOfInterface}`)) {
                isKeyOfWantedInterface = true;
                return;
            }
            if (/^\}/.test(line)) {
                isKeyOfWantedInterface = false;
            } //"{"" <-- here so it doesn't mess with the color of brackets //regexHere
            if (!isKeyOfWantedInterface) {
                return;
            }
            if (!/^\t\w/.test(line)) {
                return;
            } //regexHere
            const event = (line.match(/(?<=\t)\w{1,}/) || [''])[0]; //regexHere
            if (handlingFile.includes(`socket.on('${event}'`)) {
                return;
            }
            errors.push(`${nameOfInterface}'s " ${event} " is declared but not handled in ${pathToHandlingFile}`);
        });
    }
}
function checkServerAndClientFilesLogTheirInitialization() {
    [serverTsFiles, clientTsFiles, clientVueFiles].flat().
        forEach(file => {
        const { path, content } = file;
        const wantedMatch = `logInitialization('${path}')`;
        if (!content.includes(wantedMatch)) {
            addToErrors(path, `"${(0, btr_js_1.surroundedString)(wantedMatch, ' ', 10)}" is missing`);
        }
    });
}
function checkSpecificMatches_AppVue() {
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
    ].forEach(x => checkMatchInSpecificFile(constants_js_1.CLIENT_SRC + '/App.vue', x));
}
function checkSpecificMatches_clientIndexTs() {
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
    ].forEach(x => checkMatchInSpecificFile(constants_js_1.CLIENT_SRC + '/index.ts', x));
}
function checkSpecificMatches_clientSocketTs() {
    [
        asConsecutiveLines([
            'export const socket: clientSocket = import.meta.env.PROD ? io() : io(\'http://localhost:3000/\')',
            'socket.on(\'globalAlert\', globalAlert => useStore().globalAlert = globalAlert)',
            'socket.on(\'initData\','
        ])
    ].forEach(x => checkMatchInSpecificFile(constants_js_1.CLIENT_SRC_SOCKET, x));
}
function checkSpecificMatches_clientStoreTs() {
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
    ].forEach(x => checkMatchInSpecificFile('./client/src/store.ts', x));
}
function checkSpecificMatches_serverEventsTs() {
    [
        asConsecutiveLines([
            'io.on(\'connection\', x => {',
            '\tconst socket = x as serverSocket',
            '\tref.DB_misc.updateOne({}, { $inc: { pageVisits: 1 } }).then(() => ref.pageVisits++) //@btr-ignore',
            '\tsocket.onAny(args => ref.debugLog(\'logSocketOnAny\', { args }))',
            '\tref.debugLog(\'logWhenSocketConnects\', { id: x.id })',
        ]),
        'export const ioInitialized = true'
    ].forEach(line => checkMatchInSpecificFile(constants_js_1.SERVER_EVENTS_TS, line));
}
function checkSpecificMatches_globalFnsTs() {
    checkMatchInSpecificFile(constants_js_1.GLOBAL_FNS_TS, asConsecutiveLines([
        '/**Shorthand for mongoClient.db(DATABASE).collection(COLLECTION) */',
        'export function mongoCollection(name: validMongoCollection) { return mongoClient.db('
    ])); //) <--to not mess with colours)
}
function checkSpecificMatches_serverInitTs() {
    checkMatchInSpecificFile('./server/init.ts', 'successLog(stringify({ refInitialized: true, ioInitialized }))');
}
/**Check the properties and initialization of server/ref.ts */
function checkSpecificMatches_serverRefTs() {
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
    ].forEach(line => checkMatchInSpecificFile(constants_js_1.SERVER_REF_TS, line));
}
function checkSpecificMatches_typesIoTs() {
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
    ].forEach(event => checkMatchInSpecificFile(constants_js_1.TYPES_IO_TS, event));
}
function checkSpecificMatches_typesTypesTs() {
    [
        asConsecutiveLines([
            '/**imported from utils */',
            'declare global {',
            '\ttype adminFetch = btr_adminFetch',
            '\ttype bvModal = btr_bvModal',
            '\ttype commands = btr_commands',
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
    ].forEach(x => checkMatchInSpecificFile('./types/types.d.ts', x));
}
/**Check all the vue components are trackable by the window */
function checkTrackabilityAndStyleScopeOfVueFiles() {
    if (DEV_OR_PROD !== 'DEV') {
        return true;
    }
    clientVueFiles.forEach(file => {
        [
            asConsecutiveLines([
                'export default defineComponent({',
                '\tmounted() {',
                `\t\ttrackVueComponent('${filepathToComponentName()}', this as never, window as never)`
            ]),
            '<style scoped>'
        ].forEach(wantedMatch => checkMatchInSpecificFile(file.path, wantedMatch));
        function filepathToComponentName() { return file.path.replace(/\.\/client\/src\/_?/, '').replace('.vue', ''); }
    });
}
/**Check if the project is using the latest version of "myUtils" */
async function checkUtilsVersion() {
    const latestVersion = await getLatestVersion();
    const installedVersion = (await Promise.resolve().then(() => __importStar(require('./package.json')))).default.version;
    const isOutdated = versionValue(latestVersion) > versionValue(installedVersion);
    if (isOutdated) {
        (0, btr_js_1.killProcess)(`Outdated "utils" package. (${installedVersion} vs ${latestVersion}) PLEASE UPDATE: npm run btr`);
    }
    /**Check if the project is using the latest version of "@botoron/utils" */
    async function getLatestVersion() {
        const fetched = await (await fetch('http://registry.npmjs.com/-/v1/search?text=@botoron/utils&size=1')).json();
        const response = fetched || { objects: [{ package: { version: '0' } }] };
        return response.objects[0].package.version;
    }
    function versionValue(version) {
        const [major, minor, patch] = version.split('.').map(x => Number(x));
        return (major * 99 * 99) + (minor * 99) + patch;
    }
}
async function checkVsCodeSettings() {
    const vsSettingsOfProject = await (0, btr_js_1.importFileFromProject)('.vscode/settings', 'json');
    const desiredVsSettings = zod_1.z.object({
        'dotenv.enableAutocloaking': zod_1.z.literal(true),
        'peacock.color': zod_1.z.string(),
        'typelens.unusedcolor': zod_1.z.literal('#f44'),
        'workbench.colorCustomizations': zod_1.z.object({}),
    });
    zodCheck_toErrors('.vscode/settings.json', desiredVsSettings, vsSettingsOfProject);
}
/**Turn off that damn skipLibCheck that comes on by default */
async function checkVueDevFiles() {
    if (DEV_OR_PROD !== 'DEV') {
        return true;
    }
    await Promise.all(['env.d.ts', 'tsconfig.config.json', 'tsconfig.json', 'vite.config.ts', 'vue.config.js'].map(filename => {
        const fullpath = './client/' + filename;
        const pathToTemplate = 'node_modules/@botoron/utils/templateFiles/' + filename;
        return checkFilesAreIdentical(fullpath, pathToTemplate);
    }));
}
async function fillCachedFiles() {
    const vueTemplates = ['admin', 'simpleConfirmationModal'].map(x => externalTemplatePath(`__${x}.vue`));
    const tsTemplates = ['chartJs', 'socketOnAdmin'].map(x => externalTemplatePath(`__${x}.ts`));
    const nodeModulesVueTsConfig = './client/node_modules/@vue/tsconfig/tsconfig.json';
    const clientVueFilePaths = (0, btr_js_1.getFilesAndFoldersNames)(constants_js_1.CLIENT_SRC, '.vue');
    const clientTsFilePaths = (0, btr_js_1.getFilesAndFoldersNames)(constants_js_1.CLIENT_SRC, '.ts');
    const serverTsFilePaths = (0, btr_js_1.getFilesAndFoldersNames)('./server', '.ts');
    const typeFilePaths = (0, btr_js_1.getFilesAndFoldersNames)('./types', '.ts');
    const globalFiles = (0, btr_js_1.getFilesAndFoldersNames)('./global', '.ts');
    const tsConfigs = [inBtrUtils(constants_js_1.TSCONFIG_JSON), constants_js_1.TSCONFIG_JSON];
    const eslintConfigs = [inBtrUtils(constants_js_1.ESLINT_CJS), constants_js_1.ESLINT_CJS];
    const devFiles = (0, btr_js_1.getFilesAndFoldersNames)('./dev', '.ts');
    await fillCachedFilesVar();
    fillCachedFileGroups();
    async function fillCachedFilesVar() {
        cachedFiles.push(...await (0, btr_js_1.getCachedFiles)(errors, [
            clientTsFilePaths, clientVueFilePaths, devFiles, eslintConfigs, constants_js_1.GITIGNORE, globalFiles,
            constants_js_1.GLOBAL_VARS_TS, nodeModulesVueTsConfig, serverTsFilePaths, tsConfigs, typeFilePaths,
            tsTemplates.flat(), vueTemplates.flat(),
            ['env.d.ts', 'tsconfig.config.json', 'tsconfig.json', 'vite.config.ts', 'vue.config.js'].
                map(x => ['./client/' + x, './node_modules/@botoron/utils/templateFiles/' + x]).flat()
        ].flat()));
    }
    function fillCachedFileGroups() {
        clientVueFiles.push(...getFromCachedFiles([constants_js_1.CLIENT_SRC, '.vue']));
        clientTsFiles.push(...getFromCachedFiles([constants_js_1.CLIENT_SRC, '.ts']));
        serverTsFiles.push(...getFromCachedFiles(['./dev/commands.ts']), ...getFromCachedFiles([constants_js_1.GLOBAL_FNS_TS]), ...getFromCachedFiles(['./server', '.ts']), ...getFromCachedFiles([constants_js_1.TYPES_Z_TS]));
    }
}
function getFromCachedFiles(obligatoryMatches) {
    const foundFiles = cachedFiles.filter(file => obligatoryMatches.every(match => file.path.includes(match)));
    if (foundFiles.length) {
        return foundFiles;
    }
    addToErrors('checks.getFromCachedFiles', `No file cached with the requested obligatory matches(${obligatoryMatches}) was found, was it added by "fillCachedFiles" ?`);
    return [{ path: 'FAILSAFE', content: '' }];
}
