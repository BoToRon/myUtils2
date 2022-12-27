//TODO: create a way to make sure every project has the same package.json scripts and also create a way to automatize their compilation

import {
	Eris,
	_, bvToast, fromZodError, fs, getReadLine, mongodb, MongoClient, newToastFn, packageJson, pipe_mutable_type,
	pipe_persistent_type, SafeParseReturnType, trackedVueComponent, validChalkColor, validNpmCommand,
	validVariant, z, zSchema, zValidNpmCommand, zValidVariants, zValidVersionIncrement
} from './deps.js'

export const BTR = {
	/**Tr-Catch wrapper for functions. Starts as a placeholder, initialize it with typeF_get */
	tryF: <T extends (...args: any) => any>(fn: T, args: Parameters<T>): any => {
		warnAboutUnproperlyInitializedFunction('tryF')
		console.log(fn, args)
	},
	/**Createst a new 5-seconds toast in the lower right corner. Must be initialized by passing $bvToast to newToast_client_get  */
	newToast_client(title: string, message: string, variant: validVariant) {
		warnAboutUnproperlyInitializedFunction('newToast_client')
		console.log(title, message, variant)
	},
	/**Test data against an scheme, and if it fails execute a predefined errorHandler. 
	* WARNING: Deprecated? zodCheckAndHandle feels better. 
	* Starts as a placeholder, initialize it with zodCheck_get 
	* */
	zodCheck<T>(schema: zSchema<T>, data: T) {
		warnAboutUnproperlyInitializedFunction('zodCheck')
		console.log(schema, data)
		return false
	},
	/**for when registering them for tracking at window.vueComponents */
	zValidVueComponentName: null as unknown as zSchema<unknown>,
}
/**Adds an item to an array, or removes it if it already was added. Returns the action applied and the array */
export const addOrRemoveItem = <T>(arr: T[], item: T) => {
	let x: 'added' | 'removed'
	const isInArray = arr.includes(item)
	if (!isInArray) { arr.push(item); x = 'added' }
	else { selfFilter(arr, (x) => x !== item); x = 'removed' }
	return { action: x, arr }
}
/**Converts an array of primitives into a comma-separated list, the word "and" being optional before the last item */
export const asFormattedList = (arr: (string | number | boolean)[], useAndForTheLastItem: boolean) => {
	let string = ''
	arr.forEach((item, index) => {
		const isLastItem = index === arr.length - 1
		const isSemiLastItem = index === arr.length - 2

		if (isSemiLastItem && useAndForTheLastItem) { string += item + ' and ' }
		else if (isLastItem) { string += item }
		else { string += item + ', ' }
	})
	return string
}
/**syntax sugar for arr[arr.length - 1] */
export const getLastItem = <T>(arr: T[]) => arr[arr.length - 1]
/**returns a random item along its index */
export const getRandomItem = <T>(arr: T[]) => { const r = roll(arr.length); return { item: arr[r], index: r } }
/**Returns a version of the provided array without repeating items */
export const getUniqueValues = <T>(arr: T[]) => [...new Set(arr)]
/**Transfer items that meet a given condition from one array to another */
export const transferItems = <T>(origin: T[], destination: T[], predicate: (arg1: T) => boolean) => {
	const x = selfFilter(origin, predicate)
	destination.push(...x.removedItems)
	return { transferedCount: x.removedCount }
}
/**Remove items from an array that don't fulfill the given condition, returns the removed items and their amount */
export const selfFilter = <T>(arr: T[], predicate: (arg1: T) => boolean) => {
	let removedCount = 0
	let removedItems: T[] = []
	for (let i = 0; i < arr.length; i++) {
		if (predicate(arr[i])) { continue }
		removedItems.push(arr.splice(i, 1)[0])
		removedCount++
		i--
	}
	return { removedItems, removedCount }
}
/**Randomizes the order of the items in the array */
export const shuffle = <T>(arr: T[]) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const rand = roll(i + 1);
		[arr[i], arr[rand]] = [arr[rand], arr[i]]
	}
	return arr
}
/**Sort an array of objects based on the value a property. A: Ascending, D: Descesding  */
export const sortBy = <T extends object>(arr: T[], key: keyof T, direction: 'A' | 'D') => {
	if (!arr.length) { return arr }
	if (typeof arr[0] === 'string') { arr.sort((a, b) => (a > b) ? 1 : -1) }
	else { arr.sort((a, b) => (a[key] > b[key]) ? 1 : -1) }
	if (direction === 'D') { arr.reverse() }
	return arr
}
/**syntactic sugar for selfFilter(arr, predicate).removedItems */
export const spliceIf = <T>(arr: T[], predicate: (arg1: T) => boolean) => selfFilter(arr, predicate).removedItems
/**Remove X amount of items from the end of an array */
export const spliceLast = <T>(arr: T[], count: number) => arr.splice(-count)

