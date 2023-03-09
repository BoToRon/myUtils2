import { Socket } from 'socket.io';
import { btr_adminFetch, btr_fieldsForColumnOfTable, btr_globalAlert, btr_language, btr_newToastFn, btr_socketEventInfo, btr_trackedVueComponent, btr_validVariant, btr_bvModal, cachedFile, maybePromise, nullable, recordOfCommands, timer, validMongoCollection, zSchema } from './types.js';
import { zValidVariants } from './constants.js';
import { z } from 'zod';
export { btr_adminFetch, btr_bvModal, btr_fieldsForColumnOfTable, btr_globalAlert, btr_language, btr_newToastFn, btr_socketEventInfo, btr_trackedVueComponent, btr_validVariant, nullable, recordOfCommands, zValidVariants };
type validChalkColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'grey' | 'magentaBright';
type vueComponentsTracker<T extends string> = Record<T, btr_trackedVueComponent[]>;
type messageHandler = (message: string) => void;
type arrayPredicate<T> = (arg1: T) => boolean;
type pipe_persistent_type<T> = (arg: T) => T;
type warningsCount = {
    count: number;
};
type bvToast = {
    toast: (message: string, toastOptions: {
        variant: btr_validVariant;
        autoHideDelay: number;
        toaster: string;
        solid: boolean;
        title: string;
    }) => void;
};
type pipe_mutable_type = {
    <T, A>(source: T, a: (value: T) => A): A;
    <T, A, B>(source: T, a: (value: T) => A, b: (value: A) => B): B;
    <T, A, B, C>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C): C;
    <T, A, B, C, D>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D): D;
    <T, A, B, C, D, E>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D, e: (value: D) => E): E;
};
/**Adds an item to an array, or removes it if it already was added. Returns the array and the action applied */
export declare function addOrRemoveItem<T>(arr: T[], item: T): {
    action: "removed" | "added";
    arr: T[];
};
/**Adds an item to an array, or replaces the first one if found. WARNING: make sure the predicate can only find ONE item */
export declare function addOrReplaceItem<T>(arr: T[], newItem: T, predicate: arrayPredicate<T>): void;
/**Add to arrayA items from array B that it doesn't already have */
export declare function addUnrepeatedItems<T>(arr: T[], newItems: T[]): T[];
/**
 * @param arr The array (tuple) of strings that each will become a key
 * @param mappingFn The function to determine the value of each entry
 * @returns An object where each key is an item of "arr" and the value is determined by "mappingFn"
 */
export declare function arrayToObject<T extends Readonly<string[]>, F extends (...x: (T[number])[]) => ReturnType<F>>(arr: T, mappingFn: F): Record<T[number], ReturnType<F>>;
/**Converts an array of primitives into a comma-separated list, the word "and" being optional before the last item */
export declare function asFormattedList(arr: (string | number | boolean)[], useAndForTheLastItem: boolean): string;
/**Return an array of sub-arrays with the items of the passed array, where each sub-array's max lenght is the passed size*/
export declare function chunk<T>(arr: T[], chunkSize: number): T[][];
/**Compare array A to array B and return the details */
export declare function compareArrays<T>(baseArray: T[], testArray: T[]): {
    arraysAreEqual: boolean;
    arraysHaveTheSameItems: boolean;
    lengthDifference: number;
    missingItems: T[];
    nonDesiredItems: T[];
};
/**syntax sugar for arr[arr.length - 1] */
export declare function getLastItem<T>(arr: T[]): T;
/**@returns a random item along its index */
export declare function getRandomItem<T>(arr: T[]): {
    item: T;
    index: number;
};
/**getRandomItem, but each items has custom chances to be selected */
export declare function getRandomItem_withCustomChances<T>(items: T[], chancesDefininingFunction: (item: T) => number): T;
/**@returns a version of the provided array without repeating items */
export declare function getUniqueValues<T>(arr: T[]): T[];
/**@returns whether an item is the last one in an array or not (warning: maybe don't use with primitives) */
export declare function isLastItem<T>(arr: T[], item: T): boolean;
/**Return the last item of the given array */
export declare function lastItem<T>(arr: T[]): T;
/**Apply multiple mapping functions to a single array at once and return an object with all the result */
export declare function multiMap<T, F1 extends (x: T) => ReturnType<F1>, F2 extends (x: T) => ReturnType<F2>, F3 extends (x: T) => ReturnType<F3>, F4 extends (x: T) => ReturnType<F4>, F5 extends (x: T) => ReturnType<F5>>(arr: T[], f1: F1, f2: F2, f3?: F3, f4?: F4, f5?: F5): {
    map1: ReturnType<F1>[];
    map2: ReturnType<F2>[];
    map3: ReturnType<F3>[];
    map4: ReturnType<F4>[];
    map5: ReturnType<F5>[];
};
export declare function removeItem<T>(arr: T[], item: T): number;
/**
 * Map an array, and filter-out the items that weren't fit
 * see filterMap for a faster (single rather than double loop) but more complex version)
 */
