let _;
_;
_;
_;
_;
_;
_;
_;
_;
_;
_;
_;
_;
_;
import { z, string } from 'zod';
_;
import { fromZodError } from 'zod-validation-error';
_;
_; /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_; /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_; /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_; /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_; /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_; /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_; /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_; /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_; /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
_; /********** GLOBAL VARIABLES ******************** GLOBAL VARIABLES ******************** GLOBAL VARIABLES **********/
export const timers = [];
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
const getUniqueId_generator = (function* () { let i = 0; while (true) {
    i++;
    yield isNode ? `${Date.now() + i}` : i;
} })();
export const zValidVariants = z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark']);
export const zValidNpmCommand_package = z.enum(['all', 'arrowsToDeclarations', 'git', 'transpile']);
export const zValidNpmCommand_project = z.enum(['build', 'check', 'git', 'transpile']);
const zValidVersionIncrement = z.enum(['major', 'minor', 'patch']);
export const zMyEnv = z.object({
    DEV_OR_PROD: z.enum(['DEV', 'PROD']),
    ADMIN_PASSWORD: string(),
    ERIS_TOKEN: string(),
    MONGO_URI: string(),
    APP_NAME: string(),
    PORT: string(),
});
_; /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_; /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_; /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_; /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_; /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_; /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_; /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_; /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_; /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_; /********** TYPES ******************** TYPES ******************** TYPES ******************** TYPES **********/
_; /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_; /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_; /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_; /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_; /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_; /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_; /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_; /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_; /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
_; /********** CURRIES ******************** CURRIES ******************** CURRIES ******************** CURRIES **********/
/**(generates a function that..) Creates a new 5-seconds toast in the lower right corner */
export function newToast_client_curry($bvToast) {
    return function body(title, message, variant) {
        if (!zodCheck_curry(alert)(zValidVariants, variant)) {
            return;
        }
        $bvToast.toast(message, {
            toaster: 'b-toaster-bottom-right',
            autoHideDelay: 5000,
            solid: true,
            variant,
            title
        });
    };
}
/**(generates a function that:) Tests data against an scheme, and executes a predefined errorHandler if case it isn't a fit. */
export function zodCheck_curry(errorHandler = divine.error, strictModeIfObject = true) {
    function zodCheck(schema, data) {
        function body(errorHandler, schema, data, strictModeIfObject = true) {
            const result = zGetSafeParseResultAndHandleErrorMessage(schema, data, errorHandler, strictModeIfObject);
            return result.success;
        }
        return body(errorHandler, schema, data, strictModeIfObject);
    }
    return zodCheck;
}
/**(generates a function that:) Opens/close a bootstrap-vue modal with zod validation */
//TODO: delete this (hard to initialize when bvModal is declared after triggerModalWithValidation in the pinia store)
export function triggerModalWithValidation_curry($bvModal) {
    return async function body(id, action) {
        if (action === 'show') {
            $bvModal.show(id);
            for (let i = 0; i < 10; i++) {
                if (!elementExists()) {
                    await delay(500);
                }
            }
            if (!elementExists()) {
                promptError();
            }
        }
        if (action === 'hide') {
            elementExists() ? $bvModal.hide(id) : promptError();
        }
        function elementExists() { return Boolean(document.getElementById(id)); }
        function promptError() { alert(`Modal with id (${id}) not found. Could not ${action}. Please report it`); }
    };
}
/**Add/remove a vue component to the window for easy access/debugging */
export function trackVueComponent(name, component, window) {
    component.name = name;
    component.id = getUniqueId(name);
    component.beforeDestroy = onDestroy;
    if (!window.vueComponents) {
        window.vueComponents = {};
    }
    if (!window.vueComponents[name]) {
        window.vueComponents[name] = [];
    }
    successLog(`Component '${name}' added to window.vueComponents [${window.vueComponents[name].length}]`);
    window.vueComponents[name].push(component);
    logAllComponents();
    function logAllComponents() {
        colorLog('blue', `window.vueComponents: ${stringify(mapObject(window.vueComponents, value => value.length))}`);
    }
    function onDestroy() {
        errorLog(`Component '${name}' (id: ${component.id}) removed from window.vueComponents`);
        removeItem(window.vueComponents[name], component);
        logAllComponents();
    }
}
_; /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_; /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_; /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_; /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_; /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_; /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_; /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_; /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_; /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
_; /********** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS ******************** FOR ARRAYS **********/
/**Adds an item to an array, or removes it if it already was added. Returns the array and the action applied */
export function addOrRemoveItem(arr, item) {
    let x;
    const isInArray = arr.includes(item);
    if (!isInArray) {
        arr.push(item);
        x = 'added';
    }
    else {
        removeItem(arr, item);
        x = 'removed';
    }
    return { action: x, arr };
}
/**Adds an item to an array, or replaces the first one if found. WARNING: make sure the predicate can only find ONE item */
export function addOrReplaceItem(arr, newItem, predicate) {
    const replaceableItem = arr.find(x => predicate(x));
    replaceableItem ? arr[arr.indexOf(replaceableItem)] = newItem : arr.push(newItem);
}
/**Add to arrayA items from array B that it doesn't already have */
export function addUnrepeatedItems(arr, newItems) {
    newItems.forEach(x => { if (!arr.includes(x)) {
        arr.push(x);
    } });
    return arr;
}
/**
 * @param arr The array (tuple) of strings that each will become a key
 * @param mappingFn The function to determine the value of each entry
 * @returns An object where each key is an item of "arr" and the value is determined by "mappingFn"
 */
