/// <reference types="node" />
import { type SafeParseReturnType, z } from 'zod';
export declare const zValidVariants: any;
export type btr_trackedVueComponent = {
    _name: string;
    beforeCreate?: btr_voidFn;
    beforeDestroy?: btr_voidFn;
};
export type btr_newToastFn = (title: string, message: string, variant: btr_validVariant) => void;
export type btr_socketEventInfo = {
    event: string;
    timestamp: number;
    data: unknown;
};
export type btr_intervalWithId = {
    id: string;
    interval: NodeJS.Timer;
};
export type btr_globalAlert = {
    message: string;
    show: boolean;
};
export type btr_validVariant = z.infer<typeof zValidVariants>;
export type btr_voidFn = () => void;
type toastOptions = {
    toaster: string;
    autoHideDelay: number;
    solid: boolean;
    variant: btr_validVariant;
    title: string;
};
type validChalkColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'grey' | 'magentaBright';
type zSchema<T> = {
    safeParse: (x: T) => SafeParseReturnType<T, T>;
    strict?: () => zSchema<T>;
};
type bvToast = {
    toast: (message: string, toastOptions: toastOptions) => void;
};
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
/**(generates a function that..) Creates a new 5-seconds toast in the lower right corner */
export declare const newToast_client_curry: ($bvToast: bvToast) => btr_newToastFn;
/**(generates a function that:) Tests data against an scheme, and executes a predefined errorHandler if case it isn't a fit. */
export declare const zodCheck_curry: (errorHandler?: messageHandler, strictModeIfObject?: boolean) => <T>(schema: zSchema<T>, data: T) => boolean;
/**(generates a function that:) Adds/removes a vue component into the window for easy access/debugging */
export declare const trackVueComponent_curry: <T>(zValidVueComponentName: zSchema<T>) => (name: T, componentConstructor: btr_trackedVueComponent, window: {
    vueComponents: btr_trackedVueComponent[];
}) => btr_trackedVueComponent;
export declare const divine: {
    bot: eris.Client;
    error: (err: string | Error) => Promise<void>;
    init: Promise<void>;
    ping: (message: string) => Promise<void>;
};
/**Adds an item to an array, or removes it if it already was added. Returns the action applied and the array */
export declare const addOrRemoveItem: <T>(arr: T[], item: T) => {
    action: "removed" | "added";
    arr: T[];
};
/**Adds an item to an array, or replaces the first one if found. WARNING: make sure the predicate can only find ONE item */
export declare const addOrReplaceItem: <T>(arr: T[], newItem: T, predicate: arrayPredicate<T>) => void;
/**Converts an array of primitives into a comma-separated list, the word "and" being optional before the last item */
export declare const asFormattedList: (arr: (string | number | boolean)[], useAndForTheLastItem: boolean) => string;
/**Return an array of sub-arrays with the items of the passed array, where each sub-array's max lenght is the passed size*/
export declare function chunk<T>(arr: T[], chunkSize: number): T[][];
/**Compare array A to array B and return the details */
export declare const compareArrays: <T>(baseArray: T[], testArray: T[]) => {
    arraysAreEqual: boolean;
    arraysHaveTheSameItems: boolean;
    lengthDifference: number;
    missingItems: T[];
    nonDesiredItems: T[];
};
/**syntax sugar for arr[arr.length - 1] */
export declare const getLastItem: <T>(arr: T[]) => T;
/**Returns a random item along its index */
export declare const getRandomItem: <T>(arr: T[]) => {
    item: T;
    index: number;
};
/**Returns a version of the provided array without repeating items */
export declare const getUniqueValues: <T>(arr: T[]) => T[];
/**Returns whether an item is the last one in an array or not (warning: maybe don't use with primitives) */
export declare const isLastItem: <T>(arr: T[], item: T) => boolean;
/**Remove a single item from an array, or all copies of that item if its a primitive value */
export declare const removeItem: <T>(arr: T[], item: T) => number;
/**Return the last item of the given array */
export declare const lastItem: <T>(arr: T[]) => T;
/**Remove items from an array that DONT fulfill the given condition, returns the removed items and their amount */
export declare const selfFilter: <T>(arr: T[], predicate: arrayPredicate<T>) => {
    removedItems: T[];
    removedCount: number;
};
/**Randomizes the order of the items in the array */
export declare const shuffle: <T>(arr: T[]) => T[];
/**Sort an array of objects based on the value a property. A: Ascending, D: Descesding  */
export declare const sortBy: <T extends object>(arr: T[], key: keyof T, direction: 'A' | 'D') => T[];
/**syntactic sugar for selfFilter(arr, predicate).removedItems */
export declare const spliceIf: <T>(arr: T[], predicate: arrayPredicate<T>) => T[];
/**Remove X amount of items from the end of an array */
export declare const spliceLast: <T>(arr: T[], count: number) => T[];
/**Transfer items that meet a given condition from one array to another */
export declare const transferItems: <T>(origin: T[], destination: T[], predicate: arrayPredicate<T>) => {
    transferedCount: number;
};
/**Set interval with try-catch and called immediately*/
export declare const doAndRepeat: (fn: btr_voidFn, interval: number) => void;
/**Simple and standard functional programming pipe. Deprecated, use either zPipe (persistenType with zod errors) or pipe_mutableType! */
export declare const pipe_persistentType: <T>(initialValue: T, ...fns: pipe_persistent_type<T>[]) => T;
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
export declare const retryF: <F extends (...args: Parameters<F>) => ReturnType<F>>(fn: F, args: Parameters<F>, retriesLeft: number, defaultReturn: ReturnType<F>, delayBetweenRetries: number) => Promise<{
    data: ReturnType<F>;
    was: 'success' | 'failure';
}>;
/**tryCatch wrapper for functions with divineError as the default error handler */
export declare const tryF: <T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, args: Parameters<T>, errorHandler?: messageHandler) => ReturnType<T>;
/**
 * Test data against an schema with strict-mode (no unspecified keys) for objects set by default and handle the error message if any
 * @param schema The schema to test the data against
 * @param data The data to be tested
 * @param errorHandler The handler for the message error
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not
 * @returns
 */