export declare function safeMap<T, F extends (x: T) => ReturnType<F>>(arr: T[], mapFn: F): T[];
/**Remove items from an array that DONT fulfill the given condition, returns the removed items and their amount */
export declare function selfFilter<T>(arr: T[], predicate: arrayPredicate<T>): {
    removedItems: T[];
    removedCount: number;
};
/**Sort an array of numbers either upwards (A-scending) or downwards (D-escending)*/
export declare function sortNumbers(numbers: number[], direction: 'A' | 'D'): number[];
/**Randomizes the order of the items in the array */
export declare function shuffle<T>(arr: T[]): T[];
/**Sort an array alphabetically, optionally backwards */
export declare function sortAlphabetically<T extends string>(arr: T[], reverseArr?: boolean): T[];
/**Sort an array of objects based on the value a property. A: Ascending, D: Descesding. Chainable */
export declare function sortBy<T extends object, pars extends [keyof T, 'A' | 'D']>(arr: T[], keyWithDir: pars, ...extraKeysWithDir: pars[]): T[];
/** */
/**syntactic sugar for selfFilter(arr, predicate).removedItems */
export declare function spliceIf<T>(arr: T[], predicate: arrayPredicate<T>): T[];
/**Remove X amount of items from the end of an array */
export declare function spliceLast<T>(arr: T[], count: number): T[];
/**Transfer items that meet a given condition from one array to another */
export declare function transferItems<T>(origin: T[], destination: T[], predicate: arrayPredicate<T>): {
    transferedCount: number;
};
export declare function asyncForEach<T>(array: T[], resolveSequentially: boolean, asyncFn: (item: T) => Promise<unknown>): Promise<void>;
export declare function allPromises<T, returnType>(array: T[], asyncFn: (item: T, index?: number) => Promise<returnType>): Promise<returnType[]>;
/**Set interval with try-catch and call it immediately*/
export declare function doAndRepeat(fn: () => void, interval: number): void;
/**
 * Filter and map an array in a single loop
 * @param arr The array to be filterMap'd
 * @param filter Function that returns the answer and a carryover value for "mapFn" if needed
 * @param mapFn The function to apply to each item of the array, and possibly to each carryover from "filter"
 * @returns The provided array, filtered and mapped
 */
export declare function filterMap<T, C, M extends (x: T, y: C) => ReturnType<M>>(arr: T[], filter: (arg: T) => {
    answer: boolean;
    carryOver: C;
}, mapFn: M): ReturnType<M>[];
/**
* Pipes a value through a number of functions in the order that they appear.
* Takes between 1 and 12 arguments. `pipe(x, a, b)` is equivalent to `b(a(x))`.
* If only one argument is provided (`pipe(x)`), this will produce a type error but JS will run fine (and return `x`).
*/
export declare const pipe_mutableType: pipe_mutable_type;
/**
 * Retry a function up to X amount of times or until it is executed successfully, mainly for fetching/requesting stuff
 * @param fn The function to be retried hoping it returns successfully
 * @param args Arguments to pass to fn
 * @param retriesLeft Number, is reduced by 1 every attempt, retryF stops when it reaches 0
 * @param defaultReturn Data to be returned as returnType of fn if retryF fails
 * @param delayBetweenRetries Delay between each retry in milliseconds
 * @returns
 */
