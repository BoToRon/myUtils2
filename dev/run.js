//				npm run dev		
//				node dev/run.js
//				tsc --target esnext btr.ts
let _;
import { execSync } from 'child_process'; //DELETETHISFORCLIENT
_;
_;
import { inquirePromptCommands, mapCommandsForInquirePrompt, transpileFile } from '../btr.js';
const functions = {
	runOnly: { description: 'Execute the already transpiled dev/commands.js', fn: runDevCommandsJs },
	transpileAndRun: { description: 'Transpile dev/commands and run the outputted file', fn: transpileAndRuncommandsTs },
	transpileOnly: { description: 'Transpile dev/commands.ts', fn: transpileCommandsTs },
};
process.env['prevent_divine_init'] = 'true';
systemSync('node dev/transpiled/dev/commands.js')
function systemSync(cmd) {
	try {
		const x = execSync(cmd).toString();
		console.log({ x })
	}
	catch (error) {
		/* 	error.status,  // Might be 127 in your example.
			error.message, // Holds the message you typically want.
			error.stderr,  // Holds the stderr output. Use `.toString()`.
			error.stdout,  // Holds the stdout output. Use `.toString()`. */
		const { status, message, stderr, stdout } = error
		console.log({ status, message, stderr: stderr.toString(), stdout: stdout.toString() })

	}
};

//inquirePromptCommands(mapCommandsForInquirePrompt(functions), false);

function transpileCommandsTs() { transpileFile(['dev/commands.ts'], './dev/transpiled'); }
function transpileAndRuncommandsTs() { transpileCommandsTs(); runDevCommandsJs(); }
function runDevCommandsJs() { execSync('node dev/transpiled/dev/commands.js'); }
