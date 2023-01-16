let _
import fs from 'fs'	//DELETETHISFORCLIENT 
_
import eris from 'eris'	//DELETETHISFORCLIENT
_
import http from 'http'	//DELETETHISFORCLIENT
_
import path from 'path'	//DELETETHISFORCLIENT
_
import chalk from 'chalk'	//DELETETHISFORCLIENT
_
import express from 'express'	//DELETETHISFORCLIENT
_
import fetch from 'node-fetch'	//DELETETHISFORCLIENT
_
import clipboard from 'clipboardy'	//DELETETHISFORCLIENT
_
import getReadLine from 'readline'	//DELETETHISFORCLIENT
_
import { exec } from 'child_process'	//DELETETHISFORCLIENT
_
import { createRequire } from 'module'	//DELETETHISFORCLIENT
_
import mongodb, { MongoClient } from 'mongodb'	//DELETETHISFORCLIENT
_
import { type Primitive, type SafeParseReturnType, z, type ZodRawShape, type ZodTypeAny, string } from 'zod'
_
import { fromZodError } from 'zod-validation-error'
_

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

export const timers: timer[] = []
export const zValidVariants = z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark'])
const getUniqueId_generator = (function* () { let i = 0; while (true) { i++; yield `${Date.now() + i}` } })()

const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null
const zValidNpmCommand_package = z.enum(['all', 'arrowsToDeclarations', 'git', 'transpile'])
const zValidNpmCommand_project = z.enum(['build', 'check', 'git', 'transpile'])
const zValidVersionIncrement = z.enum(['major', 'minor', 'patch'])
const zMyEnv = z.object({
	DEV_OR_PROD: z.enum(['DEV', 'PROD']),
	ADMIN_PASSWORD: string(),
	ERIS_TOKEN: string(),
	MONGO_URI: string(),
	APP_NAME: string(),
	PORT: string(),
})

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

/**Generic to get the type of an object/interface while preserving key-value typing */
export type btr_objectEntries<T, amount extends 'plural' | 'single'> = { [K in keyof T]: [K, amount extends 'plural' ? T[K][] : T[K]] }[keyof T]
export type btr_trackedVueComponent = { _name: string, beforeCreate?: btr_voidFn, beforeDestroy?: btr_voidFn }
export type btr_newToastFn = (title: string, message: string, variant: btr_validVariant) => void
export type btr_nonVoidFn = <F extends (...args: Parameters<F>) => ReturnType<F>> () => unknown
export type btr_socketEventInfo = { event: string, timestamp: number, data: unknown }
export type btr_globalAlert = { message: string, show: boolean }
export type btr_validVariant = z.infer<typeof zValidVariants>
export type btr_voidFn = () => void
export type btr_fieldsForColumnOfTable = string | {
	key: string
	label?: string
	formatter?: (value: unknown, key: string, item: unknown) => unknown
	sortable: boolean
	thStyle?: btr_validVariant
}

