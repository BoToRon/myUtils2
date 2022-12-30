//TODO: create a way to make sure every project has the same package.json scripts and also create a way to automatize their compilation
const _ = 'prevent imports and comments from collapsing';
_;
import fs from 'fs'; //DELETETHISFORCLIENT
_;
import eris from 'eris'; //DELETETHISFORCLIENT
_;
import path from 'path'; //DELETETHISFORCLIENT
_;
import http from 'http'; //DELETETHISFORCLIENT
_;
import chalk from 'chalk'; //DELETETHISFORCLIENT
_;
import express from 'express'; //DELETETHISFORCLIENT
_;
import fetch from 'node-fetch'; //DELETETHISFORCLIENT
_;
import getReadLine from 'readline'; //DELETETHISFORCLIENT
_;
import { exec } from 'child_process'; //DELETETHISFORCLIENT
_;
import mongodb from 'mongodb'; //DELETETHISFORCLIENT
_;
import { fromZodError } from 'zod-validation-error';
_;
import { z } from 'zod';
const zValidVariants = z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark']);
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
const zValidNpmCommand = z.enum(['git', 'publish', 'transpile']);
const zValidVersionIncrement = z.enum(['major', 'minor', 'patch']); //DELETETHISFORCLIENT
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
/**colorLog.succes with a ✔️ at the end :D */
export const successLog = (message) => colorLog('success', message + ' ✔️');
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
/**
 *This is a SAMPLE, use tryF_get to set tryF_get and use it without having to pass errorHandler everytime
 * @param errorHandler The error handler
 * @param fn The function to try
 * @param args The arguments to apply to the function
 * @returns void
 */
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
        bigConsoleError('downloadFile_client can only be run clientside!');
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
    return JSON.stringify(x);
};
/**FOR CLIENT-SIDE CODE ONLY. Copy anything to the clipboard, objects/arrays get parsed to be readable*/
export const copyToClipboard = (x) => {
    if (isNode) {
        bigConsoleError('copyToClipboard can only be run clientside!');
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
        successLog(`Component '${name}' created and added to window.vueComponents`);
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
        bigConsoleError(error);
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
// ! DELETEEVERYTHINGBELOW, as it is only meant for server-side use
_;
/**FOR NODE-DEBUGGING ONLY. Log a big red message surrounded by a lot of asterisks for visibility */
export const bigConsoleError = (message) => {
    const log = (message) => colorLog('danger', message);
    const logAsterisks = (lines) => { for (let i = 0; i < lines; i++) {
        log('*'.repeat(150));
    } };
    logAsterisks(3);
    log(message);
    logAsterisks(3);
};
/**console.log WITH COLORS :D */
export const colorLog = (variant, message) => {
    const colors = {
        primary: 'blue',
        secondary: 'grey',
        success: 'green',
        warning: 'yellow',
        danger: 'red',
        info: 'cyan',
        light: 'white',
        dark: 'magenta',
        "outline-dark": 'magentaBright'
    };
    const color = chalk[colors[variant]];
    console.log(color.bold(message));
};
/**FOR NODE-DEBUGGING ONLY. Stringifies and downloads the provided data*/
export const downloadFile_node = async (filename, fileFormat, data, killProcessAfterwards) => {
    const formatted = stringify(data);
    const dateForFilename = timeStampToDate(Date.now(), true).replace(/\/| |\:/g, '_');
    const completeFilename = filename + '_' + dateForFilename + fileFormat;
    colorLog('info', `Downloading ${completeFilename}..`);
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
/**fetch the latest package.json of my-utils */
export const getLatestPackageJsonFromGithub = async () => {
    const response = await new Promise((resolve) => {
        fetch('https://api.github.com/repos/botoron/utils/contents/package.json', { method: 'GET' }).then((res) => res.json().then((packageJson) => resolve(packageJson)));
    });
    return Buffer.from(response.content, 'base64').toString('utf8');
};
/**
 * Return the main perma-dependencies, check myUtil's version and print package.json's script
 * @param appName The name of the app, for the divine error ping
 * @param pingMeOnErrors Whether to ping me in Discord with the console.trace of errors or just colorLogBig
 * @param packageJson The package.json of the app, to compare the installed vs latest version of this myUtils package
 * @param ERIS_TOKEN The token for DivineBot, should reside in .env
 * @param MONGO_URI The uri for Mongo, should reside in .env
 * @param PORT The dev port, should reside in .env
 * @returns divineBot, divineError, io, mongoClient, tryF
 */
export const getMainDependencies = async (appName, devOrProd, 
//createRequire: (path: string | URL) => NodeRequire,
packageJson, pingMeOnErrors, ERIS_TOKEN, MONGO_URI, PORT) => {
    const httpServer = startAndGetHttpServer();
    const mongoClient = await getMongoClient();
    const divineBot = await getDivineBot();
    myUtils_checkIfUpToDate(divineError, devOrProd);
    showPackageJsonScripts_project();
    return { divineBot, divineError, httpServer, mongoClient, tryF };
    function checkEnviromentVariable() {
        let x = true;
        check('ERIS_TOKEN', ERIS_TOKEN);
        check('MONGO_URI', MONGO_URI);
        check('PORT', PORT);
        return x;
        function check(name, variable) {
            if (!variable) {
                bigConsoleError(`Missing enviroment variable: ${name}`);
                x = false;
            }
        }
    }
    /**notify me about things breaking via discord, if pingMeOnErrors is passed as true */
    function divineError(arg) {
        const x = (typeof arg === 'string' ? arg : arg.stack);
        const error = `${x}`.replace(/\(node:3864\).{0,}\n.{0,}exit code./, '');
        if (pingMeOnErrors) {
            colorLog('danger', error);
            return;
        }
        pingMe(error);
    }
    async function getDivineBot() {
        const divineBot = eris(ERIS_TOKEN);
        connectToDiscord();
        return divineBot;
        async function connectToDiscord() {
            const divinePrepend = '***DivineBot:***';
            divineBot.on('messageReactionAdd', (a, b, c) => role('add', a, b, c));
            divineBot.on('messageReactionRemove', (a, b, c) => role('remove', a, b, c));
            divineBot.on('disconnect', () => { colorLog('danger', `${divinePrepend}: Disconnected D: ... retrying!`); connectToDiscord(); });
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
                    divineBot.connect();
                    colorLog('info', 'waiting for DivineBot');
                    while (!divineBot.ready) {
                        await delay(1000);
                    }
                    successLog("The divine egg has hatched");
                    pingMe('im alive bitch');
                }
                catch {
                    colorLog('warning', `${divinePrepend} Failed to connect.. retrying >:D`);
                    await delay(1000 * 10);
                    attemptConnection();
                }
            }
        }
    }
    async function getMongoClient() {
        const mongo = new mongodb.MongoClient(MONGO_URI);
        let mongoClient = null;
        mongo.connect((err, client) => { if (err) {
            throw err;
        } mongoClient = client; });
        colorLog('info', 'waiting for Mongo');
        while (!mongoClient) {
            await delay(500);
        }
        successLog("It's Monging time >:D");
        return mongoClient;
    }
    function pingMe(message) {
        const theMessage = `<@470322452040515584> - (${appName}) \n ${message}`;
        const divineOptions = { content: theMessage, allowedMentions: { everyone: true, roles: true } };
        divineBot.createMessage('1055939528776495206', divineOptions);
    }
    /**console table the scripts of the project's package json
     //TODO: maybe validate them too? (as in, should be npm run start/dev/transpile/installUtils ?
     //TODO: maybe make a version for my utils? (how hard is it to just open package.json lol)
     */
    async function showPackageJsonScripts_project() {
        const margin = ' '.repeat(10);
        const data = Object.entries(packageJson.scripts).map(x => ({ script: `${margin}npm run ${x[0]}${margin}`, command: x[1] }));
        console.table(data);
    }
    function startAndGetHttpServer() {
        const app = express();
        const httpServer = http.createServer(app);
        app.use(express.static(path.resolve() + '/public'));
        app.get('/', (_request, response) => response.sendFile(path.resolve() + '/public/index.html'));
        httpServer.listen(PORT, () => delay(1500).then(() => console.log(`server up at: http://localhost:${PORT}/`)));
        return httpServer;
    }
    /**tryCatch wrapper for functions with DivineError as the error handler */
    function tryF(fn, args) {
        try {
            return fn(...args);
        }
        catch (err) {
            divineError(err);
        }
    }
};
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export const killProcess = async (message) => {
    bigConsoleError(message);
    process.exit();
};
/**
 * @description Checks if the project is using the latest version of "myUtils"
 * @param failureHandler divineError, to notify/warm me to update the project to work with the latest version of "utils"
 * @returns a boolean, although I'm not sure what I should it for (if for anything) yet
 */
export async function myUtils_checkIfUpToDate(errorHandler, devOrProd) {
    const latestVersion = await getLatestVersion();
    const installedVersion = (await import('./package.json', { assert: { type: "json" } })).default.version;
    const isUpToDate = installedVersion === latestVersion;
    if (!isUpToDate) {
        errorHandler(getFailureMessage());
    }
    else {
        colorLog('info', '@botoron/my-utils is up to date 👍');
    }
    return isUpToDate;
    function getFailureMessage() {
        return toSingleLine(`
	Project is using an outdated version of myUtils, 
	- (${installedVersion} vs ${latestVersion}) -
	PLEASE UPDATE:          npm i @botoron/my-utils`);
    }
    async function getLatestVersion() {
        const response = (await new Promise((resolve) => {
            try {
                fetch(`http://registry.npmjs.com/-/v1/search?text=@botoron/utils&size=1`).
                    then(res => res.json().then((x) => resolve(x)));
            }
            catch {
                return { objects: [{ package: { version: '0' } }] };
            }
        }));
        return response.objects[0].package.version;
    }
}
/**Easily run the scripts of this (utils) repo's package.json */
export const npmRun = async (npmCommand) => {
    const utilsRepoName = 'Utils 🛠️';
    if (npmCommand === 'transpile') {
        transpileFiles(() => colorLog('dark', 'Process over'));
    }
    if (npmCommand === 'git') {
        prompCommitMessageAndPush(utilsRepoName);
    }
    if (npmCommand === 'publish') {
        transpileFiles(promptVersioning);
    }
    async function promptVersioning() {
        function tryAgain(error) { colorLog('warning', error); promptVersioning(); }
        const versionIncrement = await questionAsPromise('Type of package version increment (major, minor, patch)?');
        if (!zodCheck_sample(tryAgain, zValidVersionIncrement, versionIncrement)) {
            return;
        }
        await prompCommitMessageAndPush(utilsRepoName);
        exec(`npm version ${versionIncrement}`, (err, stdout, stderr) => {
            console.log({ stdout });
            successLog('package.json up-version\'d');
        });
    }
    function transpileFiles(followUp) {
        const filename = 'index.ts';
        exec('tsc --declaration --target esnext ' + filename, async () => {
            successLog(filename + ' transpiled');
            const indexTs = await fsReadFileAsync(filename);
            const lines = indexTs.replaceAll('bigConsoleError', 'colorLog').split('\n');
            selfFilter(lines, (line) => !/DELETETHISFORCLIENT/.test(line));
            const cutPoint = lines.findIndex(x => /DELETEEVERYTHINGBELOW/.test(x));
            lines.splice(cutPoint, lines.length);
            lines.push('const colorLog = (color: string, message: string) => console.log(`%c${message}`, `color: ${color};`)');
            await fsWriteFileAsync(`./client/${filename}`, lines.join('\n'));
            exec('tsc --declaration --target esnext client/index.ts ', async () => {
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
    function tryAgain(error) { colorLog('warning', error); prompCommitMessageAndPush(repoName); return; }
    if (!zodCheck_sample(tryAgain, get_zValidCommitMessage(), commitMessage)) {
        return;
    }
    await gitAddCommitPush();
    function get_zValidCommitMessage() {
        const commitRegex = new RegExp(`(?<!.)${commitTypes}:`);
        return z.string().min(15).max(50).regex(commitRegex, `String must start with ${commitTypes}:`);
    }
    function gitAddCommitPush() {
        return new Promise(resolve => {
            exec('git add .', () => {
                successLog('git add .');
                colorLog('info', 'Copypaste the commit message in the git commit editor, then save and CLOSE it:');
                colorLog('secondary', commitMessage);
                console.log('');
                exec("git commit", () => {
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
            colorLog('warning', '50-character limits ends at that line: * * * * * |');
            colorLog('success', repoName);
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
/**
 * How to access process arguments passed by the command line:
    pass:	--[NoA_1]=[VoA_1] --[NoA_2]=[VoA_2]
    read: process.env.[npm_config_[nameOfArgument]]
*/
/*
 * Regarding passing a function with its arguments to another function
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
const btrCommand = process.env.npm_config_btrCommand;
if (btrCommand) {
    zodCheckAndHandle(zValidNpmCommand, btrCommand, npmRun, [btrCommand], console.log);
}