export declare function retryF<F extends (...args: Parameters<F>) => ReturnType<F>>(fn: F, args: Parameters<F>, retriesLeft: number, defaultReturn: ReturnType<F>, delayBetweenRetries: number): Promise<{
    data: ReturnType<F>;
    was: 'success' | 'failure';
}>;
/**Promise-based delay that BREAKS THE LIMIT OF setTimeOut*/
export declare function delay(x: number): Promise<unknown>;
/**Return the time left to make a move in a compacted form and with a variant corresponding to how much of it left */
export declare function getDisplayableTimeLeft(deadline: number): {
    time: string;
    variant: z.infer<any>;
};
/**
 *Formate a timestamp with Intl.DateTimeFormt. Options: short/medium/long (add +hour to include Hour) or hOnly (hour only)
 @param timestamp //The timestamp to be converted to a readable date/hour
 @param language //Either english or spanish formatting and month-naming
 @param type The type of formatting to be applied.
 @example
 //can also do hourOnly or "+hour" to add the hour at the end
 { short: '01/01/23', medium: 'Jan 01, 2023', long: 'January 01, 2023' }
 */
export declare function formatDate(timestamp: number, language: btr_language, type: 'hourOnly' | 'short' | 'short+hour' | 'medium' | 'medium+hour' | 'long' | 'long+hour'): string;
/**Self-explanatory */
export declare function isEven(number: number): boolean;
/**Self-explanatory */
export declare function isOdd(number: number): boolean;
/**@returns whether a number is either the minimum provided, the maximum provided or any number in-between */
export declare function isWithinRange(number: number, max: number, min: number): boolean;
/**Math.max and Math.min merged into one */
export declare function mathMaxMin(max: number, min: number, number: number): number;
/**@returns a number up to (but not included) provided max, eg: roll(1) will ALWAYS return zero */
export declare function roll(maxRoll: number): number;
/**Convert duration as a timestamp to clock format (xx:xx:xx.xxx) with selectable amount of decimals */
export declare function toClockDuration(timestamp: number, decimalAfterSeconds: 0 | 1 | 2 | 3): string;
/**1 becomes '1st' , 2 becomes '2nd', 3 becomes '3rd' and so on */
export declare function toOrdinal(number: number): string;
/**Add all default properties missing in an object*/
export declare function addMissingPropsToObjects<T extends object>(original: T, defaults: Required<T>): Required<T>;
/**Console log an object to its full depth */
export declare function consoleLogFull(data: unknown): void;
/**Return a copy that can be altered without having to worry about modifying the original */
export declare function deepClone<T extends object>(originalObject: T): T;
/**Generator for unique IDs (using Date.now and 'i') that accepts a preffix */
export declare function getUniqueId(suffix: string): string;
/**Because ESlint doesn't like Object(x).hasOwnProperty :p */
export declare function hasOwnProperty<T extends object>(x: T, key: keyof T): any;
/**Map an object! (IMPORTANT, all values in the object must be of the same type, or mappinFn should be able to handle multiple types) */
export declare function mapObject<F extends (value: O[keyof O]) => ReturnType<F>, O extends object>(object: O, mappingFn: F): { [key in keyof O]: ReturnType<F>; };
/**Object.Prototype.entries but with proper type-inference */
export declare function objectEntries<T extends object>(object: T): {
    key: keyof T;
    value: T[keyof T];
}[];
/**Object.keys but with proper type-inference */ export declare function objectKeys<K extends string, T extends Record<K, unknown>>(object: T): (keyof T)[];
/**Object.Prototype.values but with proper type-inference */
export declare function objectValues<T extends object>(object: T): T[keyof T];
/**Create an object with only the specified properties of another base object (references are kept) */
export declare function pick<T extends object, K extends keyof T>(theObject: T, properties: Readonly<K[]>): Pick<T, K>;
/**Replace the values of an object with those of another that shares the schema*/
export declare function replaceObject<K extends keyof T, T extends Record<K, unknown>>(originalObject: T, newObject: T): void;
/**Stringy an array/object so its readable //TODO: (edit so that it doesn't excluse object methods, see deepClone) */
export declare function stringify<T extends object>(object: T): string;
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
export declare function initializeInterval<eachF extends () => maybePromise<ReturnType<eachF>>, cancelF extends () => maybePromise<ReturnType<cancelF>>>(id: string, intervalInMs: number, stayAliveChecker: () => maybePromise<boolean>, onEach: eachF, onKill: cancelF, timesRanSucessfully: number): Promise<timer & {
    timesRanSucessfully: number;
    wasCancelled: true;
}>;
/**
 * Set a cancellable timer that runs at the specified time
 * @param id The id of the timer, so that btr.killTimer can find it
 * @param runAt The date (timestamp) at which "onComplete" should run
 * @param onComplete The function that should run if the timer wasn't cancelled
 * @param onCancel The function that should run if the timer was cancelled via killTimer
 * @returns the return of "onComplete" if it was completed, or all info revelant to cancellation along with the value of "onCancel"
 */
