/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable func-style */
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

export type btr_trackedVueComponent = { _name: string, beforeCreate?: btr_voidFn, beforeDestroy?: btr_voidFn }
export type btr_newToastFn = (title: string, message: string, variant: btr_validVariant) => void
export type btr_nonVoidFn = <F extends (...args: Parameters<F>) => ReturnType<F>> () => unknown
export type btr_socketEventInfo = { event: string, timestamp: number, data: unknown }
export type btr_intervalWithId = { id: string, interval: NodeJS.Timer }
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
export const zodCheck_curry = (errorHandler = divine.error as messageHandler, strictModeIfObject = true) => {
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
export const trackVueComponent_curry = <T>(zValidVueComponentName: zSchema<T>) => function trackVueComponent(
	name: T,
	componentConstructor: btr_trackedVueComponent,
	window: { vueComponents: btr_trackedVueComponent[] },
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
/**(generates a function that:) Opens/close a bootstrap-vue modal with zod validation */
//TODO: delete this (hard to initialize when bvModal is declared after triggerModalWithValidation in the pinia store)
export const triggerModalWithValidation_curry = <validModalIds extends string>($bvModal: bvModal) => {

	const body = async (id: validModalIds, action: 'show' | 'hide') => {

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
	return body
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
export const addOrRemoveItem = <T>(arr: T[], item: T) => {
	let x: 'added' | 'removed'
	const isInArray = arr.includes(item)
	if (!isInArray) { arr.push(item); x = 'added' }
	else { removeItem(arr, item); x = 'removed' }
	return { action: x, arr }
}
/**Adds an item to an array, or replaces the first one if found. WARNING: make sure the predicate can only find ONE item */
export const addOrReplaceItem = <T>(arr: T[], newItem: T, predicate: arrayPredicate<T>) => {
	const replaceableItem = arr.find(x => predicate(x))
	replaceableItem ? arr[arr.indexOf(replaceableItem)] = newItem : arr.push(newItem)
}
/**Add to arrayA items from array B that it doesn't already have */
export const addUnrepeatedItems = <T>(arr: T[], newItems: T[]) => {
	newItems.forEach(x => { if (!arr.includes(x)) { arr.push(x) } })
	return arr
}
/**
 * @param arr The array (tuple) of strings that each will become a key
 * @param mappingFn The function to determine the value of each entry
 * @returns An object where each key is an item of "arr" and the value is determined by "mappingFn"
 */
export const arrayToObject = <T extends Readonly<Array<string>>, F extends (...x: (T[number])[]) => ReturnType<F>>(arr: T, mappingFn: F) => {
	type K = typeof arr[number]
	const object = {} as Record<K, ReturnType<F>>
	arr.forEach(x => object[x as K] = mappingFn(x))
	return object
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
/**Return an array of sub-arrays with the items of the passed array, where each sub-array's max lenght is the passed size*/
export const chunk = <T>(arr: T[], chunkSize: number) => {
	const results: T[][] = [[]]
	arr.forEach(item => {
		const lastSubArray = lastItem(results)
		lastSubArray.length < chunkSize ? lastSubArray.push(item) : results.push([item])
	})
	return results.reverse()
}
/**Compare array A to array B and return the details */
export const compareArrays = <T>(baseArray: T[], testArray: T[],) => {
	const nonDesiredItems = testArray.filter(x => !baseArray.includes(x))
	const missingItems = baseArray.filter(x => !testArray.includes(x))
	const lengthDifference = baseArray.length - testArray.length

	const arraysHaveTheSameItems = !nonDesiredItems.length && !missingItems.length
	const arraysAreEqual = arraysHaveTheSameItems && !lengthDifference

	return { arraysAreEqual, arraysHaveTheSameItems, lengthDifference, missingItems, nonDesiredItems }
}
/**syntax sugar for arr[arr.length - 1] */
export const getLastItem = <T>(arr: T[]) => arr[arr.length - 1]
/**Returns a random item along its index */
export const getRandomItem = <T>(arr: T[]) => { const r = roll(arr.length); return { item: arr[r] as T, index: r } }
/**Returns a version of the provided array without repeating items */
export const getUniqueValues = <T>(arr: T[]) => [...new Set(arr)]
/**Returns whether an item is the last one in an array or not (warning: maybe don't use with primitives) */
export const isLastItem = <T>(arr: T[], item: T) => arr.indexOf(item) === arr.length - 1
/*Remove a single item from an array, or all copies of that item if its a primitive value and return the removedCount */
export const removeItem = <T>(arr: T[], item: T) => selfFilter(arr, (x: T) => x !== item).removedCount
/**Return the last item of the given array */
export const lastItem = <T>(arr: T[]) => arr[arr.length - 1] as T
/**Remove items from an array that DONT fulfill the given condition, returns the removed items and their amount */
export const selfFilter = <T>(arr: T[], predicate: arrayPredicate<T>) => {
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
export const sortNumbers = (numbers: number[], direction: 'A' | 'D') => {
	numbers.sort((a, b) => a > b ? 1 : - 1)
	if (direction === 'D') { numbers.reverse() }
	return numbers
}
/**Randomizes the order of the items in the array */
export const shuffle = <T>(arr: T[]) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const rand = roll(i + 1);
		[arr[i], arr[rand]] = [arr[rand] as T, arr[i] as T]
	}
	return arr
}
/**Sort an array alphabetically, optionally backwards */
export const sortAlphabetically = <T extends string>(arr: T[], reverseArr?: boolean) => {
	arr.sort((a, b) => a > b ? 1 : -1)
	if (reverseArr) { arr.reverse() }
	return arr
}
/**Sort an array of objects based on the value a property. A: Ascending, D: Descesding. Chainable */
export const sortBy = <T extends object, pars extends [keyof T, 'A' | 'D']>(arr: T[], keyWithDir: pars, ...extraKeysWithDir: pars[]) => {
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
export const spliceIf = <T>(arr: T[], predicate: arrayPredicate<T>) => selfFilter(arr, predicate).removedItems
/**Remove X amount of items from the end of an array */
export const spliceLast = <T>(arr: T[], count: number) => arr.splice(-count)
/**Transfer items that meet a given condition from one array to another */
export const transferItems = <T>(origin: T[], destination: T[], predicate: arrayPredicate<T>) => {
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
export const doAndRepeat = (fn: btr_voidFn, interval: number) => {
	const tryIt = () => tryF(fn, [])
	setInterval(tryIt, interval)
	tryIt()
}
/**Simple and standard functional programming pipe. Deprecated, use either zPipe (persistenType with zod errors) or pipe_mutableType! */
export const pipe_persistentType = <T>(initialValue: T, ...fns: pipe_persistent_type<T>[]) =>
	fns.reduce((result, fn) => fn(result), initialValue)
/**
* Pipes a value through a number of functions in the order that they appear.
* Takes between 1 and 12 arguments. `pipe(x, a, b)` is equivalent to `b(a(x))`.
* If only one argument is provided (`pipe(x)`), this will produce a type error but JS will run fine (and return `x`).
*/
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
export const retryF = async <F extends (...args: Parameters<F>) => ReturnType<F>>(
	fn: F,
	args: Parameters<F>,
	retriesLeft: number,
	defaultReturn: ReturnType<F>,
	delayBetweenRetries: number,
): Promise<{ data: ReturnType<F>, was: 'success' | 'failure' }> => {
	try { return { data: fn(...args), was: 'success' } }
	catch (error) {
		colorLog('yellow', `retryF > ${fn.name} > ${retriesLeft} retriesLeft. {${error}}`)
		if (!retriesLeft) { return { data: defaultReturn, was: 'failure' } }

		await delay(delayBetweenRetries)
		return await retryF(fn, args, retriesLeft - 1, defaultReturn, delayBetweenRetries)
	}
}
/**tryCatch wrapper for functions with divineError as the default error handler */
export const tryF = <T extends (...args: Parameters<T>) => ReturnType<T>>(
	fn: T,
	args: Parameters<T>,
	errorHandler = divine.error as messageHandler
) => {
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
export const zGetSafeParseResultAndHandleErrorMessage = <T>(
	schema: zSchema<T>,
	data: T,
	errorHandler = <messageHandler>nullAs(),
	strictModeIfObject = true
) => {

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
export const zodCheckAndHandle = <D, SH extends (...args: Parameters<SH>) => ReturnType<SH>>(
	zSchema: zSchema<D>,
	data: D,
	successHandler: SH,
	args: Parameters<SH>,
	errorHandler = divine.error as messageHandler,
	strictModeIfObject = true
) => {
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
export const zPipe = <T>(zSchema: zSchema<T>, strictModeIfObject: boolean, initialValue: T, ...fns: pipe_persistent_type<T>[]) => {

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
export const delay = (x: number) => new Promise(resolve => {
	const maxTimeOut = 1000 * 60 * 60 * 24
	const loopsNeeded = Math.floor(x / maxTimeOut)
	const leftOverTime = x % maxTimeOut
	interval(loopsNeeded, leftOverTime)

	function interval(i: number, ms: number) { setTimeout(() => i ? interval(i - 1, maxTimeOut) : resolve(true), ms) }
})
/**Return the time left to make a move in a compacted form and with a variant corresponding to how much of it left */
export const getDisplayableTimeLeft = (deadline: number) => {

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
export const formatDate = (
	timestamp: number,
	language: 'es' | 'en',
	type: 'hourOnly' | 'short' | 'short+hour' | 'medium' | 'medium+hour' | 'long' | 'long+hour'
) => {
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
export const isEven = (number: number) => !isOdd(number)
/**Self-explanatory */
export const isOdd = (number: number) => Boolean(Number(number) % 2)
/**Returns whether a number is either the minimum provided, the maximum provided or any number in-between */
export const isWithinRange = (number: number, max: number, min: number) => {
	if (min > max) { divine.ping('"min" should not be higher than "max"!') }
	return number <= max && number >= min
}
/**Returns a number up to (but not included) provided max, eg: roll(1) will ALWAYS return zero */
export const roll = (maxRoll: number) => Math.floor(Math.random() * Number(maxRoll))
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


/**Add all default properties missing in an object*/
export const addMissingPropsToObjects = <T extends object>(original: T, defaults: Required<T>) => {
	objectKeys(defaults).forEach(key => { if (!Object.prototype.hasOwnProperty.call(original, key)) { original[key] = defaults[key] } })
	return original as Required<T>
}
/**Return a copy that can be altered without having to worry about modifying the original */
export const deepClone = <T>(originalObject: T) => {
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
export const getZodSchemaFromData = (data: unknown) => {

	const toLiteral = (x: unknown): z.ZodLiteral<unknown> => typeof x === 'object' ?
		getZodSchemaFromData(x!) as unknown as z.ZodLiteral<unknown> :
		z.literal(x as never) as z.ZodLiteral<unknown>

	if (!data) { return z.nullable(<ZodTypeAny>nullAs()) }
	if (typeof data !== 'object') { return z.literal(data as Primitive) }
	if (Array.isArray(data)) { return z.tuple(data.map(toLiteral) as []) }
	return z.object(mapObject(data, toLiteral) as ZodRawShape)
}
/**Because ESlint doesn't like Object(x).hasOwnProperty :p */
export const hasOwnProperty = <T extends object>(x: T, key: keyof T) => Object.prototype.hasOwnProperty.call(x, key)
/**Map an object :D (IMPORTANT, all values in the object must be of the same type, or mappinFn should be able to handle multiple types) */
export const mapObject = <F extends (value: O[keyof O]) => ReturnType<F>, O extends object>(object: O, mappingFn: F) => {
	const newObject = {} as { [key in keyof O]: ReturnType<F> }
	objectEntries(object).forEach(x => { newObject[x.key] = mappingFn(x.value) })
	return newObject as { [key in keyof O]: ReturnType<F> }
}
/**Object.entries but with proper type-inference */
export const objectEntries = <T extends object>(object: T) => Object.entries(object).
	map(entry => ({ key: entry[0] as keyof T, value: entry[1] as T[keyof T] }))
/**Object.keys but with proper type-inference */
export const objectKeys = <T extends object>(object: T) => Object.keys(object) as unknown as (keyof T)[]
/**Object.values but with proper type-inference */
export const objectValues = <T extends object>(object: T) => Object.values(object) as T[keyof T]
/**Create an object with only the specified properties of another base object (references are kept) */
export const pick = <T extends object, K extends keyof T>(theObject: T, properties: ReadonlyArray<K>) => {
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
export const replaceObject = <T extends object>(originalObject: T, newObject: T) => {
	objectKeys(originalObject).forEach(key => delete originalObject[key])
	objectKeys(newObject).forEach(key => originalObject[key as keyof T] = newObject[key])
}
/**Stringy an array/object so its readable //TODO: (edit so that it doesn't excluse object methods, see deepClone) */
export const { stringify } = JSON
/**Generator for unique IDs (using Date.now and 'i') that accepts a preffix */
export const getUniqueId = (suffix: string) => suffix + '_' + getUniqueId_generator.next().value
const getUniqueId_generator = (function* () { let i = 0; while (true) { i++; yield `${Date.now() + i}` } })()

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
export const initializeTimer = (id: string, runAt: number, onComplete: btr_nonVoidFn, onCancel: btr_nonVoidFn) => {

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
export const killTimer = async (timerId: string, reason: string) => {
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
/** Copy to clipboard using the corresponding function for the running enviroment (node/client)*/
export const copyToClipboard = (x: unknown) => { isNode ? copyToClipboard_server(x) : copyToClipboard_client(x) }
/**(Message) 💀 */
export const errorLog = (message: string) => colorLog('red', message + ' 💀')
/**TODO: describe me */
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

/**
 * Compare data B against an schema created from data A 
 * @param A The first piece of data
 * @param B The second piece of data
 * @param errorHandler The handler for the message error
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not
 * @returns 
 */
export const dataIsEqual = (A: unknown, B: unknown, errorHandler = <messageHandler>nullAs(), strictModeIfObject = true) => {
	const zodSchema = getZodSchemaFromData(A as object)
	return zGetSafeParseResultAndHandleErrorMessage(zodSchema, B, errorHandler, strictModeIfObject)
}
/**For obligatory callbacks */
export const doNothing = (...args: unknown[]) => { args }
/** @returns null as the provided type */
export const nullAs = <T>() => null as T

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
export const copyToClipboard_client = (x: unknown) => {
	const text = stringify(x)
	const a = document.createElement('textarea')
	a.innerHTML = text
	document.body.appendChild(a)
	a.select()
	document.execCommand('copy')
	document.body.removeChild(a)
}
/**Stringifies and downloads the provided data*/
export const downloadFile_client = (filename: string, fileFormat: '.txt' | '.json', data: unknown) => {
	if (isNode) { colorLog('downloadFile_client can only be run clientside!'); return }
	const a = document.createElement('a')
	a.href = window.URL.createObjectURL(new Blob([data as BlobPart], { type: 'text/plain' }))
	a.download = `${filename}${fileFormat}`
	a.click()
}

const colorLog = (color: string, message: string) => console.log(`%c${message}`, `color: ${color};`)