export declare const zGetSafeParseResultAndHandleErrorMessage: <T>(schema: zSchema<T>, data: T, errorHandler?: messageHandler, strictModeIfObject?: boolean) => SafeParseReturnType<T_1, T_1>;
/**
 * Check data against a provided schema, and execute either the success or error handler
 * @param zSchema The zSchema to test data against
 * @param data The data to be tested against zSchema
 * @param successHandler The function that will execute if data fits zSchema
 * @param args The arguments to be applied to successHandler
 * @param errorHandler The function that will execute if data does NOT fits zSchema
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not *
 */
export declare const zodCheckAndHandle: <D, SH extends (...args: Parameters<SH>) => ReturnType<SH>>(zSchema: zSchema<D>, data: D, successHandler: SH, args: Parameters<SH>, errorHandler?: messageHandler, strictModeIfObject?: boolean) => void;
/**Pipe with schema validation and an basic error tracking */
export declare const zPipe: <T>(zSchema: zSchema<T>, strictModeIfObject: boolean, initialValue: T, ...fns: pipe_persistent_type<T>[]) => {
    value: T;
    error: string;
    failedAt: string;
};
/**Promise-based delay that BREAKS THE LIMIT OF setTimeOut*/
export declare function delay(x: number): Promise<unknown>;
/**
 * @param options.fullYear true (default, 4 digits) or false (2 digits)
 * @param options.hourOnly default: false
 * @param options.includeHour default: false
 * @param options.listFirst 'MM' (default) or 'DD'
 * @param options.timestamp default: Date.now()
 */
