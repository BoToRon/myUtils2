//pm run zTest

import { getZodSchemaFromData, zodCheck_curry, zodCheckAndHandle, zGetSafeParseResultAndHandleErrorMessage } from '../src/index.js'
import { z } from 'zod'

const vsSchema = z.object({
	'workbench.colorCustomizations': z.object({}),
	'peacock.color': z.string(),
	'dotenv.enableAutocloaking': z.literal(true),
	'typelens.unusedcolor': z.literal('#f44')
})


const value = {
	'workbench.colorCustomizations': {
		'activityBar.activeBackground': '#1f6fd0',
		'activityBar.background': '#1f6fd0',
		'activityBar.foreground': '#e7e7e7',
		'activityBar.inactiveForeground': '#e7e7e799',
		'activityBarBadge.background': '#ee90bb',
		'activityBarBadge.foreground': '#15202b',
		'commandCenter.border': '#e7e7e799',
		'sash.hoverBorder': '#1f6fd0',
		'statusBar.background': '#1857a4',
		'statusBar.foreground': '#e7e7e7',
		'statusBarItem.hoverBackground': '#1f6fd0',
		'statusBarItem.remoteBackground': '#1857a4',
		'statusBarItem.remoteForeground': '#e7e7e7',
		'titleBar.activeBackground': '#1857a4',
		'titleBar.activeForeground': '#e7e7e7',
		'titleBar.inactiveBackground': '#1857a499',
		'titleBar.inactiveForeground': '#e7e7e799'
	},
	'peacock.color': '#1857a4',
	'dotenv.enableAutocloaking': true,
	'typelens.unusedcolor': '#f44'
}

const result = zodCheck_curry(console.log, false)(vsSchema, value)
console.log({ result })