/**This is a SAMPLE, use tryF_get to set tryF_get and use it without having to pass errorHandler everytime*/
export const tryF_sample = <T extends (...args: any) => any>(errorHandler: T, fn: T, args: Parameters<T>): void => {
	try { return fn(...args as Parameters<T>[]) }
	catch (err) { errorHandler(err as Error) }
}
/**Promise-based delay that BREAKS THE LIMIT OF setTimeOut*/
export const delay = (x: number) => {
	return new Promise(resolve => {
		const interval = (i: number, miliseconds: number) => {
			setTimeout(() => { if (i) { interval(i - 1, maxTimeOut) } else { resolve(true) } }, miliseconds)
		}

		const maxTimeOut = 1000 * 60 * 60 * 24
		const loopsNeeded = Math.floor(x / maxTimeOut)
		const leftOverTime = x % maxTimeOut
		interval(loopsNeeded, leftOverTime)
	})
}
/**Self-explanatory */
export const isEven = (number: number) => !isOdd(number)
/**Self-explanatory */
export const isOdd = (number: number) => Boolean(Number(number) % 2)
/**Returns whether a number is either the minimum provided, the maximum provided or any number in-between */
export const isWithinRange = (number: number, max: number, min: number) => number <= max && number >= min
/**Returns a number up to (but not included) provided max, eg: roll(1) will ALWAYS return zero */
export const roll = (maxRoll: number) => Math.floor(Math.random() * Number(maxRoll))
/**Convert a timestamp to DD/MM/YYYY (plus HH:MM:SS includeHours) */
export const timeStampToDate = (timeStamp: number, includeHours: boolean) => {
	const asDate = new Date(timeStamp)
	const clockTime = `${asDate}`.slice(16, 24)
	let x = `${(asDate.getMonth() + 1)}/${(asDate.getDate() + 1)}/${asDate.getFullYear()}`
	if (includeHours) { x += ` ${clockTime}` }
	return x
}
/**1 becomes '1st' , 2 becomes '2nd', 3 becomes '3rd' and so on */
export const toOrdinal = (number: number) => {
	const asString = String(number)
	const lastDigit = asString[asString.length - 1]
	if ([11, 12, 13].includes(Number(number))) { return `${number}th` }

	switch (lastDigit) {
		case '1': return `${number}st`
		case '2': return `${number}nd`
		case '3': return `${number}rd`
		default: return `${number}th`
	}
}
/**Return a copy that can be altered without having to worry about modifying the original */
export const deepClone = <T>(x: T) => JSON.parse(JSON.stringify(x)) as T //TODO; submit
/**FOR CLIENT-SIDE CODE ONLY. Stringifies and downloads the provided data*/
export const downloadFile_client = (filename: string, fileFormat: '.txt' | '.json', data: unknown) => {
	clientOrServer_screener('client', () => {
		const a = document.createElement('a')
		a.href = window.URL.createObjectURL(new Blob([data as BlobPart], { type: 'text/plain' }))
		a.download = `${filename}${fileFormat}`
		a.click()
	})
}
/**Stringy an array/object so its readable, except for methods, eg: obj.sampleMethod becomes "[λ: sampleMethod]" */
export const stringify = (x: unknown) => {

	// ! order matters, do NOT change it
	if (x === null) { return 'null' }
	if (typeof x === 'number' && isNaN(x)) { return 'NaN' }
	if (!x) { return typeof x }
	if (typeof x !== 'object') { return `${x}` }
	if (Array.isArray(x)) { return x.map(x => JSON.stringify(x)) } //TODO: it was => stringify but reaches stack overflow in browser

	const stringified: { [key: string]: string } = {}

	Object.entries(x).forEach(entry => {
		const [key, value] = entry
		stringified[key] = (function () {
			if (typeof value !== 'function') { return value }
			const asFunction: Function = value;

			return {
				'client': asFunction.toLocaleString(),
				'server': `[λ: ${key}]`
			}[clientOrServer_is()]
		}())
	})

	return JSON.stringify(stringified)
}
/**Wrapper for functions that can be run in either the client or server, with corresponding error handling/notifications */
const clientOrServer_screener = async <F extends (...args: any) => any>(wantedEnviremoent: 'server' | 'client', successHandler: F) => {

	const error = `'${successHandler.name}' is only meant for ${wantedEnviremoent}-side use! If you see this I messed up, pls report it`
	const clientOrServer_is = () => wantedEnviremoent
	const enviroment = clientOrServer_is()

	if (enviroment === wantedEnviremoent) { return await successHandler() }
	if (enviroment === 'server') { colorLog_big('danger', error) }
	if (enviroment === 'client') { alert(error) }
}
/**FOR CLIENT-SIDE CODE ONLY. Copy anything to the clipboard, objects/arrays get parsed to be readable*/
export const copyToClipboard = (x: any) => {
	clientOrServer_screener('client', () => {
		const text = stringify(x) as string
		const a = document.createElement('textarea')
		a.innerHTML = text
		document.body.appendChild(a)
		a.select()
		document.execCommand('copy')
		document.body.removeChild(a)
	})
}
/**Returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export const isGuest = (username: string) => /Guest[0-9]{13}/i.test(`${username}`)
/**Returns an string with its linebreaks converted into simple one-char spaces */
export const toSingleLine = (sentence: string) => `${sentence}`.replace(/ {0,}\n {0,}/g, ' ')
/**Check if the code is running in the client or in the server */
export function clientOrServer_is() {
	const isServer = [typeof window, typeof document].includes('undefined')
	return isServer ? 'server' : 'client'
}
/**For obligatory callbacks */
export function doNothing() { }
/**Map a collection of passable-arguments-of-a-function against said function //TODO: find use cases for this jewel maybe */
const mapArgsOfFnAgainstFn = <F extends (...args: any) => any>(fn: F, ...argsArr: Parameters<F>[]) => {
	//TODO: make this await promises.all in case fn is async
	return argsArr.map(args => fn(args))
}
/**function to generate newToast_client with a predertemined $bvToast so it doesnt have to be passed everytime :D */
export const newToast_client_get: (bvToast: bvToast) => newToastFn = ($bvToast: bvToast) => {
	const newToast: newToastFn = (title: string, message: string, variant: validVariant) => {
		const colorLog_red = (message: string) => function () { colorLog('danger', message, true) }
		zodCheck_sample(colorLog_red, zValidVariants, variant)

		$bvToast.toast(message, {
			toaster: 'b-toaster-bottom-right',
			autoHideDelay: 5000,
			solid: true,
			variant,
			title
		})
	}
	return newToast
}
/**Put the current function on-hold until the given condition is meet */
export async function until(condition: boolean) { while (!condition) { await delay(500) } }
/**This is a SAMPLE, use newToast_client_get to set newToast_client and use it without having to pass $bvToast everytime*/
export const newToast_client_sample = ($bvToast: bvToast, title: string, msg: string, variant: validVariant) => {
	$bvToast.toast(msg, {
		toaster: 'b-toaster-bottom-right',
		autoHideDelay: 5000,
		solid: true,
		variant,
		title
	})
}
/**Simple and standard functional programming pipe. Deprecated, use either zPipe (persistenType with zod errors) or pipe_mutableType! */
export const pipe_persistentType = <T>(initialValue: T, ...fns: pipe_persistent_type<T>[]) => {
	return fns.reduce((result, fn) => fn(result), initialValue)
}
/**
* Pipes a value through a number of functions in the order that they appear.
* Takes between 1 and 12 arguments. `pipe(x, a, b)` is equivalent to `b(a(x))`.
* If only one argument is provided (`pipe(x)`), this will produce a type error but JS will run fine (and return `x`).
*/
export const pipe_mutableType: pipe_mutable_type = (source: unknown, ...project: ((value: unknown) => unknown)[]): unknown => {
	return project.reduce((accumulator, element) => element(accumulator), source)
}
/**
 * Retry a function up to X amount of times or until it is executed successfully, mainly for fetching/requesting stuff
 * @param fn The function to be retried hoping it returns successfully
 * @param args Arguments to pass to fn
 * @param retriesLeft number, is reduced by 1 every attempt, retryF stops when it reaches 0
 * @param defaultReturn data to be returned as returnType of fn if retryF fails
 * @param delayBetweenRetries delay between each retry in milliseconds
 * @returns 'data: returned by fn if ran sucessfully. | wasError: if the retries ran out without sucess '
 */
