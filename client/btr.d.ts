/// <reference types="node" />
import { z, type SafeParseReturnType } from 'zod';
export type intervalWithid = [id: string, interval: NodeJS.Timer];
export type globalAlert = {
    message: string;
    show: boolean;
};
export type validVariant = z.infer<typeof zValidVariants>;
declare const zValidVariants: any;
type toastOptions = {
    toaster: string;
    autoHideDelay: number;
    solid: boolean;
    variant: validVariant;
    title: string;
};
type trackedVueComponent = {
    _name: string;
    beforeCreate?: () => void;
    beforeDestroy?: () => void;
};
declare global {
    interface Window {
        vueComponents: trackedVueComponent[];
        newToast: newToastFn;
    }
}
type newToastFn = (title: string, message: string, variant: validVariant) => void;
type bvToast = {
    toast: (message: string, toastOptions: toastOptions) => void;
};
type zSchema<T> = {
    safeParse: (x: T) => SafeParseReturnType<T, T>;
};
type errorMessageHandler = (message: string) => void;
type pipe_persistent_type<T> = (arg: T) => T;
type pipe_mutable_type = {
    <T, A>(source: T, a: (value: T) => A): A;
    <T, A, B>(source: T, a: (value: T) => A, b: (value: A) => B): B;
    <T, A, B, C>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C): C;
    <T, A, B, C, D>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D): D;
    <T, A, B, C, D, E>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D, e: (value: D) => E): E;
};
export declare const BTR: {
    /**Tr-Catch wrapper for functions. Starts as a placeholder, initialize it with typeF_get */
    tryF: <T extends (...args: any) => any>(fn: T, args: Parameters<T>) => any;
    /**Createst a new 5-seconds toast in the lower right corner. Must be initialized by passing $bvToast to newToast_client_get  */
    newToast_client(title: string, message: string, variant: z.infer<any>): void;
    /**Test data against an scheme, and if it fails execute a predefined errorHandler.
    * WARNING: Deprecated? zodCheckAndHandle feels better.
    * Starts as a placeholder, initialize it with zodCheck_get
    * */
    zodCheck<T_1>(schema: zSchema<T_1>, data: T_1): boolean;
    /**for when registering them for tracking at window.vueComponents */
    zValidVueComponentName: zSchema<unknown>;
};
/**colorLog.succes with a ✔️ at the end :D */
export declare const successLog: (message: string) => void;
/**start a setInterval and add it to an array */
export declare const timer_add: (timers: intervalWithid[], id: string, callBack: Function, interval: number) => void;
/**Kill a setInterval and remove it from its belonging array */
export declare function timer_kill(timers: intervalWithid[], id: string): void;
/**Adds an item to an array, or removes it if it already was added. Returns the action applied and the array */
export declare const addOrRemoveItem: <T>(arr: T[], item: T) => {
    action: "removed" | "added";
    arr: T[];
};
/**Converts an array of primitives into a comma-separated list, the word "and" being optional before the last item */
export declare const asFormattedList: (arr: (string | number | boolean)[], useAndForTheLastItem: boolean) => string;
/**syntax sugar for arr[arr.length - 1] */
export declare const getLastItem: <T>(arr: T[]) => T;
/**returns a random item along its index */
export declare const getRandomItem: <T>(arr: T[]) => {
    item: T;
    index: number;
};
/**Returns a version of the provided array without repeating items */
export declare const getUniqueValues: <T>(arr: T[]) => T[];
/**Transfer items that meet a given condition from one array to another */
export declare const transferItems: <T>(origin: T[], destination: T[], predicate: (arg1: T) => boolean) => {
    transferedCount: number;
};
/**Remove items from an array that DONT fulfill the given condition, returns the removed items and their amount */
export declare const selfFilter: <T>(arr: T[], predicate: (arg1: T) => boolean) => {
    removedItems: T[];
    removedCount: number;
};
/**Compare if array B is equal to array A, and return the answer along the missing/nondesired items (if any) */
export declare function compareArrays<T>(errorHandler: errorMessageHandler, desiredArray: T[], myArray: T[]): {
    areEqual: boolean;
    missingItems: T[];
    nonDesiredItems: T[];
    errorMessage: string;
};
/**Remove a single item from an array, or all copies of that item if its a primitive value */
export declare const removeItem: <T>(arr: T[], item: T) => number;
/**Randomizes the order of the items in the array */
export declare const shuffle: <T>(arr: T[]) => T[];
/**Sort an array of objects based on the value a property. A: Ascending, D: Descesding  */
export declare const sortBy: <T extends object>(arr: T[], key: keyof T, direction: 'A' | 'D') => T[];
/**syntactic sugar for selfFilter(arr, predicate).removedItems */
export declare const spliceIf: <T>(arr: T[], predicate: (arg1: T) => boolean) => T[];
/**Remove X amount of items from the end of an array */
export declare const spliceLast: <T>(arr: T[], count: number) => T[];
/**
 *This is a SAMPLE, use tryF_get to set tryF_get and use it without having to pass errorHandler everytime
 * @param errorHandler The error handler
 * @param fn The function to try
 * @param args The arguments to apply to the function
 * @returns void
 */