type toastOptions = { toaster: string, autoHideDelay: number, solid: boolean, variant: btr_validVariant, title: string }
type validChalkColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'grey' | 'magentaBright'	//DELETETHISFORCLIENT
type zSchema<T> = { safeParse: (x: T) => SafeParseReturnType<T, T>, strict?: () => zSchema<T> }
type packageJson = { name: string, version: string, scripts: { [key: string]: string } }
type bvToast = { toast: (message: string, toastOptions: toastOptions) => void }
type bvModal = { show: (id: string) => void, hide: (id: string) => void }
type validNpmCommand_package = z.infer<typeof zValidNpmCommand_package>
type validNpmCommand_project = z.infer<typeof zValidNpmCommand_project>
type messageHandler = (message: string) => void
type arrayPredicate<T> = (arg1: T) => boolean
type pipe_persistent_type<T> = (arg: T) => T
type tsConfig = { compilerOptions: object }
type myEnv = z.infer<typeof zMyEnv>
type pipe_mutable_type = {
	<T, A>(source: T, a: (value: T) => A): A
	<T, A, B>(source: T, a: (value: T) => A, b: (value: A) => B): B
	<T, A, B, C>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C): C
	<T, A, B, C, D>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D): D
	<T, A, B, C, D, E>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D, e: (value: D) => E): E
	//can always make it longer 😉
}
type timer = {
	id: string,
	runAt: number,
	startedAt: number,
	onComplete: btr_nonVoidFn,
	onCancel: btr_nonVoidFn,
	cancelledMessage: string,
	cancelledAt: number,
	isCancelled: boolean
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
export function newToast_client_curry($bvToast: bvToast) {
	return function body(title: string, message: string, variant: btr_validVariant) {
		if (!zodCheck_curry(alert)(zValidVariants, variant)) { return }
		$bvToast.toast(message, {
			toaster: 'b-toaster-bottom-right',
			autoHideDelay: 5000,
			solid: true,
			variant,
			title
		})
	}
}
/**(generates a function that:) Tests data against an scheme, and executes a predefined errorHandler if case it isn't a fit. */
export function zodCheck_curry(errorHandler = divine.error as messageHandler, strictModeIfObject = true) {
	function zodCheck<T>(schema: zSchema<T>, data: T) {
		function body<T>(errorHandler: messageHandler, schema: zSchema<T>, data: T, strictModeIfObject = true) {
			const result = zGetSafeParseResultAndHandleErrorMessage(schema, data, errorHandler, strictModeIfObject)
			return result.success as boolean
		}
		return body(errorHandler, schema, data, strictModeIfObject)
	}
	return zodCheck
}
/**(generates a function that:) Adds/removes a vue component into the window for easy access/debugging */
export function trackVueComponent_curry<T>(zValidVueComponentName: zSchema<T>) {
	return function trackVueComponent(
		name: T,
		componentConstructor: btr_trackedVueComponent,
		window: { vueComponents: btr_trackedVueComponent[] }
	) {

		if (!zodCheck_curry(alert)(zValidVueComponentName, name)) { return componentConstructor }
		colorLog('blue', `Component '${name}' registered to Vue`)
		if (!window.vueComponents) { window.vueComponents = [] }

		return getComponent(name, componentConstructor)

		function toggleComponent(logger: messageHandler) {
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
/**(generates a function that:) Opens/close a bootstrap-vue modal with zod validation */
//TODO: delete this (hard to initialize when bvModal is declared after triggerModalWithValidation in the pinia store)
export function triggerModalWithValidation_curry<validModalIds extends string>($bvModal: bvModal) {
	return async function body(id: validModalIds, action: 'show' | 'hide') {

		if (action === 'show') {
			$bvModal.show(id)
			for (let i = 0; i < 10; i++) { if (!elementExists()) { await delay(500) } }
			if (!elementExists()) { promptError() }
		}

		if (action === 'hide') {
			elementExists() ? $bvModal.hide(id) : promptError()
		}

		function elementExists() { return Boolean(document.getElementById(id)) }
		function promptError() { alert(`Modal with id (${id}) not found. Could not ${action}. Please report it`) }
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

/**Adds an item to an array, or removes it if it already was added. Returns the array and the action applied */
export function addOrRemoveItem<T>(arr: T[], item: T) {
	let x: 'added' | 'removed'
	const isInArray = arr.includes(item)
	if (!isInArray) { arr.push(item); x = 'added' }
	else { removeItem(arr, item); x = 'removed' }
	return { action: x, arr }
}
/**Adds an item to an array, or replaces the first one if found. WARNING: make sure the predicate can only find ONE item */
export function addOrReplaceItem<T>(arr: T[], newItem: T, predicate: arrayPredicate<T>) {
	const replaceableItem = arr.find(x => predicate(x))
	replaceableItem ? arr[arr.indexOf(replaceableItem)] = newItem : arr.push(newItem)
}
/**Add to arrayA items from array B that it doesn't already have */
export function addUnrepeatedItems<T>(arr: T[], newItems: T[]) {
	newItems.forEach(x => { if (!arr.includes(x)) { arr.push(x) } })
	return arr
}
/**
 * @param arr The array (tuple) of strings that each will become a key
 * @param mappingFn The function to determine the value of each entry
 * @returns An object where each key is an item of "arr" and the value is determined by "mappingFn"
 */
export function arrayToObject<T extends Readonly<Array<string>>, F extends (...x: (T[number])[]) => ReturnType<F>>(arr: T, mappingFn: F) {
	type K = typeof arr[number]
	const object = {} as Record<K, ReturnType<F>>
	arr.forEach(x => object[x as K] = mappingFn(x))
	return object
}
/**Converts an array of primitives into a comma-separated list, the word "and" being optional before the last item */
export function asFormattedList(arr: (string | number | boolean)[], useAndForTheLastItem: boolean) {
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
/**Return an array of sub-arrays with the items of the passed array, where each sub-array's max lenght is the passed size*/
export function chunk<T>(arr: T[], chunkSize: number) {
	const results: T[][] = [[]]
	arr.forEach(item => {
		const lastSubArray = lastItem(results)
		lastSubArray.length < chunkSize ? lastSubArray.push(item) : results.push([item])
	})
	return results.reverse()
}
/**Compare array A to array B and return the details */
export function compareArrays<T>(baseArray: T[], testArray: T[]) {
	const nonDesiredItems = testArray.filter(x => !baseArray.includes(x))
	const missingItems = baseArray.filter(x => !testArray.includes(x))
	const lengthDifference = baseArray.length - testArray.length

	const arraysHaveTheSameItems = !nonDesiredItems.length && !missingItems.length
	const arraysAreEqual = arraysHaveTheSameItems && !lengthDifference

	return { arraysAreEqual, arraysHaveTheSameItems, lengthDifference, missingItems, nonDesiredItems }
}
/**syntax sugar for arr[arr.length - 1] */
export function getLastItem<T>(arr: T[]) { return arr[arr.length - 1] }
/**@returns a random item along its index */
export function getRandomItem<T>(arr: T[]) { const r = roll(arr.length); return { item: arr[r] as T, index: r } }
/**@returns a version of the provided array without repeating items */
export function getUniqueValues<T>(arr: T[]) { return [...new Set(arr)] }
/**@returns whether an item is the last one in an array or not (warning: maybe don't use with primitives) */
export function isLastItem<T>(arr: T[], item: T) { return arr.indexOf(item) === arr.length - 1 }
/*Remove a single item from an array, or all copies of that item if its a primitive value and return the removedCount */
export function removeItem<T>(arr: T[], item: T) { return selfFilter(arr, (x: T) => x !== item).removedCount }
/**Return the last item of the given array */
export function lastItem<T>(arr: T[]) { return arr[arr.length - 1] as T }
/**
 * Map an array, and filter-out the items that weren't fit
 * see filterMap for a faster (single rather than double loop) but more complex version)
 */
export function safeMap<T, F extends (x: T) => ReturnType<F>>(arr: T[], mapFn: F) {
	return arr.map(x => mapFn(x)).filter(x => x) as T[]
}
/**Remove items from an array that DONT fulfill the given condition, returns the removed items and their amount */
export function selfFilter<T>(arr: T[], predicate: arrayPredicate<T>) {
	let removedCount = 0
	const removedItems: T[] = []
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i] as T
		if (predicate(item)) { continue }
		removedItems.push(arr.splice(i, 1)[0] as T)
		removedCount++
		i--
	}
	return { removedItems, removedCount }
}
/**Sort an array of numbers either upwards (A-scending) or downwards (D-escending)*/
export function sortNumbers(numbers: number[], direction: 'A' | 'D') {
	numbers.sort((a, b) => a > b ? 1 : -1)
	if (direction === 'D') { numbers.reverse() }
	return numbers
}
/**Randomizes the order of the items in the array */
export function shuffle<T>(arr: T[]) {
	for (let i = arr.length - 1; i > 0; i--) {
		const rand = roll(i + 1);
		[arr[i], arr[rand]] = [arr[rand] as T, arr[i] as T]
	}
	return arr
}
/**Sort an array alphabetically, optionally backwards */
export function sortAlphabetically<T extends string>(arr: T[], reverseArr?: boolean) {
	arr.sort((a, b) => a > b ? 1 : -1)
	if (reverseArr) { arr.reverse() }
	return arr
}
/**Sort an array of objects based on the value a property. A: Ascending, D: Descesding. Chainable */
export function sortBy<T extends object, pars extends [keyof T, 'A' | 'D']>(arr: T[], keyWithDir: pars, ...extraKeysWithDir: pars[]) {
	if (!arr.length) { return arr }

	[keyWithDir].concat(extraKeysWithDir).forEach(keyDirection => {
		const [key, direction] = keyDirection

		if (typeof arr[0] === 'string') { arr.sort((a, b) => (a > b) ? 1 : -1) }
		else { arr.sort((a, b) => (a[key] > b[key]) ? 1 : -1) }
		if (direction === 'D') { arr.reverse() }
	})

	return arr
}
/** */
/**syntactic sugar for selfFilter(arr, predicate).removedItems */
export function spliceIf<T>(arr: T[], predicate: arrayPredicate<T>) { return selfFilter(arr, predicate).removedItems }
/**Remove X amount of items from the end of an array */
export function spliceLast<T>(arr: T[], count: number) { return arr.splice(-count) }
/**Transfer items that meet a given condition from one array to another */
export function transferItems<T>(origin: T[], destination: T[], predicate: arrayPredicate<T>) {
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

/**Set interval with try-catch and called immediately*/
export function doAndRepeat(fn: btr_voidFn, interval: number) { tryF(fn, []); setInterval(() => tryF(fn, []), interval) }
/**
 * Filter and map an array in a single loop
 * @param arr The array to be filterMap'd
 * @param filter Function that returns the answer and a carryover value for "mapFn" if needed
 * @param mapFn The function to apply to each item of the array, and possibly to each carryover from "filter"
 * @returns The provided array, filtered and mapped
 */
export function filterMap<T, C, M extends (x: T, y: C) => ReturnType<M>>(
	arr: T[], filter: (arg: T) => { answer: boolean, carryOver: C }, mapFn: M
) {
	return arr.reduce((acc, item) => {
		const { answer, carryOver } = filter(item)
		return answer ? acc.concat(mapFn(item, carryOver)) : acc
	}, [] as ReturnType<M>[])
}
/**Simple and standard functional programming pipe. Deprecated, use either zPipe (persistenType with zod errors) or pipe_mutableType! */
export function pipe_persistentType<T>(initialValue: T, ...fns: pipe_persistent_type<T>[]) {
	return fns.reduce((result, fn) => fn(result), initialValue)
}
/**
* Pipes a value through a number of functions in the order that they appear.
* Takes between 1 and 12 arguments. `pipe(x, a, b)` is equivalent to `b(a(x))`.
* If only one argument is provided (`pipe(x)`), this will produce a type error but JS will run fine (and return `x`).
*/
// eslint-disable-next-line func-style
export const pipe_mutableType: pipe_mutable_type = (source: unknown, ...project: ((value: unknown) => unknown)[]): unknown =>
	project.reduce((accumulator, element) => element(accumulator), source)
/**
 * Retry a function up to X amount of times or until it is executed successfully, mainly for fetching/requesting stuff
 * @param fn The function to be retried hoping it returns successfully
 * @param args Arguments to pass to fn
 * @param retriesLeft Number, is reduced by 1 every attempt, retryF stops when it reaches 0
 * @param defaultReturn Data to be returned as returnType of fn if retryF fails
 * @param delayBetweenRetries Delay between each retry in milliseconds
 * @returns 
 */
export async function retryF<F extends (...args: Parameters<F>) => ReturnType<F>>(fn: F,
	args: Parameters<F>,
	retriesLeft: number,
	defaultReturn: ReturnType<F>,
	delayBetweenRetries: number): Promise<{ data: ReturnType<F>; was: 'success' | 'failure' }> {
	try { return { data: fn(...args), was: 'success' } }
	catch (error) {
		colorLog('yellow', `retryF > ${fn.name} > ${retriesLeft} retriesLeft. {${error}}`)
		if (!retriesLeft) { return { data: defaultReturn, was: 'failure' } }

		await delay(delayBetweenRetries)
		return await retryF(fn, args, retriesLeft - 1, defaultReturn, delayBetweenRetries)
	}
}
/**tryCatch wrapper for functions with divineError as the default error handler */
export function tryF<T extends (...args: Parameters<T>) => ReturnType<T>>(
	fn: T,
	args: Parameters<T>,
	errorHandler = divine.error as messageHandler) {
	try { return fn(...args) }
	catch (err) { errorHandler(err as string) }
}
/**
 * Test data against an schema with strict-mode (no unspecified keys) for objects set by default and handle the error message if any
 * @param schema The schema to test the data against
 * @param data The data to be tested
 * @param errorHandler The handler for the message error
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not
 * @returns 
 */
export function zGetSafeParseResultAndHandleErrorMessage<T>(schema: zSchema<T>,
	data: T,
	errorHandler = <messageHandler>nullAs(),
	strictModeIfObject = true) {

	const result = getResult()
	if (result.success === false && errorHandler) { errorHandler(fromZodError(result.error).message) }
	return result

	function getResult() {
		if (!schema.strict || !strictModeIfObject) { return schema.safeParse(data) }
		else { return schema.strict().safeParse(data) }
	}
}
/**
 * Check data against a provided schema, and execute either the success or error handler
 * @param zSchema The zSchema to test data against
 * @param data The data to be tested against zSchema
 * @param successHandler The function that will execute if data fits zSchema
 * @param args The arguments to be applied to successHandler
 * @param errorHandler The function that will execute if data does NOT fits zSchema
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not * 
 */
export function zodCheckAndHandle<D, SH extends (...args: Parameters<SH>) => ReturnType<SH>>(zSchema: zSchema<D>,
	data: D,
	successHandler: SH,
	args: Parameters<SH>,
	errorHandler = divine.error as messageHandler,
	strictModeIfObject = true) {
	const zResult = zGetSafeParseResultAndHandleErrorMessage(zSchema, data, errorHandler, strictModeIfObject)
	if (zResult.success === true && successHandler) { successHandler(...args as Parameters<SH>) }
}
/**Pipe with schema validation and an basic error tracking */
/**
 * Pipe with schema validation and basic error tracking/handling
 * 
 */

/**
 * Pipe with schema validation and basic error tracking/handling
 * @param zSchema The schema that must persist through the whole pipe
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not * 
 * @param initialValue The value/object that will be piped through the functions
 * @param fns The functions that will conform the pipe in order
 * @returns 
 */
export function zPipe<T>(zSchema: zSchema<T>, strictModeIfObject: boolean, initialValue: T, ...fns: pipe_persistent_type<T>[]) {

	const initialPipeState = { value: initialValue, error: <string>nullAs(), failedAt: <string>nullAs() }

	return fns.reduce((pipeState, fn, index) => {

		if (pipeState.error) { return pipeState }
		pipeState.value = fn(pipeState.value)

		zGetSafeParseResultAndHandleErrorMessage(zSchema, pipeState.value, errorHandler, strictModeIfObject)
		return pipeState

		function errorHandler(err: string) {
			pipeState.failedAt = `Step ${index + 1}: ${fn.name}`
			pipeState.error = err
		}

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
export function delay(x: number) {
	return new Promise(resolve => {
		const maxTimeOut = 1000 * 60 * 60 * 24
		const loopsNeeded = Math.floor(x / maxTimeOut)
		const leftOverTime = x % maxTimeOut
		interval(loopsNeeded, leftOverTime)

		function interval(i: number, ms: number) { setTimeout(() => i ? interval(i - 1, maxTimeOut) : resolve(true), ms) }
	})
}
/**Return the time left to make a move in a compacted form and with a variant corresponding to how much of it left */
export function getDisplayableTimeLeft(deadline: number) {

	const time = (deadline - Date.now()) / 1000
	let message = ''

	const twoMinutes = 60 * 2
	const twoHours = twoMinutes * 2
	const twoDays = twoHours * 2

	if (time < twoMinutes) { message = String(time) }
	else if (time < twoHours) { message = `${Math.round(time / 60)} Minutes` }
	else if (time < twoDays) { message = `${Math.round(time / 60 / 60)} Hours` }
	else if (time > twoDays) { message = `${Math.round(time / 60 / 60 / 24)} Days` }

	message = message.replace(/\.[0-9]{0,}/g, '')
	return { time: message, variant: getVariant() }

	function getVariant() {
		let variant = <btr_validVariant>nullAs()
		if (/Minutes|Hours|Days/.test(message)) { variant = 'info' }
		else if (time > 20) { variant = 'primary' }
		else if (time < 21) { variant = 'warning' }
		else { variant = 'danger' }
		return variant
	}
}
/**Formate a timestamp with Intl.DateTimeFormt. Options: short/medium/long (add +hour to include Hour) or hOnly (hour only) */
export function formatDate(timestamp: number,
	language: 'es' | 'en',
	type: 'hourOnly' | 'short' | 'short+hour' | 'medium' | 'medium+hour' | 'long' | 'long+hour') {
	return new Intl.DateTimeFormat(language, getOptions()).format(timestamp)

	function getOptions(): Parameters<typeof Intl['DateTimeFormat']>[1] {
		switch (type) {
			default: case 'short': return { dateStyle: 'short' }
			case 'medium': return { dateStyle: 'medium' }
			case 'long': return { dateStyle: 'long' }
			case 'hourOnly': return { timeStyle: 'short' }
			case 'medium+hour': return { dateStyle: 'medium', timeStyle: 'short' }
			case 'short+hour': return { dateStyle: 'short', timeStyle: 'short' }
			case 'long+hour': return { dateStyle: 'long', timeStyle: 'short' }
		}
	}
}
/**Self-explanatory */
export function isEven(number: number) { return !isOdd(number) }
/**Self-explanatory */
export function isOdd(number: number) { return Boolean(Number(number) % 2) }
/**@returns whether a number is either the minimum provided, the maximum provided or any number in-between */
export function isWithinRange(number: number, max: number, min: number) {
	if (min > max) { divine.ping('"min" should not be higher than "max"!') }
	return number <= max && number >= min
}
/**@returns a number up to (but not included) provided max, eg: roll(1) will ALWAYS return zero */
export function roll(maxRoll: number) { return Math.floor(Math.random() * Number(maxRoll)) }
/**1 becomes '1st' , 2 becomes '2nd', 3 becomes '3rd' and so on */
export function toOrdinal(number: number) {
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


/**Add all default properties missing in an object*/
export function addMissingPropsToObjects<T extends object>(original: T, defaults: Required<T>) {
	objectKeys(defaults).forEach(key => { if (!Object.prototype.hasOwnProperty.call(original, key)) { original[key] = defaults[key] } })
	return original as Required<T>
}
/**Return a copy that can be altered without having to worry about modifying the original */
export function deepClone<T>(originalObject: T) {
	const copy = JSON.parse(JSON.stringify(originalObject)) as T
	ifObject_copyRebindedMethods()
	return copy

	function ifObject_copyRebindedMethods() {
		if (Array.isArray(originalObject)) { return }
		objectEntries(originalObject as object).forEach(entry => {
			const { key, value } = entry
			if (typeof value !== 'function') { return }
			copy[key] = (value as () => never).bind(copy) as never
		})
	}
}
/**Generate a Zod Schema from an array/object */
export function getZodSchemaFromData(data: unknown) {

	function toLiteral(x: unknown): z.ZodLiteral<unknown> {
		return typeof x === 'object' ?
			getZodSchemaFromData(x) as unknown as z.ZodLiteral<unknown> :
			z.literal(x as never) as z.ZodLiteral<unknown>
	}

	if (!data) { return z.nullable(<ZodTypeAny>nullAs()) }
	if (typeof data !== 'object') { return z.literal(data as Primitive) }
	if (Array.isArray(data)) { return z.tuple(data.map(toLiteral) as []) }
	return z.object(mapObject(data, toLiteral) as ZodRawShape)
}
/**Because ESlint doesn't like Object(x).hasOwnProperty :p */
export function hasOwnProperty<T extends object>(x: T, key: keyof T) { return Object.prototype.hasOwnProperty.call(x, key) }
/**Map an object! (IMPORTANT, all values in the object must be of the same type, or mappinFn should be able to handle multiple types) */
export function mapObject<F extends (value: O[keyof O]) => ReturnType<F>, O extends object>(object: O, mappingFn: F) {
	const newObject = {} as { [key in keyof O]: ReturnType<F> }
	objectEntries(object).forEach(x => { newObject[x.key] = mappingFn(x.value) })
	return newObject as { [key in keyof O]: ReturnType<F> }
}
/**Object.entries but with proper type-inference */
export function objectEntries<T extends object>(object: T) {
	return Object.entries(object).map(entry => ({ key: entry[0] as keyof T, value: entry[1] as T[keyof T] }))
}
/**Object.keys but with proper type-inference */
export function objectKeys<T extends object>(object: T) { return Object.keys(object) as unknown as (keyof T)[] }
/**Object.values but with proper type-inference */
export function objectValues<T extends object>(object: T) { return Object.values(object) as T[keyof T] }
/**Create an object with only the specified properties of another base object (references are kept) */
export function pick<T extends object, K extends keyof T>(theObject: T, properties: ReadonlyArray<K>) {
	const thePartial = {} as Pick<T, K>
	objectEntries(theObject).forEach(entry => {
		const { key, value } = entry
		if (properties.includes(key as K)) {
			//@ts-expect-error because object/key types are weird, but it workds
			thePartial[key] = value
		}
	})
	return thePartial
}
/**Replace the values of an object with those of another that shares the schema*/
export function replaceObject<T extends object>(originalObject: T, newObject: T) {
	objectKeys(originalObject).forEach(key => delete originalObject[key])
	objectKeys(newObject).forEach(key => originalObject[key as keyof T] = newObject[key])
}
/**Stringy an array/object so its readable //TODO: (edit so that it doesn't excluse object methods, see deepClone) */
export const { stringify } = JSON
/**Generator for unique IDs (using Date.now and 'i') that accepts a preffix */
export function getUniqueId(suffix: string) { return suffix + '_' + getUniqueId_generator.next().value }

_ /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_ /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_ /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_ /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_ /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_ /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_ /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_ /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_ /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_ /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_ /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/

/**
 * Create a cancellable timer and add it to btr.timers
 * @param id The id of the timer, so that btr.killTimer can find it
 * @param runAt The date (timestamp) at which "onComplete" should run
 * @param onComplete The function that should run if the timer wasn't cancelled 
 * @param onCancel The function that should run if the timer was cancelled via killTimer
 * @returns the return of "onComplete"
 */
export function initializeTimer(id: string, runAt: number, onComplete: btr_nonVoidFn, onCancel: btr_nonVoidFn) {
	const timer: timer = { id, runAt, onComplete, onCancel, startedAt: Date.now(), isCancelled: false, cancelledAt: 0, cancelledMessage: '' }
	timers.push(timer)
	return interval()

	function interval() {
		return new Promise(resolve => {
			const maxInterval = 1000
			const timeLeft = Math.max(runAt - Date.now(), 0)

			if (timeLeft > maxInterval) { setTimeout(() => resolveOrCancel(onComplete), timeLeft) }
			else { setTimeout(() => { removeItem(timers, timer); resolveOrCancel(interval) }, maxInterval) }

			function resolveOrCancel(fn: btr_nonVoidFn) {
				const { id, startedAt, runAt, onComplete, onCancel, isCancelled, cancelledAt } = timer

				resolve(isCancelled ? ({
					timerId: id,
					startedAt: formatDate(startedAt, 'es', 'medium+hour'),
					intendedRunAt: formatDate(runAt, 'es', 'medium+hour'),
					cancelledAt: formatDate(cancelledAt, 'es', 'medium+hour'),
					timeElapsedBeforeCancelation: `${(cancelledAt - startedAt) / 1000} seconds`,
					timeLeftBeforeCancelation: `${(runAt - timer.cancelledAt) / 1000} seconds`,
					onComplete: onComplete.name,
					onCancel: onCancel.name,
				}) : tryF(fn, []))
			}
		})
	}
}
/**Kill a timer created with initializeTimer, the reason provided will become a divine stack */
export async function killTimer(timerId: string, reason: string) {
	const theTimer = timers.find(x => x.id === timerId)
	if (!theTimer) { divine.error('Unable to cancel, no timer was found with this id: ' + timerId); return }

	removeItem(timers, theTimer)
	theTimer.cancelledMessage = getTraceableStack(reason)
	theTimer.cancelledAt = Date.now()
	theTimer.isCancelled = true

	return await theTimer.onCancel()
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
export function colorLog(color: validChalkColor, message: string) { return console.log(chalk[color].bold(message)) } //DELETETHISFORCLIENT
/** Copy to clipboard using the corresponding function for the running enviroment (node/client)*/
export function copyToClipboard(x: unknown) { isNode ? copyToClipboard_server(x) : copyToClipboard_client(x) }
/**(Message) 💀 */
export function errorLog(message: string) { return colorLog('red', message + ' 💀') }
/**TODO: describe me */
export function getTraceableStack(error: string | Error) {
	const { stack } = (typeof error === 'string' ? new Error(error) : error)
	return `${stack}`.replace(/\(node:3864\).{0,}\n.{0,}exit code./, '')
}
/**@returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export function isGuest(username: string) { return /Guest[0-9]{13}/i.test(`${username}`) }
/**(Message) ✔️ */
export function successLog(message: string) { return colorLog('green', message + ' ✔️') }
/**@returns an string with its linebreaks converted into simple one-char spaces */
export function toSingleLine(sentence: string) { return `${sentence}`.replace(/ {0,}\n {0,}/g, ' ') }

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

/**
 * Compare data B against an schema created from data A 
 * @param A The first piece of data
 * @param B The second piece of data
 * @param errorHandler The handler for the message error
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not
 * @returns 
 */
export function dataIsEqual(A: unknown, B: unknown, errorHandler = <messageHandler>nullAs(), strictModeIfObject = true) {
	const zodSchema = getZodSchemaFromData(A as object)
	return zGetSafeParseResultAndHandleErrorMessage(zodSchema, B, errorHandler, strictModeIfObject)
}
/**For obligatory callbacks */
export function doNothing(...args: unknown[]) { args }
/** @returns null as the provided type */
export function nullAs<T>() { return null as T }

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
export function copyToClipboard_client(x: unknown) {
	const text = stringify(x)
	const a = document.createElement('textarea')
	a.innerHTML = text
	document.body.appendChild(a)
	a.select()
	document.execCommand('copy')
	document.body.removeChild(a)
}
/**Stringifies and downloads the provided data*/
export function downloadFile_client(filename: string, fileFormat: '.txt' | '.json', data: unknown) {
	if (isNode) { bigConsoleError('downloadFile_client can only be run clientside!'); return }
	const a = document.createElement('a')
	a.href = window.URL.createObjectURL(new Blob([data as BlobPart], { type: 'text/plain' }))
	a.download = `${filename}${fileFormat}`
	a.click()
}

_ /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_ /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_ /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_ /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_ /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_ /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_ /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_ /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_ /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_ /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/

/**@deprecated use "formatDate instead" */
export function getFormattedTimestamp() { doNothing }
/**
 * Create multiple array.maps for a single array
 * @param arr The array that shall be multiMap'd
 * @param fns An object of fns, to be objectMap'd
 * @returns An object with the same keys as "fns", but the values are mapped to each have processed "arr"  
 * @deprecated Not really, but is a work in press, see "issues"
 * @issues The mapped properties return "any[]" instead of the return type of that method
 */
// ! work in progress
function multiMap<item, fn extends (arg: item) => ReturnType<fn>, fns extends Record<string, fn>>(arr: item[], fns: Readonly<fns>) {
	return mapObject(fns, fn => arr.map(item => fn(item)))
} { multiMap }

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

/** Check the version of @botoron/utils, the enviroment variables and various config files */
export async function basicProjectChecks(errorHandler = divine.error as messageHandler) {
	//TODO: make sure io.ts exports { initializedIo } so that the code in the file is ran by only calling init.ts?
	//TODO: an schema for ref's esqueleton? (temp, debug, debugLog, devOrProd, socket)
	//TODO: check "ref.ts" matches (getDebugOptions, mongoCollection)
	//TODO: check all exports are exported in-line ("export function sampleFunction.." instead of "export { fn1, fn2, etc }" )
	//TODO: make sure all top-level variables are exported

	function addToErrors(error: string) { return errors.push(error) }
	const { DEV_OR_PROD } = getEnviromentVariables()
	const errors: string[] = []

	const allChecksPass = await allChecks()
	if (errors.length) { errorHandler('\n\n' + errors.join('\n\n') + '\n\n'); return false }
	else { successLog('all basicProjectChecks passed'); return allChecksPass }

	/**Promise.all([basic checks]) */
	async function allChecks() {
		return await Promise.all([
			checkAllTopLevelFunctionAreDescribed(), checkAllVueComponentsAreTrackeable(), checkEnviromentVariables(),
			checkEslintConfigRules(), checkFilesAndFolderStructure(), checkGitIgnore(), checkJsonPackageScripts(),
			checkTsConfigCompilerOptions(), checkUtilsVersion(), checkVueDevFiles(),
		])
	}

	/**Check all the top-level functions in main .ts server files have a description */
	async function checkAllTopLevelFunctionAreDescribed() {

		if (DEV_OR_PROD !== 'DEV') { return true }

		let checkIsPassed = true
		const path = './server'
		const serverTsFiles = getFilesAndFolders(path, '.ts')

		for await (const file of serverTsFiles) {
			const content = await fsReadFileAsync(file)
			const lines = content.split('\n')

			const uncommentedTopLevelFunctions = lines.reduce((acc, line, index) => {
				const isTopLevelFunction = /^(export ){0,}(async|function)/.test(line)
				if (!isTopLevelFunction) { return acc }

				const isCommented = /\*\//.test(lines[index - 1] as string)
				if (isCommented) { return acc }

				acc.push(line.slice(0, line.length - 5).replace(/(export ){0,}(async |function |\(.{1,})/g, ''))
				return acc
			}, [] as string[])

			if (!uncommentedTopLevelFunctions.length) { continue }
			addToErrors(`Uncommented top-level functions     (in ${file}):     [${uncommentedTopLevelFunctions.join(', ')}]`)
			checkIsPassed = false
		}

		return checkIsPassed
	}

	/**Check all the vue components are trackable by the window */
	async function checkAllVueComponentsAreTrackeable() {

		if (DEV_OR_PROD !== 'DEV') { return true }

		let checkIsPassed = true
		const path = './client/src'
		const dotVueFiles = getFilesAndFolders(path, '.vue')

		for await (const file of dotVueFiles) {
			const wantedMatch = 'window.trackVueComponent'
			const vueFile = await fsReadFileAsync(file)
			if (vueFile.includes(wantedMatch)) { continue }
			addToErrors(`${file} must include "${wantedMatch}"`)
			checkIsPassed = false
		}

		return checkIsPassed
	}

	/**Check if all the desired enviroment keys are defined */
	function checkEnviromentVariables() {
		const env = getEnviromentVariables()
		return zodCheck_curry(addToErrors, false)(zMyEnv, env)
	}

	/**Check the rules in a project's eslint config file all fit the established schema */
	async function checkEslintConfigRules() {
		const pathToUtilsEslint = './.eslintrc.cjs'
		const desiredEslintConfig = (await import(pathToUtilsEslint)).default
		const eslintConfingOfProject = await importFileFromProject('.eslintrc', 'cjs')
		return zodCheck_curry(addToErrors)(getZodSchemaFromData(desiredEslintConfig), eslintConfingOfProject)
	}

	/**Check the structure of the project */
	function checkFilesAndFolderStructure() {

		const currentFilesAndFolders = getFilesAndFolders('.', null)

		const desiredFilesAndFolders = [
			'./.env', './.eslintrc.cjs', './.git', './.gitignore',
			'./node_modules', './package-lock.json', './package.json', './README.md',
			'./test', './TODO.MD',

			'./tsconfig.json', './types.d.ts', './types_io.ts', './types_z.ts',
			'./server/fns.ts', './server/init.ts', './server/io.ts', './server/ref.ts',

			'./client/env.d.ts', './client/index.html', './client/node_modules', './client/package-lock.json', './client/package.json',
			'./client/tsconfig.config.json', './client/tsconfig.json', './client/vite.config.ts', './client/vue.config.js',

			'./client/src/App.vue', './client/src/assets', './client/src/index.ts',
			'./client/src/main.ts', './client/src/socket.ts', './client/src/store.ts',
		]

		const missingItems = compareArrays(desiredFilesAndFolders, currentFilesAndFolders).missingItems
		if (missingItems.length) { addToErrors(`The following files/directories are missing: [${missingItems.join(', ')}]`) }
		return missingItems.length === 0
	}

	/**Check all files/folders that should be ignored by default are so */
	async function checkGitIgnore() {
		const desiredIgnores = ['.env', 'client/node_modules', 'node_modules', 'test/*']
		const currentIgnores = (await fsReadFileAsync('./.gitignore')).split('\r\n')
		const missingItems = compareArrays(desiredIgnores, currentIgnores).missingItems

		if (missingItems.length) { addToErrors(`.gitignore must include the following: [${missingItems.join(', ')}]`) }
		return missingItems.length === 0
	}

	/**Check the scripts in a project's package json all fit the established schema */
	async function checkJsonPackageScripts() {
		const currentPackageJsonScripts = (<packageJson>await importFileFromProject('package', 'json')).scripts
		const desiredPackageJsonScripts = (await import('./scripts.json', { assert: { type: 'json' } })).default.scripts
		return zodCheck_curry(addToErrors)(getZodSchemaFromData(desiredPackageJsonScripts), currentPackageJsonScripts)
	}

	/**Check the rules in a project's ts config file all fit the established schema */
	async function checkTsConfigCompilerOptions() {
		const desiredTsConfig = await getTsConfigJson('./node_modules/@botoron/utils/tsconfig.json')
		const usedTsConfig = await getTsConfigJson('./tsconfig.json')

		const zSchema = getZodSchemaFromData(desiredTsConfig)
		return zodCheck_curry(addToErrors)(zSchema, usedTsConfig)

		/**Get the ts config file of the main project */
		async function getTsConfigJson(filepath: string) {
			try {
				return JSON.parse(
					(await fsReadFileAsync(filepath)).
						replace(/\/(\/|\*).{1,}/g, '').
						replace(/(\n|\r|\t)/g, '').
						replace(', }', ' }') //{ { <-- commented here to keep the colour of brackets the same
				) as tsConfig

			} catch (e) { return e as tsConfig }
		}
	}

	/**Check if the project is using the latest version of "myUtils" */
	async function checkUtilsVersion() {
		const latestVersion = await getLatestVersion()
		const installedVersion = (await import('./package.json', { assert: { type: 'json' } })).default.version
		const isUpToDate = installedVersion === latestVersion

		if (!isUpToDate) { errorHandler(`Outdated "utils" package. (${installedVersion} vs ${latestVersion}) PLEASE UPDATE: npm run btr`) }
		return isUpToDate

		/**Check if the project is using the latest version of "@botoron/utils" */
		async function getLatestVersion() {
			type pck = { objects: [{ package: { version: string } }] }
			const response: pck = (await new Promise((resolve) => {
				try {
					fetch('http://registry.npmjs.com/-/v1/search?text=@botoron/utils&size=1').
						then(res => res.json().then((x) => resolve(x as pck)))
				}
				catch { return { objects: [{ package: { version: '0' } }] } }
			}))
			return response.objects[0].package.version
		}
	}

	/**Turn off that damn skipLibCheck that comes on by default */
	async function checkVueDevFiles() {

		if (DEV_OR_PROD !== 'DEV') { return true }

		const allVueChecksPass = await Promise.all([
			readVueFile('vue.config.js', 'export const devServer = { proxy: \'http://localhost:\' + process.env.port }'),
			readVueFile('vite.config.ts', 'optimizeDeps: { exclude: [\'node_modules/@botoron/utils\'], },'),
			readVueFile('vue.config.js', 'export const assetsDir = resolve(__dirname, \'../assets\')'),
			readVueFile('node_modules/@vue/tsconfig/tsconfig.json', '"skipLibCheck": false'),
			readVueFile('env.d.ts', '/// <reference types="../types" />'),
		])

		return allVueChecksPass

		async function readVueFile(clientSlash: string, mustMatch: string) {
			const path = './client/' + clientSlash
			if (!await fileExists(path)) { return }

			const file = await fsReadFileAsync(path)
			if (file.includes(mustMatch)) { return true }
			addToErrors(`file     (${path})     must include:    ${mustMatch}`)
		}

		async function fileExists(path: string) {
			try {
				await fs.promises.access(path)
				return true
			}
			catch {
				addToErrors('Missing file, couldn\'t read: ' + path)
				return false
			}
		}
	}

	/**Get all the file and folders within a folder, stopping at predefined folders */
	function getFilesAndFolders(directory: string, extension: '.ts' | '.vue' | null) {
		const results: string[] = []

		fs.readdirSync(directory).forEach((file) => {
			file = directory + '/' + file
			const stat = fs.statSync(file)

			const stopHere = /node_modules|git|test|assets/.test(file)
			if (stat && stat.isDirectory() && !stopHere) { results.push(...getFilesAndFolders(file, null)) }
			else
				results.push(file)
		})

		return extension ? results.filter(filename => filename.includes(extension)) : results
	}
}
/**FOR NODE-DEBUGGING ONLY. Log a big red message surrounded by a lot of asterisks for visibility */
export function bigConsoleError(message: string) {
	function logAsterisks(lines: number) { for (let i = 0; i < lines; i++) { log('*'.repeat(150)) } }
	function log(message: string) { return colorLog('red', message) }

	logAsterisks(3)
	log(message)
	logAsterisks(3)
}
/**Copy to clipboard while running node */
export function copyToClipboard_server(x: unknown) { return clipboard.write(JSON.stringify(x)) }
/**FOR NODE-DEBUGGING ONLY. Stringifies and downloads the provided data*/
export async function downloadFile_node(filename: string, fileFormat: '.txt' | '.json', data: unknown, killProcessAfterwards: boolean) {
	const formatted = stringify(data as object)
	const dateForFilename = formatDate(Date.now(), 'es', 'short').replace(/\/| |:/g, '_')
	const completeFilename = filename + '_' + dateForFilename + fileFormat

	colorLog('cyan', `Downloading ${completeFilename}..`)
	await fsWriteFileAsync(completeFilename, formatted)
	successLog('Done!')

	if (!killProcessAfterwards) { return }
	if (process.env['quokka']) { return }
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
/** Get the contents of the project's .env */
export function getEnviromentVariables() {
	const require = createRequire(import.meta.url)
	require('dotenv').config({ path: './.env' })
	return process.env as myEnv
}
/**(Use with Quokka) Create an untoggable comment to separate sections, relies on "_" as a variable */
export function getSeparatingCommentBlock(message: string) {
	let line = ''
	const asterisks = '*'.repeat(10)
	while (line.length < 100) { line += `${asterisks} ${message.toUpperCase()} ${asterisks}` }
	const theBlock = `_ /${line}/\n`.repeat(5)
	console.log(theBlock)
	return theBlock
}
/**fetch the latest package.json of my-utils */
export async function getLatestPackageJsonFromGithub() {
	type response_github_file = { content: string }

	const response: response_github_file = await new Promise((resolve) => {
		fetch('https://api.github.com/repos/botoron/utils/contents/package.json', { method: 'GET' }
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		).then((res: any) => res.json().then((packageJson: any) => resolve(packageJson)))
	})

	return Buffer.from(response.content, 'base64').toString('utf8')
}
/**It's monging time >:D */
export async function getMongoClient() {
	const { MONGO_URI } = getEnviromentVariables()

	const mongo = new mongodb.MongoClient(MONGO_URI)
	let mongoClient: MongoClient = <MongoClient>nullAs()
	mongo.connect((err, client) => { if (err) { throw err } mongoClient = client as MongoClient })
	colorLog('cyan', 'waiting for Mongo')
	while (!mongoClient) { await delay(1000) }
	successLog('It\'s Monging time >:D')
	return mongoClient
}
/**Start and return an http Express server */
export function getStartedHttpServer() {
	const { PORT } = getEnviromentVariables()

	const app = express()
	const httpServer = http.createServer(app)
	app.use(express.static(path.resolve() + '/public'))
	app.get('/', (_request, response) => response.sendFile(path.resolve() + '/public/index.html'))
	httpServer.listen(PORT, () => delay(1500).then(() => console.log(`server up at: http://localhost:${PORT}/`)))
	return httpServer
}
/**Get the package json of the project with this (utils) package installed */
export async function importFileFromProject<T>(filename: string, extension: 'cjs' | 'js' | 'json') {
	try {
		const path = `../../../${filename}.${extension}`
		const options = extension === 'json' ? { assert: { type: 'json' } } : {}
		const mainPackageJson = (await import(path, options)).default
		return mainPackageJson as T

	} catch (e) { return e }
}
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export function killProcess(message: string) { bigConsoleError(message); process.exit() }
/**Easily run the scripts of this (utils) repo's package.json */
export async function npmRun_package(npmCommand: validNpmCommand_package) {

	const utilsRepoName = 'Utils 🛠️'

	if (npmCommand === 'arrowsToDeclarations') { convertArrowFunctionsToDeclarations() }
	if (npmCommand === 'transpile') { transpileFiles(() => colorLog('magenta', 'Process over')) }
	if (npmCommand === 'git') { prompCommitMessageAndPush(utilsRepoName) }
	if (npmCommand === 'all') { transpileFiles(promptVersioning) }

	async function convertArrowFunctionsToDeclarations() {
		let content = await fsReadFileAsync('./arrowFns/input.ts')
		const found = content.match(/const \w{1,} = (<.{1,}>){0,}\(.{1,}\) => {/g)
		found!.forEach(match => { content = content.replace(match, convert(match)) })

		const hour = formatDate(Date.now(), 'es', 'hourOnly')
		await fsWriteFileAsync('./arrowFns/output.ts', content)
		colorLog('yellow', `[${hour}]: ${found!.length} arrow functions converted to funtion declarations (check arrowFns/output.td)`)

		function convert(arrowFn: string) {

			const typesRegex = /(<T>){1,}/
			const nameRegex = /(?<=const )\w{1,}/
			const paramsRegex = /(?<=const \w{1,} = (<.{1,}>){0,})\(.{1,}(?= => {)/

			const fnName = arrowFn.match(nameRegex)![0]
			const params = arrowFn.match(paramsRegex)![0]
			const types = (arrowFn.match(typesRegex) || [])[0] || ''

			console.log('..converting ' + fnName)

			const renamed = `function ${fnName}${types}${params} {`
			return renamed
		}
	}

	async function promptVersioning() {
		function tryAgain(error: string) { colorLog('yellow', error); promptVersioning() }
		const versionIncrement = await questionAsPromise('Type of package version increment (major, minor, patch)?')

		if (!zodCheck_curry(tryAgain)(zValidVersionIncrement, versionIncrement)) { return }
		await prompCommitMessageAndPush(utilsRepoName)

		exec(`npm version ${versionIncrement}`, (_err, stdout) => {
			console.log({ stdout })
			successLog('package.json up-version\'d')
		})
	}

	function transpileFiles(followUp: btr_voidFn) {
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
/**Run convenient scripts for and from a project's root folder */
export async function npmRun_project(npmCommand: validNpmCommand_project) {
	//async (options: { serverFolder_dist?: string, serverFolder_src?: string, fileWithRef?: string })
	//if (!options) { options = defaults }
	//const { serverFolder_dist, serverFolder_src, fileWithRef } = addMissingPropsToObjects(options!, defaults)

	await basicProjectChecks()
	if (npmCommand === 'check') { return }

	const defaults = { serverFolder_dist: '../dist', serverFolder_src: './test', fileWithRef: 'ref' }
	const { serverFolder_dist, serverFolder_src, fileWithRef } = defaults
	const { APP_NAME } = getEnviromentVariables()

	if (npmCommand === 'git') { prompCommitMessageAndPush(`${APP_NAME}`) }
	if (['build', 'transpile'].includes(npmCommand)) { canTranspileCheckAndHandle() }

	async function canTranspileCheckAndHandle() {

		const canTranspile = await getCanTranspile()
		if (!canTranspile) { killProcess(`CANT TRANSPILE, ${fileWithRef}.js has debugging: on`) }

		if (npmCommand === 'build') { transpileToDistFolder_plusCopyOverOtherFiles() }
		if (npmCommand === 'transpile') { transpileServerFilesToTestFolder() }

		async function getCanTranspile() {
			try { return !/debugging: true/.test(await fsReadFileAsync(`test/server/${fileWithRef}.js`)) }
			catch { return true }
		}

		function transpileServerFilesToTestFolder() {
			exec(`tsc --target esnext server/init.ts --outDir ${serverFolder_src}`, async () => {
				const packageJson = await fsReadFileAsync('package.json')
				await fsWriteFileAsync('test/package.json', packageJson)
				successLog(`files transpiled to ${serverFolder_src}`)
			})
		}

		async function transpileToDistFolder_plusCopyOverOtherFiles() {
			if (!(await checkDevPropsOfRef('server/' + fileWithRef + '.ts', false))) { return }
			await transpileTypesFile()
			await copyFileToDis('.env')
			await copyFileToDis('.gitignore')
			await copyFileToDis('package.json')
			await copyFileToDis('types.js')

			exec(`tsc --target esnext server/init.ts server/io.ts --outDir ${serverFolder_dist}`, async () => {
				await checkDevPropsOfRef(serverFolder_dist + '/server/' + fileWithRef + '.js', true)
				successLog('(server) Build sucessful!')
			})

			async function checkDevPropsOfRef(filePath: string, toggleForProduction: boolean) {
				let fileContent = await fsReadFileAsync(filePath)
				if (!checkFor('devOrProd = \'dev\'', 'devOrProd = \'prod\'')) { return }
				if (toggleForProduction) { await fsWriteFileAsync(filePath, fileContent) }
				return true

				function checkFor(forSrc: string, forDist: string) {
					if (!fileContent.includes(forSrc)) { killProcess(`main.ts.ref must include: (${forSrc})`); return }
					if (toggleForProduction) { fileContent = fileContent.replace(forSrc, forDist) }
					return true
				}
			}

			async function copyFileToDis(filename: string) {
				let content = await fsReadFileAsync(filename)
				if (filename === 'package.json') { deleteAllPackageJsonScriptsExceptStart() }
				await fsWriteFileAsync('../dist/' + filename, content)

				function deleteAllPackageJsonScriptsExceptStart() {
					content = content.replace(/"scripts": {[^}]{1,}/, `"scripts": { 
		"start": "node server/init.js",
		"git": "git add . & git commit & git push",
		"btr": "npm i @botoron/utils"
	`)
				}
			}
		}

		async function transpileTypesFile() {
			return await new Promise(resolve => {
				fsReadFileAsync('types.d.ts').then(typesFile => {
					fsWriteFileAsync('types.ts', typesFile).then(() => {
						exec('tsc --target esnext types.ts', () => {
							successLog('types.d.ts transpiled to root folder!')
							fs.unlinkSync('types.ts')
							delay(1000).then(() => resolve(true))
						})
					})
				})
			})
		}
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
				colorLog('cyan', 'Commit message copied to clipboard, paste it in the editor, save and close.')
				exec('git commit', () => {
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

const command_package = process.env['npm_config_command_package'] as validNpmCommand_package
const command_project = process.env['npm_config_command_project'] as validNpmCommand_project
if (command_package) { zodCheckAndHandle(zValidNpmCommand_package, command_package, npmRun_package, [command_package], console.log) }
if (command_project) { zodCheckAndHandle(zValidNpmCommand_project, command_project, npmRun_project, [command_project], console.log) }

_ /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_ /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_ /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_ /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_ /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_ /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_ /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_ /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_ /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_ /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/

export const divine = {
	bot: <eris.Client>nullAs(),
	error: (err: string | Error) => {
		const message = getTraceableStack(err)
		const { DEV_OR_PROD } = getEnviromentVariables()
		DEV_OR_PROD !== 'PROD' ? killProcess(message) : divine.ping(message)
	},
	init: (async () => {
		delay(1000).then(async () => {
			if (command_package || command_project) { return }

			const { APP_NAME, DEV_OR_PROD, ERIS_TOKEN } = getEnviromentVariables()
			if (DEV_OR_PROD !== 'PROD') { return }

			const divinePrepend = '***DivineBot:***'
			const bot = eris(ERIS_TOKEN)

			bot.on('messageReactionRemove', (a: eris.PossiblyUncachedMessage, b: eris.PartialEmoji, c: eris.Member) => role('remove', a, b, c))
			bot.on('messageReactionAdd', (a: eris.PossiblyUncachedMessage, b: eris.PartialEmoji, c: eris.Member) => role('add', a, b, c))
			bot.on('disconnect', () => { colorLog('red', `${divinePrepend}: Disconnected D: ... retrying!`) })
			bot.on('connect', () => divine.ping(`(${APP_NAME}) - I'm alive bitch >:D`))

			const idOfRoleAssigningMessage = '822523162724925473'
			await attemptConnection()
			divine.bot = bot

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
					bot.connect()
					colorLog('cyan', 'waiting for DivineBot')
					while (!bot.uptime) { await delay(1000) }
					successLog('The divine egg has hatched')
				}
				catch {
					colorLog('yellow', `${divinePrepend} Failed to connect.. retrying >:D`)
					await delay(1000)
					attemptConnection()
				}
			}
		})
	})(),
	ping: async (message: string) => {
		while (!divine.bot?.ready) { await delay(1000) }
		const { APP_NAME } = getEnviromentVariables()

		const theMessage = `<@470322452040515584> - (${APP_NAME}) \n ${message}`
		const divineOptions = { content: theMessage, allowedMentions: { everyone: true, roles: true } }
		divine.bot.createMessage('1055939528776495206', divineOptions)
	}
}