export function arrayToObject(arr, mappingFn) {
    const object = {};
    arr.forEach(x => object[x] = mappingFn(x));
    return object;
}
/**Converts an array of primitives into a comma-separated list, the word "and" being optional before the last item */
export function asFormattedList(arr, useAndForTheLastItem) {
    let string = '';
    arr.forEach((item, index) => {
        const isLastItem = index === arr.length - 1;
        const isSemiLastItem = index === arr.length - 2;
        if (isSemiLastItem && useAndForTheLastItem) {
            string += item + ' and ';
        }
        else if (isLastItem) {
            string += item;
        }
        else {
            string += item + ', ';
        }
    });
    return string;
}
/**Return an array of sub-arrays with the items of the passed array, where each sub-array's max lenght is the passed size*/
export function chunk(arr, chunkSize) {
    const results = [[]];
    arr.forEach(item => {
        const lastSubArray = lastItem(results);
        lastSubArray.length < chunkSize ? lastSubArray.push(item) : results.push([item]);
    });
    return results.reverse();
}
/**Compare array A to array B and return the details */
export function compareArrays(baseArray, testArray) {
    const nonDesiredItems = testArray.filter(x => !baseArray.includes(x));
    const missingItems = baseArray.filter(x => !testArray.includes(x));
    const lengthDifference = baseArray.length - testArray.length;
    const arraysHaveTheSameItems = !nonDesiredItems.length && !missingItems.length;
    const arraysAreEqual = arraysHaveTheSameItems && !lengthDifference;
    return { arraysAreEqual, arraysHaveTheSameItems, lengthDifference, missingItems, nonDesiredItems };
}
/**syntax sugar for arr[arr.length - 1] */
export function getLastItem(arr) { return arr[arr.length - 1]; }
/**@returns a random item along its index */
export function getRandomItem(arr) { const r = roll(arr.length); return { item: arr[r], index: r }; }
/**@returns a version of the provided array without repeating items */
export function getUniqueValues(arr) { return [...new Set(arr)]; }
/**@returns whether an item is the last one in an array or not (warning: maybe don't use with primitives) */
export function isLastItem(arr, item) { return arr.indexOf(item) === arr.length - 1; }
/**Return the last item of the given array */
export function lastItem(arr) { return arr[arr.length - 1]; }
/**Apply multiple mapping functions to a single array at once and return an object with all the result */
export function multiMap(arr, f1, f2, f3 = doNothing, f4 = doNothing, f5 = doNothing) {
    const maps = arr.reduce((acc, item) => {
        acc.map1.push(f1(item));
        acc.map2.push(f2(item));
        acc.map3.push(f3(item));
        acc.map4.push(f4(item));
        acc.map5.push(f5(item));
        return acc;
    }, {
        map1: [],
        map2: [],
        map3: [],
        map4: [],
        map5: [],
    });
    return maps;
}
/*Remove a single item from an array, or all copies of that item if its a primitive value and return the removedCount */
export function removeItem(arr, item) { return selfFilter(arr, (x) => x !== item).removedCount; }
/**
 * Map an array, and filter-out the items that weren't fit
 * see filterMap for a faster (single rather than double loop) but more complex version)
 */
