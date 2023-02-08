let _;
import fs from 'fs';
_;
import { z } from 'zod';
_;
_;
import { getCachedFiles, checkCodeThatCouldBeUpdated, compareArrays, getEnviromentVariables, importFileFromProject, nullAs, successLog, surroundedString, zodCheck_curry, zRegexGenerator } from './btr.js';
_;
import { CLIENT_SRC, CLIENT_SRC_SOCKET, ESLINT_CJS, GITIGNORE, GLOBAL_VARS, SERVER_EVENTS_TS, SERVER_REF_TS, TSCONFIG_JSON, TYPES_IO_TS, TYPES_Z_TS, zMyEnv } from './constants/constants.js';
_;
function zodCheck_toErrors(path, schema, data) { zodCheck_curry((e) => addToErrors(path, e))(schema, data); }
function addToErrors(path, error) { errors.push(`(at ${path}): ${error}`); }
function inBtrUtils(path) { return './node_modules/@botoron/utils/' + path; }
let errorHandler = nullAs();
let DEV_OR_PROD = nullAs();
const errors = [];
const cachedFiles = [];
const clientVueFiles = [];
const clientTsFiles = [];
const serverTsFiles = [];
/** Check the version of @botoron/utils, the enviroment variables and various config files */
export async function basicProjectChecks(errHandler) {
    errorHandler = errHandler;
    DEV_OR_PROD = getEnviromentVariables().DEV_OR_PROD;
    await fillCachedFiles();
    clientVueFiles.push(...getFromCachedFiles([CLIENT_SRC, '.vue']));
    clientTsFiles.push(...getFromCachedFiles([CLIENT_SRC, '.ts']));
    serverTsFiles.push(...getFromCachedFiles(['./server', '.ts']));
    await allChecks();
    errors.length ? errorHandler('\n\n' + errors.join('\n\n') + '\n\n') : successLog('all basicProjectChecks passed');
    return !errors.length;
    function allChecks() {
        checkBasicValidAdminCommands();
        checkClientFilesDontReferenceLocalStorageDirectly();
        checkClientIndexTs();
        checkClientSocketTs();
        checkClientStoreTs();
        checkEnviromentVariables();
        checkFilesAndFolderStructure();
        checkFilesAreIdentical(ESLINT_CJS, inBtrUtils(ESLINT_CJS));
        checkFilesAreIdentical(TSCONFIG_JSON, inBtrUtils(TSCONFIG_JSON));
        checkGitIgnore();
        checkImportsAreFromTheRightBtrFile();
        checkInitTsCallsRefTsAndIoTs();
        checkLocalImportsHaveJsExtention();
        checkServerEventsTs();
        checkServerRefTs();
        checkSocketEvents();
        checkServerAndClientFilesLogTheirInitialization();
        checkSpecificMatchesInTypesIoTs();
        checkSpecificMatchesInTypesTs();
        return Promise.all([
            checkAllExportedFunctionsAreDescribed(),
            checkCodeThatCouldBeUpdated([serverTsFiles, clientTsFiles, clientVueFiles].flat()),
            checkPackageJsons(),
            checkStructureAndMatchesOfVueFiles(),
            checkUtilsVersion(),
            checkVsCodeSettings(),
            checkVueDevFiles(),
        ]);
    }
}
function asConsecutiveLines(lines) {
    return lines.join('\r\n');
}
function checkBasicValidAdminCommands() {
    checkMatchInSpecificFile(GLOBAL_VARS, 'export const adminCommands = [\'getSockets\', \'help\', \'ref\',');
    checkMatchInSpecificFile(TYPES_Z_TS, 'export const zValidAdminCommands = z.enum(adminCommands)');
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
/**Check all the vue components are trackable by the window */
function checkStructureAndMatchesOfVueFiles() {
    if (DEV_OR_PROD !== 'DEV') {
        return true;
    }
    clientVueFiles.forEach(file => {
        [
            asConsecutiveLines([
                'export default defineComponent({',
                `\tmounted() { trackVueComponent('${filepathToComponentName()}', this as never, window as never) },`
            ]),
            '<style scoped>'
        ].forEach(wantedMatch => checkMatchInSpecificFile(file.path, wantedMatch));
        function filepathToComponentName() { return file.path.replace(/\.\/client\/src\/_?/, '').replace('.vue', ''); }
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
            'import { clientSocketLongOnAny, getAppLog, logInitialization, newToast_client_curry } from \'@botoron/utils/client/btr.js\'',
            '_',
            'logInitialization(\'./client/src/index.ts\')',
            '',
            '//components',
            'import admin from \'./_admin.vue\''
        ]),
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
            'if (import.meta.env.DEV) { clientSocketLongOnAny(useStore) }',
            'getAppLog(window as never, useStore as never)',
            'useStore().login()',
        ])
    ].forEach(x => checkMatchInSpecificFile(CLIENT_SRC + '/index.ts', x));
}
function checkClientSocketTs() {
    [
        asConsecutiveLines([
            'export const socket: clientSocket = import.meta.env.PROD ? io() : io(\'http://localhost:3000/\')',
            'socket.on(\'globalAlert\', globalAlert => useStore().globalAlert = globalAlert)',
            'socket.on(\'initData\','
        ])
    ].forEach(x => checkMatchInSpecificFile(CLIENT_SRC_SOCKET, x));
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
            '\t\tbvModal: <BvModal>nullAs(),',
            '\t\tnewToast: <newToastFn>nullAs(),',
            '\t\tsocketEvents: [] as socketEventInfo[],',
            '\t\tview: \'main\' as validCurrentViews,',
            '\t\tadminFetch: { command: \'\', data: null } as adminFetch,',
            '\t\tglobalAlert: { message: \'\', show: false } as globalAlert,'
        ]),
        asConsecutiveLines([
            '\t\tupdateStoreAndLocalStorageKey<K extends keyof T, T extends typeof myLocalStorage>(key: K, value: T[K]) {',
            '\t\t\t//@ts-expect-error ts doesn\'t automatically realize all keys of myLocalStorage also are present in useStore()',
            '\t\t\tuseStore()[key] = value; localStorageSet(key, value)',
            '\t\t},'
        ])
    ].forEach(x => checkMatchInSpecificFile('./client/src/store.ts', x));
}
/**Check if all the desired enviroment keys are defined */
function checkEnviromentVariables() {
    zodCheck_curry((error) => addToErrors('.env', error), false)(zMyEnv, getEnviromentVariables());
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
    const currentFilesAndFolders = getFilesAndFoldersNames('.', null);
    const desiredFilesAndFolders = [
        './dev', './test',
        ESLINT_CJS, GITIGNORE, TSCONFIG_JSON, './.env', './.git', './package-lock.json', './package.json', './TODO.md',
        SERVER_EVENTS_TS, SERVER_REF_TS, './server/fns.ts', './server/init.ts',
        GLOBAL_VARS, './global/fns.ts',
        TYPES_IO_TS, TYPES_Z_TS, './types/types.d.ts',
        './client/env.d.ts', './client/index.html', './client/node_modules', './client/package-lock.json', './client/package.json',
        './client/tsconfig.config.json', './client/tsconfig.json', './client/vite.config.ts', './client/vue.config.js',
        CLIENT_SRC_SOCKET, './client/src/App.vue', './client/src/assets', './client/src/index.ts', './client/src/store.ts', //client files
    ];
    const { missingItems } = compareArrays(desiredFilesAndFolders, currentFilesAndFolders);
    if (!missingItems.length) {
        return;
    }
    addToErrors('checks.checkFilesAndFolderStructure', `The following files/directories are missing: [${missingItems.join(', ')}]`);
}
/**Check all files/folders that should be ignored by default are so */
function checkGitIgnore() {
    const currentIgnores = getFromCachedFiles([GITIGNORE])[0].content.split('\r\n');
    const desiredIgnores = ['.env', 'client/node_modules', 'node_modules', 'test/*'];
    const missingItems = compareArrays(desiredIgnores, currentIgnores).missingItems;
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
function checkInitTsCallsRefTsAndIoTs() {
    checkMatchInSpecificFile('./server/init.ts', 'successLog(stringify({ refInitialized: true, ioInitialized }))');
}
function checkLocalImportsHaveJsExtention() {
    [getFromCachedFiles([TYPES_Z_TS])[0], serverTsFiles, clientTsFiles, clientVueFiles].flat().forEach(file => {
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
            addToErrors(path, `Local import(${match}) is missing.js at the end`);
        });
    });
}
function checkMatchInSpecificFile(filepath, wantedMatch) {
    const { content } = getFromCachedFiles([filepath])[0];
    if (!content.includes(wantedMatch)) {
        addToErrors(filepath, `"${surroundedString(wantedMatch, ' ', 10)}" is missing)`);
    }
}
/**Check the scripts in a project's package json all fit the established schema */
async function checkPackageJsons() {
    const packageJsonOfProjectRoot = await importFileFromProject('package', 'json');
    const packageJsonOfProjectClient = await importFileFromProject('client/package', 'json');
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
    });
    const desiredPackageJsonRootSchema = z.object({
        name: z.string().regex(...zRegexGenerator(/-(src|dist)$/, false)),
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
            'eslint-plugin-sonarjs': z.string(),
            'eslint-plugin-vue': z.string(),
            nodemon: z.string(),
        })
    });
    zodCheck_toErrors('./client/package.json', desiredPackageJsonClientSchema, packageJsonOfProjectClient);
    zodCheck_toErrors('./package.json', desiredPackageJsonRootSchema, packageJsonOfProjectRoot);
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
    ].forEach(line => checkMatchInSpecificFile(SERVER_EVENTS_TS, line));
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
            'function mongoCollection(name: string) { return mongoClient.db('
        ])
    ].forEach(line => checkMatchInSpecificFile(SERVER_REF_TS, line));
}
/**Check all socket events are handled aka socket.on(<EVENTNAME>) */
function checkSocketEvents() {
    const filepath = TYPES_IO_TS;
    const linesInTypesIo = getFromCachedFiles([filepath])[0].content.split('\n');
    checkSocketOnOfInterface('ServerToClientEvents', CLIENT_SRC_SOCKET);
    checkSocketOnOfInterface('ClientToServerEvents', SERVER_EVENTS_TS);
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
    [getFromCachedFiles([TYPES_Z_TS])[0], serverTsFiles, clientTsFiles, clientVueFiles].flat().forEach(file => {
        const { path, content } = file;
        const wantedMatch = `logInitialization('${path}')`;
        if (!content.includes(wantedMatch)) {
            addToErrors(path, `"${surroundedString(wantedMatch, ' ', 10)}" is missing`);
        }
    });
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
            '\tinitData: (allPlayersWithVotes: playerWithVotes[]) => void',
            '\tcommandResult: (commandUsed: string, result: unknown) => void',
            '\ttoast: (title: string, message: string, variant: validVariant) => void',
            ''
        ]),
        asConsecutiveLines([
            'export type socket_c2s_event = keyof ClientToServerEvents',
            'export interface ClientToServerEvents {',
            '\tadmin: (adminKey: string, command: string) => void',
            ''
        ]),
        asConsecutiveLines([
            'export type clientSocket = socket_client<ServerToClientEvents, ClientToServerEvents>',
            'export const io = new Server<ClientToServerEvents, ServerToClientEvents>(getStartedHttpServer(), { cors: { origin: \'*\' } })',
            'export interface serverSocket extends socket_server<ClientToServerEvents, ServerToClientEvents, object, object> {'
        ])
    ].forEach(event => checkMatchInSpecificFile(TYPES_IO_TS, event));
}
function checkSpecificMatchesInTypesTs() {
    [
        asConsecutiveLines([
            '/**imported from utils */',
            'declare global {',
            '\ttype adminFetch = btr_adminFetch',
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
        'type validAdminCommands = z.infer<typeof zValidAdminCommands>',
        asConsecutiveLines([
            '/**exclusive to this project */',
            'declare global'
        ]),
        'type mongoMisc = { adminKey: string, pageVisits: number',
    ].forEach(x => checkMatchInSpecificFile('./types/types.d.ts', x));
}
/**Check if the project is using the latest version of "myUtils" */
async function checkUtilsVersion() {
    const latestVersion = await getLatestVersion();
    const installedVersion = (await import('./package.json', { assert: { type: 'json' } })).default.version;
    const isOutdated = versionValue(latestVersion) > versionValue(installedVersion);
    if (isOutdated) {
        errorHandler(`Outdated "utils" package. (${installedVersion} vs ${latestVersion}) PLEASE UPDATE: npm run btr`);
    }
    /**Check if the project is using the latest version of "@botoron/utils" */
    async function getLatestVersion() {
        const response = (await new Promise((resolve) => {
            try {
                fetch('http://registry.npmjs.com/-/v1/search?text=@botoron/utils&size=1').
                    then(res => res.json().then((x) => resolve(x)));
            }
            catch {
                return { objects: [{ package: { version: '0' } }] };
            }
        }));
        return response.objects[0].package.version;
    }
    function versionValue(version) {
        const [major, minor, patch] = version.split('.').map(x => Number(x));
        return (major * 99 * 99) + (minor * 99) + patch;
    }
}
async function checkVsCodeSettings() {
    const vsSettingsOfProject = await importFileFromProject('.vscode/settings', 'json');
    const desiredVsSettings = z.object({
        'dotenv.enableAutocloaking': z.literal(true),
        'peacock.color': z.string(),
        'typelens.unusedcolor': z.literal('#f44'),
        'workbench.colorCustomizations': z.object({}),
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
    const nodeModulesVueTsConfig = './client/node_modules/@vue/tsconfig/tsconfig.json';
    const clientVueFilePaths = getFilesAndFoldersNames(CLIENT_SRC, '.vue');
    const clientTsFilePaths = getFilesAndFoldersNames(CLIENT_SRC, '.ts');
    const serverTsFilePaths = getFilesAndFoldersNames('./server', '.ts');
    const typeFilePaths = getFilesAndFoldersNames('./types', '.ts');
    const tsConfigs = [inBtrUtils(TSCONFIG_JSON), TSCONFIG_JSON];
    const eslintConfigs = [inBtrUtils(ESLINT_CJS), ESLINT_CJS];
    cachedFiles.push(...await getCachedFiles(errors, [
        clientTsFilePaths, clientVueFilePaths, eslintConfigs, GITIGNORE,
        GLOBAL_VARS, nodeModulesVueTsConfig, serverTsFilePaths, tsConfigs, typeFilePaths,
        ['env.d.ts', 'tsconfig.config.json', 'tsconfig.json', 'vite.config.ts', 'vue.config.js'].
            map(x => ['./client/' + x, './node_modules/@botoron/utils/templateFiles/' + x]).flat()
    ].flat()));
}
/**Get all the file and folders within a folder, stopping at predefined folders */
function getFilesAndFoldersNames(directory, extension) {
    const results = [];
    fs.readdirSync(directory).forEach((file) => {
        file = directory + '/' + file;
        const stat = fs.statSync(file);
        const stopHere = /node_modules|dev|git|test|assets/.test(file); //regexHere
        if (stat && stat.isDirectory() && !stopHere) {
            results.push(...getFilesAndFoldersNames(file, null));
        }
        else {
            results.push(file);
        }
    });
    return extension ? results.filter(path => path.includes(extension)) : results;
}
function getFromCachedFiles(obligatoryMatches) {
    const foundFiles = cachedFiles.filter(file => obligatoryMatches.every(match => file.path.includes(match)));
    if (foundFiles.length) {
        return foundFiles;
    }
    addToErrors('checks.getFromCachedFiles', `No file cached with the requested obligatory matches(${obligatoryMatches}) was found`);
    return [{ path: 'FAILSAFE', content: '' }];
}