export declare const tryF_sample: <T extends (...args: any) => any>(errorHandler: T, fn: T, args: Parameters<T>) => void;
/**Promise-based delay that BREAKS THE LIMIT OF setTimeOut*/
export declare const delay: (x: number) => Promise<unknown>;
/**Self-explanatory */
export declare const isEven: (number: number) => boolean;
/**Self-explanatory */
export declare const isOdd: (number: number) => boolean;
/**Returns whether a number is either the minimum provided, the maximum provided or any number in-between */
export declare const isWithinRange: (number: number, max: number, min: number) => boolean;
/**Returns a number up to (but not included) provided max, eg: roll(1) will ALWAYS return zero */
export declare const roll: (maxRoll: number) => number;
/**Convert a timestamp to DD/MM/YYYY (plus HH:MM:SS includeHours) */
export declare const timeStampToDate: (timeStamp: number, includeHours: boolean) => string;
/**1 becomes '1st' , 2 becomes '2nd', 3 becomes '3rd' and so on */
export declare const toOrdinal: (number: number) => string;
/**Return a copy that can be altered without having to worry about modifying the original */
export declare const deepClone: <T>(x: T) => T;
/**FOR CLIENT-SIDE CODE ONLY. Stringifies and downloads the provided data*/
export declare const downloadFile_client: (filename: string, fileFormat: '.txt' | '.json', data: unknown) => void;
/**Stringy an array/object so its readable, except for methods, eg: obj.sampleMethod becomes "[λ: sampleMethod]", FIXME: */
export declare const stringify: (x: unknown) => string;
/**FOR CLIENT-SIDE CODE ONLY. Copy anything to the clipboard, objects/arrays get parsed to be readable*/
export declare const copyToClipboard: (x: any) => void;
/**Returns whether an string is "Guest/guest" followed by a timestamp (13 numbers), eg: isGuest(Guest1234567890123) === true */
export declare const isGuest: (username: string) => boolean;
/**Returns an string with its linebreaks converted into simple one-char spaces */
export declare const toSingleLine: (sentence: string) => string;
/**Check if the code is running in the client or in the server */
export declare function clientOrServer_is(): "server" | "client";
/**For obligatory callbacks */
export declare function doNothing(...args: unknown[]): void;
/**Syntactic sugar for "null as unknown as T", supports enums up to 5 items */
export declare const nullAs: {
    string: () => string;
    number: () => number;
    t1<T1>(x: T1): T1;
    t2<T1_1, T2>(x: T1_1, y: T2): T1_1 | T2;
    t3<T1_2, T2_1, T3>(x: T1_2, y: T2_1, z: T3): T1_2 | T2_1 | T3;
    t4<T1_3, T2_2, T3_1, T4>(x: T1_3, y: T2_2, z: T3_1, _: T4): T1_3 | T2_2 | T3_1 | T4;
    t5<T1_4, T2_3, T3_2, T4_1, T5>(x: T1_4, y: T2_3, z: T3_2, _: T4_1, $: T5): T1_4 | T2_3 | T3_2 | T4_1 | T5;
};
/**function to generate newToast_client with a predertemined $bvToast so it doesnt have to be passed everytime :D */
export declare const newToast_client_get: (bvToast: bvToast) => newToastFn;
/**This is a SAMPLE, use newToast_client_get to set newToast_client and use it without having to pass $bvToast everytime*/
export declare const newToast_client_sample: ($bvToast: bvToast, title: string, msg: string, variant: z.infer<any>) => void;
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
 * @param retriesLeft number, is reduced by 1 every attempt, retryF stops when it reaches 0
 * @param defaultReturn data to be returned as returnType of fn if retryF fails
 * @param delayBetweenRetries delay between each retry in milliseconds
 * @returns 'data: returned by fn if ran sucessfully. | wasError: if the retries ran out without sucess '
 */
export declare const retryF: <F extends (...args: any) => any>(fn: F, args: Parameters<F>, retriesLeft: number, defaultReturn: ReturnType<F>, delayBetweenRetries: number) => Promise<{
    data: ReturnType<F>;
    was: 'success' | 'failure';
}>;
/**Track vue components in a global window array to easily find them and use them with socket.io events*/
export declare const trackVueComponent: (name: string, componentConstructor: trackedVueComponent) => trackedVueComponent;
/**For Functions that require initialization (tryF and zodCheck for their errorHandlers, newToast_client for $bvToast) */
export declare function warnAboutUnproperlyInitializedFunction(fn: 'tryF' | 'newToast_client' | 'zodCheck'): void;
/**function to generate zodCheck with a predertemined errorHandler so it doesnt have to be passed everytime :D */
export declare const zodCheck_get: (errorHandler: errorMessageHandler) => <T>(schema: zSchema<T>, data: T) => any;
/**This is a SAMPLE, use zodCheck_get to set zodCheck and use it without having to pass errorHandler everytime*/
export declare const zodCheck_sample: <T>(errorHandler: errorMessageHandler, schema: zSchema<T>, data: T) => any;
/**
 * Check data against a provided schema, and execute either the success or error handler
 * @param zSchema The zSchema to test data against
 * @param data The data to be tested against zSchema
 * @param successHandler The function that will execute if data fits zSchema
 * @param args The arguments to be applied to successHandler
 * @param errorHandler The function that will execute if data does NOT fits zSchema
 */
export declare const zodCheckAndHandle: <D, SH extends (...args: Parameters<SH>) => ReturnType<SH>>(zSchema: zSchema<D>, data: D, successHandler: SH, args: Parameters<SH>, errorHandler: errorMessageHandler) => void;
/**Pipe with schema validation and error logging */
export declare const zPipe: <T>(zSchema: zSchema<T>, initialValue: T, ...fns: pipe_persistent_type<T>[]) => {
    value: T;
    error: string;
    failedAt: string;
};
export {};
