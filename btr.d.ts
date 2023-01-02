/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { z, type SafeParseReturnType } from 'zod';
export declare const zValidVariants: any;
export type btr_trackedVueComponent = {
    _name: string;
    beforeCreate?: btr_voidFn;
    beforeDestroy?: btr_voidFn;
};
export type btr_newToastFn = (title: string, message: string, variant: btr_validVariant) => void;
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
type packageJson = {
    name: string;
    version: string;
    scripts: {
        [key: string]: string;
    };
};
type bvToast = {
    toast: (message: string, toastOptions: toastOptions) => void;
};
type zSchema<T> = {
    safeParse: (x: T) => SafeParseReturnType<T, T>;
};
type eslintConfig = {
    rules: {
        [key: string]: string[];
    };
};
type errorMessageHandler = (message: string) => void;
type arrayPredicate<T> = (arg1: T) => boolean;
type pipe_persistent_type<T> = (arg: T) => T;
type tsConfig = {
    compilerOptions: object;
};
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
export declare const zodCheck_curry: (errorHandler: errorMessageHandler) => <T>(schema: zSchema<T>, data: T) => boolean;
/**(generates a function that:) Adds/removes a vue component into the window for easy access/debugging */
export declare const trackVueComponent_curry: <T>(zValidVueComponentName: zSchema<T>) => (name: T, componentConstructor: btr_trackedVueComponent) => btr_trackedVueComponent;
/**Adds an item to an array, or removes it if it already was added. Returns the action applied and the array */
export declare const addOrRemoveItem: <T>(arr: T[], item: T) => {
    action: "removed" | "added";
    arr: T[];
};
/**Adds an item to an array, or replaces the first one if found. WARNING: make sure the predicate can only find ONE item */
export declare const addOrReplaceItem: <T>(arr: T[], newItem: T, predicate: arrayPredicate<T>) => void;
/**Converts an array of primitives into a comma-separated list, the word "and" being optional before the last item */
export declare const asFormattedList: (arr: (string | number | boolean)[], useAndForTheLastItem: boolean) => string;
/**Compare array A to array B, returns the answer along ab error message, if any */
export declare const compareArrays: <T>(myArray: T[], comparisonType: 'isEqualTo' | 'hasAllItemsOf' | 'isPartialOf', desiredArray: T[]) => {
    answer: boolean;
    errorMessage: string;
};
/**syntax sugar for arr[arr.length - 1] */
export declare const getLastItem: <T>(arr: T[]) => T;
/**returns a random item along its index */
export declare const getRandomItem: <T>(arr: T[]) => {
    item: T;
    index: number;
};
/**Returns a version of the provided array without repeating items */
export declare const getUniqueValues: <T>(arr: T[]) => T[];
/**Remove a single item from an array, or all copies of that item if its a primitive value */
export declare const removeItem: <T>(arr: T[], item: T) => number;
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
/**Simple and standard functional programming pipe. Deprecated, use either zPipe (persistenType with zod errors) or pipe_mutableType! */
export declare const pipe_persistentType: <T>(initialValue: T, ...fns: pipe_persistent_type<T>[]) => T;
/**
* Pipes a value through a number of functions in the order that they appear.
* Takes between 1 and 12 arguments. `pipe(x, a, b)` is equivalent to `b(a(x))`.
* If only one argument is provided (`pipe(x)`), this will produce a type error but JS will run fine (and return `x`).
*/
export declare const pipe_mutableType: pipe_mutable_type;
/** Retry a function up to X amount of times or until it is executed successfully, mainly for fetching/requesting stuff */
export declare const retryF: <F extends (...args: Parameters<F>) => ReturnType<F>>(fn: F, args: Parameters<F>, retriesLeft: number, defaultReturn: ReturnType<F>, delayBetweenRetries: number) => Promise<{
    data: ReturnType<F>;
    was: 'success' | 'failure';
}>;
/** Check data against a provided schema, and execute either the success or error handler */
export declare const zodCheckAndHandle: <D, SH extends (...args: Parameters<SH>) => ReturnType<SH>>(zSchema: zSchema<D>, data: D, successHandler: SH, args: Parameters<SH>, errorHandler: errorMessageHandler) => void;
/**Pipe with schema validation and error logging */
export declare const zPipe: <T>(zSchema: zSchema<T>, initialValue: T, ...fns: pipe_persistent_type<T>[]) => {
    value: T;
    error: string;
    failedAt: string;
};
/**Promise-based delay that BREAKS THE LIMIT OF setTimeOut*/
export declare const delay: (x: number) => Promise<unknown>;
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
    timestamp: number;
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
export declare const addMissingPropsToObjects: <T extends object>(original: T, defaults: Required<T>) => T;
/**Return a copy that can be altered without having to worry about modifying the original */
export declare const deepClone: <T>(x: T) => T;
/**Map an object :D (IMPORTANT, all values in the object must be of the same type, or mappinFn should be able to handle multiple types) */
export declare const mapObject: <F extends (x: never) => ReturnType<F>, O extends object>(object: O, mappingFn: F) => { [key in keyof O]: ReturnType<F>; };
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
/**For obligatory callbacks */
export declare const doNothing: (...args: unknown[]) => void;
/**Syntactic sugar for "null as unknown as T" */
export declare const nullAs: {
    string: () => string;
    number: () => number;
    T3: <T1, T2, T3>() => T1 | T2 | T3;
    T2: <T1_1, T2_1>() => T1_1 | T2_1;
    T: <T>() => T;
};
/**Copy to clipboard, objects arrays get stringify'd */
export declare const copyToClipboard_client: (x: unknown) => void;
/**Stringifies and downloads the provided data*/
export declare const downloadFile_client: (filename: string, fileFormat: '.txt' | '.json', data: unknown) => void;
/** Check the version of @botoron/utils, the enviroment variables and the package.json scripts */
export declare const basicProjectChecks: (errorHandler: errorMessageHandler, packageJson: packageJson, tsConfig: tsConfig, eslintConfig: eslintConfig, env: NodeJS.ProcessEnv) => Promise<boolean>;
/**FOR NODE-DEBUGGING ONLY. Log a big red message surrounded by a lot of asterisks for visibility */
export declare const bigConsoleError: (message: string) => void;
/**Copy to clipboard while running node */
export declare const copyToClipboard_server: (x: unknown) => import("stream").Writable;
/**FOR NODE-DEBUGGING ONLY. Stringifies and downloads the provided data*/
export declare const downloadFile_node: (filename: string, fileFormat: '.txt' | '.json', data: unknown, killProcessAfterwards: boolean) => Promise<void>;
/**Wrapper for fs.promise.readFile that announces the start of the file-reading */
export declare function fsReadFileAsync(filePath: string): Promise<any>;
/**Wrapper for fsWriteFileAsync that announces the start of the file-writing */
export declare function fsWriteFileAsync(filePath: string, content: string): Promise<any>;
/** Get the contents of the .env */
export declare function getEnviromentVariables(): Promise<NodeJS.ProcessEnv>;
/**(Use with Quokka) Create an untoggable comment to separate sections, relies on "_" as a variable */
export declare const getSeparatingCommentBlock: (message: string) => string;
/**fetch the latest package.json of my-utils */
export declare const getLatestPackageJsonFromGithub: () => Promise<string>;
/** Return the main perma-dependencies, check myUtil's version and print package.json's script */
export declare const getMainDependencies: (packageJson: packageJson, tsConfig: tsConfig, eslintConfig: eslintConfig) => Promise<{
    divineBot: any;
    divineError: (err: string | Error) => void;
    doAndRepeat: (fn: btr_voidFn, interval: number) => void;
    env: NodeJS.ProcessEnv;
    httpServer: any;
    mongoClient: MongoClient;
    tryF: <T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, args: Parameters<T>) => ReturnType<T>;
}>;
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export declare const killProcess: (message: string) => never;
/**Easily run the scripts of this (utils) repo's package.json */
export declare const npmRun: (npmCommand: z.infer<any>) => Promise<void>;
/**Prompt to submit a git commit message and then push */
export declare function prompCommitMessageAndPush(repoName: string): Promise<void>;
/**Prompts a question in the terminal, awaits for the input and returns it */
export declare function questionAsPromise(question: string): Promise<string>;
export {};