export function safeMap(arr, mapFn) {
    return arr.map(x => mapFn(x)).filter(x => x);
}
/**Remove items from an array that DONT fulfill the given condition, returns the removed items and their amount */
export function selfFilter(arr, predicate) {
    let removedCount = 0;
    const removedItems = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (predicate(item)) {
            continue;
        }
        removedItems.push(arr.splice(i, 1)[0]);
        removedCount++;
        i--;
    }
    return { removedItems, removedCount };
}
/**Sort an array of numbers either upwards (A-scending) or downwards (D-escending)*/
export function sortNumbers(numbers, direction) {
    numbers.sort((a, b) => a > b ? 1 : -1);
    if (direction === 'D') {
        numbers.reverse();
    }
    return numbers;
}
/**Randomizes the order of the items in the array */
export function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const rand = roll(i + 1);
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
}
/**Sort an array alphabetically, optionally backwards */
export function sortAlphabetically(arr, reverseArr) {
    arr.sort((a, b) => a > b ? 1 : -1);
    if (reverseArr) {
        arr.reverse();
    }
    return arr;
}
/**Sort an array of objects based on the value a property. A: Ascending, D: Descesding. Chainable */
export function sortBy(arr, keyWithDir, ...extraKeysWithDir) {
    if (!arr.length) {
        return arr;
    }
    [keyWithDir].concat(extraKeysWithDir).forEach(keyDirection => {
        const [key, direction] = keyDirection;
        if (typeof arr[0] === 'string') {
            arr.sort((a, b) => (a > b) ? 1 : -1);
        }
        else {
            arr.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
        }
        if (direction === 'D') {
            arr.reverse();
        }
    });
    return arr;
}
/** */
/**syntactic sugar for selfFilter(arr, predicate).removedItems */
export function spliceIf(arr, predicate) { return selfFilter(arr, predicate).removedItems; }
/**Remove X amount of items from the end of an array */
export function spliceLast(arr, count) { return arr.splice(-count); }
/**Transfer items that meet a given condition from one array to another */
export function transferItems(origin, destination, predicate) {
    const x = selfFilter(origin, predicate);
    destination.push(...x.removedItems);
    return { transferedCount: x.removedCount };
}
_; /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_; /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_; /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_; /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_; /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_; /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_; /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_; /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_; /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
_; /********** FOR FUNCTIONS ******************** FOR FUNCTIONS ******************** FOR FUNCTIONS **********/
/**Set interval with try-catch and called immediately*/
export function doAndRepeat(fn, interval) { tryF(fn, []); setInterval(() => tryF(fn, []), interval); }
/**
 * Filter and map an array in a single loop
 * @param arr The array to be filterMap'd
 * @param filter Function that returns the answer and a carryover value for "mapFn" if needed
 * @param mapFn The function to apply to each item of the array, and possibly to each carryover from "filter"
 * @returns The provided array, filtered and mapped
 */