export declare function initializeTimer<completeF extends () => maybePromise<ReturnType<completeF>>, cancelF extends () => maybePromise<ReturnType<cancelF>>>(id: string, runAt: number, onComplete: completeF, onCancel: cancelF): Promise<timer>;
/**Kill a timer created with initializeTimer/Interval, the reason provided will become a divine stack */
export declare function killTimer(timerId: string, reason: string): Promise<timer>;
/**Add an "S" to the end of a noun if talking about them in plural based on the amount passed */
export declare function asSingularOrPlural(noun: string, amount: number): string;
/**Log a big red message surrounded by a lot of asterisks for visibility */
export declare function bigConsoleError(message: string): void;
/**console.log... WITH COLOURS :D */ export declare function colorLog(color: validChalkColor, message: string): void;
/**(Message) 💀 */
export declare function errorLog(message: string): void;
export declare function getTraceableStack(error: string | Error, type: 'debugLog' | 'divineError' | 'killTimer' | 'zodCheck_socket'): string;
/**@returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export declare function isGuest(username: string): boolean;
/**To know when files are fired and in what order  */
export declare function logInitialization(filename: string): void;
/**(Message) ✔️ */
export declare function successLog(message: string): void;
/**@returns an string with its linebreaks converted into simple one-char spaces */
export declare function toSingleLine(sentence: string): string;
export declare function safeRegexMatch(theString: string, theRegex: RegExp, wantedIndex: number): string;
/**Return an string with X amount of (character) as margin per side */
export declare function surroundedString(string: string, margin: string, perSide: number): string;
/**Copy content to the clipboard, works for both client and server side */
export declare function copyToClipboard(x: unknown): void;
/**
 * Compare data B against an schema created from data A
 * @param A The first piece of data
 * @param B The second piece of data
 * @param errorHandler The handler for the message error
 * @returns
 */
export declare function dataIsEqual(A: unknown, B: unknown, errorHandler?: messageHandler): SafeParseReturnType<T, T>;
/**For obligatory callbacks */
export declare function doNothing(...args: unknown[]): void;
/**Margin to make reading logs easier */
export declare function logEmptyLine(): void;
/** @returns null, as the provided type */
export declare function nullAs<T>(): T;
/**
 * Test data against an schema with strict-mode on (no unspecified keys) for objects and handle the error message if any
 * @param schema The schema to test the data against
 * @param data The data to be tested
 * @param errorHandler The handler for the message error
 * @returns
 */
