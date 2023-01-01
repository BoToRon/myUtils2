let _
import fs from 'fs'	//DELETETHISFORCLIENT 
_
import eris from 'eris'	//DELETETHISFORCLIENT
_
import http from 'http'	//DELETETHISFORCLIENT
_
import path from 'path'	//DELETETHISFORCLIENT
_
import util from 'util' //DELETETHISFORCLIENT
_
import chalk from 'chalk'	//DELETETHISFORCLIENT
_
import express from 'express'	//DELETETHISFORCLIENT
_
import fetch from 'node-fetch'	//DELETETHISFORCLIENT
_
import getReadLine from 'readline'	//DELETETHISFORCLIENT
_
import { createRequire } from 'module'	//DELETETHISFORCLIENT
_
import { exec, spawn } from 'child_process'	//DELETETHISFORCLIENT
_
import mongodb, { MongoClient } from 'mongodb'	//DELETETHISFORCLIENT
_
import { fromZodError } from 'zod-validation-error'
_
import { z, type SafeParseReturnType } from 'zod'

_ /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_ /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_ /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_ /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_ /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_ /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_ /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_ /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_ /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_ /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/

export const zValidVariants = z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark'])
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null
const zValidVersionIncrement = z.enum(['major', 'minor', 'patch'])	//DELETETHISFORCLIENT
const zValidNpmCommand = z.enum(['git', 'publish', 'transpile'])

_ /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_ /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_ /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_ /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_ /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_ /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_ /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_ /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_ /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_ /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/

export type btr_trackedVueComponent = { _name: string, beforeCreate?: () => void, beforeDestroy?: () => void }
export type btr_newToastFn = (title: string, message: string, variant: btr_validVariant) => void
export type btr_intervalWithid = [id: string, interval: NodeJS.Timer]
export type btr_globalAlert = { message: string, show: boolean }
export type btr_validVariant = z.infer<typeof zValidVariants>

type toastOptions = { toaster: string, autoHideDelay: number, solid: boolean, variant: btr_validVariant, title: string }
type validChalkColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'grey' | 'magentaBright'	//DELETETHISFORCLIENT
type packageJson = { name: string, version: string, scripts: { [key: string]: string } }
type bvToast = { toast: (message: string, toastOptions: toastOptions) => void }
type zSchema<T> = { safeParse: (x: T) => SafeParseReturnType<T, T> }
type validNpmCommand = z.infer<typeof zValidNpmCommand>	//DELETETHISFORCLIENT
type errorMessageHandler = (message: string) => void
type pipe_persistent_type<T> = (arg: T) => T
type pipe_mutable_type = {
	<T, A>(source: T, a: (value: T) => A): A
	<T, A, B>(source: T, a: (value: T) => A, b: (value: A) => B): B
	<T, A, B, C>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C): C
	<T, A, B, C, D>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D): D
	<T, A, B, C, D, E>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D, e: (value: D) => E): E
	//can always make it longer 😉
}

_ /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_ /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_ /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_ /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_ /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_ /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_ /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_ /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_ /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_ /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/

/**(generates a function that..) Creates a new 5-seconds toast in the lower right corner */
export const newToast_client_curry = ($bvToast: bvToast) => {
	const body: btr_newToastFn = (title: string, message: string, variant: btr_validVariant) => {
		if (!zodCheck_curry(alert)(zValidVariants, variant)) { return }
		$bvToast.toast(message, {
			toaster: 'b-toaster-bottom-right',
			autoHideDelay: 5000,
			solid: true,
			variant,
			title
		})
	}
	return body
}
/**(generates a function that:) Tests data against an scheme, and executes a predefined errorHandler if case it isn't a fit. */
export const zodCheck_curry = (errorHandler: errorMessageHandler) => {
	function zodCheck<T>(schema: zSchema<T>, data: T) {
		function body<T>(errorHandler: errorMessageHandler, schema: zSchema<T>, data: T) {
			const result = schema.safeParse(data) as SafeParseReturnType<T, null>
			if (result.success === false) { errorHandler(fromZodError(result.error).message) }
			return result.success as boolean
		}
		return body(errorHandler, schema, data)
	}
	return zodCheck
}
/**(generates a function that:) Adds/removes a vue component into the window for easy access/debugging */
export const trackVueComponent_curry = <T>(zValidVueComponentName: zSchema<T>) => {

	return function trackVueComponent(name: T, componentConstructor: btr_trackedVueComponent) {

		if (!zodCheck_curry(alert)(zValidVueComponentName, name)) { return componentConstructor }
		colorLog('blue', `Component '${name}' registered to Vue`)
		if (!window.vueComponents) { window.vueComponents = [] }

		return getComponent(name, componentConstructor)

		function toggleComponent(logger: errorMessageHandler) {
			const { action } = addOrRemoveItem(window.vueComponents, componentConstructor)
			logger(`Component '${name}' ${action} to/from window.vueComponents`)
			logAllComponents()
		}

		function getComponent(name: T, componentConstructor: btr_trackedVueComponent) {
			componentConstructor.beforeCreate = () => toggleComponent(successLog)
			componentConstructor.beforeDestroy = () => toggleComponent(errorLog)
			componentConstructor._name = name as string
			return componentConstructor
		}

		function logAllComponents() {
			colorLog('magenta', `window.vueComponents: ${window.vueComponents.map(x => x._name)}`)
		}
	}
}