export function filterMap(arr, filter, mapFn) {
    return arr.reduce((acc, item) => {
        const { answer, carryOver } = filter(item);
        return answer ? acc.concat(mapFn(item, carryOver)) : acc;
    }, []);
}
/**Simple and standard functional programming pipe. Deprecated, use either zPipe (persistenType with zod errors) or pipe_mutableType! */
export function pipe_persistentType(initialValue, ...fns) {
    return fns.reduce((result, fn) => fn(result), initialValue);
}
/**
* Pipes a value through a number of functions in the order that they appear.
* Takes between 1 and 12 arguments. `pipe(x, a, b)` is equivalent to `b(a(x))`.
* If only one argument is provided (`pipe(x)`), this will produce a type error but JS will run fine (and return `x`).
*/
// eslint-disable-next-line func-style
export const pipe_mutableType = (source, ...project) => project.reduce((accumulator, element) => element(accumulator), source);
/**
 * Retry a function up to X amount of times or until it is executed successfully, mainly for fetching/requesting stuff
 * @param fn The function to be retried hoping it returns successfully
 * @param args Arguments to pass to fn
 * @param retriesLeft Number, is reduced by 1 every attempt, retryF stops when it reaches 0
 * @param defaultReturn Data to be returned as returnType of fn if retryF fails
 * @param delayBetweenRetries Delay between each retry in milliseconds
 * @returns
 */
export async function retryF(fn, args, retriesLeft, defaultReturn, delayBetweenRetries) {
    try {
        return { data: fn(...args), was: 'success' };
    }
    catch (error) {
        colorLog('yellow', `retryF > ${fn.name} > ${retriesLeft} retriesLeft. {${error}}`);
        if (!retriesLeft) {
            return { data: defaultReturn, was: 'failure' };
        }
        await delay(delayBetweenRetries);
        return await retryF(fn, args, retriesLeft - 1, defaultReturn, delayBetweenRetries);
    }
}
/**tryCatch wrapper for functions with divineError as the default error handler */
export function tryF(fn, args, errorHandler = divine.error) {
    try {
        return fn(...args);
    }
    catch (err) {
        errorHandler(err);
    }
}
/**
 * Test data against an schema with strict-mode (no unspecified keys) for objects set by default and handle the error message if any
 * @param schema The schema to test the data against
 * @param data The data to be tested
 * @param errorHandler The handler for the message error
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not
 * @returns
 */
