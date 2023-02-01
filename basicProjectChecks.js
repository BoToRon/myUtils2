let _;
import fs from 'fs';
_;
import { z } from 'zod';
_;
import { zMyEnv } from './types/constants.js';
_;
_;
import { getCachedFiles, checkCodeThatCouldBeUpdated, colorLog, compareArrays, getEnviromentVariables, getZodSchemaFromData, importFileFromProject, nullAs, successLog, surroundedString, zodCheck_curry, zRegexGenerator } from './btr.js';
_;
const errors = [];
const warnings = [];
const cachedFiles = [];
let DEV_OR_PROD = nullAs();
let errorHandler = nullAs();
const clientVueFiles = [];
const clientTsFiles = [];
const serverTsFiles = [];
const typeFiles = [];
const zodCheck_toErrors = zodCheck_curry(addToErrors);
_; //TODO: an schema for ref's esqueleton? (temp, debug, debugLog, devOrProd, socket)
_; //TODO: check "ref.ts" matches (getDebugOptions, mongoCollection)
export function addToErrors(error) {
    errors.push(error);
}
/** Check the version of @botoron/utils, the enviroment variables and various config files */
export async function basicProjectChecks(errHandler) {
    errorHandler = errHandler;
    DEV_OR_PROD = getEnviromentVariables().DEV_OR_PROD;
    await fillCachedFiles();
    clientVueFiles.push(...getFromCachedFiles(['./client/src', '.vue']));
    clientTsFiles.push(...getFromCachedFiles(['./client/src', '.ts']));
    serverTsFiles.push(...getFromCachedFiles(['./server', '.ts']));
    typeFiles.push(...getFromCachedFiles(['./types', '.ts']));
    await Promise.all([
        checkAllExportedFunctionsAreDescribed(),
        checkAllVueComponentsAreTrackeable(),
        checkBasicValidAdminCommands(),
        checkClientFilesDontReferenceLocalStorageDirectly(),
        checkCodeThatCouldBeUpdated([serverTsFiles, clientTsFiles, clientVueFiles].flat()),
        checkEnviromentVariables(),
        checkEslintConfigRules(),
        checkFilesAndFolderStructure(),
        checkGitIgnore(),
        checkImportsAreFromTheRightBtrFile(),
        checkInitTsCallsRefTsAndIoTs(),
        checkLocalImportsHaveJsExtention(),
        checkPackageJson(),
        checkSocketEvents(),
        checkTsConfigCompilerOptions(),
        checkServerAndClientFilesLogTheirInitialization(),
        checkSpecificMatchesInTypesIoTs(),
        checkSpecificMatchesInTypesTs(),
        checkUtilsVersion(),
        checkVsCodeSettings(),
        checkVueDevFiles(),
    ]);
    errors.length ? errorHandler('\n\n' + errors.join('\n\n') + '\n\n') : successLog('all basicProjectChecks passed');
    warnings.forEach(warning => colorLog('yellow', warning));
    return !errors.length;
}
function asConsecutiveLines(lines) {
    return lines.join('\r\n');
}
function checkBasicValidAdminCommands() {
    checkMatchInSpecificFile('./types/constants.ts', 'export const adminCommands = [\'getSockets\', \'help\', \'ref\',');
    checkMatchInSpecificFile('./types/z.ts', 'export const zValidAdminCommands = z.enum(adminCommands)');
}
/**Check all the top-level functions in main .ts server files have a description */
function checkAllExportedFunctionsAreDescribed() {
    if (DEV_OR_PROD !== 'DEV') {
        return true;
    }
    serverTsFiles.forEach(file => {
        const lines = file.content.split('\n');
        const uncommentedTopLevelFunctions = lines.reduce((acc, line, index) => {
            const isTopLevelFunction = /^export (async|function)/.test(line);
            if (!isTopLevelFunction) {
                return acc;
            }
            const isCommented = /\*\//.test(lines[index - 1]);
            if (isCommented) {
                return acc;
            }
            acc.push(line.slice(0, line.length - 5).replace(/(export ){0,}(async |function |\(.{1,})/g, ''));
            return acc;
        }, []);
        if (!uncommentedTopLevelFunctions.length) {
            return;
        }
        addToErrors(`Uncommented exported function ${surroundedString(`(in (${file})`, ' ', 10)} [${uncommentedTopLevelFunctions.join(', ')}]`);
    });
}
/**Check all the vue components are trackable by the window */
function checkAllVueComponentsAreTrackeable() {
    if (DEV_OR_PROD !== 'DEV') {
        return true;
    }
    clientVueFiles.forEach(file => {
        const wantedMatch = 'trackVueComponent('; //) <--here to not mess with the colour of parentheses
        if (!file.content.includes(wantedMatch)) {
            addToErrors(`${file} must include "${wantedMatch}"`);
        }
    });
}
function checkClientFilesDontReferenceLocalStorageDirectly() {
    [clientTsFiles, clientVueFiles].flat().forEach(file => {
        const { filepath, content } = file;
        if (content.includes('localStorage.')) {
            addToErrors(`use getLocalStorageAndSetter instead of referencing it directly, at ${filepath}`);
        }
    });
}
/**Check if all the desired enviroment keys are defined */
function checkEnviromentVariables() {
    zodCheck_curry(addToErrors, false)(zMyEnv, getEnviromentVariables());
}
/**Check the rules in a project's eslint config file all fit the established schema */
async function checkEslintConfigRules() {
    const pathToUtilsEslint = './.eslintrc.cjs';
    const desiredEslintConfig = (await import(pathToUtilsEslint)).default;
    const eslintConfingOfProject = await importFileFromProject('.eslintrc', 'cjs');
    zodCheck_toErrors(getZodSchemaFromData(desiredEslintConfig), eslintConfingOfProject);
}
/**Check the structure of the project */
function checkFilesAndFolderStructure() {
    const currentFilesAndFolders = getFilesAndFoldersNames('.', null);
    const desiredFilesAndFolders = [
        './.env', './.eslintrc.cjs', './.git', './.gitignore',
        './node_modules', './package-lock.json', './package.json', './README.md',
        './test', './TODO.MD',
        './tsconfig.json', './types/types.d.ts', './types/constants.ts', './types/io.ts', './types/z.ts',
        './server/fns.ts', './server/init.ts', './server/ioEvents.ts', './server/ref.ts',
        './client/env.d.ts', './client/index.html', './client/node_modules', './client/package-lock.json', './client/package.json',
        './client/tsconfig.config.json', './client/tsconfig.json', './client/vite.config.ts', './client/vue.config.js',
        './client/src/App.vue', './client/src/assets', './client/src/index.ts', './client/src/socket.ts', './client/src/store.ts',
    ];
    const missingItems = compareArrays(desiredFilesAndFolders, currentFilesAndFolders).missingItems;
    if (missingItems.length) {
        addToErrors(`The following files / directories are missing: [${missingItems.join(', ')}]`);
    }
}
/**Check all files/folders that should be ignored by default are so */
function checkGitIgnore() {
    const currentIgnores = getFromCachedFiles(['./.gitignore'])[0].content.split('\r\n');
    const desiredIgnores = ['.env', 'client/node_modules', 'node_modules', 'test/*'];
    const missingItems = compareArrays(desiredIgnores, currentIgnores).missingItems;
    if (missingItems.length) {
        addToErrors(`.gitignore must include the following: [${missingItems.join(', ')}]`);
    }
}
function checkImportsAreFromTheRightBtrFile() {
    [clientTsFiles, clientVueFiles].flat().forEach(file => doCheck('client', file));
    serverTsFiles.forEach(file => doCheck('server', file));
    function doCheck(filetype, file) {
        const { filepath, content } = file;
        if (!content.includes('@botoron/utils')) {
            return;
        }
        if (filetype === 'server' && content.includes('@botoron/utils/client')) {
            return addToErrors('Server file should not be exporting from @botoron/utils/client, at: ' + filepath);
        }
        if (filetype === 'client' && !content.includes('@botoron/utils/client/btr.js')) {
            return addToErrors('Client file should be exporting from @botoron/utils/client/btr.js at: ' + filepath);
        }
    }
}
function checkInitTsCallsRefTsAndIoTs() {
    checkMatchInSpecificFile('./server/init.ts', 'successLog(stringify({ refInitialized: true, ioInitialized }))');
}
function checkLocalImportsHaveJsExtention() {
    [serverTsFiles, clientTsFiles, clientVueFiles].flat().forEach(file => {
        const { filepath, content } = file;
        const localImports = content.match(/from '\..{1,}/g);
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
            addToErrors(`Local import(${match}) is missing.js at the end, at: ${filepath}`);
        });
    });
}
function checkMatchInSpecificFile(file, wantedMatch) {
    const { content } = getFromCachedFiles([file])[0];
    if (!content.includes(wantedMatch)) {
        addToErrors(`"${surroundedString(wantedMatch, ' ', 10)}" is missing, at(${file})`);
    }
}
/**Check the scripts in a project's package json all fit the established schema */
async function checkPackageJson() {
    const packageJsonOfProject = await importFileFromProject('package', 'json');
    const desiredPackageJsonSchema = z.object({
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
            'build-client': z.literal('cd client & npm run build-only'),
            'build-all': z.literal('tsc --target esnext server/init.ts --outDir ../dist & cd client & npm run build-only && cd ..'),
            check: z.literal('npm run npmScript --command_project=check'),
            localtunnel: z.literal('lt --port 3000'),
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
    });
    zodCheck_toErrors(desiredPackageJsonSchema, packageJsonOfProject);
}
/**Check all socket events are handled aka socket.on(<EVENTNAME>) */
function checkSocketEvents() {
    const filepath = './types/io.ts';
    const linesInTypesIo = getFromCachedFiles([filepath])[0].content.split('\n');
    checkSocketOnOfInterface('ServerToClientEvents', './client/src/socket.ts');
    checkSocketOnOfInterface('ClientToServerEvents', './server/ioEvents.ts');
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
            } //"{"" <-- here so it doesn't mess with the color of brackets
            if (!isKeyOfWantedInterface) {
                return;
            }
            if (!/^\t\w/.test(line)) {
                return;
            }
            const event = (line.match(/(?<=\t)\w{1,}/) || [''])[0];
            if (handlingFile.includes(`socket.on('${event}'`)) {
                return;
            }
            addToErrors(`${nameOfInterface}.${event} is declared but not handled in ${pathToHandlingFile}`);
        });
    }
}
/**Check the rules in a project's ts config file all fit the established schema */
function checkTsConfigCompilerOptions() {
    const desiredTsConfig = getTsConfigJson('./node_modules/@botoron/utils/tsconfig.json');
    const usedTsConfig = getTsConfigJson('./tsconfig.json');
    const zSchema = getZodSchemaFromData(desiredTsConfig);
    zodCheck_toErrors(zSchema, usedTsConfig);
    /**Get the ts config file of the main project */
    function getTsConfigJson(filepath) {
        return JSON.parse(getFromCachedFiles([filepath])[0].
            content.
            replace(/\/(\/|\*).{1,}/g, '').
            replace(/(\n|\r|\t)/g, '').
            replace(', }', ' }') //{ { <-- commented here to keep the colour of brackets the same
        );
    }
}
function checkServerAndClientFilesLogTheirInitialization() {
    [serverTsFiles, clientTsFiles, clientVueFiles].flat().forEach(file => {
        const { filepath, content } = file;
        const wantedMatch = `logInitialization('${filepath}')`;
        if (!content.includes(wantedMatch)) {
            addToErrors(`"${surroundedString(wantedMatch, ' ', 10)}" is missing`);
        }
    });
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
    ].forEach(event => checkMatchInSpecificFile('./types/io.ts', event));
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
    ].forEach(x => checkMatchInSpecificFile('./types/types.d.ts', x));
}
/**Check if the project is using the latest version of "myUtils" */
async function checkUtilsVersion() {
    const latestVersion = await getLatestVersion();
    const installedVersion = (await import('./package.json', { assert: { type: 'json' } })).default.version;
    const isUpToDate = installedVersion === latestVersion;
    if (!isUpToDate) {
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
}
async function checkVsCodeSettings() {
    const vsSettingsOfProject = await importFileFromProject('.vscode/settings', 'json');
    const desiredVsSettings = z.object({
        'dotenv.enableAutocloaking': z.literal(true),
        'peacock.color': z.string(),
        'typelens.unusedcolor': z.literal('#f44'),
        'workbench.colorCustomizations': z.object({}),
    });
    zodCheck_toErrors(desiredVsSettings, vsSettingsOfProject);
}
/**Turn off that damn skipLibCheck that comes on by default */
async function checkVueDevFiles() {
    if (DEV_OR_PROD !== 'DEV') {
        return true;
    }
    await Promise.all([
        readVueFile('vue.config.js', 'export const devServer = { proxy: \'http://localhost:\' + process.env.port }'),
        readVueFile('vite.config.ts', 'optimizeDeps: { exclude: [\'node_modules/@botoron/utils\'], },'),
        readVueFile('vue.config.js', 'export const assetsDir = resolve(__dirname, \'../assets\')'),
        readVueFile('node_modules/@vue/tsconfig/tsconfig.json', '"skipLibCheck": false'),
        readVueFile('env.d.ts', '/// <reference types="../types/types" />'),
    ]);
    function readVueFile(clientSlash, mustMatch) {
        const path = './client/' + clientSlash;
        const file = getFromCachedFiles([path])[0];
        if (file.content.includes(mustMatch)) {
            return true;
        }
        addToErrors(`file(${path})     must include: ${mustMatch}`);
    }
}
async function fillCachedFiles() {
    const vueDevFiles = ['env.d.ts', 'node_modules/@vue/tsconfig/tsconfig.json', 'vite.config.ts', 'vue.config.js'].map(x => './client/' + x);
    const tsConfigs = ['./node_modules/@botoron/utils/tsconfig.json', './tsconfig.json'];
    const clientVueFilePaths = getFilesAndFoldersNames('./client/src', '.vue');
    const clientTsFilePaths = getFilesAndFoldersNames('./client/src', '.ts');
    const serverTsFilePaths = getFilesAndFoldersNames('./server', '.ts');
    const typeFilePaths = getFilesAndFoldersNames('./types', '.ts');
    const gitIgnore = './.gitignore';
    cachedFiles.push(...await getCachedFiles([
        clientTsFilePaths, clientVueFilePaths, gitIgnore, serverTsFilePaths, tsConfigs, typeFilePaths, vueDevFiles
    ].flat()));
}
/**Get all the file and folders within a folder, stopping at predefined folders */
function getFilesAndFoldersNames(directory, extension) {
    const results = [];
    fs.readdirSync(directory).forEach((file) => {
        file = directory + '/' + file;
        const stat = fs.statSync(file);
        const stopHere = /node_modules|git|test|assets/.test(file);
        if (stat && stat.isDirectory() && !stopHere) {
            results.push(...getFilesAndFoldersNames(file, null));
        }
        else {
            results.push(file);
        }
    });
    return extension ? results.filter(filepath => filepath.includes(extension)) : results;
}
function getFromCachedFiles(obligatoryMatches) {
    const foundFiles = cachedFiles.filter(file => obligatoryMatches.every(match => file.filepath.includes(match)));
    if (foundFiles.length) {
        return foundFiles;
    }
    addToErrors(`No file cached with the requested obligatory matches(${obligatoryMatches}) was found`);
    return [{ filepath: 'FAILSAFE', content: '' }];
}