export declare function zGetSafeParseResultAndHandleErrorMessage<T>(schema: zSchema<T>, data: T, errorHandler?: messageHandler): SafeParseReturnType<T_1, T_1>;
/**Dynamically generate a Zod Schema from an array/object */
export declare function zGetSchemaFromData(data: unknown): any;
/**(generates a function that:) Tests data against an scheme, and executes a predefined errorHandler in case it isn't a fit. */
export declare function zodCheck_curry(errorHandler: messageHandler): <T>(schema: zSchema<T>, data: T) => any;
/**Simple zodCheck without any kind of error handler */
export declare function zodCheck_simple<T>(schema: zSchema<T>, data: T): any;
/**
 * Check data against a provided schema, and execute either the success or error handler
 * @param zSchema The zSchema to test data against
 * @param data The data to be tested against zSchema
 * @param successHandler The function that will execute if data fits zSchema
 * @param args The arguments to be applied to successHandler
 * @param errorHandler The function that will execute if data does NOT fits zSchema
 */
export declare function zodCheckAndHandle<D, SH extends (...args: Parameters<SH>) => ReturnType<SH>>(zSchema: zSchema<D>, data: D, successHandler: SH, args: Parameters<SH>, errorHandler: messageHandler): void;
/**
 * Pipe with schema validation and basic error tracking/handling
 * @param zSchema The schema that must persist through the whole pipe
 * @param initialValue The value/object that will be piped through the functions
 * @param fns The functions that will conform the pipe in order
 * @returns
 */
export declare function zPipe<T>(zSchema: zSchema<T>, initialValue: T, ...fns: pipe_persistent_type<T>[]): {
    value: T;
    error: string;
    failedAt: string;
};
/**Zod's "record", but all keys are Required instead of Optional as it is the default */
export declare function zRecord<T extends z.ZodTypeAny, K extends string>(keys: Readonly<K[]>, schema: T): any;
/**
 * Return the regex given with possibly an error indicating it wasn't matched.
 * MUST BE USED AS A SPREAD ARGUMENT, eg: zString.regex( ...zRegexGenerator(/hi/, false) )
 * @param regex The regex to get the error message from
 * @param exactPhrase If true, it will return an error if there's anything before or after the match
 * @returns Arguments for zod's regex string method (theRegex, theErrorMesssage)
 */
export declare function zRegexGenerator(regex: RegExp, exactPhrase: boolean): [RegExp, string];
/**Log every socket.io event with the data received for debugging purposes */
export declare function clientSocketLogOnAny(useStore: () => ({
    socketEvents: btr_socketEventInfo[];
    socket: {
        onAny: (arg0: (eventName: string, ...args: unknown[]) => void) => void;
    };
})): void;
/**Stringify and download the provided data */
export declare function downloadFile(filename: string, fileFormat: '.txt' | '.json', data: unknown): Promise<void>;
/**
 * Register into the window's a finder and logger of all vue components, including the main instance and pinia store
 * @example getAppLog(window as never, useStore) //at the bottom of store.ts
 */
