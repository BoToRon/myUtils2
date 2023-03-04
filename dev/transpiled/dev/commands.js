let _;
_; //			tsc --target esnext dev/commands.ts --outDir ./dev/transpiled			//@btr-ignore
_; // 			node dev/transpiled/dev/commands.js
import fs from 'fs';
_;
import inquirer from 'inquirer';
_;
import { execSync, execFile } from 'child_process'; //DELETETHISFORCLIENT
_;
import { basicProjectChecks } from '../basicProjectChecks.js';
_;
import { utilsRepoName, npmVersionOptions } from '../constants.js';
_;
_;
import { checkCodeThatCouldBeUpdated, colorLog, copyToClipboard, delay, errorLog, fsReadFileAsync, fsWriteFileAsync, getCachedFiles, getFilesAndFoldersNames, inquirePromptCommands, killProcess, logBtrErrors, logEmptyLine, mapCommandsForInquirePrompt, questionAsPromise, selfFilter, successLog, transpileFiles } from '../btr.js';
const fileWithRef = 'ref';
const serverFolder_dist = '../dist';
const PACKAGE_DOT_JSON = 'package.json';
const errors = [];
const packageJsonContent = await fsReadFileAsync(PACKAGE_DOT_JSON);
const isPackage = JSON.parse(packageJsonContent).name === '@botoron/utils';
const tsFilePaths = getFilesAndFoldersNames('.', null).filter(path => path.includes('.ts'));
process.env['prevent_divine_init'] = 'true';
const sharedCommands = {
    check: { description: 'btr-check the files in this very project', fn: btrCheckFilesAndReportResult },
    test: { description: 'Transpile and run test/run.ts', fn: transpileAndRunTestRunTs },
    EXIT: { description: 'Quit the command line', fn: quitCommandLineProgram }
};
const commands_forPackage = {
    ...sharedCommands,
    publishOnly: { description: 'npm version + npm publish', fn: package_publish },
    transpileAll: { description: 'Transpile base files if they pass all checks and emit the client versions', fn: package_transpileAll },
    transpileBase: { description: 'Transpile the file bases, NOT for production', fn: package_transpileBaseFiles },
    transpile_commit_and_PUBLISH: { description: '1) Transpile all. 2) Git commit + push. 3) npm version + PUBLISH', fn: package_publish },
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
    inquirePromptCommands(mapCommandsForInquirePrompt(commands_forPackage), true);
}
else {
    inquirePromptCommands(mapCommandsForInquirePrompt(commands_forProject), true);
}
//function declarations below
function transpileAndRunTestRunTs() { transpileFiles(['./test/run.ts'], './test/transpiled'); execFile('./test/transpiled/test/run.ts'); }
function package_transpileBaseFiles() { transpileFiles(tsFilePaths.filter(path => !/\w\//.test(path)), '.'); }
function project_buildAll() { project_buildClientFilesWithVite(); project_buildServerFiles(); }
function quitCommandLineProgram() { killProcess('devForProject\'s commands terminated'); }
function project_buildClientFilesWithVite() { execSync('cd client & npm run build'); }
function project_initNodemon() { execSync('nodemon test/server/init.js'); }
function project_installBtrUtils() { execSync('npm i @botoron/utils'); }
function project_initVite() { execSync('cd client & npm run dev'); }
async function btrCheckFilesAndReportResult() { await btrCheck(); }
function project_forwardVitesPort() { execSync('lt --port 5173'); }
async function btrCheck() {
    const warningsCount = { count: 0 };
    checkCodeThatCouldBeUpdated(await getCachedFiles(errors, tsFilePaths), warningsCount);
    const checksPassed = !errors.length && !warningsCount.count;
    if (errors.length) {
        logBtrErrors(errors);
    }
    if (!checksPassed) {
        errorLog('btr-errors/warnings detected, fix them before attempting to transpile again');
    }
    return checksPassed;
}
async function package_publish() {
    await package_transpileAll();
    await prompCommitMessageAndPush(utilsRepoName);
    execSync(`npm version ${await getVersioningFromPrompt()}`);
    successLog('package version\'d');
    execSync('npm publish');
    successLog('package publish\'d');
    async function getVersioningFromPrompt() {
        return (await inquirer.
            prompt({
            name: 'versioning',
            type: 'list',
            message: 'Select an NPM versioning:',
            choices: npmVersionOptions
        })).versioning;
    }
}
async function package_transpileAll() {
    if (!await btrCheck()) {
        return;
    }
    package_transpileBaseFiles();
    const filename = 'btr.ts';
    const lines = await getLinesInBtrTs();
    selfFilter(lines, line => !/DELETETHISFORCLIENT/.test(line)); //regexHere
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
    await fsWriteFileAsync(`./client/${filename}`, lines.join('\n'));
    transpileFiles(['client/btr.ts'], './client');
    successLog('browser versions emitted');
    async function getLinesInBtrTs() {
        return (await fsReadFileAsync(filename)).
            replaceAll(/from '\.\/(?=constants|types)/g, 'from \'../').
            replaceAll(/(cachedFile|myEnv|validChalkColor),/g, '').
            replaceAll(/bigConsoleError/g, 'colorLog').
            split('\n');
    }
}
async function project_btrCheckAndTranspileToTestFolder() {
    if (!await btrCheck()) {
        return;
    }
    transpileFiles(['server/init.ts'], './test');
    await fsWriteFileAsync('test/package.json', packageJsonContent);
    successLog('files transpiled to ./test');
}
async function project_buildServerFiles() {
    await basicProjectChecks();
    fsWriteFileAsync('types.ts', await fsReadFileAsync('types.d.ts'));
    transpileFiles(['types.ts'], '.');
    fs.unlinkSync('types.ts');
    await copyFileToDist('.env');
    await copyFileToDist('.gitignore');
    await copyFileToDist(PACKAGE_DOT_JSON);
    transpileFiles(['server/init.ts', 'server/io.ts'], serverFolder_dist);
    toggle_devOrProd_inRef();
    execSync('cd ../dist');
    await prompCommitMessageAndPush('(project)-dist');
    try {
        execSync('npm install');
        successLog('(server) Build sucessful!');
    }
    catch (e) {
        errorLog(`${e}`);
    }
    async function copyFileToDist(filename) {
        let content = await fsReadFileAsync(filename);
        if (filename === PACKAGE_DOT_JSON) {
            deleteAllPackageJsonScriptsExceptStart_andReplaceSlashSrcWithSlashDist();
        }
        await fsWriteFileAsync('../dist/' + filename, content);
        function deleteAllPackageJsonScriptsExceptStart_andReplaceSlashSrcWithSlashDist() {
            content = content.
                replace('-src', '-dist').
                replace(/"scripts": {[^}]{1,}/, '"scripts": { "start": "node server/init.js"'); //regexHere
        }
    }
    async function toggle_devOrProd_inRef() {
        const filepath = serverFolder_dist + '/server/' + fileWithRef + '.js';
        await fsWriteFileAsync(filepath, (await fsReadFileAsync(filepath)).replace('devOrProd = \'dev\'', 'devOrProd = \'prod\''));
    }
}
async function prompCommitMessageAndPush(repoName) {
    const commitType = await getCommitTypeFromPrompt();
    //order for these 3 below matters
    logDetailsForPrompt();
    const commitMessage = await questionAsPromise('Enter a commit message:');
    copyToClipboard(commitType + ': ' + commitMessage);
    gitAddCommitPush();
    async function getCommitTypeFromPrompt() {
        return (await inquirer.
            prompt({
            name: 'versioning',
            type: 'list',
            message: 'Select an NPM versioning:',
            choices: ['fix', 'feat', 'build', 'chore', 'ci', 'docs', 'refactor', 'style', 'test']
        })).versioning;
    }
    function gitAddCommitPush() {
        execAndLog('git add .');
        colorLog('cyan', 'Commit message copied to clipboard, paste it in the editor, save and close.');
        execSync('git commit');
        execAndLog('git push');
        function execAndLog(command) { execSync(command); successLog(command); }
    }
    function logDetailsForPrompt() {
        delay(500).then(() => {
            colorLog('yellow', '50-character limits ends at that line: * * * * * |');
            colorLog('green', repoName);
            logEmptyLine();
        });
    }
}
