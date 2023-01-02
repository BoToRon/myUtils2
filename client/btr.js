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
import { fromZodError } from 'zod-validation-error';
_;
import { z } from 'zod';
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
const zValidNpmCommand = z.enum(['git', 'publish', 'transpile']);
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
export const zodCheck_curry = (errorHandler) => {
    function zodCheck(schema, data) {
        function body(errorHandler, schema, data) {
            const result = schema.safeParse(data);
            if (result.success === false) {
                errorHandler(fromZodError(result.error).message);
            }
            return result.success;
        }
        return body(errorHandler, schema, data);
    }
    return zodCheck;
};
/**(generates a function that:) Adds/removes a vue component into the window for easy access/debugging */
export const trackVueComponent_curry = (zValidVueComponentName) => {
    return function trackVueComponent(name, componentConstructor) {
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
/**Compare array A to array B, returns the answer along ab error message, if any */
export const compareArrays = (myArray, comparisonType, desiredArray) => {
    const missingItems = desiredArray.filter(x => !myArray.includes(x));
    const nonDesiredItems = myArray.filter(x => !desiredArray.includes(x));
    const arraysAreEqual = !nonDesiredItems.length && !missingItems.length && myArray.length === desiredArray.length;
    if (comparisonType === 'isPartialOf') {
        return answerWithMaybeError(!nonDesiredItems.length);
    }
    if (comparisonType === 'hasAllItemsOf') {
        return answerWithMaybeError(!missingItems.length);
    }
    if (comparisonType === 'isEqualTo') {
        return answerWithMaybeError(arraysAreEqual);
    }
    return answerWithMaybeError(false);
    function answerWithMaybeError(answer) {
        const errorMessage = answer ? nullAs.string() : getTraceableStack(`"array_A ${comparisonType} array_B" = ${answer}`);
        return { answer, errorMessage };
    }
};
/**syntax sugar for arr[arr.length - 1] */
export const getLastItem = (arr) => arr[arr.length - 1];
/**returns a random item along its index */
export const getRandomItem = (arr) => { const r = roll(arr.length); return { item: arr[r], index: r }; };
/**Returns a version of the provided array without repeating items */
export const getUniqueValues = (arr) => [...new Set(arr)];
/**Map a collection of passable-arguments-of-a-function against said function //TODO: find use cases for this jewel maybe */
export const mapArgsOfFnAgainstFn = (fn, ...argsArr) => {
    //TODO: make this await promises.all in case fn is async
    return argsArr.map(args => fn(args));
};
/**Remove a single item from an array, or all copies of that item if its a primitive value */
export const removeItem = (arr, item) => selfFilter(arr, (x) => x !== item).removedCount;
/**Remove items from an array that DONT fulfill the given condition, returns the removed items and their amount */
export const selfFilter = (arr, predicate) => {
    let removedCount = 0;
    let removedItems = [];
    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
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
/**Sort an array of objects based on the value a property. A: Ascending, D: Descesding  */
export const sortBy = (arr, key, direction) => {
    if (!arr.length) {
        return arr;
    }
    if (typeof arr[0] === 'string') {
        arr.sort((a, b) => (a > b) ? 1 : -1);
    }
    else {
        arr.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
    }
    if (direction === 'D') {
        arr.reverse();
    }
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
/**Simple and standard functional programming pipe. Deprecated, use either zPipe (persistenType with zod errors) or pipe_mutableType! */
export const pipe_persistentType = (initialValue, ...fns) => {
    return fns.reduce((result, fn) => fn(result), initialValue);
};
/**
* Pipes a value through a number of functions in the order that they appear.
* Takes between 1 and 12 arguments. `pipe(x, a, b)` is equivalent to `b(a(x))`.
* If only one argument is provided (`pipe(x)`), this will produce a type error but JS will run fine (and return `x`).
*/
export const pipe_mutableType = (source, ...project) => {
    return project.reduce((accumulator, element) => element(accumulator), source);
};
/** Retry a function up to X amount of times or until it is executed successfully, mainly for fetching/requesting stuff */
export const retryF = async (
/**The function to be retried hoping it returns successfully */ fn, 
/**Arguments to pass to fn */ args, 
/**Number, is reduced by 1 every attempt, retryF stops when it reaches 0 */ retriesLeft, 
/**Data to be returned as returnType of fn if retryF fails */ defaultReturn, 
/**Delay between each retry in milliseconds */ delayBetweenRetries) => {
    try {
        return { data: await fn([args]), was: 'success' };
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
/** Check data against a provided schema, and execute either the success or error handler */
// ? TODO: maybe make it a placeholder and create an initialized that pre-determines the errorHandler like with zodCheck and zodCheck_get 
export const zodCheckAndHandle = (
/** The zSchema to test data against */ zSchema, 
/** The data to be tested against zSchema */ data, 
/** The function that will execute if data fits zSchema */ successHandler, 
/** The arguments to be applied to successHandler */ args, 
/** The function that will execute if data does NOT fits zSchema */ errorHandler) => {
    const zResult = zSchema.safeParse(data);
    if (zResult.success === false) {
        errorHandler(fromZodError(zResult.error).message);
    }
    if (zResult.success === true && successHandler) {
        successHandler(...args);
    }
};
/**Pipe with schema validation and error logging */
export const zPipe = (zSchema, initialValue, ...fns) => {
    const initialPipeState = { value: initialValue, error: nullAs.string(), failedAt: nullAs.string() };
    return fns.reduce((pipeState, fn, index) => {
        if (pipeState.error) {
            return pipeState;
        }
        pipeState.value = fn(pipeState.value);
        const zResult = zSchema.safeParse(pipeState.value);
        if (zResult.success === false) {
            pipeState.failedAt = `Step ${index + 1}: ${fn.name}`;
            pipeState.error = fromZodError(zResult.error).message;
        }
        return pipeState;
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
export const delay = (x) => {
    return new Promise(resolve => {
        const maxTimeOut = 1000 * 60 * 60 * 24;
        const loopsNeeded = Math.floor(x / maxTimeOut);
        const leftOverTime = x % maxTimeOut;
        interval(loopsNeeded, leftOverTime);
        function interval(i, miliseconds) {
            setTimeout(() => { if (i) {
                interval(i - 1, maxTimeOut);
            }
            else {
                resolve(true);
            } }, miliseconds);
        }
    });
};
/**Self-explanatory */
export const isEven = (number) => !isOdd(number);
/**Self-explanatory */
export const isOdd = (number) => Boolean(Number(number) % 2);
/**Returns whether a number is either the minimum provided, the maximum provided or any number in-between */
export const isWithinRange = (number, max, min) => number <= max && number >= min;
/**Returns a number up to (but not included) provided max, eg: roll(1) will ALWAYS return zero */
export const roll = (maxRoll) => Math.floor(Math.random() * Number(maxRoll));
/**With the following options: fullYear, hourOnly, includeHour, listFirst (MM or DD) */
/**
 * @param options.fullYear true (default, 4 digits) or false (2 digits)
 * @param options.hourOnly default: false
 * @param options.includeHour default: false
 * @param options.listFirst 'MM' (default) or 'DD'
 * @param options.timeStamp default: Date.now()
 */
export const getFormattedTimestamp = (options) => {
    const defaults = { timeStamp: Date.now(), fullYear: true, hourOnly: false, includeHour: false, listFirst: 'MM' };
    const { fullYear, hourOnly, includeHour, listFirst, timeStamp } = addMissingPropsToObjects(options, defaults);
    const asDate = new Date(timeStamp);
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
/**Return a copy that can be altered without having to worry about modifying the original */
export const deepClone = (x) => JSON.parse(JSON.stringify(x));
/**Replace the values of an object with those of another that shares the schema*/
export const replaceObject = (originalObject, newObject) => {
    Object.keys(originalObject).forEach(key => delete originalObject[key]);
    Object.keys(newObject).forEach(key => originalObject[key] = newObject[key]);
};
/**Stringy an array/object so its readable //TODO: (edit so that it doesn't excluse object methods) */
export const { stringify } = JSON;
/**Add all default properties missing in an object*/
export const addMissingPropsToObjects = (original, defaults) => {
    Object.keys(defaults).forEach(x => {
        const key = x;
        if (original.hasOwnProperty(key)) {
            return;
        }
        original[key] = defaults[key];
    });
    return original;
};
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
    const theTimer = setInterval(() => { callBack; }, interval);
    timers.push([id, theTimer]);
};
/**Kill a setInterval and remove it from its belonging array */
export const timer_kill = (timers, id) => {
    const theTimer = timers.find(x => x[0] === id);
    if (!theTimer) {
        return;
    }
    clearInterval(theTimer[1]);
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
/**For obligatory callbacks */
export const doNothing = (...args) => { };
/**Syntactic sugar for "null as unknown as T", supports enums up to 5 items */
export const nullAs = {
    string: () => null,
    number: () => null,
    t1(x) { doNothing(x); return null; },
    t2(x, y) { doNothing(x, y); return null; },
    t3(x, y, z) { doNothing(x, y, z); return null; },
    t4(x, y, z, _) { doNothing(x, y, z, _); return null; },
    t5(x, y, z, _, $) { doNothing(x, y, z, _, $); return null; },
};
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