export function zGetSafeParseResultAndHandleErrorMessage(schema, data, errorHandler = nullAs(), strictModeIfObject = true) {
    const result = getResult();
    if (result.success === false && errorHandler) {
        errorHandler(fromZodError(result.error).message);
    }
    return result;
    function getResult() {
        if (!schema.strict || !strictModeIfObject) {
            return schema.safeParse(data);
        }
        else {
            return schema.strict().safeParse(data);
        }
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
export function zodCheckAndHandle(zSchema, data, successHandler, args, errorHandler = divine.error, strictModeIfObject = true) {
    const zResult = zGetSafeParseResultAndHandleErrorMessage(zSchema, data, errorHandler, strictModeIfObject);
    if (zResult.success === true && successHandler) {
        successHandler(...args);
    }
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
export function zPipe(zSchema, strictModeIfObject, initialValue, ...fns) {
    const initialPipeState = { value: initialValue, error: nullAs(), failedAt: nullAs() };
    return fns.reduce((pipeState, fn, index) => {
        if (pipeState.error) {
            return pipeState;
        }
        pipeState.value = fn(pipeState.value);
        zGetSafeParseResultAndHandleErrorMessage(zSchema, pipeState.value, errorHandler, strictModeIfObject);
        return pipeState;
        function errorHandler(err) {
            pipeState.failedAt = `Step ${index + 1}: ${fn.name}`;
            pipeState.error = err;
        }
    }, initialPipeState);
}
_; /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_; /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_; /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_; /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_; /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_; /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_; /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_; /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_; /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
_; /********** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS ******************** FOR NUMBERS **********/
/**Promise-based delay that BREAKS THE LIMIT OF setTimeOut*/
export function delay(x) {
    return new Promise(resolve => {
        const maxTimeOut = 1000 * 60 * 60 * 24;
        const loopsNeeded = Math.floor(x / maxTimeOut);
        const leftOverTime = x % maxTimeOut;
        interval(loopsNeeded, leftOverTime);
        function interval(i, ms) { setTimeout(() => i ? interval(i - 1, maxTimeOut) : resolve(true), ms); }
    });
}
/**Return the time left to make a move in a compacted form and with a variant corresponding to how much of it left */
export function getDisplayableTimeLeft(deadline) {
    const time = (deadline - Date.now()) / 1000;
    let message = '';
    const twoMinutes = 60 * 2;
    const twoHours = twoMinutes * 2;
    const twoDays = twoHours * 2;
    if (time < twoMinutes) {
        message = String(time);
    }
    else if (time < twoHours) {
        message = `${Math.round(time / 60)} Minutes`;
    }
    else if (time < twoDays) {
        message = `${Math.round(time / 60 / 60)} Hours`;
    }
    else if (time > twoDays) {
        message = `${Math.round(time / 60 / 60 / 24)} Days`;
    }
    message = message.replace(/\.[0-9]{0,}/g, '');
    return { time: message, variant: getVariant() };
    function getVariant() {
        let variant = nullAs();
        if (/Minutes|Hours|Days/.test(message)) {
            variant = 'info';
        }
        else if (time > 20) {
            variant = 'primary';
        }
        else if (time < 21) {
            variant = 'warning';
        }
        else {
            variant = 'danger';
        }
        return variant;
    }
}
/**Formate a timestamp with Intl.DateTimeFormt. Options: short/medium/long (add +hour to include Hour) or hOnly (hour only) */
export function formatDate(timestamp, language, type) {
    return new Intl.DateTimeFormat(language, getOptions()).format(timestamp);
    function getOptions() {
        switch (type) {
            default:
            case 'short': return { dateStyle: 'short' };
            case 'medium': return { dateStyle: 'medium' };
            case 'long': return { dateStyle: 'long' };
            case 'hourOnly': return { timeStyle: 'short' };
            case 'medium+hour': return { dateStyle: 'medium', timeStyle: 'short' };
            case 'short+hour': return { dateStyle: 'short', timeStyle: 'short' };
            case 'long+hour': return { dateStyle: 'long', timeStyle: 'short' };
        }
    }
}
/**Self-explanatory */
export function isEven(number) { return !isOdd(number); }
/**Self-explanatory */
export function isOdd(number) { return Boolean(Number(number) % 2); }
/**@returns whether a number is either the minimum provided, the maximum provided or any number in-between */
export function isWithinRange(number, max, min) {
    if (min > max) {
        divine.ping('"min" should not be higher than "max"!');
    }
    return number <= max && number >= min;
}
/**@returns a number up to (but not included) provided max, eg: roll(1) will ALWAYS return zero */
export function roll(maxRoll) { return Math.floor(Math.random() * Number(maxRoll)); }
/**Convert duration as a timestamp to clock format (xx:xx:xx.xxx) with selectable amount of decimals */
export function toClockDuration(timestamp, decimalAfterSeconds) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    return `${getClockField(hour)}:${getClockField(minute)}:${getClockField(second)}${getDecimals()}`;
    function getClockField(timeUnit) {
        let x = 0;
        while (timestamp >= timeUnit) {
            timestamp -= timeUnit;
            x++;
        }
        const asString = `${x}`;
        return asString.length === 1 ? `0${asString}` : asString;
    }
    function getDecimals() {
        return decimalAfterSeconds ? `.${getClockField(1).slice(0, decimalAfterSeconds)}` : '';
    }
}
/**1 becomes '1st' , 2 becomes '2nd', 3 becomes '3rd' and so on */
export function toOrdinal(number) {
    const asString = String(number);
    const lastDigit = asString[asString.length - 1];
    if ([11, 12, 13].includes(Number(number))) {
        return `${number}th`;
    }
    switch (lastDigit) {
        case '1': return `${number}st`;
        case '2': return `${number}nd`;
        case '3': return `${number}rd`;
        default: return `${number}th`;
    }
}
_; /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_; /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_; /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_; /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_; /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_; /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_; /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_; /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_; /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
_; /********** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS ******************** FOR OBJECTS **********/
/**Add all default properties missing in an object*/
export function addMissingPropsToObjects(original, defaults) {
    objectKeys(defaults).forEach(key => { if (!Object.prototype.hasOwnProperty.call(original, key)) {
        original[key] = defaults[key];
    } });
    return original;
}
/**Return a copy that can be altered without having to worry about modifying the original */
export function deepClone(originalObject) {
    const copy = JSON.parse(stringify(originalObject));
    ifObject_copyRebindedMethods();
    return copy;
    function ifObject_copyRebindedMethods() {
        if (Array.isArray(originalObject)) {
            return;
        }
        objectEntries(originalObject).forEach(entry => {
            const { key, value } = entry;
            if (typeof value !== 'function') {
                return;
            }
            copy[key] = value.bind(copy);
        });
    }
}
/**Generate a Zod Schema from an array/object */
export function getZodSchemaFromData(data) {
    function toLiteral(x) {
        return typeof x === 'object' ?
            getZodSchemaFromData(x) :
            z.literal(x);
    }
    if (!data) {
        return z.nullable(nullAs());
    }
    if (typeof data !== 'object') {
        return z.literal(data);
    }
    if (Array.isArray(data)) {
        return z.tuple(data.map(toLiteral));
    }
    return z.object(mapObject(data, toLiteral));
}
/**Because ESlint doesn't like Object(x).hasOwnProperty :p */
export function hasOwnProperty(x, key) { return Object.prototype.hasOwnProperty.call(x, key); }
/**Map an object! (IMPORTANT, all values in the object must be of the same type, or mappinFn should be able to handle multiple types) */
export function mapObject(object, mappingFn) {
    const newObject = {};
    objectEntries(object).forEach(x => { newObject[x.key] = mappingFn(x.value); });
    return newObject;
}
/**Object.entries but with proper type-inference */
export function objectEntries(object) {
    return Object.entries(object).map(entry => ({ key: entry[0], value: entry[1] }));
}
/**Object.keys but with proper type-inference */
export function objectKeys(object) { return Object.keys(object); }
/**Object.values but with proper type-inference */
export function objectValues(object) { return Object.values(object); }
/**Create an object with only the specified properties of another base object (references are kept) */
export function pick(theObject, properties) {
    const thePartial = {};
    objectEntries(theObject).forEach(entry => {
        const { key, value } = entry;
        if (properties.includes(key)) {
            //@ts-expect-error because object/key types are weird, but it workds
            thePartial[key] = value;
        }
    });
    return thePartial;
}
/**Replace the values of an object with those of another that shares the schema*/
export function replaceObject(originalObject, newObject) {
    objectKeys(originalObject).forEach(key => delete originalObject[key]);
    objectKeys(newObject).forEach(key => originalObject[key] = newObject[key]);
}
/**Stringy an array/object so its readable //TODO: (edit so that it doesn't excluse object methods, see deepClone) */
export function stringify(object) {
    const seen = new WeakSet();
    return JSON.stringify(object, (_key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '< Circular >';
            }
            seen.add(value);
        }
        return value;
    }, '  ');
}
/**Generator for unique IDs (using Date.now and 'i') that accepts a preffix */
export function getUniqueId(suffix) { return suffix + '_' + getUniqueId_generator.next().value; }
_; /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_; /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_; /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_; /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_; /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_; /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_; /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_; /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_; /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_; /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
_; /********** FOR TIMERS ******************** FOR TIMERS ******************** FOR TIMERS **********/
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
export async function initializeInterval(id, intervalInMs, stayAliveChecker, onEach, onKill, timesRanSucessfully) {
    const result = await new Promise(resolve => {
        initializeTimer(id, Date.now() + intervalInMs, onEach, onKill).then(result => {
            if (result.wasCancelled) {
                return resolve(result);
            }
            initializeInterval(id, intervalInMs, stayAliveChecker, onEach, onKill, timesRanSucessfully + 1).then(result => resolve(result));
        });
        if (!stayAliveChecker()) {
            killTimer(id, `stayAliveChecker (${stayAliveChecker.name}) = false`);
        }
    });
    return { timesRanSucessfully, ...result };
}
/**
 * Set a cancellable timer that runs at the specified time
 * @param id The id of the timer, so that btr.killTimer can find it
 * @param runAt The date (timestamp) at which "onComplete" should run
 * @param onComplete The function that should run if the timer wasn't cancelled
 * @param onCancel The function that should run if the timer was cancelled via killTimer
 * @returns the return of "onComplete" if it was completed, or all info revelant to cancellation along with the value of "onCancel"
 */
