//				node dev/run.js

let _
import { execSync } from 'child_process'	//DELETETHISFORCLIENT
_
import { btr_commands } from '../types/types.js'
_
import { inquirePromptCommands, mapCommandsForInquirePrompt, transpileFile } from '../btr.js'

const functions: btr_commands = {
	runOnly: { description: 'Execute the already transpiled dev/commands.js', fn: runDevCommandsJs },
	transpileAndRun: { description: 'Transpile dev/commands and run the outputted file', fn: transpileAndRuncommandsTs },
	transpileOnly: { description: 'Transpile dev/commands.ts', fn: transpileCommandsTs },
}

process.env['prevent_divine_init'] = 'true'
inquirePromptCommands(mapCommandsForInquirePrompt(functions))

function transpileCommandsTs() { transpileFile(['dev/commands.ts'], './dev/transpiled') }
function transpileAndRuncommandsTs() { transpileCommandsTs(); runDevCommandsJs() }
function runDevCommandsJs() { execSync('node dev/transpiled/dev/commands.js') }

