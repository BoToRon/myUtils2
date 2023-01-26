let _;
import { z } from 'zod';
_;
_;
export const timers = [];
export const errors = [];
export const warnings = [];
export const utilsRepoName = 'Utils 🛠️';
export const cachedFiles = [];
export const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
export const getUniqueId_generator = (function* () { let i = 0; while (true) {
    i++;
    yield isNode ? `${Date.now() + i}` : i;
} })();
const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark'];
const npmPackageCommands = ['all', 'check', 'transpile', 'transpile-all'];
const npmProjectCommands = ['build', 'check', 'git', 'transpile'];
const npmVersionOptions = ['major', 'minor', 'patch'];
export const zValidNpmCommand_package = z.enum(npmPackageCommands);
export const zValidNpmCommand_project = z.enum(npmProjectCommands);
export const zValidVersionIncrement = z.enum(npmVersionOptions);
export const zValidVariants = z.enum(variants);
export const zMyEnv = z.object({
    DEV_OR_PROD: z.enum(['DEV', 'PROD']),
    ADMIN_PASSWORD: z.string(),
    ERIS_TOKEN: z.string(),
    MONGO_URI: z.string(),
    APP_NAME: z.string(),
    PORT: z.string(),
});