export declare function getAppLog<T extends string, useStoreT extends () => btr_trackedVueComponent>(window: {
    appLog: () => {
        store: {
            [x: string]: () => void;
        };
    };
    vueComponents: vueComponentsTracker<T>;
}, useStore: useStoreT): void;
/**localStorage, but better */
export declare function getLocalStorageAndSetter<T extends Record<string, unknown>>(defaults: T): {
    myLocalStorage: T;
    localStorageSet: <K extends keyof T>(key: K, value: T[K]) => void;
};
/**(generates a function that..) Creates a new 5-seconds toast in the lower right corner */
export declare function newToast_client_curry($bvToast: bvToast): (title: string, message: string, variant: z.infer<any>) => void;
/**Add/remove a vue component to the window for easy access/debugging */
export declare function trackVueComponent<T extends string>(name: T, component: btr_trackedVueComponent, window: {
    vueComponents: vueComponentsTracker<T>;
}): void;
export declare function triggerModal(useStore: () => {
    bvModal: btr_bvModal;
}, id: string, action: 'show' | 'hide'): Promise<void>;
/**@deprecated use "copyToClipboardr" instead */
export declare function copyToClipboard_client(): void;
/**@deprecated use "copyToClipboardr" instead */
export declare function copyToClipboard_server(): void;
/**@deprecated use "doAndRepeat" instead */
export declare function doAndRepeat_server(): void;
/**@deprecated use "formatDate" instead */
export declare function getFormattedTimestamp(): void;
/**@deperecated use "mongoClient" instead */
export declare function getMongoClient(a: unknown): void;
/** @deprecated use either zPipe (persistenType with zod errors) or pipe_mutableType! */
export declare function pipe_persistentType(): void;
/**@deprecated use "trackVueComponent" instead */
export declare function trackVueComponent_curry(): void;
/**@deprecated use "triggerModal" instead */
export declare function triggerModalWithValidation_curry(): void;
/**@deprecated use "divine.try" instead */
export declare function tryF(): void;
export declare const divine: {
    bot: eris.Client;
    error: (err: string | Error) => void;
    init: void;
    ping: (message: string) => maybePromise<void>;
    try: <T extends (...args: Parameters<T>) => maybePromise<ReturnType<T>>>(fn: T, args: Parameters<T>) => Promise<ReturnType<T>>;
};
export declare const mongoClient: MongoClient;
export declare function mongo_collection(collectionName: validMongoCollection): any;
/**Get an array with all the items in a Mongo Collection*/
export declare function mongo_getEntireCollection<T>(collectionName: validMongoCollection): Promise<T[]>;
/**Get an array with X amount of sample items in a Mongo collection */
export declare function mongo_getSample<T>(collectionName: validMongoCollection, maxAmountOfItems: number): Promise<T[]>;
export declare function mongo_replaceEntireCollection(collectionName: validMongoCollection, newDataForCollection: unknown[]): Promise<void>;
/**Basically custom ESlint warnings */
export declare function checkCodeThatCouldBeUpdated(cachedFiles: cachedFile[], warningsCount: warningsCount): void;
/**Check if a file in the provided filepath exists */
export declare function checkFileExists(path: string): Promise<boolean>;
export declare function checkNoBtrErrorsOrWarnings(errors: string[], warningsCount: warningsCount): boolean;
/**Wrapper for fs.promise.readFile that announces the start of the file-reading */
export declare function fsReadFileAsync(filePath: string): Promise<string>;
/**Wrapper for fsWriteFileAsync that announces the start of the file-writing */
export declare function fsWriteFileAsync(filePath: string, content: string): Promise<void>;
/**Batch-load files for checking purposes */
export declare function getCachedFiles(errors: string[], filepaths: string[]): Promise<cachedFile[]>;
export declare function getContentOfPackageJson(): Promise<string>;
/**For a project's debugging purposes */
export declare function getDebugOptionsAndLog<K extends string>(devOrProd: 'dev' | 'prod', options: Record<K, [boolean, boolean]>): {
    debugOptions: Record<K, [boolean, boolean]> extends infer T extends object ? { [key in keyof T]: boolean; } : never;
    debugLog: <T_1 extends object>(debugKey: K, error: T_1) => void;
};
/** Get the contents of the project's .env */
export declare function getEnviromentVariables(): z.infer<any>;
/**Get all the file and folders within a folder, stopping at predefined folders (assets, git, node_modules, test) */
export declare function getFilesAndFoldersNames(directory: string, extension: nullable<'.ts' | '.vue'>): string[];
/**fetch the latest package.json of myUtils */
export declare function getLatestPackageJsonFromGithub(): Promise<string>;
/**(Use with Quokka) Create an untoggable comment to separate sections, relies on "_" as a variable */
export declare function getSeparatingCommentBlock(message: string): string;
/**Start and return an http Express server */
export declare function getStartedHttpServer(): any;
/**Import modules or jsons */
export declare function importFileFromProject<T>(filename: string, extension: 'cjs' | 'js' | 'json'): Promise<any>;
export declare function isMyUtilsPackage(): Promise<boolean>;
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export declare function killProcess(message: string): void;
export declare function mapCommandsForInquirePrompt<T extends string>(commands: recordOfCommands<T>): Record<string, () => maybePromise<unknown>>;
/**Prompts a question in the terminal, awaits for the input and returns it */
export declare function questionAsPromise(question: string): Promise<string>;
/**Check the user input in socket.on functions and send error toasts if the validation fails */
export declare function zodCheck_socket<T>(socket: Socket, schema: zSchema<T>, data: T): any;