_ /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_ /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_ /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_ /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_ /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_ /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_ /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_ /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_ /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_ /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/

/**Adds an item to an array, or removes it if it already was added. Returns the action applied and the array */
export const addOrRemoveItem = <T>(arr: T[], item: T) => {
	let x: 'added' | 'removed'
	const isInArray = arr.includes(item)
	if (!isInArray) { arr.push(item); x = 'added' }
	else { removeItem(arr, item); x = 'removed' }
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
/**Compare array A to array B, returns the answer along ab error message, if any */
export const compareArrays = <T>(
	myArray: T[],
	comparisonType: 'isEqualTo' | 'hasAllItemsOf' | 'isPartialOf',
	desiredArray: T[]
) => {

	const missingItems = desiredArray.filter(x => !myArray.includes(x))
	const nonDesiredItems = myArray.filter(x => !desiredArray.includes(x))
	const arraysAreEqual = !nonDesiredItems.length && !missingItems.length && myArray.length === desiredArray.length

	if (comparisonType === 'isPartialOf') { return answerWithMaybeError(!nonDesiredItems.length) }
	if (comparisonType === 'hasAllItemsOf') { return answerWithMaybeError(!missingItems.length) }
	if (comparisonType === 'isEqualTo') { return answerWithMaybeError(arraysAreEqual) }
	return answerWithMaybeError(false)

	function answerWithMaybeError(answer: boolean) {
		const errorMessage = answer ? nullAs.string() : getTraceableStack(`"array_A ${comparisonType} array_B" = ${answer}`)
		return { answer, errorMessage }
	}
}
/**syntax sugar for arr[arr.length - 1] */
export const getLastItem = <T>(arr: T[]) => arr[arr.length - 1]
/**returns a random item along its index */
export const getRandomItem = <T>(arr: T[]) => { const r = roll(arr.length); return { item: arr[r], index: r } }
/**Returns a version of the provided array without repeating items */
export const getUniqueValues = <T>(arr: T[]) => [...new Set(arr)]
/**Map a collection of passable-arguments-of-a-function against said function //TODO: find use cases for this jewel maybe */
export const mapArgsOfFnAgainstFn = <F extends (...args: any) => any>(fn: F, ...argsArr: Parameters<F>[]) => {
	//TODO: make this await promises.all in case fn is async
	return argsArr.map(args => fn(args))
}
/**Remove a single item from an array, or all copies of that item if its a primitive value */
export const removeItem = <T>(arr: T[], item: T) => selfFilter(arr, (x: T) => x !== item).removedCount
/**Remove items from an array that DONT fulfill the given condition, returns the removed items and their amount */
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
/**Transfer items that meet a given condition from one array to another */
export const transferItems = <T>(origin: T[], destination: T[], predicate: (arg1: T) => boolean) => {
	const x = selfFilter(origin, predicate)
	destination.push(...x.removedItems)
	return { transferedCount: x.removedCount }
}

_ /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_ /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_ /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_ /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_ /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_ /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_ /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_ /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_ /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_ /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/

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
/** Retry a function up to X amount of times or until it is executed successfully, mainly for fetching/requesting stuff */
export const retryF = async <F extends (...args: any) => any>(
 /**The function to be retried hoping it returns successfully */	fn: F,
	/**Arguments to pass to fn */ args: Parameters<F>,
	/**Number, is reduced by 1 every attempt, retryF stops when it reaches 0 */ retriesLeft: number,
	/**Data to be returned as returnType of fn if retryF fails */ defaultReturn: ReturnType<F>,
	/**Delay between each retry in milliseconds */ delayBetweenRetries: number,
): Promise<{ data: ReturnType<F>, was: 'success' | 'failure' }> => {
	try { return { data: await fn([args]), was: 'success' } }
	catch (error) {
		colorLog('yellow', `retryF > ${fn.name} > ${retriesLeft} retriesLeft. {${error}}`)
		if (!retriesLeft) { return { data: defaultReturn, was: 'failure' } }

		await delay(delayBetweenRetries)
		return await retryF(fn, args, retriesLeft - 1, defaultReturn, delayBetweenRetries)
	}
}
/** Check data against a provided schema, and execute either the success or error handler */
// ? TODO: maybe make it a placeholder and create an initialized that pre-determines the errorHandler like with zodCheck and zodCheck_get 
export const zodCheckAndHandle = <D, SH extends (...args: Parameters<SH>) => ReturnType<SH>>(
	/** The zSchema to test data against */	zSchema: zSchema<D>,
	/** The data to be tested against zSchema */	data: D,
	/** The function that will execute if data fits zSchema */	successHandler: SH,
	/** The arguments to be applied to successHandler */	args: Parameters<SH>,
	/** The function that will execute if data does NOT fits zSchema */ errorHandler: errorMessageHandler,
) => {
	const zResult = zSchema.safeParse(data)
	if (zResult.success === false) { errorHandler(fromZodError(zResult.error).message) }
	if (zResult.success === true && successHandler) { successHandler(...args as Parameters<SH>) }
}
/**Pipe with schema validation and error logging */
export const zPipe = <T>(zSchema: zSchema<T>, initialValue: T, ...fns: pipe_persistent_type<T>[]) => {
	const initialPipeState = { value: initialValue, error: nullAs.string(), failedAt: nullAs.string() }

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

_ /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_ /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_ /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_ /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_ /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_ /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_ /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_ /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_ /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_ /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/

/**Promise-based delay that BREAKS THE LIMIT OF setTimeOut*/
export const delay = (x: number) => {
	return new Promise(resolve => {
		const maxTimeOut = 1000 * 60 * 60 * 24
		const loopsNeeded = Math.floor(x / maxTimeOut)
		const leftOverTime = x % maxTimeOut
		interval(loopsNeeded, leftOverTime)

		function interval(i: number, miliseconds: number) {
			setTimeout(() => { if (i) { interval(i - 1, maxTimeOut) } else { resolve(true) } }, miliseconds)
		}
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

_ /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_ /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_ /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_ /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_ /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_ /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_ /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_ /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_ /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_ /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/

/**Return a copy that can be altered without having to worry about modifying the original */
export const deepClone = <T>(x: T) => JSON.parse(JSON.stringify(x)) as T
/**Stringy an array/object so its readable //TODO: (edit so that it doesn't excluse object methods) */
export const { stringify } = JSON

_ /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_ /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_ /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_ /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_ /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_ /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_ /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_ /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_ /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_ /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/

/**start a setInterval and add it to an array */
export const timer_add = (timers: btr_intervalWithid[], id: string, callBack: Function, interval: number) => {
	const theTimer: ReturnType<typeof setInterval> = setInterval(() => { callBack }, interval)
	timers.push([id, theTimer])
}
/**Kill a setInterval and remove it from its belonging array */
export const timer_kill = (timers: btr_intervalWithid[], id: string) => {
	const theTimer = timers.find(x => x[0] === id)
	if (!theTimer) { return }
	clearInterval(theTimer[1])
	removeItem(timers, theTimer)
}

_ /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_ /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_ /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_ /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_ /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_ /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_ /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_ /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_ /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_ /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/

/**console.log... WITH COLORS :D */
export const colorLog = (color: validChalkColor, message: string) => console.log(chalk[color].bold(message)) //DELETETHISFORCLIENT
/** Copy to clipboard using the corresponding function for the running enviroment (node/client)*/
export const copyToClipboard = (x: any) => { isNode ? copyToClipboard_server(x) : copyToClipboard_client(x) }
/**(Message) 💀 */
export const errorLog = (message: string) => colorLog('red', message + ' 💀')
export const getTraceableStack = (error: string | Error) => {
	const { stack } = (typeof error === 'string' ? new Error(error) : error)
	return `${stack}`.replace(/\(node:3864\).{0,}\n.{0,}exit code./, '')
}
/**Returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export const isGuest = (username: string) => /Guest[0-9]{13}/i.test(`${username}`)
/**(Message) ✔️ */
export const successLog = (message: string) => colorLog('green', message + ' ✔️')
/**Returns an string with its linebreaks converted into simple one-char spaces */
export const toSingleLine = (sentence: string) => `${sentence}`.replace(/ {0,}\n {0,}/g, ' ')

_ /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_ /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_ /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_ /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_ /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_ /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_ /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_ /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_ /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_ /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/

/**For obligatory callbacks */
export const doNothing = (...args: unknown[]) => { }
/**Syntactic sugar for "null as unknown as T", supports enums up to 5 items */
export const nullAs = {
	string: () => null as unknown as string,
	number: () => null as unknown as number,
	t1<T1>(x: T1) { doNothing(x); return null as T1 },
	t2<T1, T2>(x: T1, y: T2) { doNothing(x, y); return null as T1 | T2 },
	t3<T1, T2, T3>(x: T1, y: T2, z: T3) { doNothing(x, y, z); return null as T1 | T2 | T3 },
	t4<T1, T2, T3, T4>(x: T1, y: T2, z: T3, _: T4) { doNothing(x, y, z, _); return null as T1 | T2 | T3 | T4 },
	t5<T1, T2, T3, T4, T5>(x: T1, y: T2, z: T3, _: T4, $: T5) { doNothing(x, y, z, _, $); return null as T1 | T2 | T3 | T4 | T5 },
}

_ /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_ /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_ /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_ /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_ /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_ /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_ /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_ /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_ /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_ /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/

/**Copy to clipboard, objects arrays get stringify'd */
export const copyToClipboard_client = (x: any) => {
	const text = stringify(x) as string
	const a = document.createElement('textarea')
	a.innerHTML = text
	document.body.appendChild(a)
	a.select()
	document.execCommand('copy')
	document.body.removeChild(a)
}
/**Stringifies and downloads the provided data*/
export const downloadFile_client = (filename: string, fileFormat: '.txt' | '.json', data: unknown) => {
	if (isNode) { bigConsoleError('downloadFile_client can only be run clientside!'); return }
	const a = document.createElement('a')
	a.href = window.URL.createObjectURL(new Blob([data as BlobPart], { type: 'text/plain' }))
	a.download = `${filename}${fileFormat}`
	a.click()
}

// ! DELETEEVERYTHINGBELOW, as it is only meant for server-side use

_ /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_ /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_ /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_ /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_ /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_ /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_ /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_ /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_ /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_ /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/

/** Check the version of @botoron/utils, the enviroment variables and the package.json scripts */
export const basicProjectChecks = (
	/**PROD: DivineError, DEV: killProcess */ errorHandler: errorMessageHandler,
	packageJson: packageJson,
	env: NodeJS.ProcessEnv
) => {

	const utilsCheck = myUtils_areUpToDate()
	const scriptsCheck = checkJsonPackageScripts()
	const envCheck = getAndCheckEnviromentVariables()
	return envCheck && scriptsCheck && utilsCheck

	/**Check the scripts in a project's package json all fit the established schema */
	function checkJsonPackageScripts() {
		const zPackageJsonScriptsSchema = z.record(
			z.enum([
				"btr", "git", "npmScript",
				//for debugging
				"dev", "localtunnel", "nodemon", "transpile", "vue",
				//for deployement
				"build-all", "build-client", "build-server", "start"
			]), z.string())

		return zodCheck_curry(errorHandler)(zPackageJsonScriptsSchema, packageJson.scripts,)
	}

	/**Check if all the desired enviroment keys are defined */
	function getAndCheckEnviromentVariables() {
		const desiredEnvKeys = ['ADMIN_PASSWORD', 'APP_NAME', 'DEV_OR_PROD', 'ERIS_TOKEN', 'MONGO_URI', 'PORT']
		const { answer, errorMessage } = compareArrays(Object.keys(env), 'hasAllItemsOf', desiredEnvKeys)
		if (errorMessage) { errorHandler(errorMessage) }
		return answer
	}

	/**Check if the project is using the latest version of "myUtils" */
	async function myUtils_areUpToDate() {
		const latestVersion = await getLatestVersion()
		const installedVersion = (await import('./package.json', { assert: { type: "json" } })).default.version
		const isUpToDate = installedVersion === latestVersion

		if (isUpToDate) { colorLog('cyan', '@botoron/my-utils is up to date 👍') }
		else { errorHandler(`Outdated "btr/utils" package. (${installedVersion} vs ${latestVersion}) PLEASE UPDATE: npm run btr`) }

		return isUpToDate

		//Check if the project is using the latest version of "@botoron/utils"
		async function getLatestVersion() {
			type pck = { objects: [{ package: { version: string } }] }
			const response: pck = (await new Promise((resolve) => {
				try {
					fetch(`http://registry.npmjs.com/-/v1/search?text=@botoron/utils&size=1`).
						then(res => res.json().then((x) => resolve(x as pck)))
				}
				catch { return { objects: [{ package: { version: '0' } }] } }
			}))
			return response.objects[0].package.version
		}
	}
}
/**FOR NODE-DEBUGGING ONLY. Log a big red message surrounded by a lot of asterisks for visibility */
export const bigConsoleError = (message: string) => {
	const log = (message: string) => colorLog('red', message)
	const logAsterisks = (lines: number) => { for (let i = 0; i < lines; i++) { log('*'.repeat(150)) } }

	logAsterisks(3)
	log(message)
	logAsterisks(3)
}
/**Copy to clipboard while running node */
export const copyToClipboard_server = (x: any) => spawn('clip').stdin.end(util.inspect(x))
/**FOR NODE-DEBUGGING ONLY. Stringifies and downloads the provided data*/
export const downloadFile_node = async (filename: string, fileFormat: '.txt' | '.json', data: unknown, killProcessAfterwards: boolean) => {
	const formatted = stringify(data as object)
	const dateForFilename = timeStampToDate(Date.now(), true).replace(/\/| |\:/g, '_')
	const completeFilename = filename + '_' + dateForFilename + fileFormat

	colorLog('cyan', `Downloading ${completeFilename}..`)
	await fsWriteFileAsync(completeFilename, formatted)
	successLog('Done!')

	if (!killProcessAfterwards) { return }
	if (process.env.quokka) { return }
	process.exit()
}
/**Wrapper for fs.promise.readFile that announces the start of the file-reading */
export async function fsReadFileAsync(filePath: string) {
	console.log(`reading '${filePath}'..`)
	const file = await fs.promises.readFile(filePath, 'utf8')
	return file
}
/**Wrapper for fsWriteFileAsync that announces the start of the file-writing */
export async function fsWriteFileAsync(filePath: string, content: string) {
	console.log(`writing to '${filePath}'..`)
	const file = await fs.promises.writeFile(filePath, content)
	return file
}
/** Get the contents of the .env */
export async function getEnviromentVariables() {
	const require = createRequire(import.meta.url);
	require('dotenv').config({ path: './.env' });
	return process.env;
}
/**(Use with Quokka) Create an untoggable comment to separate sections, relies on "_" as a variable */
export const getSeparatingCommentBlock = (message: string) => {
	let line = ''
	const asterisks = '*'.repeat(10)
	while (line.length < 100) { line += `${asterisks} ${message.toUpperCase()} ${asterisks}` }
	const theBlock = `_ /${line}/\n`.repeat(5)
	console.log(theBlock)
	return theBlock
}
/**fetch the latest package.json of my-utils */
export const getLatestPackageJsonFromGithub = async () => {
	type response_github_file = { content: string }

	const response: response_github_file = await new Promise((resolve) => {
		fetch('https://api.github.com/repos/botoron/utils/contents/package.json', { method: 'GET' }
		).then((res: any) => res.json().then((packageJson: any) => resolve(packageJson)))
	})

	return Buffer.from(response.content, 'base64').toString('utf8')
}
/** Return the main perma-dependencies, check myUtil's version and print package.json's script */
export const getMainDependencies = async (packageJson: packageJson) => {

	const env = await getEnviromentVariables()
	const { ADMIN_PASSWORD, APP_NAME, DEV_OR_PROD, ERIS_TOKEN, MONGO_URI, PORT } = env

	const divineBot = await getDivineBot()
	basicProjectChecks(divineError, packageJson, { ADMIN_PASSWORD, APP_NAME, DEV_OR_PROD, ERIS_TOKEN, MONGO_URI, PORT })

	const httpServer = startAndGetHttpServer()
	const mongoClient = await getMongoClient()

	return { divineBot, divineError, doAndRepeat, env, httpServer, mongoClient, tryF }

	/**notify me about things breaking via discord, if pingMeOnErrors is passed as true */
	function divineError(err: string | Error) { (DEV_OR_PROD === 'prod' ? pingMe : bigConsoleError)(getTraceableStack(err)) }

	/**Set interval with try-catch and called immediately*/
	function doAndRepeat(fn: () => void, interval: number) {
		const tryIt = () => tryF(fn, [])
		setInterval(tryIt, interval)
		tryIt()
	}

	async function getDivineBot() {

		const divineBot = eris(ERIS_TOKEN as string)
		connectToDiscord()
		return divineBot

		async function connectToDiscord() {
			const divinePrepend = '***DivineBot:***'

			divineBot.on('messageReactionAdd', (a: eris.PossiblyUncachedMessage, b: eris.PartialEmoji, c: eris.Member) => role('add', a, b, c))
			divineBot.on('messageReactionRemove', (a: eris.PossiblyUncachedMessage, b: eris.PartialEmoji, c: eris.Member) => role('remove', a, b, c))
			divineBot.on('disconnect', () => { colorLog('red', `${divinePrepend}: Disconnected D: ... retrying!`); connectToDiscord() })

			const idOfRoleAssigningMessage = '822523162724925473'
			await attemptConnection()

			function role(action: 'add' | 'remove', message: eris.PossiblyUncachedMessage, emoji: eris.PartialEmoji, reactor: eris.Member) {
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
				catch (e) { console.log('divineBot.role.tryCatch.error = ', e) }
			}

			async function attemptConnection() {
				try {
					divineBot.connect()
					colorLog('cyan', 'waiting for DivineBot')
					while (!divineBot.ready) { await delay(1000) }
					successLog("The divine egg has hatched")
					pingMe('im alive bitch')
				}
				catch {
					colorLog('yellow', `${divinePrepend} Failed to connect.. retrying >:D`)
					await delay(1000 * 10)
					attemptConnection()
				}
			}
		}
	}

	async function getMongoClient() {
		const mongo = new mongodb.MongoClient(MONGO_URI as string)
		let mongoClient: MongoClient = null as unknown as MongoClient
		mongo.connect((err, client) => { if (err) { throw err } mongoClient = client as MongoClient })
		colorLog('cyan', 'waiting for Mongo')
		while (!mongoClient) { await delay(500) }
		successLog("It's Monging time >:D")
		return mongoClient
	}

	function pingMe(message: string) {
		if (!divineBot || !divineBot.ready) { return }
		const theMessage = `<@470322452040515584> - (${APP_NAME}) \n ${message}`
		const divineOptions = { content: theMessage, allowedMentions: { everyone: true, roles: true } }
		divineBot.createMessage('1055939528776495206', divineOptions)
	}

	function startAndGetHttpServer() {
		const app = express()
		const httpServer = http.createServer(app)
		app.use(express.static(path.resolve() + '/public'))
		app.get('/', (_request, response) => response.sendFile(path.resolve() + '/public/index.html'))
		httpServer.listen(PORT, () => delay(1500).then(() => console.log(`server up at: http://localhost:${PORT}/`)))
		return httpServer
	}

	/**tryCatch wrapper for functions with DivineError as the error handler */
	function tryF<T extends (...args: any) => any>(fn: T, args: Parameters<T>): void {
		try { return fn(...args as Parameters<T>[]) }
		catch (err) { divineError(err as Error) }
	}
}
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export const killProcess = (message: string) => { bigConsoleError(message); process.exit() }
/**Easily run the scripts of this (utils) repo's package.json */
export const npmRun = async (npmCommand: validNpmCommand) => {

	const utilsRepoName = 'Utils 🛠️'

	if (npmCommand === 'transpile') { transpileFiles(() => colorLog('magenta', 'Process over')) }
	if (npmCommand === 'git') { prompCommitMessageAndPush(utilsRepoName) }
	if (npmCommand === 'publish') { transpileFiles(promptVersioning) }

	async function promptVersioning() {
		function tryAgain(error: string) { colorLog('yellow', error); promptVersioning() }
		const versionIncrement = await questionAsPromise('Type of package version increment (major, minor, patch)?')

		if (!zodCheck_curry(tryAgain)(zValidVersionIncrement, versionIncrement)) { return }
		await prompCommitMessageAndPush(utilsRepoName)

		exec(`npm version ${versionIncrement}`, (err, stdout, stderr) => {
			console.log({ stdout })
			successLog('package.json up-version\'d')
		})
	}

	function transpileFiles(followUp: Function) {
		const filename = 'btr.ts'
		exec('tsc --declaration --target esnext ' + filename, async () => {
			successLog(filename + ' transpiled')

			const indexTs = await fsReadFileAsync(filename)
			const lines = indexTs.replaceAll('bigConsoleError', 'colorLog').split('\n')
			selfFilter(lines, (line) => !/DELETETHISFORCLIENT/.test(line))

			const cutPoint = lines.findIndex(x => /DELETEEVERYTHINGBELOW/.test(x))
			lines.splice(cutPoint, lines.length)
			lines.push('const colorLog = (color: string, message: string) => console.log(`%c${message}`, `color: ${color};`)')

			await fsWriteFileAsync(`./client/${filename}`, lines.join('\n'))

			exec('tsc --declaration --target esnext client/btr.ts ', async () => {
				successLog('browser versions emitted')
				await delay(500)
				followUp()
			})
		})
	}
}
/**Prompt to submit a git commit message and then push */
export async function prompCommitMessageAndPush(repoName: string) {

	//order matters with these 3
	const commitTypes = '(fix|feat|build|chore|ci|docs|refactor|style|test)'

	logDetailsForPrompt()
	const commitMessage = await questionAsPromise(`Enter commit type ${commitTypes} plus a message:`)

	function tryAgain(error: string) { colorLog('yellow', error); prompCommitMessageAndPush(repoName); return }
	if (!zodCheck_curry(tryAgain)(get_zValidCommitMessage(), commitMessage)) { return }
	copyToClipboard_server(commitMessage)
	await gitAddCommitPush()

	function get_zValidCommitMessage() {
		const commitRegex = new RegExp(`(?<!.)${commitTypes}:`)
		return z.string().min(15).max(50).regex(commitRegex, `String must start with ${commitTypes}:`)
	}

	function gitAddCommitPush() {
		return new Promise(resolve => {
			exec('git add .', () => {
				successLog('git add .')
				colorLog('cyan', `Commit message copied to clipboard, paste it in the editor, save and close.`)
				exec("git commit", () => {
					successLog('git commit')
					exec('git push', () => {
						successLog('git push')
						resolve(true)
					})
				})
			})
		})
	}

	function logDetailsForPrompt() {
		delay(500).then(() => {
			colorLog('yellow', '50-character limits ends at that line: * * * * * |')
			colorLog('green', repoName)
			console.log()
		})
	}
}
/**Prompts a question in the terminal, awaits for the input and returns it */
export async function questionAsPromise(question: string) {
	const readline = getReadLine.createInterface({ input: process.stdin, output: process.stdout })
	const input = await new Promise(res => { readline.question(chalk.magenta(question) + '\n', res) }) as string
	readline.close()
	return input
}

const btrCommand = process.env.npm_config_btrCommand as validNpmCommand
if (btrCommand) { zodCheckAndHandle(zValidNpmCommand, btrCommand, npmRun, [btrCommand], console.log) }

/*
 * -------------------------------------------------------------------
 * Regarding passing a function with its arguments to another function
 * -------------------------------------------------------------------
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