export declare const getFormattedTimestamp: (options?: {
    fullYear?: boolean;
    hourOnly?: boolean;
    includeHour?: boolean;
    listFirst?: 'MM' | 'DD';
    timestamp?: number;
}) => string;
/**Self-explanatory */
export declare const isEven: (number: number) => boolean;
/**Self-explanatory */
export declare const isOdd: (number: number) => boolean;
/**Returns whether a number is either the minimum provided, the maximum provided or any number in-between */
export declare const isWithinRange: (number: number, max: number, min: number) => boolean;
/**Returns a number up to (but not included) provided max, eg: roll(1) will ALWAYS return zero */
export declare const roll: (maxRoll: number) => number;
/**1 becomes '1st' , 2 becomes '2nd', 3 becomes '3rd' and so on */
export declare const toOrdinal: (number: number) => string;
/**Add all default properties missing in an object*/
export declare const addMissingPropsToObjects: <T extends object>(original: T, defaults: Required<T>) => Required<T>;
/**Return a copy that can be altered without having to worry about modifying the original */
export declare const deepClone: <T>(x: T) => T;
/**Generate a Zod Schema from an array/object */
export declare const getZodSchemaFromData: (data: unknown) => any;
/**Map an object :D (IMPORTANT, all values in the object must be of the same type, or mappinFn should be able to handle multiple types) */
export declare const mapObject: <F extends (value: O[keyof O]) => ReturnType<F>, O extends object>(object: O, mappingFn: F) => { [key in keyof O]: ReturnType<F>; };
/**Object.entries but with proper type-inference */
export declare const objectEntries: <T extends object>(object: T) => {
    key: keyof T;
    value: T[keyof T];
}[];
/**Object.keys but with proper type-inference */
export declare const objectKeys: <T extends object>(object: T) => (keyof T)[];
/**Object.values but with proper type-inference */
export declare const objectValues: <T extends object>(object: T) => T[keyof T];
/**Replace the values of an object with those of another that shares the schema*/
export declare const replaceObject: <T extends object>(originalObject: T, newObject: T) => void;
/**Stringy an array/object so its readable //TODO: (edit so that it doesn't excluse object methods) */
export declare const stringify: {
    (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    (value: any, replacer?: (string | number)[], space?: string | number): string;
};
/**Generator for unique numbered IDs that accepts a preffix */
export declare const uniqueId: {
    get(suffix: string): string;
    /**Do NOT use this, use uniqueId.get instead */
    generator: Generator<string, never, unknown>;
};
/**start a setInterval and add it to an array */
export declare const timer_add: (timers: btr_intervalWithId[], id: string, callBack: btr_voidFn, interval: number) => void;
/**Kill a setInterval and remove it from its belonging array */
export declare const timer_kill: (timers: btr_intervalWithId[], id: string) => void;
/**console.log... WITH COLORS :D */
export declare const colorLog: (color: validChalkColor, message: string) => void;
/** Copy to clipboard using the corresponding function for the running enviroment (node/client)*/
export declare const copyToClipboard: (x: unknown) => void;
/**(Message) 💀 */
export declare const errorLog: (message: string) => void;
/**TODO: describe me */
export declare const getTraceableStack: (error: string | Error) => string;
/**Returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export declare const isGuest: (username: string) => boolean;
/**(Message) ✔️ */
export declare const successLog: (message: string) => void;
/**Returns an string with its linebreaks converted into simple one-char spaces */
export declare const toSingleLine: (sentence: string) => string;
/**
 * Compare data B against an schema created from data A
 * @param A The first piece of data
 * @param B The second piece of data
 * @param errorHandler The handler for the message error
 * @param strictModeIfObject Whether to throw an error if an object has properties not specified by the schema or not
 * @returns
 */
export declare const dataIsEqual: (A: unknown, B: unknown, errorHandler?: messageHandler, strictModeIfObject?: boolean) => SafeParseReturnType<T, T>;
/**For obligatory callbacks */
export declare const doNothing: (...args: unknown[]) => void;
/** @returns null as the provided type */
export declare function nullAs<T>(): T;
/**Copy to clipboard, objects arrays get stringify'd */
export declare const copyToClipboard_client: (x: unknown) => void;
/**Stringifies and downloads the provided data*/
export declare const downloadFile_client: (filename: string, fileFormat: '.txt' | '.json', data: unknown) => void;
/** Check the version of @botoron/utils, the enviroment variables and various config files */
export declare const basicProjectChecks: (errorHandler?: messageHandler) => Promise<false | [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, true | [boolean, boolean, boolean, boolean, boolean]]>;
/**FOR NODE-DEBUGGING ONLY. Log a big red message surrounded by a lot of asterisks for visibility */
export declare const bigConsoleError: (message: string) => void;
/**Copy to clipboard while running node */
export declare const copyToClipboard_server: (x: unknown) => any;
/**FOR NODE-DEBUGGING ONLY. Stringifies and downloads the provided data*/
export declare const downloadFile_node: (filename: string, fileFormat: '.txt' | '.json', data: unknown, killProcessAfterwards: boolean) => Promise<void>;
/**Wrapper for fs.promise.readFile that announces the start of the file-reading */
export declare function fsReadFileAsync(filePath: string): Promise<any>;
/**Wrapper for fsWriteFileAsync that announces the start of the file-writing */
export declare function fsWriteFileAsync(filePath: string, content: string): Promise<any>;
/** Get the contents of the project's .env */
export declare function getEnviromentVariables(): Promise<z.infer<any>>;
/**(Use with Quokka) Create an untoggable comment to separate sections, relies on "_" as a variable */
export declare const getSeparatingCommentBlock: (message: string) => string;
/**fetch the latest package.json of my-utils */
export declare const getLatestPackageJsonFromGithub: () => Promise<string>;
/**It's monging time >:D */
export declare const getMongoClient: () => Promise<MongoClient>;
/**Start and return an http Express server */
export declare const getStartedHttpServer: () => Promise<any>;
/**Get the package json of the project with this (utils) package installed */
export declare function importFileFromProject<T>(filename: string, extension: 'cjs' | 'js' | 'json'): Promise<any>;
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export declare const killProcess: (message: string) => never;
/**Easily run the scripts of this (utils) repo's package.json */
export declare const npmRun_package: (npmCommand: z.infer<any>) => Promise<void>;
/**Run convenient scripts for and from a project's root folder */
export declare const npmRun_project: (npmCommand: z.infer<any>) => Promise<void>;
/**Prompt to submit a git commit message and then push */
export declare function prompCommitMessageAndPush(repoName: string): Promise<void>;
/**Prompts a question in the terminal, awaits for the input and returns it */
export declare function questionAsPromise(question: string): Promise<string>;
export {};