export const retryF = async <F extends (...args: any) => any>(
	fn: F,
	args: Parameters<F>,
	retriesLeft: number,
	defaultReturn: ReturnType<F>,
	delayBetweenRetries: number,
): Promise<{ data: ReturnType<F>, was: 'success' | 'failure' }> => {
	try {
		const data = await fn([args])
		return { data, was: 'success' }
	}
	catch (error) {
		const message = `retryF > ${fn.name} > ${retriesLeft} retriesLeft. {${error}}`
		colorLog('warning', `${message}`, false)

		if (!retriesLeft) { return { data: defaultReturn, was: 'failure' } }
		await delay(delayBetweenRetries)
		return await retryF(fn, args, retriesLeft - 1, defaultReturn, delayBetweenRetries)
	}
}
/**Track vue components in a global window array to easily find them and use them with socket.io events*/
export const trackVueComponent = (name: string, componentConstructor: trackedVueComponent) => {

	if (!BTR.zValidVueComponentName) { alert(`Error tracking Vue component, BTR.zValidVueComponentName hasn't been set yet`); return }
	zodCheck_sample(alert, BTR.zValidVueComponentName, name)

	const logAllComponents = () => colorLog('dark', `window.vueComponents: ${window.vueComponents.map(x => x._name)}`, true)
	colorLog('primary', `Component '${name}' registered to Vue`, true)
	if (!window.vueComponents) { window.vueComponents = [] }
	componentConstructor._name = name as string

	componentConstructor.beforeCreate = () => {
		window.vueComponents.push(componentConstructor)
		colorLog('success', `Component '${name}' created and added to window.vueComponents`, true)
		logAllComponents()
	}

	componentConstructor.beforeDestroy = () => {
		selfFilter(window.vueComponents, (x) => x !== componentConstructor)
		colorLog('danger', `Component '${name}' destroyed and removed from window.vueComponents`, true)
		logAllComponents()
	}

	return componentConstructor
}
/**For Functions that require initialization (tryF and zodCheck for their errorHandlers, newToast_client for $bvToast) */
export function warnAboutUnproperlyInitializedFunction(fn: 'tryF' | 'newToast_client' | 'zodCheck') {

	const firstArgument = fn === 'newToast_client' ? '$bvToast' : 'errorHandler'
	const firstArgumentCaps = fn === 'newToast_client' ? "BOOTSTRAP'S_$BVTOAST_HERE" : 'YOUR_ERROR_HANDLER_HERE'

	const error = toSingleLine(`THIS FUNCTION (${fn}) HAS NOT BEEN PROPERLY INITIALIZED YET. 
			Call ${fn} = ${fn}_get(${firstArgumentCaps}) with a proper ${firstArgument} to do so😉`)

	const isClientOrServer = clientOrServer_is()
	if (isClientOrServer === 'client') { alert(error) }
	if (isClientOrServer === 'server') { colorLog_big('warning', error) }
}
/**function to generate zodCheck with a predertemined errorHandler so it doesnt have to be passed everytime :D */
export const zodCheck_get = (errorHandler: (err: string) => void) => {
	function zodCheck<T>(schema: zSchema<T>, data: T) {
		const result = schema.safeParse(data) as SafeParseReturnType<T, null>
		if (result.success === false) { errorHandler(fromZodError(result.error).message) }
		return result.success
	}
	return zodCheck
}
/**This is a SAMPLE, use zodCheck_get to set zodCheck and use it without having to pass errorHandler everytime*/
export const zodCheck_sample = <T>(errorHandler: (err: string) => void, schema: zSchema<T>, data: T) => {
	const result = schema.safeParse(data) as SafeParseReturnType<T, null>
	if (result.success === false) { errorHandler(fromZodError(result.error).message) }
	return result.success
}
/**
 * Check data against a provided schema, and execute either the success or error handler
 * @param zSchema The zSchema to test data against
 * @param data The data to be tested against zSchema
 * @param successHandler The function that will execute if data fits zSchema
 * @param args The arguments to be applied to successHandler
 * @param errorHandler The function that will execute if data does NOT fits zSchema
 */