export async function initializeTimer(id, runAt, onComplete, onCancel) {
    const timer = { id, runAt, onComplete, onCancel, startedAt: Date.now(), wasCancelled: false, cancelledAt: 0, cancelStack: '' };
    timers.push(timer);
    return await interval();
    function getTimerResolveInfo(timer, fn) {
        const { id, startedAt, runAt, onComplete, onCancel, cancelledAt, cancelStack, wasCancelled } = timer;
        const value = tryF(fn, []);
        const template = {
            timerId: id,
            startedAt: formatDate(startedAt, 'es', 'medium+hour'),
            intendedRunAt: formatDate(runAt, 'es', 'medium+hour'),
            cancelledAt: wasCancelled ? formatDate(cancelledAt, 'es', 'medium+hour') : null,
            timeElapsedBeforeCancelation: wasCancelled ? `${(cancelledAt - startedAt) / 1000} seconds` : null,
            timeLeftBeforeCancelation: wasCancelled ? `${(runAt - timer.cancelledAt) / 1000} seconds` : null,
            onCompleteFn: onComplete.name,
            onCancelFn: onCancel.name,
            cancelStack,
        };
        if (wasCancelled) {
            return { value_onCancel: value, wasCancelled: true, ...template };
        }
        else {
            return { value_onComplete: value, wasCancelled: false, ...template };
        }
    }
    async function interval() {
        return await new Promise(resolve => {
            const maxInterval = 1000;
            const timeLeft = Math.max(runAt - Date.now(), 0);
            const isTheLastInterval = maxInterval >= timeLeft;
            if (!isTheLastInterval) {
                setTimeout(() => resolveOrCancel(interval, true), maxInterval);
            }
            else {
                setTimeout(() => { removeItem(timers, timer); resolveOrCancel(onComplete, false); }, timeLeft);
            }
            async function resolveOrCancel(fn, isInterval) {
                resolve(isInterval ? await fn() : await getTimerResolveInfo(timer, fn));
            }
        });
    }
}
/**Kill a timer created with initializeTimer, the reason provided will become a divine stack */
export async function killTimer(timerId, reason) {
    const theTimer = timers.find(x => x.id === timerId);
    if (!theTimer) {
        divine.error('Unable to cancel, no timer was found with this id: ' + timerId);
        return;
    }
    removeItem(timers, theTimer);
    theTimer.cancelStack = getTraceableStack(reason, 'killTimer');
    theTimer.cancelledAt = Date.now();
    theTimer.wasCancelled = true;
    return await theTimer.onCancel();
}
_; /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_; /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_; /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_; /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_; /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_; /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_; /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_; /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_; /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
_; /********** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS ******************** FOR STRINGS **********/
/**Add an "S" to the end of a noun if talking about them in plural based on the amount passed */
export function asSingularOrPlural(noun, amount) { return noun + `${amount === 1 ? '' : 's'}`; }
/**console.log... WITH COLORS :D */
/** Copy to clipboard using the corresponding function for the running enviroment (node/client)*/
export function copyToClipboard(x) { isNode ? copyToClipboard_server(x) : copyToClipboard_client(x); }
/**(Message) 💀 */
export function errorLog(message) { return colorLog('red', message + ' 💀'); }
/**TODO: describe me */
export function getTraceableStack(error, type) {
    const { stack } = (typeof error === 'string' ? new Error(error) : error);
    return `${stack}`.
        replace(/\(node:3864\).{0,}\n.{0,}exit code./, '').
        replace(/\n {4}at/g, `\n ${' * '.repeat(5)} at`).
        replace(/^Error/, type + ':');
}
/**@returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export function isGuest(username) { return /Guest[0-9]{13}/i.test(`${username}`); }
/**To know when files are fired and in what order  */
export function logInitialization(filename) { colorLog(isNode ? 'cyan' : 'magenta', '*'.repeat(20) + ' ' + filename); }
/**(Message) ✔️ */
export function successLog(message) { return colorLog('green', message + ' ✔️'); }
/**@returns an string with its linebreaks converted into simple one-char spaces */
export function toSingleLine(sentence) { return `${sentence}`.replace(/ {0,}\n {0,}/g, ' '); }
_; /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_; /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_; /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_; /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_; /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_; /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_; /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_; /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_; /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
_; /********** MISC ******************** MISC ******************** MISC ******************** MISC **********/
/**
 * Compare data B against an schema created from data A
 * @param A The first piece of data
 * @param B The second piece of data
 * @param errorHandler The handler for the message error
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not
 * @returns
 */
