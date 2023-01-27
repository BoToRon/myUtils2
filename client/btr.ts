let _
_
_
_
_
_
_
_
_
_
_
_
_
_
_
import {
	arrayPredicate, btr_validVariant, btr_trackedVueComponent, bvModal, bvToast, cachedFile, maybePromise,
	messageHandler, myEnv, nullable, pipe_mutable_type, pipe_persistent_type, timer, validChalkColor,
	validNpmCommand_package, validNpmCommand_project, vueComponentsTracker, zSchema
} from './types/types.js'
_
import { getUniqueId_generator, isNode, utilsRepoName, zValidVariants, zValidVersionIncrement } from './types/constants.js'
_
import { type Primitive, z, type ZodRawShape, type ZodTypeAny } from 'zod'
_
import { fromZodError } from 'zod-validation-error'
_

export const timers: timer[] = []
const warnings: string[] = []
const errors: string[] = []

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

/**Add/remove a vue component to the window for easy access/debugging */
export function trackVueComponent<T extends string>(
	name: T,
	component: btr_trackedVueComponent,
	window: { vueComponents: vueComponentsTracker<T> }
) {

	component.name = name
	component.id = getUniqueId(name)
	component.beforeDestroy = onDestroy

	if (!window.vueComponents) { window.vueComponents = {} as vueComponentsTracker<T> }
	if (!window.vueComponents[name]) { window.vueComponents[name] = [] }

	successLog(`Component '${name}' added to window.vueComponents [${window.vueComponents[name].length}]`)
	window.vueComponents[name].push(component)
	logAllComponents()

	function logAllComponents() {
		colorLog('blue', `window.vueComponents: ${stringify(mapObject(window.vueComponents, value => value.length))}`)
	}

	function onDestroy() {
		errorLog(`Component '${name}' (id: ${component.id}) removed from window.vueComponents`)
		removeItem(window.vueComponents[name], component)
		logAllComponents()
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
export function arrayToObject<
	T extends Readonly<Array<string>>,	//@btr-ignore
	F extends (...x: (T[number])[]) => ReturnType<F>
>(arr: T, mappingFn: F) {
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
/**Return the last item of the given array */
export function lastItem<T>(arr: T[]) { return arr[arr.length - 1] as T }
/**Apply multiple mapping functions to a single array at once and return an object with all the result */
export function multiMap<
	T,
	F1 extends (x: T) => ReturnType<F1>,
	F2 extends (x: T) => ReturnType<F2>,
	F3 extends (x: T) => ReturnType<F3>,
	F4 extends (x: T) => ReturnType<F4>,
	F5 extends (x: T) => ReturnType<F5>,
>(arr: T[], f1: F1, f2: F2, f3 = doNothing as F3, f4 = doNothing as F4, f5 = doNothing as F5) {
	const maps = arr.reduce((acc, item) => {
		acc.map1.push(f1(item))
		acc.map2.push(f2(item))
		acc.map3.push(f3(item))
		acc.map4.push(f4(item))
		acc.map5.push(f5(item))
		return acc
	}, {
		map1: [] as ReturnType<F1>[],
		map2: [] as ReturnType<F2>[],
		map3: [] as ReturnType<F3>[],
		map4: [] as ReturnType<F4>[],
		map5: [] as ReturnType<F5>[],
	})
	return maps
}
/*Remove a single item from an array, or all copies of that item if its a primitive value and return the removedCount */
export function removeItem<T>(arr: T[], item: T) { return selfFilter(arr, (x: T) => x !== item).removedCount }
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
export function doAndRepeat(fn: () => void, interval: number) { tryF(fn, []); setInterval(() => tryF(fn, []), interval) }
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
export async function tryF<T extends (...args: Parameters<T>) => maybePromise<ReturnType<T>>>(
	fn: T,
	args: Parameters<T>,
	errorHandler = divine.error as messageHandler) {
	try { return await fn(...args) }
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
/**Convert duration as a timestamp to clock format (xx:xx:xx.xxx) with selectable amount of decimals */
export function toClockDuration(timestamp: number, decimalAfterSeconds: 0 | 1 | 2 | 3) {
	const second = 1000
	const minute = second * 60
	const hour = minute * 60
	return `${getClockField(hour)}:${getClockField(minute)}:${getClockField(second)}${getDecimals()}`

	function getClockField(timeUnit: number) {
		let x = 0
		while (timestamp >= timeUnit) { timestamp -= timeUnit; x++ }
		const asString = `${x}`
		return asString.length === 1 ? `0${asString}` : asString
	}

	function getDecimals() {
		return decimalAfterSeconds ? `.${getClockField(1).slice(0, decimalAfterSeconds)}` : ''
	}
}
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
export function deepClone<T extends object>(originalObject: T) {
	const copy = JSON.parse(stringify(originalObject)) as T
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
/**Object.keys but with proper type-inference */ //@btr-ignore
export function objectKeys<K extends string, T extends Record<K, unknown>>(object: T) { return Object.keys(object) as (keyof T)[] } //@btr-ignore
/**Object.values but with proper type-inference */
export function objectValues<T extends object>(object: T) { return Object.values(object) as T[keyof T] }
/**Create an object with only the specified properties of another base object (references are kept) */
export function pick<T extends object, K extends keyof T>(theObject: T, properties: readonly K[]) {
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
export function replaceObject<K extends keyof T, T extends Record<K, unknown>>(originalObject: T, newObject: T) {
	objectKeys(originalObject).forEach(key => delete originalObject[key])
	objectKeys(newObject).forEach(key => originalObject[key as keyof T] = newObject[key])
}
/**Stringy an array/object so its readable //TODO: (edit so that it doesn't excluse object methods, see deepClone) */
export function stringify<T extends object>(object: T) {
	const seen = new WeakSet()
	return JSON.stringify(object, (_key: string, value: nullable<object>) => {
		if (typeof value === 'object' && value !== null) {
			if (seen.has(value)) { return '< Circular >' }
			seen.add(value)
		}
		return value
	}, '  ')
}
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
 * Set an interval that is automatically killed when the stay-alive-checker fails but can also be manually killed with killTimer
 * @param id The id of the timer, so that btr.killTimer can find it
 * @param intervalInMs How often onEach will run
 * @param stayAliveChecker Predicate that automatically kills the interval on failure
 * @param onEach The function that runs with each cycle of the interval
 * @param onKill The function that killTimer will run when killing the interval
 * @param timesRanSucessfully The amount of times the interval ran before its dismise
 * @returns initializeTimer's resolveInfo with the return of onKill as the value (since onEach never resolves, just keeps going)
 */
export async function initializeInterval<
	eachF extends () => maybePromise<ReturnType<eachF>>,
	cancelF extends () => maybePromise<ReturnType<cancelF>>>(
		id: string,
		intervalInMs: number,
		stayAliveChecker: () => maybePromise<boolean>,
		onEach: eachF,
		onKill: cancelF,
		timesRanSucessfully: number
	) {
	type resolveInfo = Awaited<ReturnType<typeof initializeTimer<eachF, cancelF>>>
	const doContinue = await stayAliveChecker()
	return { timesRanSucessfully, ...await getResult() } as resolveInfo & { timesRanSucessfully: number, wasCancelled: true }

	async function getResult(): Promise<resolveInfo> {
		return await new Promise(resolve => {
			if (doContinue) {
				initializeTimer(id, Date.now() + intervalInMs, onEach, onKill).then(result => {
					if (result.wasCancelled) { return resolve(result) }
					initializeInterval(id, intervalInMs, stayAliveChecker, onEach, onKill, timesRanSucessfully + 1).then(result => resolve(result))
				})
			}
			else {
				initializeTimer(id, Date.now() + intervalInMs, onEach, onKill).then(result => resolve(result))
				killTimer(id, `stayAliveChecker (${stayAliveChecker.name}) = false`)
			}
		})
	}
}
/**
 * Set a cancellable timer that runs at the specified time
 * @param id The id of the timer, so that btr.killTimer can find it
 * @param runAt The date (timestamp) at which "onComplete" should run
 * @param onComplete The function that should run if the timer wasn't cancelled 
 * @param onCancel The function that should run if the timer was cancelled via killTimer
 * @returns the return of "onComplete" if it was completed, or all info revelant to cancellation along with the value of "onCancel"
 */
export async function initializeTimer<
	completeF extends () => maybePromise<ReturnType<completeF>>,
	cancelF extends () => maybePromise<ReturnType<cancelF>>
>(
	id: string,
	runAt: number,
	onComplete: completeF,
	onCancel: cancelF
) {

	const timer: timer = {
		id, runAt, onComplete, onCancel,
		value_onComplete: nullAs(),
		value_onCancel: nullAs(),
		resolveInfo: nullAs(),
		startedAt: Date.now(),
		wasCancelled: false,
		cancelStack: '',
		cancelledAt: 0,
	}

	timers.push(timer)
	return await interval()

	async function getResolvedTimer<
		completeF extends () => maybePromise<ReturnType<completeF>>,
		cancelF extends () => maybePromise<ReturnType<cancelF>>
	>() {
		const { id, startedAt, runAt, onComplete, onCancel, cancelledAt, cancelStack, wasCancelled } = timer
		if (!timer.wasCancelled) { timer.value_onComplete = await timer.onComplete() }
		else { doNothing } /**timer.value_onCancel should have been set in killTimer */

		timer.resolveInfo = {
			timerId: id,
			startedAt: formatDate(startedAt, 'es', 'medium+hour'),
			intendedRunAt: formatDate(runAt, 'es', 'medium+hour'),
			cancelledAt: wasCancelled ? formatDate(cancelledAt, 'es', 'medium+hour') : null,
			timeElapsedBeforeCancelation: wasCancelled ? `${(cancelledAt - startedAt) / 1000} seconds` : null,
			timeLeftBeforeCancelation: wasCancelled ? `${(runAt - timer.cancelledAt) / 1000} seconds` : null,
			onCompleteFn: onComplete.name,
			onCancelFn: onCancel.name,
			cancelStack,
		}
		return timer
	}

	async function interval(): Promise<ReturnType<typeof getResolvedTimer>> {
		const maxInterval = 1000
		const timeLeft = Math.max(runAt - Date.now(), 0)
		const isTheLastInterval = maxInterval >= timeLeft

		await delay(isTheLastInterval ? timeLeft : maxInterval)
		if (isTheLastInterval) { removeItem(timers, timer) }

		return timer.wasCancelled ? timer : isTheLastInterval ? getResolvedTimer() : interval()
	}
}
/**Kill a timer created with initializeTimer/Interval, the reason provided will become a divine stack */
export async function killTimer(timerId: string, reason: string) {
	const theTimer = timers.find(x => x.id === timerId)
	if (!theTimer) { divine.error('Unable to cancel, no timer was found with this id: ' + timerId); return }

	removeItem(timers, theTimer)

	theTimer.value_onCancel = await theTimer.onCancel()
	theTimer.cancelStack = getTraceableStack(reason, 'killTimer')
	theTimer.cancelledAt = Date.now()
	theTimer.wasCancelled = true

	return theTimer
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

/**Add an "S" to the end of a noun if talking about them in plural based on the amount passed */
export function asSingularOrPlural(noun: string, amount: number) { return noun + `${amount === 1 ? '' : 's'}` }
/**console.log... WITH COLORS :D */ //@btr-ignore
/** Copy to clipboard using the corresponding function for the running enviroment (node/client)*/
export function copyToClipboard(x: unknown) { isNode ? copyToClipboard_server(x) : copyToClipboard_client(x) }
/**(Message) 💀 */
export function errorLog(message: string) { return colorLog('red', message + ' 💀') }
/**TODO: describe me */
export function getTraceableStack(error: string | Error, type: string) {
	const { stack } = (typeof error === 'string' ? new Error(error) : error)
	return `${stack}`.
		replace(/\(node:3864\).{0,}\n.{0,}exit code./, '').
		replace(/\n {4}at/g, `\n ${' * '.repeat(5)} at`).
		replace(/^Error/, type)
}
/**@returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export function isGuest(username: string) { return /Guest[0-9]{13}/i.test(`${username}`) }
/**To know when files are fired and in what order  */
export function logInitialization(filename: string) { colorLog(isNode ? 'cyan' : 'magenta', '*'.repeat(20) + ' ' + filename) }
/**(Message) ✔️ */
export function successLog(message: string) { return colorLog('green', message + ' ✔️') }
/**@returns an string with its linebreaks converted into simple one-char spaces */
export function toSingleLine(sentence: string) { return `${sentence}`.replace(/ {0,}\n {0,}/g, ' ') }
/**Return an string with X amount of spaces as margin per side */
export function withSpaceMargins(string: string, spaces: number) { const margin = ' '.repeat(spaces); return margin + string + margin }

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
/**Margin to make reading logs easier */
export function logEmptyLine() { console.log('') } //@btr-ignore
/** @returns null, as the provided type */
export function nullAs<T>() { return null as T } //@btr-ignore
/**
 * Return the regex given with possibly an error indicating it wasn't matched.
 * MUST BE USED AS A SPREAD ARGUMENT, eg: zString.regex( ...zRegexGenerator(/hi/, false) )
 * @param regex The regex to get the error message from
 * @param exactPhrase If true, it will return an error if there's anything before or after the match
 * @returns Arguments for zod's regex string method (theRegex, theErrorMesssage)
 */
export function zRegexGenerator(regex: RegExp, exactPhrase: boolean) {
	if (exactPhrase) {
		let asString = String(regex)
		asString = asString.slice(1, asString.length - 1)
		regex = new RegExp('^' + asString + '$')
	}
	return [regex, 'Regex not matched: ' + regex] as [RegExp, string]
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
export function copyToClipboard_client(x: unknown) {
	const text = stringify(x as object)
	const a = document.createElement('textarea')
	a.innerHTML = text
	document.body.appendChild(a)
	a.select()
	document.execCommand('copy')
	document.body.removeChild(a)
}
/**Stringifies and downloads the provided data*/
export function downloadFile_client(filename: string, fileFormat: '.txt' | '.json', data: unknown) {
	if (isNode) { colorLog('downloadFile_client can only be run clientside!'); return }
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

/**@deprecated use "formatDate" instead */
export function getFormattedTimestamp() { doNothing }
/**@deprecated use "trackVueComponent" instead */
export function trackVueComponent_curry() { doNothing }

const colorLog = (color: string, message: string) => console.log(`%c${message}`, `color: ${color};`)