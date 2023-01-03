/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable func-style */
let _;
import fs from 'fs'; //DELETETHISFORCLIENT 
_;
import eris from 'eris'; //DELETETHISFORCLIENT
_;
import http from 'http'; //DELETETHISFORCLIENT
_;
import path from 'path'; //DELETETHISFORCLIENT
_;
import util from 'util'; //DELETETHISFORCLIENT
_;
import chalk from 'chalk'; //DELETETHISFORCLIENT
_;
import express from 'express'; //DELETETHISFORCLIENT
_;
import fetch from 'node-fetch'; //DELETETHISFORCLIENT
_;
import getReadLine from 'readline'; //DELETETHISFORCLIENT
_;
import { createRequire } from 'module'; //DELETETHISFORCLIENT
_;
import { exec, spawn } from 'child_process'; //DELETETHISFORCLIENT
_;
import mongodb from 'mongodb'; //DELETETHISFORCLIENT
_;
import { z } from 'zod';
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
const zValidVersionIncrement = z.enum(['major', 'minor', 'patch']); //DELETETHISFORCLIENT
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
export const zodCheck_curry = (errorHandler = divine.error) => {
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
export const trackVueComponent_curry = (zValidVueComponentName) => function trackVueComponent(name, componentConstructor) {
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
_; /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_; /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_; /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_; /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_; /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_; /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_; /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_; /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_; /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
_; /********** DIVINE ******************** DIVINE ******************** DIVINE ******************** DIVINE **********/
export const divine = {
    bot: null,
    error: async (err) => {
        const message = getTraceableStack(err);
        const { DEV_OR_PROD } = await getEnviromentVariables();
        DEV_OR_PROD === 'DEV' ? killProcess(message) : divine.ping(message);
    },
    init: async () => {
        const { APP_NAME, ERIS_TOKEN } = await getEnviromentVariables();
        const bot = eris(ERIS_TOKEN);
        await connectToDiscord();
        divine.bot = bot;
        async function connectToDiscord() {
            const divinePrepend = '***DivineBot:***';
            bot.on('messageReactionRemove', (a, b, c) => role('remove', a, b, c));
            bot.on('messageReactionAdd', (a, b, c) => role('add', a, b, c));
            bot.on('disconnect', () => { colorLog('red', `${divinePrepend}: Disconnected D: ... retrying!`); connectToDiscord(); });
            bot.on('connect', () => divine.ping(`(${APP_NAME}) - I'm alive bitch >:D`));
            const idOfRoleAssigningMessage = '822523162724925473';
            await attemptConnection();
            function role(action, message, emoji, reactor) {
                try {
                    if (message.id !== idOfRoleAssigningMessage) {
                        return;
                    }
                    const role = [
                        { app: 'UntCG', emoji: 'cards', id: 'SAMPLEROLEID' },
                        { app: 'CwCA', emoji: 'chess', id: 'SAMPLEROLEID' },
                        { app: 'Cool', emoji: 'cool', id: 'SAMPLEROLEID' },
                        { app: 'Divine', emoji: 'divine', id: 'SAMPLEROLEID' },
                        { app: 'Bluejay', emoji: 'bluejay', id: 'SAMPLEROLEID' },
                        { app: 'Cute', emoji: 'cute', id: 'SAMPLEROLEID' },
                    ].find(x => x.emoji === emoji.name);
                    if (role) {
                        ({ add: reactor.addRole, remove: reactor.removeRole })[action](role.id);
                    }
                }
                catch (e) {
                    console.log('divineBot.role.tryCatch.error = ', e);
                }
            }
            async function attemptConnection() {
                try {
                    bot.connect();
                    colorLog('cyan', 'waiting for DivineBot');
                    while (!bot.uptime) {
                        await delay(1000);
                    }
                    successLog('The divine egg has hatched');
                }
                catch {
                    colorLog('yellow', `${divinePrepend} Failed to connect.. retrying >:D`);
                    await delay(1000);
                    attemptConnection();
                }
            }
        }
    },
    ping: async (message) => {
        if (!divine.bot.ready) {
            return;
        }
        const { APP_NAME } = await getEnviromentVariables();
        const theMessage = `<@470322452040515584> - (${APP_NAME}) \n ${message}`;
        const divineOptions = { content: theMessage, allowedMentions: { everyone: true, roles: true } };
        divine.bot.createMessage('1055939528776495206', divineOptions);
    }
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
/**Remove a single item from an array, or all copies of that item if its a primitive value */
export const removeItem = (arr, item) => selfFilter(arr, (x) => x !== item).removedCount;
/**Remove items from an array that DONT fulfill the given condition, returns the removed items and their amount */
export const selfFilter = (arr, predicate) => {
    let removedCount = 0;
    const removedItems = [];
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
        return { data: await fn(...args), was: 'success' };
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
/** Check data against a provided schema, and execute either the success or error handler */
// ? TODO: maybe make it a placeholder and create an initialized that pre-determines the errorHandler like with zodCheck and zodCheck_get 
/**
 * Check data against a provided schema, and execute either the success or error handler
 * @param zSchema The zSchema to test data against
 * @param data The data to be tested against zSchema
 * @param successHandler The function that will execute if data fits zSchema
 * @param args The arguments to be applied to successHandler
 * @param errorHandler The function that will execute if data does NOT fits zSchema
 */
export const zodCheckAndHandle = (zSchema, data, successHandler, args, errorHandler = divine.error) => {
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
export const delay = (x) => new Promise(resolve => {
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
    Object.keys(defaults).forEach(x => {
        const key = x;
        if (Object.prototype.hasOwnProperty.call(original, key)) {
            return;
        }
        original[key] = defaults[key];
    });
    return original;
};
/**Return a copy that can be altered without having to worry about modifying the original */
export const deepClone = (x) => JSON.parse(JSON.stringify(x));
/**Generate a Zod Schema from an array/object */
function getZodSchemaFromDataStructure(dataStructure) {
    const toLiteral = (x) => typeof x !== 'object' ?
        getZodSchemaFromDataStructure(x) :
        z.literal(x);
    return Array.isArray(dataStructure) ?
        z.tuple(dataStructure.map(toLiteral)) :
        z.object(mapObject(dataStructure, toLiteral));
}
/**Map an object :D (IMPORTANT, all values in the object must be of the same type, or mappinFn should be able to handle multiple types) */
export const mapObject = (object, mappingFn) => {
    const newObject = {};
    Object.entries(object).forEach(entry => { const [key, value] = entry; newObject[key] = mappingFn(value); });
    return newObject;
};
/**Replace the values of an object with those of another that shares the schema*/
export const replaceObject = (originalObject, newObject) => {
    Object.keys(originalObject).forEach(key => delete originalObject[key]);
    Object.keys(newObject).forEach(key => originalObject[key] = newObject[key]);
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
export const colorLog = (color, message) => console.log(chalk[color].bold(message)); //DELETETHISFORCLIENT
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
/**For obligatory callbacks */
export const doNothing = (...args) => { args; };
/**Syntactic sugar for "null as unknown as T" */
export const nullAs = {
    string: () => null,
    number: () => null,
    T3: () => null,
    T2: () => null,
    T: () => null,
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
        bigConsoleError('downloadFile_client can only be run clientside!');
        return;
    }
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([data], { type: 'text/plain' }));
    a.download = `${filename}${fileFormat}`;
    a.click();
};
// ! DELETEEVERYTHINGBELOW, as it is only meant for server-side use
_; /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_; /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_; /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_; /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_; /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_; /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_; /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_; /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_; /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
_; /********** FOR SERVER-ONLY ******************** FOR SERVER-ONLY ******************** FOR SERVER-ONLY **********/
/** Check the version of @botoron/utils, the enviroment variables and various config files */
export const basicProjectChecks = async (packageJson, tsConfig, eslintConfig, errorHandler = divine.error) => {
    const env = await getEnviromentVariables();
    const tsConfigCheck = checkTsConfigCompilerOptions();
    const envCheck = getAndCheckEnviromentVariables(env);
    const scriptsCheck = checkJsonPackageScripts();
    const eslintCheck = checkEslintConfigRules();
    const utilsCheck = myUtils_areUpToDate();
    return envCheck && eslintCheck && scriptsCheck && tsConfigCheck && utilsCheck;
    /**Check the rules in a project's eslint config file all fit the established schema */
    function checkEslintConfigRules() {
        const zSchema = getZodSchemaFromDataStructure({
            quotes: ['error', 'single'],
            'quote-props': ['error', 'as-needed'],
            'func-style': ['error', 'declaration'],
            'arrow-body-style': ['error', 'as-needed']
        });
        const x = (error) => errorHandler('---------- CHECK_ESLINT_CONFIG_RULES: ---------- ' + error);
        return zodCheck_curry(x)(zSchema, eslintConfig.rules);
    }
    /**Check the scripts in a project's package json all fit the established schema */
    function checkJsonPackageScripts() {
        const zPackageJsonScriptsSchema = z.record(z.enum([
            'btr', 'git', 'npmScript',
            //for debugging
            'localtunnel', 'nodemon', 'transpile', 'vue',
            //for deployement
            'build-all', 'build-client', 'build-server', 'start'
        ]), z.string());
        return zodCheck_curry(errorHandler)(zPackageJsonScriptsSchema, packageJson.scripts);
    }
    /**Check the rules in a project's ts config file all fit the established schema */
    function checkTsConfigCompilerOptions() {
        const desiredCompilerOptions = {
            /* Visit https://aka.ms/tsconfig to read more about this file */
            /* Projects */
            // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
            // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
            // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
            // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
            // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
            // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */
            /* Language and Environment */
            target: 'ESNext',
            // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
            // "jsx": "preserve",                                /* Specify what JSX code is generated. */
            // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
            // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
            // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
            // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
            // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
            // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
            // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
            // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
            // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */
            /* Modules */
            module: 'ESNext',
            // "rootDir": "./",                                  /* Specify the root folder within your source files. */
            moduleResolution: 'node',
            // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
            // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
            // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
            // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
            // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
            // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
            // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
            resolveJsonModule: true,
            // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */
            /* JavaScript Support */
            // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
            // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
            // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */
            /* Emit */
            declaration: true,
            declarationMap: true,
            // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
            // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
            // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
            // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
            // "removeComments": true,                           /* Disable emitting comments. */
            // "noEmit": true,                                   /* Disable emitting files from a compilation. */
            // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
            // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
            // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
            // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
            // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
            // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
            // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
            // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
            // "newLine": "crlf",                                /* Set the newline character for emitting files. */
            // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
            // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
            // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
            // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
            // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
            // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */
            /* Interop Constraints */
            // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
            // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
            esModuleInterop: true,
            // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
            forceConsistentCasingInFileNames: true,
            /* Type Checking */
            strict: true,
            noImplicitAny: true,
            strictNullChecks: true,
            strictFunctionTypes: true,
            strictBindCallApply: true,
            strictPropertyInitialization: true,
            noImplicitThis: true,
            useUnknownInCatchVariables: true,
            alwaysStrict: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            exactOptionalPropertyTypes: true,
            //"noImplicitReturns": true, /* Enable error reporting for codepaths that do not explicitly return in a function. */
            noFallthroughCasesInSwitch: true,
            noUncheckedIndexedAccess: true,
            noImplicitOverride: true,
            noPropertyAccessFromIndexSignature: true,
            allowUnusedLabels: false,
            allowUnreachableCode: false, /* Disable error reporting for unreachable code. */
            /* Completeness */
            //"skipDefaultLibCheck": true,                       /* Skip type checking .d.ts files that are included with TypeScript. */
            //"skipLibCheck": true                               /* Skip type checking all .d.ts files. */
        };
        const zSchema = getZodSchemaFromDataStructure(desiredCompilerOptions);
        return zodCheck_curry(errorHandler)(zSchema, tsConfig.compilerOptions);
    }
    /**Check if all the desired enviroment keys are defined */
    function getAndCheckEnviromentVariables(env) {
        const desiredEnvKeys = ['ADMIN_PASSWORD', 'APP_NAME', 'DEV_OR_PROD', 'ERIS_TOKEN', 'MONGO_URI', 'PORT'];
        const { answer, errorMessage } = compareArrays(Object.keys(env), 'hasAllItemsOf', desiredEnvKeys);
        if (errorMessage) {
            errorHandler(errorMessage);
        }
        return answer;
    }
    /**Check if the project is using the latest version of "myUtils" */
    async function myUtils_areUpToDate() {
        const latestVersion = await getLatestVersion();
        const installedVersion = (await import('./package.json', { assert: { type: 'json' } })).default.version;
        const isUpToDate = installedVersion === latestVersion;
        if (isUpToDate) {
            colorLog('cyan', '@botoron/my-utils is up to date 👍');
        }
        else {
            errorHandler(`Outdated "btr/utils" package. (${installedVersion} vs ${latestVersion}) PLEASE UPDATE: npm run btr`);
        }
        return isUpToDate;
        //Check if the project is using the latest version of "@botoron/utils"
        async function getLatestVersion() {
            const response = (await new Promise((resolve) => {
                try {
                    fetch('http://registry.npmjs.com/-/v1/search?text=@botoron/utils&size=1').
                        then(res => res.json().then((x) => resolve(x)));
                }
                catch {
                    return { objects: [{ package: { version: '0' } }] };
                }
            }));
            return response.objects[0].package.version;
        }
    }
};
/**FOR NODE-DEBUGGING ONLY. Log a big red message surrounded by a lot of asterisks for visibility */
export const bigConsoleError = (message) => {
    const log = (message) => colorLog('red', message);
    const logAsterisks = (lines) => { for (let i = 0; i < lines; i++) {
        log('*'.repeat(150));
    } };
    logAsterisks(3);
    log(message);
    logAsterisks(3);
};
/**Copy to clipboard while running node */
export const copyToClipboard_server = (x) => spawn('clip').stdin.end(util.inspect(x));
/**FOR NODE-DEBUGGING ONLY. Stringifies and downloads the provided data*/
export const downloadFile_node = async (filename, fileFormat, data, killProcessAfterwards) => {
    const formatted = stringify(data);
    const dateForFilename = getFormattedTimestamp().replace(/\/| |:/g, '_');
    const completeFilename = filename + '_' + dateForFilename + fileFormat;
    colorLog('cyan', `Downloading ${completeFilename}..`);
    await fsWriteFileAsync(completeFilename, formatted);
    successLog('Done!');
    if (!killProcessAfterwards) {
        return;
    }
    if (process.env.quokka) {
        return;
    }
    process.exit();
};
/**Wrapper for fs.promise.readFile that announces the start of the file-reading */
export async function fsReadFileAsync(filePath) {
    console.log(`reading '${filePath}'..`);
    const file = await fs.promises.readFile(filePath, 'utf8');
    return file;
}
/**Wrapper for fsWriteFileAsync that announces the start of the file-writing */
export async function fsWriteFileAsync(filePath, content) {
    console.log(`writing to '${filePath}'..`);
    const file = await fs.promises.writeFile(filePath, content);
    return file;
}
/** Get the contents of the .env */
export async function getEnviromentVariables() {
    const require = createRequire(import.meta.url);
    require('dotenv').config({ path: './.env' });
    return process.env;
}
/**(Use with Quokka) Create an untoggable comment to separate sections, relies on "_" as a variable */
export const getSeparatingCommentBlock = (message) => {
    let line = '';
    const asterisks = '*'.repeat(10);
    while (line.length < 100) {
        line += `${asterisks} ${message.toUpperCase()} ${asterisks}`;
    }
    const theBlock = `_ /${line}/\n`.repeat(5);
    console.log(theBlock);
    return theBlock;
};
/**fetch the latest package.json of my-utils */
export const getLatestPackageJsonFromGithub = async () => {
    const response = await new Promise((resolve) => {
        fetch('https://api.github.com/repos/botoron/utils/contents/package.json', { method: 'GET' }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ).then((res) => res.json().then((packageJson) => resolve(packageJson)));
    });
    return Buffer.from(response.content, 'base64').toString('utf8');
};
/** Return the main perma-dependencies, check myUtil's version and print package.json's script */
export const getMainDependencies = async (packageJson, tsConfig, eslintConfig) => {
    await basicProjectChecks(packageJson, tsConfig, eslintConfig);
    const env = await getEnviromentVariables();
    const { MONGO_URI, PORT } = env;
    const mongoClient = await getMongoClient(MONGO_URI);
    const httpServer = startAndGetHttpServer(PORT);
    divine.init();
    return { httpServer, mongoClient };
    async function getMongoClient(MONGO_URI) {
        const mongo = new mongodb.MongoClient(MONGO_URI);
        let mongoClient = null;
        mongo.connect((err, client) => { if (err) {
            throw err;
        } mongoClient = client; });
        colorLog('cyan', 'waiting for Mongo');
        while (!mongoClient) {
            await delay(1000);
        }
        successLog('It\'s Monging time >:D');
        return mongoClient;
    }
    function startAndGetHttpServer(PORT) {
        const app = express();
        const httpServer = http.createServer(app);
        app.use(express.static(path.resolve() + '/public'));
        app.get('/', (_request, response) => response.sendFile(path.resolve() + '/public/index.html'));
        httpServer.listen(PORT, () => delay(1500).then(() => console.log(`server up at: http://localhost:${PORT}/`)));
        return httpServer;
    }
};
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export const killProcess = (message) => { bigConsoleError(message); process.exit(); };
/**Easily run the scripts of this (utils) repo's package.json */
export const npmRun = async (npmCommand) => {
    const utilsRepoName = 'Utils 🛠️';
    if (npmCommand === 'transpile') {
        transpileFiles(() => colorLog('magenta', 'Process over'));
    }
    if (npmCommand === 'git') {
        prompCommitMessageAndPush(utilsRepoName);
    }
    if (npmCommand === 'publish') {
        transpileFiles(promptVersioning);
    }
    async function promptVersioning() {
        function tryAgain(error) { colorLog('yellow', error); promptVersioning(); }
        const versionIncrement = await questionAsPromise('Type of package version increment (major, minor, patch)?');
        if (!zodCheck_curry(tryAgain)(zValidVersionIncrement, versionIncrement)) {
            return;
        }
        await prompCommitMessageAndPush(utilsRepoName);
        exec(`npm version ${versionIncrement}`, (err, stdout) => {
            console.log({ stdout });
            successLog('package.json up-version\'d');
        });
    }
    function transpileFiles(followUp) {
        const filename = 'btr.ts';
        exec('tsc --declaration --target esnext ' + filename, async () => {
            successLog(filename + ' transpiled');
            const indexTs = await fsReadFileAsync(filename);
            const lines = indexTs.replaceAll('bigConsoleError', 'colorLog').split('\n');
            selfFilter(lines, (line) => !/DELETETHISFORCLIENT/.test(line));
            const cutPoint = lines.findIndex(x => /DELETEEVERYTHINGBELOW/.test(x));
            lines.splice(cutPoint, lines.length);
            lines.push('const colorLog = (color: string, message: string) => console.log(`%c${message}`, `color: ${color};`)');
            await fsWriteFileAsync(`./client/${filename}`, lines.join('\n'));
            exec('tsc --declaration --target esnext client/btr.ts ', async () => {
                successLog('browser versions emitted');
                await delay(500);
                followUp();
            });
        });
    }
};
/**Prompt to submit a git commit message and then push */
export async function prompCommitMessageAndPush(repoName) {
    //order matters with these 3
    const commitTypes = '(fix|feat|build|chore|ci|docs|refactor|style|test)';
    logDetailsForPrompt();
    const commitMessage = await questionAsPromise(`Enter commit type ${commitTypes} plus a message:`);
    function tryAgain(error) { colorLog('yellow', error); prompCommitMessageAndPush(repoName); return; }
    if (!zodCheck_curry(tryAgain)(get_zValidCommitMessage(), commitMessage)) {
        return;
    }
    copyToClipboard_server(commitMessage);
    await gitAddCommitPush();
    function get_zValidCommitMessage() {
        const commitRegex = new RegExp(`(?<!.)${commitTypes}:`);
        return z.string().min(15).max(50).regex(commitRegex, `String must start with ${commitTypes}:`);
    }
    function gitAddCommitPush() {
        return new Promise(resolve => {
            exec('git add .', () => {
                successLog('git add .');
                colorLog('cyan', 'Commit message copied to clipboard, paste it in the editor, save and close.');
                exec('git commit', () => {
                    successLog('git commit');
                    exec('git push', () => {
                        successLog('git push');
                        resolve(true);
                    });
                });
            });
        });
    }
    function logDetailsForPrompt() {
        delay(500).then(() => {
            colorLog('yellow', '50-character limits ends at that line: * * * * * |');
            colorLog('green', repoName);
            console.log();
        });
    }
}
/**Prompts a question in the terminal, awaits for the input and returns it */
export async function questionAsPromise(question) {
    const readline = getReadLine.createInterface({ input: process.stdin, output: process.stdout });
    const input = await new Promise(res => { readline.question(chalk.magenta(question) + '\n', res); });
    readline.close();
    return input;
}
const btrCommand = process.env.npm_config_btrCommand;
if (btrCommand) {
    zodCheckAndHandle(zValidNpmCommand, btrCommand, npmRun, [btrCommand], console.log);
}
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
