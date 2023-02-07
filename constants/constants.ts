let _
import { z } from 'zod'
_
import { timer } from '../types/types.js'
_

export const GITIGNORE = './.gitignore'
export const CLIENT_SRC = './client/src'
export const TYPES_IO_TS = './types/io.ts'
export const ESLINT_CJS = './.eslintrc.cjs'
export const GLOBAL_VARS = './global/vars.ts'
export const SERVER_REF_TS = './server/ref.ts'
export const TSCONFIG_JSON = './tsconfig.json'
export const PACKAGE_DOT_JSON = 'package.json'
export const CLIENT_SRC_SOCKET = CLIENT_SRC + '/socket.ts'

export const utilsRepoName = 'Utils 🛠️'
export const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null
export const getUniqueId_generator = (function* () { let i = 0; while (true) { i++; yield isNode ? `${Date.now() + i}` : i } })()

const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark'] as const
const npmPackageCommands = ['all', 'check', 'transpile-all', 'transpile-base'] as const
const npmProjectCommands = ['build', 'check', 'git', 'transpile'] as const
const npmVersionOptions = ['major', 'minor', 'patch'] as const
export const timers: timer[] = []

export const zValidNpmCommand_package = z.enum(npmPackageCommands)
export const zValidNpmCommand_project = z.enum(npmProjectCommands)
export const zValidVersionIncrement = z.enum(npmVersionOptions)
export const zValidVariants = z.enum(variants)

export const zMyEnv = z.object({
	DEV_OR_PROD: z.enum(['DEV', 'PROD']),
	ADMIN_PASSWORD: z.string(),
	ERIS_TOKEN: z.string(),
	MONGO_URI: z.string(),
	APP_NAME: z.string(),
	PORT: z.string(),
})
