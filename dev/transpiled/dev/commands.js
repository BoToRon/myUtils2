"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let _;
_; //tsc --module nodenext --moduleResolution node --resolveJsonModule --target esnext dev/commands.ts --outDir ./dev/transpiled			//@btr-ignore
_; //			tsc --target esnext dev/commands.ts --outDir ./dev/transpiled			//@btr-ignore
_; // 			node dev/transpiled/dev/commands.js			2
_;
const inquirer_1 = __importDefault(require("inquirer"));
_;
const fs_1 = require("fs");
_;
const child_process_1 = require("child_process"); //DELETETHISFORCLIENT
_;
const basicProjectChecks_js_1 = require("../basicProjectChecks.js");
_;
const constants_js_1 = require("../constants.js");
_;
_;
const btr_js_1 = require("../btr.js");
const fileWithRef = 'ref';
const serverFolder_dist = '../dist';
const PACKAGE_DOT_JSON = 'package.json';
const errors = [];
const packageJsonContent = await (0, btr_js_1.fsReadFileAsync)(PACKAGE_DOT_JSON);
const isPackage = JSON.parse(packageJsonContent).name === '@botoron/utils';
const tsFilePaths = (0, btr_js_1.getFilesAndFoldersNames)('.', null).filter(path => path.includes('.ts'));
process.env['prevent_divine_init'] = 'true';
const sharedCommands = {
    check: { description: 'btr-check the files in this very project', fn: btrCheckFilesAndReportResult },
    test: { description: 'Transpile and run test/run.ts', fn: transpileAndRunTestRunTs },
    EXIT: { description: 'Quit the command line', fn: quitCommandLineProgram }
};
const commands_forPackage = {
    ...sharedCommands,
    publishOnly: { description: 'npm version + npm publish', fn: package_publishOnly },
    transpileAll: { description: 'Transpile base files if they pass all checks and emit the client versions', fn: package_transpileAll },
    transpileBase: { description: 'Transpile the file bases, NOT for production', fn: package_transpileBaseFiles },
    transpile_commit_and_PUBLISH: { description: '1) Transpile all. 2) Git commit + push. 3) npm version + PUBLISH', fn: package_transpile_git_andPublish },
};
const commands_forProject = {
    ...sharedCommands,
    btr: { description: 'Install/update @botoron/utils', fn: project_installBtrUtils },
    'build-client': { description: 'Build the client files onto the ../dist/public', fn: project_buildClientFilesWithVite },
    'build-server': { description: 'Build the server files onto ../dist', fn: project_buildServerFiles },
    'build-all': { description: 'Transpile and copy/paste all files needed for ../dist', fn: project_buildAll },
    localtunnel: { description: 'Expose vite\'s port through a tunnel', fn: project_forwardVitesPort },
    nodemon: { description: 'Init Nodemon', fn: project_initNodemon },
    transpile: { description: 'Transpile the files in ./server onto ./test', fn: project_btrCheckAndTranspileToTestFolder },
    vue: { description: 'Move to the client folder and init vite', fn: project_initVite },
};
if (isPackage) {
    (0, btr_js_1.inquirePromptCommands)((0, btr_js_1.mapCommandsForInquirePrompt)(commands_forPackage), true);
}
else {
    (0, btr_js_1.inquirePromptCommands)((0, btr_js_1.mapCommandsForInquirePrompt)(commands_forProject), true);
}
//function declarations below
function transpileAndRunTestRunTs() { (0, btr_js_1.transpileFiles)(['./test/run.ts'], './test/transpiled'); (0, child_process_1.execFile)('./test/transpiled/test/run.ts'); }
function package_transpileBaseFiles() { (0, btr_js_1.transpileFiles)(tsFilePaths.filter(path => !/\w\//.test(path)), '.'); }
function project_buildAll() { project_buildClientFilesWithVite(); project_buildServerFiles(); }
function quitCommandLineProgram() { (0, btr_js_1.killProcess)('devForProject\'s commands terminated'); }
function project_buildClientFilesWithVite() { (0, child_process_1.execSync)('cd client & npm run build'); }
function project_initNodemon() { (0, child_process_1.execSync)('nodemon test/server/init.js'); }
function project_installBtrUtils() { (0, child_process_1.execSync)('npm i @botoron/utils'); }
function project_initVite() { (0, child_process_1.execSync)('cd client & npm run dev'); }
async function btrCheckFilesAndReportResult() { await btrCheck(); }
function project_forwardVitesPort() { (0, child_process_1.execSync)('lt --port 5173'); }
async function btrCheck() {
    const warningsCount = { count: 0 };
    (0, btr_js_1.checkCodeThatCouldBeUpdated)(await (0, btr_js_1.getCachedFiles)(errors, tsFilePaths), warningsCount);
    return (0, btr_js_1.checkNoBtrErrorsOrWarnings)(errors, warningsCount);
}
async function getVersioningFromPrompt() {
    return (await inquirer_1.default.
        prompt({
        name: 'versioning',
        type: 'list',
        message: 'Select an NPM versioning:',
        choices: constants_js_1.npmVersionOptions
    })).versioning;
}
async function package_publishOnly() {
    (0, child_process_1.execSync)(`npm version ${await getVersioningFromPrompt()}`);
    (0, btr_js_1.successLog)('package version\'d');
    (0, child_process_1.execSync)('npm publish');
    (0, btr_js_1.successLog)('package publish\'d');
}
async function package_transpileAll() {
    if (!await btrCheck()) {
        return;
    }
    package_transpileBaseFiles();
    const filename = 'btr.ts';
    const lines = await getLinesInBtrTs();
    (0, btr_js_1.selfFilter)(lines, line => !/DELETETHISFORCLIENT/.test(line)); //regexHere
    const cutPoint = lines.findIndex(x => /DELETEEVERYTHINGBELOW/.test(x)); //regexHere
    lines.splice(cutPoint, lines.length);
    lines.push('export function colorLog(color: string, message: string) { console.log(`%c${message}`, `color: ${color};`) } //@btr-ignore');
    lines.push('const clipboard = { write: doNothing }');
    lines.push('const fsWriteFileAsync = doNothing');
    lines.push(`const divine = {
	error: (err: string | Error) => { alert(err + '\\n Please report this') },
	ping: (message: string) => { divine.error(message) },
	try: async <T extends (...args: Parameters<T>) => maybePromise<ReturnType<T>>>(fn: T, args: Parameters<T>) => {
		try { return await fn(...args) }
		catch (err) { divine.error(err as string) }
	},
}`);
    await (0, btr_js_1.fsWriteFileAsync)(`./client/${filename}`, lines.join('\n'));
    (0, btr_js_1.transpileFiles)(['client/btr.ts'], './client');
    (0, btr_js_1.successLog)('browser versions emitted');
    async function getLinesInBtrTs() {
        return (await (0, btr_js_1.fsReadFileAsync)(filename)).
            replaceAll(/from '\.\/(?=constants|types)/g, 'from \'../').
            replaceAll(/(cachedFile|myEnv|validChalkColor),/g, '').
            replaceAll(/bigConsoleError/g, 'colorLog').
            split('\n');
    }
}
async function package_transpile_git_andPublish() {
    await package_transpileAll();
    await prompCommitMessageAndPush(constants_js_1.utilsRepoName);
    (0, child_process_1.execSync)(`npm version ${await getVersioningFromPrompt()}`);
    (0, btr_js_1.successLog)('package version\'d');
    (0, child_process_1.execSync)('npm publish');
    (0, btr_js_1.successLog)('package publish\'d');
}
async function project_btrCheckAndTranspileToTestFolder() {
    if (!await btrCheck()) {
        return;
    }
    (0, btr_js_1.transpileFiles)(['server/init.ts'], './test');
    await (0, btr_js_1.fsWriteFileAsync)('test/package.json', packageJsonContent);
    (0, btr_js_1.successLog)('files transpiled to ./test');
}
async function project_buildServerFiles() {
    if (!await (0, basicProjectChecks_js_1.basicProjectChecks)()) {
        return;
    }
    (0, btr_js_1.fsWriteFileAsync)('types.ts', await (0, btr_js_1.fsReadFileAsync)('types.d.ts'));
    (0, btr_js_1.transpileFiles)(['types.ts'], '.');
    (0, fs_1.unlinkSync)('types.ts');
    await copyFileToDist('.env');
    await copyFileToDist('.gitignore');
    await copyFileToDist(PACKAGE_DOT_JSON);
    (0, btr_js_1.transpileFiles)(['server/init.ts', 'server/io.ts'], serverFolder_dist);
    toggle_devOrProd_inRef();
    (0, child_process_1.execSync)('cd ../dist');
    await prompCommitMessageAndPush('(project)-dist');
    try {
        (0, child_process_1.execSync)('npm install');
        (0, btr_js_1.successLog)('(server) Build sucessful!');
    }
    catch (e) {
        (0, btr_js_1.errorLog)(`${e}`);
    }
    async function copyFileToDist(filename) {
        let content = await (0, btr_js_1.fsReadFileAsync)(filename);
        if (filename === PACKAGE_DOT_JSON) {
            deleteAllPackageJsonScriptsExceptStart_andReplaceSlashSrcWithSlashDist();
        }
        await (0, btr_js_1.fsWriteFileAsync)('../dist/' + filename, content);
        function deleteAllPackageJsonScriptsExceptStart_andReplaceSlashSrcWithSlashDist() {
            content = content.
                replace('-src', '-dist').
                replace(/"scripts": {[^}]{1,}/, '"scripts": { "start": "node server/init.js"'); //regexHere
        }
    }
    async function toggle_devOrProd_inRef() {
        const filepath = serverFolder_dist + '/server/' + fileWithRef + '.js';
        await (0, btr_js_1.fsWriteFileAsync)(filepath, (await (0, btr_js_1.fsReadFileAsync)(filepath)).replace('devOrProd = \'dev\'', 'devOrProd = \'prod\''));
    }
}
async function prompCommitMessageAndPush(repoName) {
    const commitType = await getCommitTypeFromPrompt();
    //order for these 3 below matters
    logDetailsForPrompt();
    const commitMessage = await (0, btr_js_1.questionAsPromise)('Enter a commit message:');
    (0, btr_js_1.copyToClipboard)(commitType + ': ' + commitMessage);
    gitAddCommitPush();
    async function getCommitTypeFromPrompt() {
        return (await inquirer_1.default.
            prompt({
            name: 'versioning',
            type: 'list',
            message: 'Select an NPM versioning:',
            choices: ['fix', 'feat', 'build', 'chore', 'ci', 'docs', 'refactor', 'style', 'test']
        })).versioning;
    }
    function gitAddCommitPush() {
        execAndLog('git add .');
        (0, btr_js_1.colorLog)('cyan', 'Commit message copied to clipboard, paste it in the editor, save and close.');
        (0, child_process_1.execSync)('git commit');
        execAndLog('git push');
        function execAndLog(command) { (0, child_process_1.execSync)(command); (0, btr_js_1.successLog)(command); }
    }
    function logDetailsForPrompt() {
        (0, btr_js_1.delay)(500).then(() => {
            (0, btr_js_1.colorLog)('yellow', '50-character limits ends at that line: * * * * * |');
            (0, btr_js_1.colorLog)('green', repoName);
            (0, btr_js_1.logEmptyLine)();
        });
    }
}
