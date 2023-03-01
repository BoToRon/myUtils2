//				node dev/run.js
let _;
import { execSync } from 'child_process'; //DELETETHISFORCLIENT
_;
_;
import { inquirePromptCommands, objectEntries, transpileFile } from '../btr.js';
const functions = {
    runOnly: { description: 'Execute the already transpiled dev/commands.js', fn: runDevCommandsJs },
    transpileAndRun: { description: 'Transpile dev/commands and run the outputted file', fn: transpileAndRuncommandsTs },
    transpileOnly: { description: 'Transpile dev/commands.ts', fn: transpileCommandsTs },
};
process.env['prevent_divine_init'] = 'true';
inquirePromptCommands(functionForInquirePrompt());
function transpileCommandsTs() {
    transpileFile(['dev/commands.ts'], './dev/transpiled');
}
function transpileAndRuncommandsTs() { transpileCommandsTs(); runDevCommandsJs(); }
function runDevCommandsJs() { execSync('node dev/transpiled/dev/commands.js'); }
function functionForInquirePrompt() {
    const object = {};
    objectEntries(functions).forEach(({ key, value }) => object[key + ': ' + value.description] = value.fn);
    return object;
}
