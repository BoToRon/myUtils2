import { command_package, command_project, npmRun_package, npmRun_project, zodCheckAndHandle, zValidNpmCommand_package, zValidNpmCommand_project } from './btr.js';
if (command_package) {
    zodCheckAndHandle(zValidNpmCommand_package, command_package, npmRun_package, [command_package], console.log);
}
if (command_project) {
    zodCheckAndHandle(zValidNpmCommand_project, command_project, npmRun_project, [command_project], console.log);
}
