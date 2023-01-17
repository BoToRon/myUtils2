import { type SafeParseReturnType, z } from 'zod';
export declare const timers: timer[];
export declare const zValidVariants: any;
declare const zValidNpmCommand_package: any;
declare const zValidNpmCommand_project: any;
/**Generic to get the type of an object/interface while preserving key-value typing */
export type btr_objectEntries<T, amount extends 'plural' | 'single'> = {
    [K in keyof T]: [K, amount extends 'plural' ? T[K][] : T[K]];
}[keyof T];
export type btr_trackedVueComponent = {
    _name: string;
    beforeCreate?: btr_voidFn;
    beforeDestroy?: btr_voidFn;
};
export type btr_zSchema<T> = {
    safeParse: (x: T) => SafeParseReturnType<T, T>;
    strict?: () => btr_zSchema<T>;
};
export type btr_newToastFn = (title: string, message: string, variant: btr_validVariant) => void;
export type btr_nonVoidFn = <F extends (...args: Parameters<F>) => ReturnType<F>>() => unknown;
export type btr_socketEventInfo = {
    event: string;
    timestamp: number;
    data: unknown;
};
export type btr_globalAlert = {
    message: string;
    show: boolean;
};
export type btr_validVariant = z.infer<typeof zValidVariants>;
export type btr_voidFn = () => void;
export type btr_fieldsForColumnOfTable = string | {
    key: string;
    label?: string;
    formatter?: (value: unknown, key: string, item: unknown) => unknown;
    sortable: boolean;
    thStyle?: btr_validVariant;
};
type toastOptions = {
    toaster: string;
    autoHideDelay: number;
    solid: boolean;
    variant: btr_validVariant;
    title: string;
};
type validChalkColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'grey' | 'magentaBright';
type bvToast = {
    toast: (message: string, toastOptions: toastOptions) => void;
};
type bvModal = {
    show: (id: string) => void;
    hide: (id: string) => void;
};
type validNpmCommand_package = z.infer<typeof zValidNpmCommand_package>;
type validNpmCommand_project = z.infer<typeof zValidNpmCommand_project>;
type messageHandler = (message: string) => void;
type arrayPredicate<T> = (arg1: T) => boolean;
type pipe_persistent_type<T> = (arg: T) => T;
type pipe_mutable_type = {
    <T, A>(source: T, a: (value: T) => A): A;
    <T, A, B>(source: T, a: (value: T) => A, b: (value: A) => B): B;
    <T, A, B, C>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C): C;
    <T, A, B, C, D>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D): D;
    <T, A, B, C, D, E>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D, e: (value: D) => E): E;
};
type timer = {
    id: string;
    runAt: number;
    startedAt: number;
    onComplete: btr_nonVoidFn;
    onCancel: btr_nonVoidFn;
    cancelledMessage: string;
    cancelledAt: number;
    isCancelled: boolean;
};
/**(generates a function that..) Creates a new 5-seconds toast in the lower right corner */
export declare function newToast_client_curry($bvToast: bvToast): (title: string, message: string, variant: z.infer<any>) => void;
/**(generates a function that:) Tests data against an scheme, and executes a predefined errorHandler if case it isn't a fit. */
export declare function zodCheck_curry(errorHandler?: messageHandler, strictModeIfObject?: boolean): <T>(schema: btr_zSchema<T>, data: T) => boolean;
/**(generates a function that:) Adds/removes a vue component into the window for easy access/debugging */
export declare function trackVueComponent_curry<T>(zValidVueComponentName: btr_zSchema<T>): (name: T, componentConstructor: btr_trackedVueComponent, window: {
    vueComponents: btr_trackedVueComponent[];
}) => btr_trackedVueComponent;
/**(generates a function that:) Opens/close a bootstrap-vue modal with zod validation */
export declare function triggerModalWithValidation_curry<validModalIds extends string>($bvModal: bvModal): (id: validModalIds, action: 'show' | 'hide') => Promise<void>;
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
export declare function arrayToObject<T extends Readonly<Array<string>>, F extends (...x: (T[number])[]) => ReturnType<F>>(arr: T, mappingFn: F): Record<T[number], ReturnType<F>>;
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
/**@returns a version of the provided array without repeating items */
export declare function getUniqueValues<T>(arr: T[]): T[];
/**@returns whether an item is the last one in an array or not (warning: maybe don't use with primitives) */
export declare function isLastItem<T>(arr: T[], item: T): boolean;
export declare function removeItem<T>(arr: T[], item: T): number;
/**Return the last item of the given array */
export declare function lastItem<T>(arr: T[]): T;
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
/**Set interval with try-catch and called immediately*/
export declare function doAndRepeat(fn: btr_voidFn, interval: number): void;
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
/**Simple and standard functional programming pipe. Deprecated, use either zPipe (persistenType with zod errors) or pipe_mutableType! */
export declare function pipe_persistentType<T>(initialValue: T, ...fns: pipe_persistent_type<T>[]): T;
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
/**tryCatch wrapper for functions with divineError as the default error handler */
export declare function tryF<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, args: Parameters<T>, errorHandler?: messageHandler): ReturnType<T>;
/**
 * Test data against an schema with strict-mode (no unspecified keys) for objects set by default and handle the error message if any
 * @param schema The schema to test the data against
 * @param data The data to be tested
 * @param errorHandler The handler for the message error
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not
 * @returns
 */