// ? TODO: maybe make it a placeholder and create an initialized that pre-determines the errorHandler like with zodCheck and zodCheck_get 
export const zodCheckAndHandle = <D, SH extends (...args: Parameters<SH>) => ReturnType<SH>>(
	/**wanted schema */
	zSchema: zSchema<D>,
	/**data to test against the schema */
	data: D,
	/**function that executes if the data does fit the schema */
	successHandler: SH,
	/**arguments to apply to the success function shall it be executed */
	args: Parameters<SH>,
	/**function that executes if the data doesn't fit the schema, does something with the error message */
	errorHandler: (errorMessage: string) => void,
) => {
	/**whether the data fits the schema or not */
	const zResult = zSchema.safeParse(data)
	/**data doesn't fit, execute errorHandler with the error message x_X */
	if (zResult.success === false) { errorHandler(fromZodError(zResult.error).message) }
	/**data fits, execute success handler with the passed arguments :D */
	if (zResult.success === true && successHandler) { successHandler(...args as Parameters<SH>) }
}
/**Pipe with schema validation and error logging */
export const zPipe = <T>(zSchema: zSchema<T>, initialValue: T, ...fns: pipe_persistent_type<T>[]) => {
	const nullString = null as unknown as string
	const initialPipeState = { value: initialValue, error: nullString, failedAt: nullString }

	return fns.reduce((pipeState, fn, index) => {
		if (pipeState.error) { return pipeState }
		pipeState.value = fn(pipeState.value)
		const zResult = zSchema.safeParse(pipeState.value)
		if (zResult.success === false) {
			pipeState.failedAt = `Step ${index + 1}: ${fn.name}`
			pipeState.error = fromZodError(zResult.error).message
		}
		return pipeState
	}, initialPipeState)
}




