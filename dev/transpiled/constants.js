"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zMyEnv = exports.timers = exports.npmVersionOptions = exports.zValidVariants = exports.getUniqueId_generator = exports.isNode = exports.utilsRepoName = exports.TSC_FLAGS = exports.CLIENT_SRC_SOCKET = exports.SERVER_EVENTS_TS = exports.GLOBAL_VARS_TS = exports.PACKAGE_DOT_JSON = exports.TSCONFIG_JSON = exports.SERVER_REF_TS = exports.GLOBAL_FNS_TS = exports.ESLINT_CJS = exports.TYPES_IO_TS = exports.TYPES_Z_TS = exports.CLIENT_SRC = exports.GITIGNORE = void 0;
let _;
const zod_1 = require("zod");
_;
_;
exports.GITIGNORE = './.gitignore';
exports.CLIENT_SRC = './client/src';
exports.TYPES_Z_TS = './types/z.ts';
exports.TYPES_IO_TS = './types/io.ts';
exports.ESLINT_CJS = './.eslintrc.cjs';
exports.GLOBAL_FNS_TS = './global/fns.ts';
exports.SERVER_REF_TS = './server/ref.ts';
exports.TSCONFIG_JSON = './tsconfig.json';
exports.PACKAGE_DOT_JSON = 'package.json';
exports.GLOBAL_VARS_TS = './global/vars.ts';
exports.SERVER_EVENTS_TS = './server/events.ts';
exports.CLIENT_SRC_SOCKET = exports.CLIENT_SRC + '/socket.ts';
exports.TSC_FLAGS = '--module nodenext --moduleResolution node --target esnext';
exports.utilsRepoName = 'Utils 🛠️';
exports.isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
exports.getUniqueId_generator = (function* () { let i = 0; while (true) {
    i++;
    yield exports.isNode ? `${Date.now() + i}` : i;
} })();
exports.zValidVariants = zod_1.z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark']);
exports.npmVersionOptions = ['major', 'minor', 'patch'];
exports.timers = [];
exports.zMyEnv = zod_1.z.object({
    DEV_OR_PROD: zod_1.z.enum(['DEV', 'PROD']),
    ADMIN_PASSWORD: zod_1.z.string(),
    PORT: zod_1.z.literal('3000'),
    ERIS_TOKEN: zod_1.z.string(),
    MONGO_URI: zod_1.z.string(),
    APP_NAME: zod_1.z.string(),
});