export declare function zGetSafeParseResultAndHandleErrorMessage<T>(schema: btr_zSchema<T>, data: T, errorHandler?: messageHandler, strictModeIfObject?: boolean): SafeParseReturnType<T_1, T_1>;
/**
 * Check data against a provided schema, and execute either the success or error handler
 * @param zSchema The zSchema to test data against
 * @param data The data to be tested against zSchema
 * @param successHandler The function that will execute if data fits zSchema
 * @param args The arguments to be applied to successHandler
 * @param errorHandler The function that will execute if data does NOT fits zSchema
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not *
 */
export declare function zodCheckAndHandle<D, SH extends (...args: Parameters<SH>) => ReturnType<SH>>(zSchema: btr_zSchema<D>, data: D, successHandler: SH, args: Parameters<SH>, errorHandler?: messageHandler, strictModeIfObject?: boolean): void;
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
export declare function zPipe<T>(zSchema: btr_zSchema<T>, strictModeIfObject: boolean, initialValue: T, ...fns: pipe_persistent_type<T>[]): {
    value: T;
    error: string;
    failedAt: string;
};
/**Promise-based delay that BREAKS THE LIMIT OF setTimeOut*/
export declare function delay(x: number): Promise<unknown>;
/**Return the time left to make a move in a compacted form and with a variant corresponding to how much of it left */
export declare function getDisplayableTimeLeft(deadline: number): {
    time: string;
    variant: z.infer<any>;
};
/**Formate a timestamp with Intl.DateTimeFormt. Options: short/medium/long (add +hour to include Hour) or hOnly (hour only) */
export declare function formatDate(timestamp: number, language: 'es' | 'en', type: 'hourOnly' | 'short' | 'short+hour' | 'medium' | 'medium+hour' | 'long' | 'long+hour'): string;
/**Self-explanatory */
export declare function isEven(number: number): boolean;
/**Self-explanatory */
export declare function isOdd(number: number): boolean;
/**@returns whether a number is either the minimum provided, the maximum provided or any number in-between */
export declare function isWithinRange(number: number, max: number, min: number): boolean;
/**@returns a number up to (but not included) provided max, eg: roll(1) will ALWAYS return zero */
export declare function roll(maxRoll: number): number;
/**1 becomes '1st' , 2 becomes '2nd', 3 becomes '3rd' and so on */
export declare function toOrdinal(number: number): string;
/**Add all default properties missing in an object*/
export declare function addMissingPropsToObjects<T extends object>(original: T, defaults: Required<T>): Required<T>;
/**Return a copy that can be altered without having to worry about modifying the original */
export declare function deepClone<T>(originalObject: T): T;
/**Generate a Zod Schema from an array/object */
export declare function getZodSchemaFromData(data: unknown): any;
/**Because ESlint doesn't like Object(x).hasOwnProperty :p */
export declare function hasOwnProperty<T extends object>(x: T, key: keyof T): any;
/**Map an object! (IMPORTANT, all values in the object must be of the same type, or mappinFn should be able to handle multiple types) */
export declare function mapObject<F extends (value: O[keyof O]) => ReturnType<F>, O extends object>(object: O, mappingFn: F): { [key in keyof O]: ReturnType<F>; };
/**Object.entries but with proper type-inference */
export declare function objectEntries<T extends object>(object: T): {
    key: keyof T;
    value: T[keyof T];
}[];
/**Object.keys but with proper type-inference */
export declare function objectKeys<T extends object>(object: T): (keyof T)[];
/**Object.values but with proper type-inference */
export declare function objectValues<T extends object>(object: T): T[keyof T];
/**Create an object with only the specified properties of another base object (references are kept) */
export declare function pick<T extends object, K extends keyof T>(theObject: T, properties: ReadonlyArray<K>): Pick<T, K>;
/**Replace the values of an object with those of another that shares the schema*/
export declare function replaceObject<T extends object>(originalObject: T, newObject: T): void;
/**Stringy an array/object so its readable //TODO: (edit so that it doesn't excluse object methods, see deepClone) */
export declare const stringify: {
    (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    (value: any, replacer?: (string | number)[], space?: string | number): string;
};
/**Generator for unique IDs (using Date.now and 'i') that accepts a preffix */
export declare function getUniqueId(suffix: string): string;
/**
 * Create a cancellable timer and add it to btr.timers
 * @param id The id of the timer, so that btr.killTimer can find it
 * @param runAt The date (timestamp) at which "onComplete" should run
 * @param onComplete The function that should run if the timer wasn't cancelled
 * @param onCancel The function that should run if the timer was cancelled via killTimer
 * @returns the return of "onComplete"
 */
export declare function initializeTimer(id: string, runAt: number, onComplete: btr_nonVoidFn, onCancel: btr_nonVoidFn): Promise<unknown>;
/**Kill a timer created with initializeTimer, the reason provided will become a divine stack */
export declare function killTimer(timerId: string, reason: string): Promise<unknown>;
/**console.log... WITH COLORS :D */
export declare function colorLog(color: validChalkColor, message: string): void;
/** Copy to clipboard using the corresponding function for the running enviroment (node/client)*/
export declare function copyToClipboard(x: unknown): void;
/**(Message) 💀 */
export declare function errorLog(message: string): void;
/**TODO: describe me */
export declare function getTraceableStack(error: string | Error): string;
/**@returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export declare function isGuest(username: string): boolean;
/**(Message) ✔️ */
export declare function successLog(message: string): void;
/**@returns an string with its linebreaks converted into simple one-char spaces */
export declare function toSingleLine(sentence: string): string;
/**
 * Compare data B against an schema created from data A
 * @param A The first piece of data
 * @param B The second piece of data
 * @param errorHandler The handler for the message error
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not
 * @returns
 */
export declare function dataIsEqual(A: unknown, B: unknown, errorHandler?: messageHandler, strictModeIfObject?: boolean): SafeParseReturnType<T, T>;
/**For obligatory callbacks */
export declare function doNothing(...args: unknown[]): void;
/** @returns null as the provided type */
export declare function nullAs<T>(): T;
/**Copy to clipboard, objects arrays get stringify'd */
export declare function copyToClipboard_client(x: unknown): void;
/**Stringifies and downloads the provided data*/
export declare function downloadFile_client(filename: string, fileFormat: '.txt' | '.json', data: unknown): void;
/**@deprecated use "formatDate instead" */
export declare function getFormattedTimestamp(): void;
export declare const divine: {
    bot: eris.Client;
    error: (err: string | Error) => void;
    init: Promise<void>;
    ping: (message: string) => Promise<void>;
};
/** Check the version of @botoron/utils, the enviroment variables and various config files */
export declare function basicProjectChecks(errorHandler?: messageHandler): Promise<false | [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, true | [boolean, boolean, boolean, boolean, boolean]]>;
/**FOR NODE-DEBUGGING ONLY. Log a big red message surrounded by a lot of asterisks for visibility */
export declare function bigConsoleError(message: string): void;
/**Copy to clipboard while running node */
export declare function copyToClipboard_server(x: unknown): any;
/**FOR NODE-DEBUGGING ONLY. Stringifies and downloads the provided data*/
export declare function downloadFile_node(filename: string, fileFormat: '.txt' | '.json', data: unknown, killProcessAfterwards: boolean): Promise<void>;
/**Wrapper for fs.promise.readFile that announces the start of the file-reading */
export declare function fsReadFileAsync(filePath: string): Promise<any>;
/**Wrapper for fsWriteFileAsync that announces the start of the file-writing */
export declare function fsWriteFileAsync(filePath: string, content: string): Promise<any>;
/** Get the contents of the project's .env */
export declare function getEnviromentVariables(): z.infer<any>;
/**(Use with Quokka) Create an untoggable comment to separate sections, relies on "_" as a variable */
export declare function getSeparatingCommentBlock(message: string): string;
/**fetch the latest package.json of my-utils */
export declare function getLatestPackageJsonFromGithub(): Promise<string>;
/**It's monging time >:D */
export declare function getMongoClient(): Promise<MongoClient>;
/**Start and return an http Express server */
export declare function getStartedHttpServer(): any;
/**Import modules or jsons */
export declare function importFileFromProject<T>(filename: string, extension: 'cjs' | 'js' | 'json'): Promise<any>;
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export declare function killProcess(message: string): void;
/**Easily run the scripts of this (utils) repo's package.json */
export declare function npmRun_package(npmCommand: validNpmCommand_package): Promise<void>;
/**Run convenient scripts for and from a project's root folder */
export declare function npmRun_project(npmCommand: validNpmCommand_project): Promise<void>;
/**Prompt to submit a git commit message and then push */
export declare function prompCommitMessageAndPush(repoName: string): Promise<void>;
/**Prompts a question in the terminal, awaits for the input and returns it */
export declare function questionAsPromise(question: string): Promise<string>;
export {};
