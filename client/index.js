//TODO: create a way to make sure every project has the same package.json scripts and also create a way to automatize their compilation
const _ = 'prevent imports and comments from collapsing';
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
const zValidVariants = z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark']);
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
const zValidNpmCommand = z.enum(['git', 'publish', 'transpile']);
export const BTR = {
    /**Tr-Catch wrapper for functions. Starts as a placeholder, initialize it with typeF_get */
    tryF: (fn, args) => {
        warnAboutUnproperlyInitializedFunction('tryF');
        console.log(fn, args);
    },
    /**Createst a new 5-seconds toast in the lower right corner. Must be initialized by passing $bvToast to newToast_client_get  */
    newToast_client(title, message, variant) {
        warnAboutUnproperlyInitializedFunction('newToast_client');
        console.log(title, message, variant);
    },
    /**Test data against an scheme, and if it fails execute a predefined errorHandler.
    * WARNING: Deprecated? zodCheckAndHandle feels better.
    * Starts as a placeholder, initialize it with zodCheck_get
    * */
    zodCheck(schema, data) {
        warnAboutUnproperlyInitializedFunction('zodCheck');
        console.log(schema, data);
        return false;
    },
    /**for when registering them for tracking at window.vueComponents */
    zValidVueComponentName: null,
};
/**start a setInterval and add it to an array */
export const timer_add = (timers, id, callBack, interval) => {
    const theTimer = setInterval(() => { callBack; }, interval);
    timers.push([id, theTimer]);
};
/**Kill a setInterval and remove it from its belonging array */
export function timer_kill(timers, id) {
    const theTimer = timers.find(x => x[0] === id);
    if (!theTimer) {
        return;
    }
    clearInterval(theTimer[1]);
    removeItem(timers, theTimer);
}
/**Adds an item to an array, or removes it if it already was added. Returns the action applied and the array */
export const addOrRemoveItem = (arr, item) => {
    let x;
    const isInArray = arr.includes(item);
    if (!isInArray) {
        arr.push(item);
        x = 'added';
    }
    else {
        selfFilter(arr, (x) => x !== item);
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
/**syntax sugar for arr[arr.length - 1] */
export const getLastItem = (arr) => arr[arr.length - 1];
/**returns a random item along its index */
export const getRandomItem = (arr) => { const r = roll(arr.length); return { item: arr[r], index: r }; };
/**Returns a version of the provided array without repeating items */
export const getUniqueValues = (arr) => [...new Set(arr)];
/**Transfer items that meet a given condition from one array to another */
export const transferItems = (origin, destination, predicate) => {
    const x = selfFilter(origin, predicate);
    destination.push(...x.removedItems);
    return { transferedCount: x.removedCount };
};
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
/**Remove a single item from an array, or all copies of that item if its a primitive value */
export const removeItem = (arr, item) => selfFilter(arr, (x) => x !== item).removedCount;
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
/**This is a SAMPLE, use tryF_get to set tryF_get and use it without having to pass errorHandler everytime*/
export const tryF_sample = (errorHandler, fn, args) => {
    try {
        return fn(...args);
    }
    catch (err) {
        errorHandler(err);
    }
};
/**Promise-based delay that BREAKS THE LIMIT OF setTimeOut*/
export const delay = (x) => {
    return new Promise(resolve => {
        const interval = (i, miliseconds) => {
            setTimeout(() => { if (i) {
                interval(i - 1, maxTimeOut);
            }
            else {
                resolve(true);
            } }, miliseconds);
        };
        const maxTimeOut = 1000 * 60 * 60 * 24;
        const loopsNeeded = Math.floor(x / maxTimeOut);
        const leftOverTime = x % maxTimeOut;
        interval(loopsNeeded, leftOverTime);
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
/**Convert a timestamp to DD/MM/YYYY (plus HH:MM:SS includeHours) */
export const timeStampToDate = (timeStamp, includeHours) => {
    const asDate = new Date(timeStamp);
    const clockTime = `${asDate}`.slice(16, 24);
    let x = `${(asDate.getMonth() + 1)}/${(asDate.getDate() + 1)}/${asDate.getFullYear()}`;
    if (includeHours) {
        x += ` ${clockTime}`;
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
/**Return a copy that can be altered without having to worry about modifying the original */
export const deepClone = (x) => JSON.parse(JSON.stringify(x)); //TODO; submit
/**FOR CLIENT-SIDE CODE ONLY. Stringifies and downloads the provided data*/
export const downloadFile_client = (filename, fileFormat, data) => {
    if (isNode) {
        colorLog('danger', 'downloadFile_client can only be run clientside!');
        return;
    }
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([data], { type: 'text/plain' }));
    a.download = `${filename}${fileFormat}`;
    a.click();
};
/**Stringy an array/object so its readable, except for methods, eg: obj.sampleMethod becomes "[λ: sampleMethod]" */
export const stringify = (x) => {
    // ! order matters, do NOT change it
    if (x === null) {
        return 'null';
    }
    if (typeof x === 'number' && isNaN(x)) {
        return 'NaN';
    }
    if (!x) {
        return typeof x;
    }
    if (typeof x !== 'object') {
        return `${x}`;
    }
    if (Array.isArray(x)) {
        return x.map(x => JSON.stringify(x));
    } //TODO: it was => stringify but reaches stack overflow in browser
    const stringified = {};
    Object.entries(x).forEach(entry => {
        const [key, value] = entry;
        stringified[key] = (function () {
            if (typeof value !== 'function') {
                return value;
            }
            const asFunction = value;
            return {
                'client': asFunction.toLocaleString(),
                'server': `[λ: ${key}]`
            }[clientOrServer_is()];
        }());
    });
    return JSON.stringify(stringified);
};
/**FOR CLIENT-SIDE CODE ONLY. Copy anything to the clipboard, objects/arrays get parsed to be readable*/
export const copyToClipboard = (x) => {
    if (isNode) {
        colorLog('danger', 'copyToClipboard can only be run clientside!');
        return;
    }
    const text = stringify(x);
    const a = document.createElement('textarea');
    a.innerHTML = text;
    document.body.appendChild(a);
    a.select();
    document.execCommand('copy');
    document.body.removeChild(a);
};
/**Returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export const isGuest = (username) => /Guest[0-9]{13}/i.test(`${username}`);
/**Returns an string with its linebreaks converted into simple one-char spaces */
export const toSingleLine = (sentence) => `${sentence}`.replace(/ {0,}\n {0,}/g, ' ');
/**Check if the code is running in the client or in the server */
export function clientOrServer_is() {
    const isServer = [typeof window, typeof document].includes('undefined');
    return isServer ? 'server' : 'client';
}
/**For obligatory callbacks */
export function doNothing(...args) { }
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
/**Map a collection of passable-arguments-of-a-function against said function //TODO: find use cases for this jewel maybe */
const mapArgsOfFnAgainstFn = (fn, ...argsArr) => {
    //TODO: make this await promises.all in case fn is async
    return argsArr.map(args => fn(args));
};
/**function to generate newToast_client with a predertemined $bvToast so it doesnt have to be passed everytime :D */
export const newToast_client_get = ($bvToast) => {
    const newToast = (title, message, variant) => {
        const colorLog_red = (message) => function () { colorLog('danger', message); };
        zodCheck_sample(colorLog_red, zValidVariants, variant);
        $bvToast.toast(message, {
            toaster: 'b-toaster-bottom-right',
            autoHideDelay: 5000,
            solid: true,
            variant,
            title
        });
    };
    return newToast;
};
/**This is a SAMPLE, use newToast_client_get to set newToast_client and use it without having to pass $bvToast everytime*/
export const newToast_client_sample = ($bvToast, title, msg, variant) => {
    $bvToast.toast(msg, {
        toaster: 'b-toaster-bottom-right',
        autoHideDelay: 5000,
        solid: true,
        variant,
        title
    });
};
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
/**
 * Retry a function up to X amount of times or until it is executed successfully, mainly for fetching/requesting stuff
 * @param fn The function to be retried hoping it returns successfully
 * @param args Arguments to pass to fn
 * @param retriesLeft number, is reduced by 1 every attempt, retryF stops when it reaches 0
 * @param defaultReturn data to be returned as returnType of fn if retryF fails
 * @param delayBetweenRetries delay between each retry in milliseconds
 * @returns 'data: returned by fn if ran sucessfully. | wasError: if the retries ran out without sucess '
 */
export const retryF = async (fn, args, retriesLeft, defaultReturn, delayBetweenRetries) => {
    try {
        const data = await fn([args]);
        return { data, was: 'success' };
    }
    catch (error) {
        const message = `retryF > ${fn.name} > ${retriesLeft} retriesLeft. {${error}}`;
        colorLog('warning', `${message}`);
        if (!retriesLeft) {
            return { data: defaultReturn, was: 'failure' };
        }
        await delay(delayBetweenRetries);
        return await retryF(fn, args, retriesLeft - 1, defaultReturn, delayBetweenRetries);
    }
};
/**Track vue components in a global window array to easily find them and use them with socket.io events*/
export const trackVueComponent = (name, componentConstructor) => {
    if (!BTR.zValidVueComponentName) {
        alert(`Error tracking Vue component, BTR.zValidVueComponentName hasn't been set yet`);
        return;
    }
    zodCheck_sample(alert, BTR.zValidVueComponentName, name);
    const logAllComponents = () => colorLog('dark', `window.vueComponents: ${window.vueComponents.map(x => x._name)}`);
    colorLog('primary', `Component '${name}' registered to Vue`);
    if (!window.vueComponents) {
        window.vueComponents = [];
    }
    componentConstructor._name = name;
    componentConstructor.beforeCreate = () => {
        window.vueComponents.push(componentConstructor);
        colorLog('success', `Component '${name}' created and added to window.vueComponents`);
        logAllComponents();
    };
    componentConstructor.beforeDestroy = () => {
        selfFilter(window.vueComponents, (x) => x !== componentConstructor);
        colorLog('danger', `Component '${name}' destroyed and removed from window.vueComponents`);
        logAllComponents();
    };
    return componentConstructor;
};
/**For Functions that require initialization (tryF and zodCheck for their errorHandlers, newToast_client for $bvToast) */
export function warnAboutUnproperlyInitializedFunction(fn) {
    const firstArgument = fn === 'newToast_client' ? '$bvToast' : 'errorHandler';
    const firstArgumentCaps = fn === 'newToast_client' ? "BOOTSTRAP'S_$BVTOAST_HERE" : 'YOUR_ERROR_HANDLER_HERE';
    const error = toSingleLine(`THIS FUNCTION (${fn}) HAS NOT BEEN PROPERLY INITIALIZED YET. 
			Call ${fn} = ${fn}_get(${firstArgumentCaps}) with a proper ${firstArgument} to do so😉`);
    const isClientOrServer = clientOrServer_is();
    if (isClientOrServer === 'client') {
        alert(error);
    }
    if (isClientOrServer === 'server') {
        colorLog('warning', error);
    }
}
/**function to generate zodCheck with a predertemined errorHandler so it doesnt have to be passed everytime :D */
export const zodCheck_get = (errorHandler) => {
    function zodCheck(schema, data) {
        const result = schema.safeParse(data);
        if (result.success === false) {
            errorHandler(fromZodError(result.error).message);
        }
        return result.success;
    }
    return zodCheck;
};
/**This is a SAMPLE, use zodCheck_get to set zodCheck and use it without having to pass errorHandler everytime*/
export const zodCheck_sample = (errorHandler, schema, data) => {
    const result = schema.safeParse(data);
    if (result.success === false) {
        errorHandler(fromZodError(result.error).message);
    }
    return result.success;
};
/**
 * Check data against a provided schema, and execute either the success or error handler
 * @param zSchema The zSchema to test data against
 * @param data The data to be tested against zSchema
 * @param successHandler The function that will execute if data fits zSchema
 * @param args The arguments to be applied to successHandler
 * @param errorHandler The function that will execute if data does NOT fits zSchema
 */
// ? TODO: maybe make it a placeholder and create an initialized that pre-determines the errorHandler like with zodCheck and zodCheck_get 
export const zodCheckAndHandle = (
/**wanted schema */ zSchema, 
/**data to test against the schema */ data, 
/**sucess handler*/ successHandler, 
/**arguments to apply to the success handler */ args, 
/**error handler */ errorHandler) => {
    /**whether the data fits the schema or not */
    const zResult = zSchema.safeParse(data);
    /**data doesn't fit, execute errorHandler with the error message x_X */
    if (zResult.success === false) {
        errorHandler(fromZodError(zResult.error).message);
    }
    /**data fits, execute success handler with the passed arguments :D */
    if (zResult.success === true && successHandler) {
        successHandler(...args);
    }
};
/**Pipe with schema validation and error logging */
export const zPipe = (zSchema, initialValue, ...fns) => {
    const nullString = null;
    const initialPipeState = { value: initialValue, error: nullString, failedAt: nullString };
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
const colorLog = (color, message) => console.log(`%c${message}`, `color: ${color};`);
