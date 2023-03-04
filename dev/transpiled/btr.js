let _;
import fs from 'fs'; //DELETETHISFORCLIENT 
_;
import eris from 'eris'; //DELETETHISFORCLIENT
_;
import util from 'util'; //DELETETHISFORCLIEfNT
_;
import http from 'http'; //DELETETHISFORCLIENT
_;
import path from 'path'; //DELETETHISFORCLIENT
_;
import chalk from 'chalk'; //DELETETHISFORCLIENT
_;
import express from 'express'; //DELETETHISFORCLIENT
_;
import fetch from 'node-fetch'; //DELETETHISFORCLIENT
_;
import inquirer from 'inquirer'; //DELETETHISFORCLIENT
_;
import clipboard from 'clipboardy'; //DELETETHISFORCLIENT
_;
_;
import getReadLine from 'readline'; //DELETETHISFORCLIENT
_;
import { createRequire } from 'module'; //DELETETHISFORCLIENT
_;
import { execSync } from 'child_process'; //DELETETHISFORCLIENT
_;
import mongodb from 'mongodb'; //DELETETHISFORCLIENT
_;
_;
import { getUniqueId_generator, isNode, timers, zValidVariants } from './constants.js';
_;
import { z } from 'zod';
_;
import { fromZodError } from 'zod-validation-error';
_; /********** EXPORTABLE TYPES ******************** EXPORTABLE TYPES ******************** EXPORTABLE TYPES **********/
_; /********** EXPORTABLE TYPES ******************** EXPORTABLE TYPES ******************** EXPORTABLE TYPES **********/
_; /********** EXPORTABLE TYPES ******************** EXPORTABLE TYPES ******************** EXPORTABLE TYPES **********/
_; /********** EXPORTABLE TYPES ******************** EXPORTABLE TYPES ******************** EXPORTABLE TYPES **********/
_; /********** EXPORTABLE TYPES ******************** EXPORTABLE TYPES ******************** EXPORTABLE TYPES **********/
export { zValidVariants };
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
/**getRandomItem, but each items has custom chances to be selected */
export function getRandomItem_withCustomChances(items, chancesDefininingFunction) {
    const chancesAdjustItems = [];
    items.forEach(item => { for (let i = 0; i < chancesDefininingFunction(item); i++) {
        chancesAdjustItems.push(item);
    } });
    return getRandomItem(chancesAdjustItems).item;
}
/**@returns a version of the provided array without repeating items */
export function getUniqueValues(arr) { return [...new Set(arr)]; }
/**@returns whether an item is the last one in an array or not (warning: maybe don't use with primitives) */
export function isLastItem(arr, item) { return item === arr.at(-1); }
/**Return the last item of the given array */ //TODO: consider replacing this for Array.prototype.at(-1)
export function lastItem(arr) { return arr[arr.length - 1]; }
/**Apply multiple mapping functions to a single array at once and return an object with all the result */
export function multiMap(arr, f1, f2, f3 = doNothing, f4 = doNothing, f5 = doNothing) {
    return arr.reduce((acc, item) => {
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
export async function asyncForEach(array, asyncFn, resolveSequentially = false) {
    if (resolveSequentially) {
        for await (const item of array) {
            await asyncFn(item);
        }
    } //@btr-ignore
    if (!resolveSequentially) {
        await Promise.all(array.map(item => asyncFn(item)));
    }
}
/**Set interval with try-catch and call it immediately*/
export function doAndRepeat(fn, interval) { divine.try(fn, []); setInterval(() => divine.try(fn, []), interval); }
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
    message = message.replace(/\.[0-9]{0,}/g, ''); //regexHere
    return { time: message, variant: getVariant() };
    function getVariant() {
        let variant = nullAs();
        if (/Minutes|Hours|Days/.test(message)) {
            variant = 'info';
        } //regexHere
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
/**
 *Formate a timestamp with Intl.DateTimeFormt. Options: short/medium/long (add +hour to include Hour) or hOnly (hour only)
 @param timestamp //The timestamp to be converted to a readable date/hour
 @param language //Either english or spanish formatting and month-naming
 @param type The type of formatting to be applied.
 @example
 //can also do hourOnly or "+hour" to add the hour at the end
 { short: '01/01/23', medium: 'Jan 01, 2023', long: 'January 01, 2023' }
 */
export function formatDate(timestamp, language, type) {
    return new Intl.DateTimeFormat({ English: 'en', Español: 'es' }[language], getOptions()).format(timestamp);
    function getOptions() {
        switch (type) {
            default:
            case 'short': return { dateStyle: 'short' };
            case 'medium': return { dateStyle: 'medium' };
            case 'long': return { dateStyle: 'long' };
            case 'hourOnly': return { timeStyle: 'short' };
            // eslint-disable-next-line sonarjs/no-duplicate-string
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
        divine.ping('"min" should be lower than "max"!');
    }
    return number <= max && number >= min;
}
/**Math.max and Math.min merged into one */
export function mathMaxMin(max, min, number) {
    if (min > max) {
        divine.ping('"min" should be lower than "max"!');
    }
    if (number > max) {
        return max;
    }
    if (min > number) {
        return min;
    }
    return number;
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
/**Console log an object to its full depth */
export function consoleLogFull(data) { console.log(util.inspect(data, { showHidden: false, depth: null, colors: true })); } //@btr-ignore
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
/**Generator for unique IDs (using Date.now and 'i') that accepts a preffix */
export function getUniqueId(suffix) { return suffix + '_' + getUniqueId_generator.next().value; }
/**Because ESlint doesn't like Object(x).hasOwnProperty :p */
export function hasOwnProperty(x, key) { return Object.prototype.hasOwnProperty.call(x, key); }
/**Map an object! (IMPORTANT, all values in the object must be of the same type, or mappinFn should be able to handle multiple types) */
export function mapObject(object, mappingFn) {
    const newObject = {};
    objectEntries(object).forEach(x => { newObject[x.key] = mappingFn(x.value); });
    return newObject;
}
/**Object.Prototype.entries but with proper type-inference */
export function objectEntries(object) {
    return Object.entries(object).map(entry => ({ key: entry[0], value: entry[1] })); //@btr-ignore
}
/**Object.keys but with proper type-inference */ //@btr-ignore
export function objectKeys(object) { return Object.keys(object); } //@btr-ignore
/**Object.Prototype.values but with proper type-inference */
export function objectValues(object) { return Object.values(object); } //@btr-ignore
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
    const doContinue = await stayAliveChecker();
    return { timesRanSucessfully, ...await getResult() };
    async function getResult() {
        return await new Promise(resolve => {
            if (doContinue) {
                initializeTimer(id, Date.now() + intervalInMs, onEach, onKill).then(result => {
                    if (result.wasCancelled) {
                        return resolve(result);
                    }
                    initializeInterval(id, intervalInMs, stayAliveChecker, onEach, onKill, timesRanSucessfully + 1).then(result => resolve(result));
                });
            }
            else {
                initializeTimer(id, Date.now() + intervalInMs, onEach, onKill).then(result => resolve(result));
                killTimer(id, `stayAliveChecker (${stayAliveChecker.name}) = false`);
            }
        });
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
export async function initializeTimer(id, runAt, onComplete, onCancel) {
    const timer = {
        id, runAt, onComplete, onCancel,
        value_onComplete: nullAs(),
        value_onCancel: nullAs(),
        resolveInfo: nullAs(),
        startedAt: Date.now(),
        wasCancelled: false,
        cancelStack: '',
        cancelledAt: 0,
    };
    timers.push(timer);
    return await interval();
    async function getResolvedTimer() {
        const { id, startedAt, runAt, onComplete, onCancel, cancelledAt, cancelStack, wasCancelled } = timer;
        if (!timer.wasCancelled) {
            timer.value_onComplete = await timer.onComplete();
        }
        else {
            doNothing;
        } /**timer.value_onCancel should have been set in killTimer */
        timer.resolveInfo = {
            timerId: id,
            startedAt: formatDate(startedAt, 'English', 'medium+hour'),
            intendedRunAt: formatDate(runAt, 'English', 'medium+hour'),
            cancelledAt: wasCancelled ? formatDate(cancelledAt, 'English', 'medium+hour') : null,
            timeElapsedBeforeCancelation: wasCancelled ? `${(cancelledAt - startedAt) / 1000} seconds` : null,
            timeLeftBeforeCancelation: wasCancelled ? `${(runAt - timer.cancelledAt) / 1000} seconds` : null,
            onCompleteFn: onComplete.name,
            onCancelFn: onCancel.name,
            cancelStack,
        };
        return timer;
    }
    async function interval() {
        const maxInterval = 1000;
        const timeLeft = Math.max(runAt - Date.now(), 0);
        const isTheLastInterval = maxInterval >= timeLeft;
        await delay(isTheLastInterval ? timeLeft : maxInterval);
        if (isTheLastInterval) {
            removeItem(timers, timer);
        }
        return timer.wasCancelled ? timer : isTheLastInterval ? getResolvedTimer() : interval();
    }
}
/**Kill a timer created with initializeTimer/Interval, the reason provided will become a divine stack */
export async function killTimer(timerId, reason) {
    const theTimer = timers.find(x => x.id === timerId);
    if (!theTimer) {
        divine.error('Unable to cancel, no timer was found with this id: ' + timerId);
        return;
    }
    removeItem(timers, theTimer);
    theTimer.value_onCancel = await theTimer.onCancel();
    theTimer.cancelStack = getTraceableStack(reason, 'killTimer');
    theTimer.cancelledAt = Date.now();
    theTimer.wasCancelled = true;
    return theTimer;
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
/**console.log... WITH COLORS :D */ //@btr-ignore
export function colorLog(color, message) { console.log(chalk[color].bold(message)); } //DELETETHISFORCLIENT @btr-ignore
/**(Message) 💀 */
export function errorLog(message) { return colorLog('red', message + ' 💀'); }
/**TODO: describe me */
export function getTraceableStack(error, type) {
    const { stack } = (typeof error === 'string' ? new Error(error) : error);
    return `${stack}`.
        replace(/\(node:3864\).{0,}\n.{0,}exit code./, ''). //regexHere
        replace(/\n {4}at/g, `\n ${' * '.repeat(5)} at`). //regexHere
        replace(/^Error/, type); //regexHere
}
/**@returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export function isGuest(username) { return /Guest[0-9]{13}/i.test(`${username}`); } //regexHere
/**To know when files are fired and in what order  */
export function logInitialization(filename) { colorLog(isNode ? 'cyan' : 'magenta', '*'.repeat(20) + ' ' + filename); }
/**(Message) ✔️ */
export function successLog(message) { return colorLog('green', message + ' ✔️'); }
/**@returns an string with its linebreaks converted into simple one-char spaces */
export function toSingleLine(sentence) { return `${sentence}`.replace(/ {0,}\n {0,}/g, ' '); } //regexHere
/**Return an string with X amount of (character) as margin per side */
export function surroundedString(string, margin, perSide) {
    const x = margin.repeat(perSide);
    return x + string + x;
}
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
/**Copy content to the clipboard, works for both client and server side */
export function copyToClipboard(x) {
    if (isNode) {
        clipboard.write(stringify(x));
        return;
    }
    const text = stringify(x);
    const a = document.createElement('textarea');
    a.innerHTML = text;
    document.body.appendChild(a);
    a.select();
    document.execCommand('copy');
    document.body.removeChild(a);
}
/**
 * Compare data B against an schema created from data A
 * @param A The first piece of data
 * @param B The second piece of data
 * @param errorHandler The handler for the message error
 * @returns
 */
export function dataIsEqual(A, B, errorHandler = nullAs()) {
    return zGetSafeParseResultAndHandleErrorMessage(zGetSchemaFromData(A), B, errorHandler);
}
/**For obligatory callbacks */
export function doNothing(...args) { args; }
/**Margin to make reading logs easier */
export function logEmptyLine() { console.log(''); } //@btr-ignore
/** @returns null, as the provided type */
export function nullAs() { return null; } //@btr-ignore
_; /********** ZOD ******************** ZOD ******************** ZOD ******************** ZOD ******************** ZOD **********/
_; /********** ZOD ******************** ZOD ******************** ZOD ******************** ZOD ******************** ZOD **********/
_; /********** ZOD ******************** ZOD ******************** ZOD ******************** ZOD ******************** ZOD **********/
_; /********** ZOD ******************** ZOD ******************** ZOD ******************** ZOD ******************** ZOD **********/
_; /********** ZOD ******************** ZOD ******************** ZOD ******************** ZOD ******************** ZOD **********/
_; /********** ZOD ******************** ZOD ******************** ZOD ******************** ZOD ******************** ZOD **********/
_; /********** ZOD ******************** ZOD ******************** ZOD ******************** ZOD ******************** ZOD **********/
_; /********** ZOD ******************** ZOD ******************** ZOD ******************** ZOD ******************** ZOD **********/
_; /********** ZOD ******************** ZOD ******************** ZOD ******************** ZOD ******************** ZOD **********/
_; /********** ZOD ******************** ZOD ******************** ZOD ******************** ZOD ******************** ZOD **********/
/**
 * Test data against an schema with strict-mode on (no unspecified keys) for objects and handle the error message if any
 * @param schema The schema to test the data against
 * @param data The data to be tested
 * @param errorHandler The handler for the message error
 * @returns
 */
export function zGetSafeParseResultAndHandleErrorMessage(schema, data, errorHandler = nullAs()) {
    const result = (schema.strict ? schema.strict() : schema).safeParse(data);
    if (result.success === false && errorHandler) {
        errorHandler(fromZodError(result.error).message);
    }
    return result;
}
/**Dynamically generate a Zod Schema from an array/object */
export function zGetSchemaFromData(data) {
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
    function toLiteral(x) {
        return typeof x === 'object' ?
            zGetSchemaFromData(x) :
            z.literal(x);
    }
}
/**(generates a function that:) Tests data against an scheme, and executes a predefined errorHandler in case it isn't a fit. */
export function zodCheck_curry(errorHandler) {
    return function zodCheck(schema, data) {
        function body(errorHandler, schema, data) {
            return zGetSafeParseResultAndHandleErrorMessage(schema, data, errorHandler).success;
        }
        return body(errorHandler, schema, data);
    };
}
/**Simple zodCheck without any kind of error handler */
export function zodCheck_simple(schema, data) {
    return zGetSafeParseResultAndHandleErrorMessage(schema, data, doNothing).success;
}
/**
 * Check data against a provided schema, and execute either the success or error handler
 * @param zSchema The zSchema to test data against
 * @param data The data to be tested against zSchema
 * @param successHandler The function that will execute if data fits zSchema
 * @param args The arguments to be applied to successHandler
 * @param errorHandler The function that will execute if data does NOT fits zSchema
 */
export function zodCheckAndHandle(zSchema, data, successHandler, args, errorHandler) {
    const zResult = zGetSafeParseResultAndHandleErrorMessage(zSchema, data, errorHandler);
    if (zResult.success === true && successHandler) {
        successHandler(...args);
    }
}
/**
 * Pipe with schema validation and basic error tracking/handling
 * @param zSchema The schema that must persist through the whole pipe
 * @param initialValue The value/object that will be piped through the functions
 * @param fns The functions that will conform the pipe in order
 * @returns
 */
export function zPipe(zSchema, initialValue, ...fns) {
    const initialPipeState = { value: initialValue, error: nullAs(), failedAt: nullAs() };
    return fns.reduce((pipeState, fn, index) => {
        if (pipeState.error) {
            return pipeState;
        }
        pipeState.value = fn(pipeState.value);
        zGetSafeParseResultAndHandleErrorMessage(zSchema, pipeState.value, errorHandler);
        return pipeState;
        function errorHandler(err) {
            pipeState.failedAt = `Step ${index + 1}: ${fn.name}`;
            pipeState.error = err;
        }
    }, initialPipeState);
}
/**Zod's "record", but all keys are Required instead of Optional as it is the default */
export function zRecord(keys, schema) {
    return z.object(arrayToObject(keys, () => schema));
}
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
/**Log every socket.io event with the data received for debugging purposes */
export function clientSocketLogOnAny(useStore) {
    useStore().socket.onAny((eventName, ...args) => {
        const eventInfo = { event: eventName, timestamp: Date.now(), data: args };
        colorLog('red', stringify(eventInfo));
        useStore().socketEvents.unshift(eventInfo);
    });
}
/**Stringify and download the provided data */
export async function downloadFile(filename, fileFormat, data) {
    if (isNode) {
        await downloadFile_node();
    }
    else {
        downloadFile_client();
    }
    isNode ? downloadFile_node() : downloadFile_client();
    function downloadFile_client() {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([data], { type: 'text/plain' }));
        a.download = `${filename}${fileFormat}`;
        a.click();
    }
    async function downloadFile_node() {
        const formatted = stringify(data);
        const dateForFilename = formatDate(Date.now(), 'English', 'short').replace(/\/| |:/g, '_'); //regexHere
        const completeFilename = filename + '_' + dateForFilename + fileFormat;
        colorLog('cyan', `Downloading ${completeFilename}..`);
        await fsWriteFileAsync(completeFilename, formatted);
        successLog('Done!');
    }
}
/**
 * Register into the window's a finder and logger of all vue components, including the main instance and pinia store
 * @example getAppLog(window as never, useStore) //at the bottom of store.ts
 */
export function getAppLog(window, useStore) {
    delay(1000).then(() => {
        window.appLog = () => mapObject({
            store: useStore(),
            ...arrayToObject(objectEntries(window.vueComponents).map(entry => {
                const components = window.vueComponents[entry.key];
                return components.map(x => components.length > 1 ? x.id : x.name);
            }).flat(), idOrName => objectValues(window.vueComponents).flat().find(x => [x.id, x.name].includes(idOrName)))
        }, component => ({
            ...arrayToObject(sortAlphabetically(objectKeys(component)).filter(key => ![
                '$dispose', '$id', '$onAction', '$patch', '$reset', '$subscribe', '_hotUpdate', '_isOptionsAPI', '_r',
                '_uid', '_isVue', '__v_skip', '_scope', '$options', '_renderProxy', '_self', '$parent', '$root', '$children', '$refs', '_provided',
                '_watcher', '_inactive', '_directInactive', '_isMounted', '_isDestroyed', '_isBeingDestroyed', '_events', '_hasHookEvent',
                '_vnode', '_staticTrees', '$vnode', '$slots', '$scopedSlots', '_c', '$createElement', '$attrs', '$listeners', '$pinia',
                '_bv__modal', '_bv__toast', '_data', '_computedWatchers', '$el', 'name', 'id', 'beforeDestroy'
            ].includes(key)), key => () => console.log(stringify(component[key])) //@btr-ignore
            )
        }));
    });
}
/**localStorage, but better */
export function getLocalStorageAndSetter(defaults) {
    const storedInfo = getStoredInfo();
    objectEntries(defaults).forEach(({ key, value }) => { if (!(key in storedInfo)) {
        localStorageSet(key, value);
    } });
    return { myLocalStorage: getStoredInfo(), localStorageSet };
    function getStoredInfo() {
        return JSON.parse(localStorage['info'] || '{}');
    }
    function localStorageSet(key, value) {
        const storedInfo = getStoredInfo();
        storedInfo[key] = value;
        localStorage['info'] = stringify(storedInfo);
    }
}
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
//TODO: describe me
export async function triggerModal(useStore, id, action) {
    if (action === 'show') {
        useStore().bvModal.show(id); //@btr-ignore
        for (let i = 0; i < 10; i++) {
            if (!elementExists()) {
                await delay(250);
            }
        }
        if (!elementExists()) {
            promptError();
        }
    }
    if (action === 'hide') {
        elementExists() ? useStore().bvModal.hide(id) : promptError(); //@btr-ignore
    }
    function elementExists() { return Boolean(document.getElementById(id)); }
    function promptError() { alert(`Modal with the '${id}' id was not found. Could not ${action}. Please report this`); }
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
/**@deprecated use "copyToClipboardr" instead */
export function copyToClipboard_client() { doNothing; }
/**@deprecated use "copyToClipboardr" instead */
export function copyToClipboard_server() { doNothing; }
/**@deprecated use "doAndRepeat" instead */
export function doAndRepeat_server() { doNothing; }
/**@deprecated use "formatDate" instead */
export function getFormattedTimestamp() { doNothing; }
/** @deprecated use either zPipe (persistenType with zod errors) or pipe_mutableType! */
export function pipe_persistentType() { doNothing; }
/**@deprecated use "trackVueComponent" instead */
export function trackVueComponent_curry() { doNothing; }
/**@deprecated use "triggerModal" instead */
export function triggerModalWithValidation_curry() { doNothing; }
/**@deprecated use "divine.try" instead */
export function tryF() { doNothing; } //@btr-ignore
// ! DELETEEVERYTHINGBELOW, as it is only meant for server-side use
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
    error: (err) => {
        const message = getTraceableStack(err, 'divineError');
        const { DEV_OR_PROD } = getEnviromentVariables();
        DEV_OR_PROD !== 'PROD' ? killProcess(message) : divine.ping(message);
    },
    init: (() => {
        delay(1000).then(async () => {
            if (process.env['prevent_divine_init']) {
                return;
            }
            const { APP_NAME, DEV_OR_PROD, ERIS_TOKEN } = getEnviromentVariables();
            if (DEV_OR_PROD !== 'PROD') {
                return;
            }
            const divinePrepend = '***DivineBot:***';
            const bot = eris(ERIS_TOKEN);
            bot.on('messageReactionRemove', (a, b, c) => role('remove', a, b, c));
            bot.on('messageReactionAdd', (a, b, c) => role('add', a, b, c));
            bot.on('disconnect', () => { colorLog('red', `${divinePrepend}: Disconnected D: ... retrying!`); });
            bot.on('connect', () => divine.ping(`(${APP_NAME}) - I'm alive bitch >:D`));
            const idOfRoleAssigningMessage = '822523162724925473';
            await attemptConnection();
            divine.bot = bot;
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
                    errorLog('divineBot.role.tryCatch.error: \n' + e);
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
        });
    })(),
    ping: async (message) => {
        while (!divine.bot?.ready) {
            await delay(1000);
        }
        const { APP_NAME } = getEnviromentVariables();
        const theMessage = `<@470322452040515584> - (${APP_NAME}) \n ${message}`;
        const divineOptions = { content: theMessage, allowedMentions: { everyone: true, roles: true } };
        divine.bot.createMessage('1055939528776495206', divineOptions);
    },
    /**tryCatch wrapper for functions with divineError as the default error handler */
    try: async (fn, args) => {
        try {
            return await fn(...args);
        }
        catch (err) {
            divine.error(err);
        }
    }
};
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
/**Batch-load files for checking purposes */
export async function getCachedFiles(errors, filepaths) {
    const cachedFiles = [];
    await asyncForEach(filepaths, addToCachedFiles);
    return cachedFiles;
    async function addToCachedFiles(filepath) {
        if (!fileExists(filepath)) {
            addToErrors(`File not found at '${filepath}'`);
            return;
        }
        cachedFiles.some(x => x.path === filepath) ?
            addToErrors(`File readed more than once by fsReadFileAsync: >>> (${filepath}) << <`) :
            cachedFiles.push({ path: filepath, content: await fsReadFileAsync(filepath) });
    }
    function addToErrors(error) {
        errors.push(error);
    }
    async function fileExists(path) {
        try {
            await fs.promises.access(path);
            return true;
        }
        catch {
            addToErrors('Missing file, couldn\'t read: ' + path);
            return false;
        }
    }
}
/**FOR NODE-DEBUGGING ONLY. Log a big red message surrounded by a lot of asterisks for visibility */
export function bigConsoleError(message) {
    function logAsterisks(lines) { for (let i = 0; i < lines; i++) {
        log('*'.repeat(150));
    } }
    function log(message) { return colorLog('red', message); }
    logAsterisks(3);
    log(message);
    logAsterisks(3);
}
/**Basically custom ESlint warnings */
export function checkCodeThatCouldBeUpdated(cachedFiles, warningsCount) {
    cachedFiles.forEach(file => {
        const { path, content } = file;
        checkReplaceableCode(['triggerModalWithValidation, bvModal.show', 'bvModal.hide'], '.triggerModal(modalId, show | hide)'); //@btr-ignore
        checkReplaceableCode(['console.log(stringify'], 'colorLog OR consoleLogFull OR debugLog'); //@btr-ignore
        checkReplaceableCode(['console.log'], 'colorLog OR consoleLogFull OR debugLog'); //@btr-ignore
        checkReplaceableCode(['console.log()', 'console.log(\'\')'], 'logEmptyLine'); //@btr-ignore
        checkReplaceableCode(['readonly ', 'ReadonlyArray<'], 'Readonly<'); //@btr-ignore
        checkReplaceableCode(['{ description: string,'], ': commands'); //@btr-ignore
        checkReplaceableCode(['//@ts-ignore'], '//@ts-expect-error'); //@btr-ignore
        checkReplaceableCode(['for await'], 'await asyncForEach'); //@btr-ignore
        checkReplaceableCode(['Object.entries'], 'objectEntries'); //@btr-ignore
        checkReplaceableCode(['tsc --target'], 'transpileFiles'); //@btr-ignore
        checkReplaceableCode(['| null', 'null |'], 'nullable'); //@btr-ignore
        checkReplaceableCode(['autologin'], 'useStore().login'); //@btr-ignore
        checkReplaceableCode(['Object.values'], 'objectValues'); //@btr-ignore
        checkReplaceableCode(['JSON.stringify'], 'stringify'); //@btr-ignore
        checkReplaceableCode(['Object.keys'], 'objectKeys'); //@btr-ignore
        checkReplaceableCode(['exec('], 'execSync('); //@btr-ignore /)
        checkReplaceableCode([' tryF'], 'divine.try'); //@btr-ignore
        checkReplaceableCode(['z.record'], 'zRecord'); //@btr-ignore
        checkReplaceableCode(['null as'], 'nullAs'); //@btr-ignore
        checkReplaceableCode([').then('], 'await'); //@btr-ignore
        function checkReplaceableCode(replaceableCodeStrings, suggestedReplacement) {
            replaceableCodeStrings.forEach(replaceableString => {
                const withEscapedCharacters = replaceableString.replace(/(?=\W{1,1})/g, '\\'); //regexHere
                const theRegex = new RegExp(withEscapedCharacters + '.{0,}', 'gi');
                const matches = Array(...content.match(theRegex) || []);
                selfFilter(matches, match => !/@btr-ignore/.test(match)); //regexHere
                if (!matches.length) {
                    return;
                }
                warningsCount.count++;
                colorLog('yellow', surroundedString(warningsCount.count + ' . WARNING: OUTDATED/REPLACEABLE CODE', '-', 50));
                console.log({
                    matches: matches.map(x => surroundedString(x, ' ', 5)),
                    replaceableCode: surroundedString(replaceableString, ' ', 10),
                    suggestedReplacement: surroundedString(suggestedReplacement, ' ', 5),
                    path
                });
            });
        }
    });
}
/**Wrapper for fs.promise.readFile that announces the start of the file-reading */
export async function fsReadFileAsync(filePath) {
    colorLog('white', `reading '${filePath}'..`);
    return await fs.promises.readFile(filePath, 'utf8');
}
/**Wrapper for fsWriteFileAsync that announces the start of the file-writing */
export async function fsWriteFileAsync(filePath, content) {
    colorLog('white', `writing to '${filePath}'..`);
    return await fs.promises.writeFile(filePath, content);
}
/**For a project's debugging purposes */
export function getDebugOptionsAndLog(devOrProd, options) {
    function forDevForProd(forDev, forProd) { return { dev: forDev, prod: forProd }[devOrProd]; }
    return {
        debugOptions: mapObject(options, (x) => forDevForProd(x[0], x[1])),
        debugLog: (debugKey, error) => {
            if (!options[debugKey]) {
                return;
            }
            colorLog('yellow', debugKey);
            colorLog('cyan', stringify(error));
            colorLog('magenta', getTraceableStack('', 'debugLog'));
            logEmptyLine();
        }
    };
}
/** Get the contents of the project's .env */
export function getEnviromentVariables() {
    const require = createRequire(import.meta.url);
    require('dotenv').config({ path: './.env' });
    return process.env;
}
/**Get all the file and folders within a folder, stopping at predefined folders (assets, git, node_modules, test) */
export function getFilesAndFoldersNames(directory, extension) {
    const results = [];
    fs.readdirSync(directory).forEach((file) => {
        file = directory + '/' + file;
        const stat = fs.statSync(file);
        const stopHere = /node_modules|git|test|assets/.test(file); //regexHere
        if (stat && stat.isDirectory() && !stopHere) {
            results.push(...getFilesAndFoldersNames(file, null));
        }
        else {
            results.push(file);
        }
    });
    return extension ? results.filter(path => path.includes(extension)) : results;
}
/**(Use with Quokka) Create an untoggable comment to separate sections, relies on "_" as a variable */
export function getSeparatingCommentBlock(message) {
    let line = '';
    const asterisks = '*'.repeat(10);
    while (line.length < 100) {
        line += `${asterisks} ${message.toUpperCase()} ${asterisks}`;
    }
    const theBlock = `_ /${line}/\n`.repeat(5);
    console.log(theBlock); //@btr-ignore
    return theBlock;
}
/**fetch the latest package.json of myUtils */
export async function getLatestPackageJsonFromGithub() {
    const response = await new Promise((resolve) => {
        fetch('https://api.github.com/repos/botoron/utils/contents/package.json', { method: 'GET' }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ).then((res) => res.json().then((packageJson) => resolve(packageJson)));
    });
    return Buffer.from(response.content, 'base64').toString('utf8');
}
/**It's monging time >:D */
export async function getMongoClient() {
    const { MONGO_URI } = getEnviromentVariables();
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
/**Start and return an http Express server */
export function getStartedHttpServer() {
    const { PORT } = getEnviromentVariables();
    const app = express();
    const httpServer = http.createServer(app);
    app.use(express.static(path.resolve() + '/public'));
    app.get('/', (_request, response) => response.sendFile(path.resolve() + '/public/index.html'));
    httpServer.listen(PORT, () => delay(1500).then(() => colorLog('white', 'Server up and running~')));
    return httpServer;
}
/**Import modules or jsons */
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
/**Prompt and handle admin/dev commands */
export function inquirePromptCommands(functions, promptAgainAfterEachFn) {
    inquirer.
        prompt({ name: 'fn', type: 'list', message: 'Run a function:', choices: objectKeys(functions) }).
        then(async (choice) => {
        await functions[choice.fn]();
        if (!promptAgainAfterEachFn) {
            return;
        }
        inquirePromptCommands(functions, promptAgainAfterEachFn);
    });
}
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export function killProcess(message) { bigConsoleError(message); process.exit(); }
//TODO: describe me
export function mapCommandsForInquirePrompt(commands) {
    const object = {};
    objectEntries(commands).forEach(({ key, value }) => object[key + ': ' + value.description] = value.fn);
    return object;
}
/**Prompts a question in the terminal, awaits for the input and returns it */
export async function questionAsPromise(question) {
    const readline = getReadLine.createInterface({ input: process.stdin, output: process.stdout });
    const input = await new Promise(res => { readline.question(chalk.magenta(question) + '\n', res); });
    readline.close();
    return input;
}
//TODO: describe me
export function transpileFiles(sourceFiles, outputDirectory) {
    if (!sourceFiles.length) {
        killProcess('transpileFiles\'s sourceFiles argument should NOT be an empty array!');
    }
    colorLog('white', 'Transpiling the following file(s): ' + sourceFiles);
    const command = `tsc --target esnext ${sourceFiles.join(' ')} --outDir ${outputDirectory}`;
    try {
        execSync(command);
    }
    catch {
        doNothing();
    }
    colorLog('white', 'Done transpiling!');
}
/**Check the user input in socket.on functions and send error toasts if the validation fails */
export function zodCheck_socket(socket, schema, data) {
    return zodCheck_curry(errorHandler)(schema, data);
    function caller() {
        return ((getTraceableStack('', 'zodCheck_socket').split('\n') || [])[3]?.match(/at \w{1,}/) || //regexHere
            ['at <unable to identify function caller>'])[0];
    }
    function errorHandler(error) {
        socket.emit('toast', '💀', `${error} - - - (${caller()}, ${{ ...schema._def }})`, 'danger');
    }
}