export function dataIsEqual(A, B, errorHandler = nullAs(), strictModeIfObject = true) {
    const zodSchema = getZodSchemaFromData(A);
    return zGetSafeParseResultAndHandleErrorMessage(zodSchema, B, errorHandler, strictModeIfObject);
}
/**For obligatory callbacks */
export function doNothing(...args) { args; }
/** @returns null as the provided type */
export function nullAs() { return null; }
/**
 * Return the regex given with possibly an error indicating it wasn't matched.
 * MUST BE USED AS A SPREAD ARGUMENT, eg: zString.regex( ...zRegexGenerator(/hi/, false) )
 * @param regex The regex to get the error message from
 * @param exactPhrase If true, it will return an error if there's anything before or after the match
 * @returns Arguments for zod's regex string method (theRegex, theErrorMesssage)
 */
export function zRegexGenerator(regex, exactPhrase) {
    if (exactPhrase) {
        let asString = String(regex);
        asString = asString.slice(1, asString.length - 1);
        regex = new RegExp('^' + asString + '$');
    }
    return [regex, 'Regex not matched: ' + regex];
}
_; /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_; /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_; /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_; /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_; /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_; /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_; /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_; /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_; /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
_; /********** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY ******************** FOR CLIENT-ONLY **********/
/**Copy to clipboard, objects arrays get stringify'd */
export function copyToClipboard_client(x) {
    const text = stringify(x);
    const a = document.createElement('textarea');
    a.innerHTML = text;
    document.body.appendChild(a);
    a.select();
    document.execCommand('copy');
    document.body.removeChild(a);
}
/**Stringifies and downloads the provided data*/
export function downloadFile_client(filename, fileFormat, data) {
    if (isNode) {
        colorLog('downloadFile_client can only be run clientside!');
        return;
    }
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([data], { type: 'text/plain' }));
    a.download = `${filename}${fileFormat}`;
    a.click();
}
_; /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_; /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_; /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_; /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_; /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_; /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_; /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_; /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_; /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
_; /********** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED ******************** DEPRECATED **********/
/**@deprecated use "formatDate" instead */
export function getFormattedTimestamp() { doNothing; }
/**@deprecated use "trackVueComponent" instead */
export function trackVueComponent_curry() { doNothing; }
const colorLog = (color, message) => console.log(`%c${message}`, `color: ${color};`);
