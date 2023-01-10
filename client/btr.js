/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable func-style */
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
export const zValidVariants = z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark']);
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
const zValidNpmCommand_package = z.enum(['all', 'arrowsToDeclarations', 'git', 'transpile']);
const zValidNpmCommand_project = z.enum(['build', 'check', 'git', 'transpile']);
const zValidVersionIncrement = z.enum(['major', 'minor', 'patch']);
const zMyEnv = z.object({
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
export const newToast_client_curry = ($bvToast) => {
    const body = (title, message, variant) => {
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
    return body;
};
/**(generates a function that:) Tests data against an scheme, and executes a predefined errorHandler if case it isn't a fit. */
export const zodCheck_curry = (errorHandler = divine.error, strictModeIfObject = true) => {
    function zodCheck(schema, data) {
        function body(errorHandler, schema, data, strictModeIfObject = true) {
            const result = zGetSafeParseResultAndHandleErrorMessage(schema, data, errorHandler, strictModeIfObject);
            return result.success;
        }
        return body(errorHandler, schema, data, strictModeIfObject);
    }
    return zodCheck;
};
/**(generates a function that:) Adds/removes a vue component into the window for easy access/debugging */
export const trackVueComponent_curry = (zValidVueComponentName) => function trackVueComponent(name, componentConstructor, window) {
    if (!zodCheck_curry(alert)(zValidVueComponentName, name)) {
        return componentConstructor;
    }
    colorLog('blue', `Component '${name}' registered to Vue`);
    if (!window.vueComponents) {
        window.vueComponents = [];
    }
    return getComponent(name, componentConstructor);
    function toggleComponent(logger) {
        const { action } = addOrRemoveItem(window.vueComponents, componentConstructor);
        logger(`Component '${name}' ${action} to/from window.vueComponents`);
        logAllComponents();
    }
    function getComponent(name, componentConstructor) {
        componentConstructor.beforeCreate = () => toggleComponent(successLog);
        componentConstructor.beforeDestroy = () => toggleComponent(errorLog);
        componentConstructor._name = name;
        return componentConstructor;
    }
    function logAllComponents() {
        colorLog('magenta', `window.vueComponents: ${window.vueComponents.map(x => x._name)}`);
    }
};
/**(generates a function that:) Opens/close a bootstrap-vue modal with zod validation */
//TODO: delete this (hard to initialize when bvModal is declared after triggerModalWithValidation in the pinia store)
export const triggerModalWithValidation_curry = ($bvModal) => {
    const body = async (id, action) => {
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
    return body;
};
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
/**Adds an item to an array, or removes it if it already was added. Returns the action applied and the array */
export const addOrRemoveItem = (arr, item) => {
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
};
/**Adds an item to an array, or replaces the first one if found. WARNING: make sure the predicate can only find ONE item */
export const addOrReplaceItem = (arr, newItem, predicate) => {
    const replaceableItem = arr.find(x => predicate(x));
    replaceableItem ? arr[arr.indexOf(replaceableItem)] = newItem : arr.push(newItem);
};
/**Converts an array of primitives into a comma-separated list, the word "and" being optional before the last item */
export const asFormattedList = (arr, useAndForTheLastItem) => {
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
};
/**Return an array of sub-arrays with the items of the passed array, where each sub-array's max lenght is the passed size*/
export const chunk = (arr, chunkSize) => {
    const results = [[]];
    arr.forEach(item => {
        const lastSubArray = lastItem(results);
        lastSubArray.length < chunkSize ? lastSubArray.push(item) : results.push([item]);
    });
    return results.reverse();
};
/**Compare array A to array B and return the details */
export const compareArrays = (baseArray, testArray) => {
    const nonDesiredItems = testArray.filter(x => !baseArray.includes(x));
    const missingItems = baseArray.filter(x => !testArray.includes(x));
    const lengthDifference = baseArray.length - testArray.length;
    const arraysHaveTheSameItems = !nonDesiredItems.length && !missingItems.length;
    const arraysAreEqual = arraysHaveTheSameItems && !lengthDifference;
    return { arraysAreEqual, arraysHaveTheSameItems, lengthDifference, missingItems, nonDesiredItems };
};
/**syntax sugar for arr[arr.length - 1] */
export const getLastItem = (arr) => arr[arr.length - 1];
/**Returns a random item along its index */
export const getRandomItem = (arr) => { const r = roll(arr.length); return { item: arr[r], index: r }; };
/**Returns a version of the provided array without repeating items */
export const getUniqueValues = (arr) => [...new Set(arr)];
/**Returns whether an item is the last one in an array or not (warning: maybe don't use with primitives) */
export const isLastItem = (arr, item) => arr.indexOf(item) === arr.length - 1;
/**Remove a single item from an array, or all copies of that item if its a primitive value */
export const removeItem = (arr, item) => selfFilter(arr, (x) => x !== item).removedCount;
/**Return the last item of the given array */
export const lastItem = (arr) => arr[arr.length - 1];
/**Remove items from an array that DONT fulfill the given condition, returns the removed items and their amount */
export const selfFilter = (arr, predicate) => {
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
};
/**Randomizes the order of the items in the array */
export const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const rand = roll(i + 1);
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
};
/**Sort an array alphabetically, optionally backwards */
export const sortAlphabetically = (arr, reverseArr) => {
    arr.sort((a, b) => a > b ? 1 : -1);
    if (!reverseArr) {
        arr.reverse();
    }
    return arr;
};
/**Sort an array of objects based on the value a property. A: Ascending, D: Descesding. Chainable */
export const sortBy = (arr, keyWithDir, ...extraKeysWithDir) => {
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
};
/**syntactic sugar for selfFilter(arr, predicate).removedItems */
export const spliceIf = (arr, predicate) => selfFilter(arr, predicate).removedItems;
/**Remove X amount of items from the end of an array */
export const spliceLast = (arr, count) => arr.splice(-count);
/**Transfer items that meet a given condition from one array to another */
export const transferItems = (origin, destination, predicate) => {
    const x = selfFilter(origin, predicate);
    destination.push(...x.removedItems);
    return { transferedCount: x.removedCount };
};
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
export const doAndRepeat = (fn, interval) => {
    const tryIt = () => tryF(fn, []);
    setInterval(tryIt, interval);
    tryIt();
};
/**Simple and standard functional programming pipe. Deprecated, use either zPipe (persistenType with zod errors) or pipe_mutableType! */
export const pipe_persistentType = (initialValue, ...fns) => fns.reduce((result, fn) => fn(result), initialValue);
/**
* Pipes a value through a number of functions in the order that they appear.
* Takes between 1 and 12 arguments. `pipe(x, a, b)` is equivalent to `b(a(x))`.
* If only one argument is provided (`pipe(x)`), this will produce a type error but JS will run fine (and return `x`).
*/
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
export const retryF = async (fn, args, retriesLeft, defaultReturn, delayBetweenRetries) => {
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
};
/**tryCatch wrapper for functions with divineError as the default error handler */
export const tryF = (fn, args, errorHandler = divine.error) => {
    try {
        return fn(...args);
    }
    catch (err) {
        errorHandler(err);
    }
};
/**
 * Test data against an schema with strict-mode (no unspecified keys) for objects set by default and handle the error message if any
 * @param schema The schema to test the data against
 * @param data The data to be tested
 * @param errorHandler The handler for the message error
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not
 * @returns
 */
export const zGetSafeParseResultAndHandleErrorMessage = (schema, data, errorHandler = nullAs(), strictModeIfObject = true) => {
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
};
/**
 * Check data against a provided schema, and execute either the success or error handler
 * @param zSchema The zSchema to test data against
 * @param data The data to be tested against zSchema
 * @param successHandler The function that will execute if data fits zSchema
 * @param args The arguments to be applied to successHandler
 * @param errorHandler The function that will execute if data does NOT fits zSchema
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not *
 */
export const zodCheckAndHandle = (zSchema, data, successHandler, args, errorHandler = divine.error, strictModeIfObject = true) => {
    const zResult = zGetSafeParseResultAndHandleErrorMessage(zSchema, data, errorHandler, strictModeIfObject);
    if (zResult.success === true && successHandler) {
        successHandler(...args);
    }
};
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
export const zPipe = (zSchema, strictModeIfObject, initialValue, ...fns) => {
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
};
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
export const delay = (x) => new Promise(resolve => {
    const maxTimeOut = 1000 * 60 * 60 * 24;
    const loopsNeeded = Math.floor(x / maxTimeOut);
    const leftOverTime = x % maxTimeOut;
    interval(loopsNeeded, leftOverTime);
    function interval(i, miliseconds) {
        setTimeout(() => {
            if (i) {
                interval(i - 1, maxTimeOut);
            }
            else {
                resolve(true);
            }
        }, miliseconds);
    }
});
/**Return the time left to make a move in a compacted form and with a variant corresponding to how much of it left */
export const getDisplayableTimeLeft = (deadline) => {
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
};
/**
 * @param options.fullYear true (default, 4 digits) or false (2 digits)
 * @param options.hourOnly default: false
 * @param options.includeHour default: false
 * @param options.listFirst 'MM' (default) or 'DD'
 * @param options.timestamp default: Date.now()
 */
export const getFormattedTimestamp = (options) => {
    const defaults = { timestamp: Date.now(), fullYear: true, hourOnly: false, includeHour: false, listFirst: 'MM' };
    const { fullYear, hourOnly, includeHour, listFirst, timestamp } = addMissingPropsToObjects(options, defaults);
    const asDate = new Date(timestamp);
    const hour = `${asDate}`.slice(16, 24);
    if (hourOnly) {
        return hour;
    }
    const date = asDate.getDate();
    const month = asDate.getMonth() + 1;
    const monthDaysOrdered = { MM: `${month}/${date}`, DD: `${date}/${month}` }[listFirst];
    const year = fullYear ? asDate.getFullYear() : `${asDate.getFullYear()}`.slice(2);
    let x = `${monthDaysOrdered}/${year}`;
    if (includeHour) {
        x += ` ${hour}`;
    }
    return x;
};
/**Self-explanatory */
export const isEven = (number) => !isOdd(number);
/**Self-explanatory */
export const isOdd = (number) => Boolean(Number(number) % 2);
/**Returns whether a number is either the minimum provided, the maximum provided or any number in-between */
export const isWithinRange = (number, max, min) => number <= max && number >= min;
/**Returns a number up to (but not included) provided max, eg: roll(1) will ALWAYS return zero */
export const roll = (maxRoll) => Math.floor(Math.random() * Number(maxRoll));
/**1 becomes '1st' , 2 becomes '2nd', 3 becomes '3rd' and so on */
export const toOrdinal = (number) => {
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
};
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
export const addMissingPropsToObjects = (original, defaults) => {
    objectKeys(defaults).forEach(key => { if (!Object.prototype.hasOwnProperty.call(original, key)) {
        original[key] = defaults[key];
    } });
    return original;
};
/**Return a copy that can be altered without having to worry about modifying the original */
export const deepClone = (x) => JSON.parse(JSON.stringify(x));
/**Generate a Zod Schema from an array/object */
export const getZodSchemaFromData = (data) => {
    const toLiteral = (x) => typeof x === 'object' ?
        getZodSchemaFromData(x) :
        z.literal(x);
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
};
/**Map an object :D (IMPORTANT, all values in the object must be of the same type, or mappinFn should be able to handle multiple types) */
export const mapObject = (object, mappingFn) => {
    const newObject = {};
    objectEntries(object).forEach(x => { newObject[x.key] = mappingFn(x.value); });
    return newObject;
};
/**Object.entries but with proper type-inference */
export const objectEntries = (object) => Object.entries(object).
    map(entry => ({ key: entry[0], value: entry[1] }));
/**Object.keys but with proper type-inference */
export const objectKeys = (object) => Object.keys(object);
/**Object.values but with proper type-inference */
export const objectValues = (object) => Object.values(object);
/**Replace the values of an object with those of another that shares the schema*/
export const replaceObject = (originalObject, newObject) => {
    objectKeys(originalObject).forEach(key => delete originalObject[key]);
    objectKeys(newObject).forEach(key => originalObject[key] = newObject[key]);
};
/**Stringy an array/object so its readable //TODO: (edit so that it doesn't excluse object methods) */
export const { stringify } = JSON;
/**Generator for unique numbered IDs that accepts a preffix */
export const uniqueId = {
    get(suffix) { return suffix + '_' + this.generator.next().value; },
    /**Do NOT use this, use uniqueId.get instead */
    generator: (function* () { let i = 0; while (true) {
        i++;
        yield `${i}`;
    } })()
};
/**Generator for unique IDs (using Date.now and 'i') that accepts a preffix */
export const getUniqueId = (suffix) => suffix + '_' + getUniqueId_generator.next().value;
const getUniqueId_generator = (function* () { let i = 0; while (true) {
    i++;
    yield `${Date.now() + i}`;
} })();
_; /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_; /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_; /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_; /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_; /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_; /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_; /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_; /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_; /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
_; /********** FOR SET INTERVALS ******************** FOR SET INTERVALS ******************** FOR SET INTERVALS **********/
/**start a setInterval and add it to an array */
export const timer_add = (timers, id, callBack, interval) => {
    const theTimer = setInterval(callBack, interval);
    timers.push({ id, interval: theTimer });
};
/**Kill a setInterval and remove it from its belonging array */
export const timer_kill = (timers, id) => {
    const theTimer = timers.find(x => x.id === id);
    if (!theTimer) {
        return;
    }
    clearInterval(theTimer.interval);
    removeItem(timers, theTimer);
};
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
/**console.log... WITH COLORS :D */
/** Copy to clipboard using the corresponding function for the running enviroment (node/client)*/
export const copyToClipboard = (x) => { isNode ? copyToClipboard_server(x) : copyToClipboard_client(x); };
/**(Message) 💀 */
export const errorLog = (message) => colorLog('red', message + ' 💀');
/**TODO: describe me */
export const getTraceableStack = (error) => {
    const { stack } = (typeof error === 'string' ? new Error(error) : error);
    return `${stack}`.replace(/\(node:3864\).{0,}\n.{0,}exit code./, '');
};
/**Returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export const isGuest = (username) => /Guest[0-9]{13}/i.test(`${username}`);
/**(Message) ✔️ */
export const successLog = (message) => colorLog('green', message + ' ✔️');
/**Returns an string with its linebreaks converted into simple one-char spaces */
export const toSingleLine = (sentence) => `${sentence}`.replace(/ {0,}\n {0,}/g, ' ');
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
export const dataIsEqual = (A, B, errorHandler = nullAs(), strictModeIfObject = true) => {
    const zodSchema = getZodSchemaFromData(A);
    return zGetSafeParseResultAndHandleErrorMessage(zodSchema, B, errorHandler, strictModeIfObject);
};
/**For obligatory callbacks */
export const doNothing = (...args) => { args; };
/** @returns null as the provided type */
export const nullAs = () => null;
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
export const copyToClipboard_client = (x) => {
    const text = stringify(x);
    const a = document.createElement('textarea');
    a.innerHTML = text;
    document.body.appendChild(a);
    a.select();
    document.execCommand('copy');
    document.body.removeChild(a);
};
/**Stringifies and downloads the provided data*/
export const downloadFile_client = (filename, fileFormat, data) => {
    if (isNode) {
        colorLog('downloadFile_client can only be run clientside!');
        return;
    }
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([data], { type: 'text/plain' }));
    a.download = `${filename}${fileFormat}`;
    a.click();
};
const colorLog = (color, message) => console.log(`%c${message}`, `color: ${color};`);
