//					tsc --target esnext devForPackage/commands.ts --outDir ./devForPackage/transpiled 
// 					node devForPackage/transpiled/devForPackage/commands.js
let _;
import inquirer from 'inquirer';
_;
import { execSync, execFile } from 'child_process'; //DELETETHISFORCLIENT
_;
_;
import { npmVersionOptions, utilsRepoName, warningsCount_generator } from '../constants.js';
_;
import { checkCodeThatCouldBeUpdated, colorLog, errorLog, fsReadFileAsync, fsWriteFileAsync, getCachedFiles, getFilesAndFoldersNames, inquirePromptCommands, killProcess, mapCommandsForInquirePrompt, prompCommitMessageAndPush, selfFilter, successLog, transpileFiles } from '../btr.js';
const errors = [];
const tsFilePaths = getFilesAndFoldersNames('.', null).filter(path => path.includes('.ts'));
const functions = {
    check: { description: 'btr-check the files in this very package', fn: btrCheckPackageAndReportResult },
    publishOnly: { description: 'npm version + npm publish', fn: publish },
    test: { description: 'Transpile and run test/run.ts', fn: transpileAndRunTestRunTs },
    transpileAll: { description: 'Transpile base files, check for btr-errors and if they pass, emit the client versions', fn: transpileAll },
    transpileBase: { description: 'Transpile the file bases, NOT for production', fn: transpileBaseFiles },
    transpile_commit_and_PUBLISH: { description: '1) Transpile all. 2) Git commit + push. 3) npm version + PUBLISH', fn: publish },
    EXIT: { description: 'Quit the command line', fn: quitCommandLineProgram }
};
process.env['prevent_divine_init'] = 'true';
inquirePromptCommands(mapCommandsForInquirePrompt(functions), true);
//function declarations below
function transpileAndRunTestRunTs() { transpileFiles(['./test/run.ts'], './test/transpiled'); execFile('./test/transpiled/test/run.ts'); }
async function btrCheckPackage() { checkCodeThatCouldBeUpdated(await getCachedFiles(errors, tsFilePaths)); }
function transpileBaseFiles() { transpileFiles(tsFilePaths.filter(path => !/\w\//.test(path)), '.'); }
function quitCommandLineProgram() { killProcess('devForPackage\'s commands terminated'); }
async function btrCheckPackageAndReportResult() {
    await btrCheckPackage();
    errors.length ? colorLog('red', errors.length + ' errors') : successLog('No btr-errors detected');
}
async function publish() {
    await transpileAll();
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
async function transpileAll() {
    transpileBaseFiles();
    btrCheckPackage();
    if (thereAreErrorsOrWarnings()) {
        errorLog('btr-errors detected, fix them before attempting to transpile again');
        return;
    }
    const filename = 'btr.ts';
    const lines = await getLinesInBtrTs();
    selfFilter(lines, line => !/DELETETHISFORCLIENT/.test(line)); //regexHere
    const cutPoint = lines.findIndex(x => /DELETEEVERYTHINGBELOW/.test(x)); //regexHere
    lines.splice(cutPoint, lines.length);
    lines.push('export const colorLog = (color: string, message: string) => console.log(`%c${message}`, `color: ${color};`) //@btr-ignore');
    await fsWriteFileAsync(`./client/${filename}`, lines.join('\n'));
    transpileFiles(['client/btr.ts'], './client');
    successLog('browser versions emitted');
    async function getLinesInBtrTs() {
        return (await fsReadFileAsync(filename)).
            replaceAll(/from '\.\/(?=constants|types)/g, 'from \'../').
            replaceAll(/bigConsoleError/g, 'colorLog').
            split('\n');
    }
    function thereAreErrorsOrWarnings() {
        return errors.length || warningsCount_generator.next().value > 1;
    }
}