_
// * UNCOMMENTTHISFORTHECLIENT const colorLog = (color, message) => console.log(`%c${message}`, `color: ${color};`)
_
// ! DELETEEVERYTHINGBELOW, as it is only meant for server-side use
_

/**FOR NODE-DEBUGGING ONLY. Log a message surrounded by a lot of asterisks for visibility, all in RED */
export const colorLog_big = (variant: validVariant, message: string) => {
	clientOrServer_screener('server', () => {
		const log = (message: string) => colorLog(variant, message, true)
		const logAsterisks = (lines: number) => { for (let i = 0; i < lines; i++) { log('*'.repeat(150)) } }

		logAsterisks(3)
		log(message)
		logAsterisks(3)
	})
}
/**console.log WITH COLORS :D */
export const colorLog = async (variant: validVariant, message: string, bold: boolean) => {

	const colors: { [key in validVariant]: validChalkColor } = {
		primary: 'blue',
		secondary: 'grey',
		success: 'green',
		warning: 'yellow',
		danger: 'red',
		info: 'cyan',
		light: 'white',
		dark: 'magenta',
		"outline-dark": 'magentaBright'
	}

	const chalk = (await import('chalk')).default
	const fn = chalk[colors[variant]]
	console.log(bold ? fn.bold(message) : fn(message))
}

/**FOR NODE-DEBUGGING ONLY. Stringifies and downloads the provided data*/
export const downloadFile_node = async (filename: string, fileFormat: '.txt' | '.json', data: unknown, killProcessAfterwards: boolean) => {
	clientOrServer_screener('server', async () => {
		const formatted = stringify(data as object)
		const dateForFilename = timeStampToDate(Date.now(), true).replace(/\/| |\:/g, '_')
		const completeFilename = filename + '_' + dateForFilename + fileFormat

		colorLog('info', `Downloading ${completeFilename}..`, false)
		await fs.promises.writeFile(completeFilename, formatted)
		colorLog('success', 'Done!', false)

		if (!killProcessAfterwards) { return }
		if (process.env.quokka) { return }

		killProcess('dark', 'Killing process now :D')
	})
}
/**fetch the latest package.json of my-utils */
export const getLatestPackageJsonFromGithub = async () => {
	type response_github_file = { content: string }
	const fetch = (await import('node-fetch')).default

	const response: response_github_file = await new Promise((resolve) => {
		fetch('https://api.github.com/repos/botoron/utils/contents/package.json', { method: 'GET' }
		).then((res: any) => res.json().then((packageJson: any) => resolve(packageJson)))
	})

	return Buffer.from(response.content, 'base64').toString('utf8')
}
/**
 * Return the main perma-dependencies, check myUtil's version and print package.json's script
 * @param appName The name of the app, for the divine error ping
 * @param pingMeOnErrors Whether to ping me in Discord with the console.trace of errors or just colorLogBig  
 * @param packageJson The package.json of the app, to compare the installed vs latest version of this myUtils package
 * @param erisToken The token for DivineBot, should reside in .env
 * @param mongoUri The uri for Mongo, should reside in .env
 * @param port The dev port, should reside in .env
 * @returns divineBot, divineError, io, mongoClient, tryF
 */
