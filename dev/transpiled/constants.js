let _;
import { z } from 'zod';
_;
_;
export const GITIGNORE = './.gitignore';
export const CLIENT_SRC = './client/src';
export const TYPES_Z_TS = './types/z.ts';
export const TYPES_IO_TS = './types/io.ts';
export const ESLINT_CJS = './.eslintrc.cjs';
export const GLOBAL_FNS_TS = './global/fns.ts';
export const SERVER_REF_TS = './server/ref.ts';
export const TSCONFIG_JSON = './tsconfig.json';
export const PACKAGE_DOT_JSON = 'package.json';
export const GLOBAL_VARS_TS = './global/vars.ts';
export const SERVER_EVENTS_TS = './server/events.ts';
export const CLIENT_SRC_SOCKET = CLIENT_SRC + '/socket.ts';
export const TSC_FLAGS = '--module NodeNext --moduleResolution nodenext --resolveJsonModule --target esnext';
export const utilsRepoName = 'Utils 🛠️';
export const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
export const getUniqueId_generator = (function* () { let i = 0; while (true) {
    i++;
    yield isNode ? `${Date.now() + i}` : i;
} })();
export const zValidVariants = z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark']);
export const npmVersionOptions = ['major', 'minor', 'patch'];
export const timers = [];
export const zMyEnv = z.object({
    DEV_OR_PROD: z.enum(['DEV', 'PROD']),
    ADMIN_PASSWORD: z.string(),
    PORT: z.literal('3000'),
    ERIS_TOKEN: z.string(),
    MONGO_URI: z.string(),
    APP_NAME: z.string(),
});
