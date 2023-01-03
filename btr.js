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
const zValidNpmCommand_project = z.enum(['build', 'check', 'git', 'transpile']);
const zValidNpmCommand_package = z.enum(['all', 'git', 'transpile']);
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
    bot: nullAs(),
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
/**Compare array A to array B and return the details */
export const getArrayDifferences = (baseArray, testArray) => {
    const nonDesiredItems = baseArray.filter(x => !testArray.includes(x));
    const missingItems = testArray.filter(x => !baseArray.includes(x));
    const lengthDifference = baseArray.length - testArray.length;
    const arraysHaveTheSameItems = !nonDesiredItems.length && !missingItems.length;
    const arraysAreEqual = arraysHaveTheSameItems && !lengthDifference;
    return { arraysAreEqual, arraysHaveTheSameItems, lengthDifference, missingItems, nonDesiredItems };
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
function getZodSchemaFromData(data) {
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
/**Syntactic sugar for "null as unknown as T" */
export function nullAs() { return null; }
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
export const basicProjectChecks = async (errorHandler = divine.error) => {
    const addToErrors = (error) => errors.push(error);
    const errors = [];
    const allChecksPass = await Promise.all([
        checkEnviromentVariables, checkEslintConfigRules, checkJsonPackageScripts,
        checkTsConfigCompilerOptions, checkUtilsVersion, checkVueDevFiles
    ]);
    if (errors.length) {
        errorHandler(errors.join('\n\n'));
    }
    return allChecksPass;
    /**Check if all the desired enviroment keys are defined */
    async function checkEnviromentVariables() {
        const env = await getEnviromentVariables();
        return zodCheck_curry(addToErrors, false)(zMyEnv, env);
    }
    /**Check the rules in a project's eslint config file all fit the established schema */
    async function checkEslintConfigRules() {
        const desiredRules = {
            'arrow-body-style': ['error', 'as-needed'],
            'func-style': ['error', 'declaration'],
            'quote-props': ['error', 'as-needed'],
            quotes: ['error', 'single'],
            semi: ['error', 'never'],
            'no-undef': 'off',
        };
        const eslintConfingOfProject = await importFileFromProject('.eslintrc', 'cjs');
        return zodCheck_curry(addToErrors)(getZodSchemaFromData(desiredRules), eslintConfingOfProject.rules);
    }
    /**Check the scripts in a project's package json all fit the established schema */
    async function checkJsonPackageScripts() {
        const desiredPackageJsonScripts = {
            btr: 'npm i @botoron/utils',
            'btr-u': 'npm uninstall @botoron/utils',
            'build-server': 'npm run npmScript --command_project=build',
            'build-client': 'cd client & npm run build-only',
            'build-all': 'tsc --target esnext server/init.ts --outDir ../dist & cd client & npm run build-only && cd ..',
            check: 'npm run npmScript --command_project=check',
            git: 'npm run npmScript --command_project=git',
            localtunnel: 'lt --port 3000',
            nodemon: 'nodemon test/server/init.js',
            npmScript: 'node node_modules/@botoron/utils/btr.js',
            start: 'node test/server/init.js',
            test: 'ts-node-esm test.ts',
            transpile: 'npm run npmScript --command_project=transpile',
            vue: 'cd client & npm run dev'
        };
        const packageJsonOfProject = await importFileFromProject('package', 'json');
        return zodCheck_curry(addToErrors)(getZodSchemaFromData(desiredPackageJsonScripts), packageJsonOfProject.scripts);
    }
    /**Check the rules in a project's ts config file all fit the established schema */
    async function checkTsConfigCompilerOptions() {
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
        const tsConfig = await getTsConfigJson();
        const zSchema = getZodSchemaFromData(desiredCompilerOptions);
        return zodCheck_curry(addToErrors)(zSchema, tsConfig.compilerOptions);
        /**Get the ts config file of the main project */
        async function getTsConfigJson() {
            try {
                return JSON.parse((await fsReadFileAsync('./tsconfig.json')).
                    replace(/\/(\/|\*).{1,}/g, '').
                    replace(/(\n|\r|\t)/g, '').
                    replace(', }', ' }') //{ { <-- commented here to keep the colour of brackets the same
                );
            }
            catch (e) {
                return e;
            }
        }
    }
    /**Check if the project is using the latest version of "myUtils" */
    async function checkUtilsVersion() {
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
    /**Turn off that damn skipLibCheck that comes on by default */
    async function checkVueDevFiles() {
        //TODO: make sure all files ending with .vue match "trackVueComponent"
        const { DEV_OR_PROD } = await getEnviromentVariables();
        if (DEV_OR_PROD !== 'DEV') {
            return true;
        }
        const allVueChecksPass = await Promise.all([
            readVueFile('vue.config.js', 'export const devServer = { proxy: \'http://localhost:\' + process.env.port }'),
            readVueFile('vite.config.ts', 'optimizeDeps: { exclude: [\'node_modules/@botoron/utils\'], },'),
            readVueFile('vue.config.js', 'export const assetsDir = resolve(__dirname, \'../assets\')'),
            readVueFile('node_modules/@vue/tsconfig/tsconfig.json', '"skipLibCheck": false'),
            readVueFile('env.d.ts', '/// <reference types="../types" />'),
        ]);
        return allVueChecksPass;
        async function readVueFile(clientSlash, mustMatch) {
            const path = './client/' + clientSlash;
            const file = await fsReadFileAsync(path);
            if (file.includes(mustMatch)) {
                return true;
            }
            addToErrors(path + ' must include: ' + mustMatch);
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
export const getMainDependencies = async () => {
    await basicProjectChecks();
    const env = await getEnviromentVariables();
    const { MONGO_URI, PORT } = env;
    const mongoClient = await getMongoClient(MONGO_URI);
    const httpServer = startAndGetHttpServer(PORT);
    divine.init();
    return { httpServer, mongoClient };
    async function getMongoClient(MONGO_URI) {
        const mongo = new mongodb.MongoClient(MONGO_URI);
        let mongoClient = nullAs();
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
/**Get the package json of the project with this (utils) package installed */
export async function importFileFromProject(filename, extension) {
    try {
        const path = `../../../${filename}.${extension}`;
        const options = extension === 'json' ? { assert: { type: 'json' } } : {};
        const mainPackageJson = (await import(path, options)).default;
        return mainPackageJson;
    }
    catch (e) {
        return e;
    }
}
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export const killProcess = (message) => { bigConsoleError(message); process.exit(); };
/**Easily run the scripts of this (utils) repo's package.json */
export const npmRun_package = async (npmCommand) => {
    const utilsRepoName = 'Utils 🛠️';
    if (npmCommand === 'transpile') {
        transpileFiles(() => colorLog('magenta', 'Process over'));
    }
    if (npmCommand === 'git') {
        prompCommitMessageAndPush(utilsRepoName);
    }
    if (npmCommand === 'all') {
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
/**Run convenient scripts for and from a project's root folder */
export const npmRun_project = async (npmCommand) => {
    //async (options: { serverFolder_dist?: string, serverFolder_src?: string, fileWithRef?: string })
    //if (!options) { options = defaults }
    //const { serverFolder_dist, serverFolder_src, fileWithRef } = addMissingPropsToObjects(options!, defaults)
    await basicProjectChecks();
    const defaults = { serverFolder_dist: '../dist', serverFolder_src: './test', fileWithRef: 'ref' };
    const { serverFolder_dist, serverFolder_src, fileWithRef } = defaults;
    const { APP_NAME } = await getEnviromentVariables();
    if (npmCommand === 'check') {
        basicProjectChecks();
    }
    if (npmCommand === 'git') {
        prompCommitMessageAndPush(`${APP_NAME}`);
    }
    if (['build', 'transpile'].includes(npmCommand)) {
        canTranspileCheckAndHandle();
    }
    async function canTranspileCheckAndHandle() {
        const canTranspile = await getCanTranspile();
        if (!canTranspile) {
            killProcess(`CANT TRANSPILE, ${fileWithRef}.js has debugging: on`);
        }
        if (npmCommand === 'build') {
            transpileToDistFolder_plusCopyOverOtherFiles();
        }
        if (npmCommand === 'transpile') {
            transpileServerFilesToTestFolder();
        }
        async function getCanTranspile() {
            try {
                return !/debugging: true/.test(await fsReadFileAsync(`test/server/${fileWithRef}.js`));
            }
            catch {
                return true;
            }
        }
        function transpileServerFilesToTestFolder() {
            exec(`tsc --target esnext server/init.ts --outDir ${serverFolder_src}`, async () => {
                const packageJson = await fsReadFileAsync('package.json');
                await fsWriteFileAsync('test/package.json', packageJson);
                successLog(`files transpiled to ${serverFolder_src}`);
            });
        }
        async function transpileToDistFolder_plusCopyOverOtherFiles() {
            if (!(await checkDevPropsOfRef('server/' + fileWithRef + '.ts', false))) {
                return;
            }
            await transpileTypesFile();
            await copyFileToDis('.env');
            await copyFileToDis('.gitignore');
            await copyFileToDis('package.json');
            await copyFileToDis('types.js');
            exec(`tsc --target esnext server/init.ts server/io.ts --outDir ${serverFolder_dist}`, async () => {
                await checkDevPropsOfRef(serverFolder_dist + '/server/' + fileWithRef + '.js', true);
                successLog('(server) Build sucessful!');
            });
            async function checkDevPropsOfRef(filePath, toggleForProduction) {
                let fileContent = await fsReadFileAsync(filePath);
                if (!checkFor('devOrProd = \'dev\'', 'devOrProd = \'prod\'')) {
                    return;
                }
                if (toggleForProduction) {
                    await fsWriteFileAsync(filePath, fileContent);
                }
                return true;
                function checkFor(forSrc, forDist) {
                    if (!fileContent.includes(forSrc)) {
                        killProcess(`main.ts.ref must include: (${forSrc})`);
                        return;
                    }
                    if (toggleForProduction) {
                        fileContent = fileContent.replace(forSrc, forDist);
                    }
                    return true;
                }
            }
            async function copyFileToDis(filename) {
                let content = await fsReadFileAsync(filename);
                if (filename === 'package.json') {
                    deleteAllPackageJsonScriptsExceptStart();
                }
                await fsWriteFileAsync('../dist/' + filename, content);
                function deleteAllPackageJsonScriptsExceptStart() {
                    content = content.replace(/"scripts": {[^}]{1,}/, `"scripts": { 
		"start": "node server/init.js",
		"git": "git add . & git commit & git push",
		"btr": "npm i @botoron/utils"
	`);
                }
            }
        }
        async function transpileTypesFile() {
            return await new Promise(resolve => {
                fsReadFileAsync('types.d.ts').then(typesFile => {
                    fsWriteFileAsync('types.ts', typesFile).then(() => {
                        exec('tsc --target esnext types.ts', () => {
                            successLog('types.d.ts transpiled to root folder!');
                            fs.unlinkSync('types.ts');
                            delay(1000).then(() => resolve(true));
                        });
                    });
                });
            });
        }
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
const command_package = process.env.npm_config_command_package;
const command_project = process.env.npm_config_command_project;
if (command_package) {
    zodCheckAndHandle(zValidNpmCommand_package, command_package, npmRun_package, [command_package], console.log);
}
if (command_project) {
    zodCheckAndHandle(zValidNpmCommand_project, command_project, npmRun_project, [command_project], console.log);
}