export const getMainDependencies = async (
	appName: string,
	packageJson: packageJson,
	pingMeOnErrors: boolean,
	erisToken: string,
	mongoUri: string,
	port: number
) => {

	const { divineBot } = await getDivineBotAndError()
	const mongoClient = await getMongoClient()
	const io = startServerAndGetIO()
	const z = await import('zod')

	myUtils_checkIfUpToDate(divineError)
	const tryF = tryF_get(divineError)
	showPackageJsonScripts_project()

	return { divineBot, divineError, io, mongoClient, tryF }

	/**notify me about things breaking via discord, if pingMeOnErrors is passed as true */
	function divineError(arg: string | Error) {
		const x = (typeof arg === 'string' ? arg : arg.stack) as string
		const error = `${x}`.replace(/\(node:3864\).{0,}\n.{0,}exit code./, '')
		if (pingMeOnErrors) { colorLog('danger', error, true); return }

		const theMessage = `<@470322452040515584> - (${appName}) \n ${error}`

		const divineOptions = { content: theMessage, allowedMentions: { everyone: true, roles: true } }
		divineBot.createMessage('1055939528776495206', divineOptions)
	}

	async function getDivineBotAndError() {
		const divineBot = Eris(erisToken)
		connectToDiscord()
		await until(divineBot.ready)

		return { divineBot, divineError }

		function connectToDiscord() {

			const divinePrepend = '***DivineBot:***'


			divineBot.on('messageReactionAdd', (a: Eris.PossiblyUncachedMessage, b: Eris.PartialEmoji, c: Eris.Member) => role('add', a, b, c))
			divineBot.on('messageReactionRemove', (a: Eris.PossiblyUncachedMessage, b: Eris.PartialEmoji, c: Eris.Member) => role('remove', a, b, c))
			divineBot.on('disconnect', () => { colorLog('danger', `${divinePrepend}: Disconnected D: ... retrying!`, false); connectToDiscord() })

			const idOfRoleAssigningMessage = '822523162724925473'
			connectToDiscord()

			function role(action: 'add' | 'remove', message: Eris.PossiblyUncachedMessage, emoji: Eris.PartialEmoji, reactor: Eris.Member) {
				try {
					if (message.id !== idOfRoleAssigningMessage) { return }

					const role = [
						{ app: 'UntCG', emoji: 'cards', id: 'SAMPLEROLEID' },
						{ app: 'CwCA', emoji: 'chess', id: 'SAMPLEROLEID' },
						{ app: 'Cool', emoji: 'cool', id: 'SAMPLEROLEID' },
						{ app: 'Divine', emoji: 'divine', id: 'SAMPLEROLEID' },
						{ app: 'Bluejay', emoji: 'bluejay', id: 'SAMPLEROLEID' },
						{ app: 'Cute', emoji: 'cute', id: 'SAMPLEROLEID' },
					].find(x => x.emoji === emoji.name)

					if (role) { ({ add: reactor.addRole, remove: reactor.removeRole })[action](role.id) }
				}
				catch { doNothing() }
			}

			async function connectToDiscord() {
				try { divineBot.connect().then(() => colorLog('success', `${divinePrepend} Connected successfully^^`, false)) }
				catch {
					colorLog('warning', `${divinePrepend} Failed to connect.. retrying >:D`, false)
					await delay(1000 * 10)
					connectToDiscord()
				}
			}
		}
	}

	async function getMongoClient() {
		const mongo = new mongodb.MongoClient(mongoUri)
		let mongoClient: MongoClient = null as unknown as MongoClient
		mongo.connect((err, client) => { if (err) { throw err } mongoClient = client as MongoClient })
		await until(Boolean(mongoClient))
		return mongoClient
	}

	/**
		 * @description Checks if the project is using the latest version of "myUtils"
		 * @param failureHandler divineError, to notify/warm me to update the project to work with the newest version of "myUtils" if not already using it
		 * @returns a boolean, although I'm not sure what I should it for (if for anything) yet
		 */
	async function myUtils_checkIfUpToDate(failureHandler: (message: string) => void) {

		const latestVersion = await getLatestVersion()
		const installedVersion = (await import('./package.json', { assert: { type: "json" } })).default.version
		if (installedVersion === latestVersion) { colorLog('info', '@botoron/my-utils is up to date 👍', false); return }

		const failureMessage = getFailureMessage()
		colorLog_big('warning', failureMessage)
		failureHandler(failureMessage)

		function getFailureMessage() {
			return toSingleLine(`
				Project is using an outdated version of myUtils, 
				- (${installedVersion} vs ${latestVersion}) -
				PLEASE UPDATE:          npm i @botoron/my-utils`)
		}

		async function getLatestVersion() {
			type pck = { objects: [{ package: { version: string } }] }
			const response: pck = (await new Promise((resolve) => {
				try { fetch(`http://registry.npmjs.com/-/v1/search?text=@botoron/utils&size=1`).then(res => res.json().then(x => resolve(x))) }
				catch { return { objects: [{ package: { version: '0' } }] } }
			}))
			return response.objects[0].package.version
		}
	}

	/**console table the scripts of the project's package json 
	 //TODO: maybe validate them too? (as in, should be npm run start/dev/transpile/installUtils ? 
	 //TODO: maybe make a version for my utils? (how hard is it to just open package.json lol)
	 */
	async function showPackageJsonScripts_project() {
		const margin = ' '.repeat(10)
		const data = Object.entries(packageJson.default.scripts).map(x => ({ script: `${margin}npm run ${x[0]}${margin}`, command: x[1] }))
		console.table(data)
	}

	async function startServerAndGetIO() {

		const express = (await import('express')).default
		const http = await import('http')
		const path = await import('path')

		const app = express()
		const server = http.createServer(app)
		app.use(express.static(path.resolve() + '/public'))
		app.get('/', (_request, response) => response.sendFile(path.resolve() + 'public/index.html'))
		server.listen(port, () => delay(1500).then(() => console.log(`server up at: http://localhost:${port}/`)))
		const io = require('socket.io')(server, { cors: { origin: '*', } })
		return io
	}

	function tryF_get(failureHandler: (err: Error) => void) {
		/**tryCatch wrapper for functions with DivineError as the error handler */
		function tryF() {
			const x = <T extends (...args: any) => any>(fn: T, args: Parameters<T>): any => {
				try { return fn(...args as Parameters<T>[]) }
				catch (err) { failureHandler(err as Error) }
			}
			return x
		}
		return tryF
	}
}
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export const killProcess = (variant: validVariant, message: string) => {
	clientOrServer_screener('server', async () => {
		colorLog_big(variant, message)
		await delay(1000)
		process.kill(process.pid)
	})
}
/**Easily run the scripts of this package.json */
export const npmRun = async (npmCommand: validNpmCommand) => {

	const killCommandLine = () => killProcess('dark', 'Process over')
	const successLog = (message: string) => colorLog('success', message, false)
	const questionAsPromise = (question: string) => new Promise(resolve => readline.question(question + '\n', resolve)) as Promise<string>
	const readline = getReadLine.createInterface({ input: process.stdin, output: process.stdout })
	const commitTypes = '(fix|feat|build|chore|ci|docs|refactor|style|test)'
	const { exec, execSync } = await import('child_process')

	if (npmCommand === 'gitPush') { prompCommitMessage(null as unknown as string) }
	if (npmCommand === 'transpile') { transpileFiles(killCommandLine) }
	if (npmCommand === 'publish') { transpileFiles(promptVersioning) }

	async function prompCommitMessage(versionIncrement: string) {

		const commitMessage = await questionAsPromise(`Enter commit type ${commitTypes} plus a message:`)
		function tryAgain(error: string) { colorLog('warning', error, false); prompCommitMessage(versionIncrement); return }
		if (!zodCheck_sample(tryAgain, get_zValidCommitMessage(), commitMessage)) { return }

		if (npmCommand === 'gitPush') { await addLineToFutureVersion() }
		if (npmCommand === 'publish') { addLineAsNewVersion(versionIncrement) }
		gitAddCommitPush()
		if (npmCommand === 'gitPush') { killCommandLine() }
		if (npmCommand === 'publish') { upVersion_publish_updateChangelog_andKillCommandLine() }

		return

		async function addLineToFutureVersion() {
			let changelog = await fs.promises.readFile('./changelog.MD', 'utf8')
			while (['\n', ' '].includes(changelog[0])) { changelog = changelog.slice(1) }
			const lines = changelog.split('\n')
			lines.splice(0, 0, ' '.repeat(10) + commitMessage)
			const newChangelog = lines.join('\n')
			console.log({ newChangelog })
			await fs.promises.writeFile('./changelog.MD', newChangelog)
			colorLog('info', 'commit added to the changelog for a yet-to-be-released version', false)
		}

		async function addLineAsNewVersion(versionIncrement: string) {
			const changelog = await fs.promises.readFile('./changelog.MD', 'utf8')
			const lines = changelog.split('\n')

			if (versionIncrement === 'major') { lines.splice(0, 0, `${'#'.repeat(125)}`) }
			if (versionIncrement === 'minor') { lines.splice(0, 0, '') }

			const newLine = '#'.repeat(10) + commitMessage
			lines.splice(0, 0, newLine)
			const newChangelog = lines.join('\n')
			await fs.promises.writeFile('./changelog.MD', newChangelog)
		}

		function get_zValidCommitMessage() {
			const commitRegex = new RegExp(`(?<!.)${commitTypes}:`)
			return z.string().min(15).max(50).regex(commitRegex, `String must start with ${commitTypes}:`)
		}

		function gitAddCommitPush() {
			execSync('git add .')
			successLog('git add . ✔️')

			colorLog('info', 'Copypaste the commit message in the git commit editor, then save and close it:', false)
			colorLog('secondary', commitMessage, true)
			console.log('')
			execSync("git commit")
			successLog('git commit ✔️')

			execSync('git push')
			successLog('git push ✔️')
		}

		async function upVersion_publish_updateChangelog_andKillCommandLine() {
			execSync(`npm version ${versionIncrement}`)
			execSync('npm publish')
			successLog('package.json up-version\'d and published to npm')

			await replaceTagsInChangelogWithNewVersion()
			await delay(5000)
			killCommandLine()

			//TODO: the version in the published package will still be behind 
			//TODO: (because changelog only updated version after it gets upversion'd and published)

			async function replaceTagsInChangelogWithNewVersion() {
				const updatedPackageJson = await import('./package.json', { assert: { type: "json" } })
				const newVersion = updatedPackageJson.default.version

				const spacesAfterVersion = ' '.repeat(9 - newVersion.length)
				const stringToReplaceTheTags = `${newVersion}.${spacesAfterVersion}`

				const changelog = await fs.promises.readFile('./changelog.MD', 'utf8')
				const newChangelog = changelog.replace('#'.repeat(10), stringToReplaceTheTags)
				await fs.promises.writeFile('./changelog.MD', newChangelog)
			}
		}
	}

	async function promptVersioning() {
		const versionIncrement = await questionAsPromise('Type of package version increment (major, minor, patch)?')
		function tryAgain(error: string) { colorLog('warning', error, false); promptVersioning() }
		if (!zodCheck_sample(tryAgain, zValidVersionIncrement, versionIncrement)) { return }
		prompCommitMessage(versionIncrement)
	}

	function transpileFiles(followUp: Function) {
		exec('tsc --declaration --target esnext index.ts', async () => {
			successLog('files transpiled ✔️')
			await createdTrimmedVersionForBrowser('.js')
			await createdTrimmedVersionForBrowser('.ts')
			successLog('browser versions emitted ✔️')
			await delay(500)
			followUp()

			async function createdTrimmedVersionForBrowser(extension: '.js' | '.ts') {
				const indexTs = await fs.promises.readFile(`./index${extension}`, 'utf8')
				const lines = indexTs.replace('/\/ * UNCOMMENTTHISFORTHECLIENT ', '').replace("'./deps'", "'../deps'").split('\n')
				const cutPoint = lines.findIndex(x => /DELETEEVERYTHINGBELOW/.test(x))
				if (cutPoint === -1) { colorLog_big('danger', 'CUT POINT FOR REATING THE CLIENT-SIDE VERSION NOT FOUND'); return }

				const newChangelog = lines.splice(0, cutPoint).join('\n')
				await fs.promises.writeFile(`./client/forBrowser${extension}`, newChangelog)
			}


		})
	}
}

/**
 * How to access process arguments passed by the command line:
	pass:	--[NoA_1]=[VoA_1] --[NoA_2]=[VoA_2]
	read: process.env.[npm_config_[nameOfArgument]]
*/

/*
	npm run transpile_upversion_commit_and_publish
 *
 * Regarding passing a function with its arguments to another function
 * 
 * looks like														is called as								must apply as										explanation
 * wrppr(fn: F, args: Parameters<F>)		xyz(fn, [...fn.args])				fn(...args as Parameters<F>[])	"args" is passed as an array
 * wrppr(fn: F, ...args: Parameters<F>)	xyz(fn, arg1, arg2, etc..)	fn(...args as Parameters<F>[])  "..args" is spread into an array
 * 
 * EITHER WAY the arguments must be applied to fn as "fn(...args)" where "args = Parameters<F>[]"
 * 
 ? WHICH TO USE 
 * Both are effectively the same, it's a question of taste
 * Option A is clear in that it makes you pass all of fn.args encapsulated into a single array argument
 * Option B is cooler in that it adjusts the length of the arguments needed as they will be spread by the wrapping function	 
 ! in B "args" must be spread parameters, meaning the MUST be the last arguments passed to "wrppr", A doesn't have this problem :)
 * // Answer: Use A, so make sure to stay consistent when doing this, but either way use this comment block as reference
 * 
 ! Extra
 * wrppr(fn: F, ...args: Parameters<F>[])
 * "...args" is actually a collection of args, where each item is valid conjunt of arguments for fn
 * so you can all on each item of "args", eg: args.forEach(x => fn(x))
 * (see mapArgsOfFnAgainstFn as an existing example)
 */

const command = process.env.npm_config_command as validNpmCommand
zodCheckAndHandle(zValidNpmCommand, command, npmRun, [command], console.log)












