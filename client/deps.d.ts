declare const _ = "prevent imports and comments from collapsing";
import { fromZodError } from 'zod-validation-error';
import type { SafeParseReturnType } from 'zod';
import { z } from 'zod';
type pipe_mutable_type = {
    <T, A>(source: T, a: (value: T) => A): A;
    <T, A, B>(source: T, a: (value: T) => A, b: (value: A) => B): B;
    <T, A, B, C>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C): C;
    <T, A, B, C, D>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D): D;
    <T, A, B, C, D, E>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D, e: (value: D) => E): E;
};
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
type bvToast = {
    toast: (message: string, toastOptions: toastOptions) => void;
};
type newToastFn = (title: string, message: string, variant: validVariant) => void;
type zSchema<T> = {
    safeParse: (x: T) => SafeParseReturnType<T, T>;
};
type validVariant = z.infer<typeof zValidVariants>;
type pipe_persistent_type<T> = (arg: T) => T;
export { _, bvToast, fromZodError, newToastFn, pipe_mutable_type, pipe_persistent_type, SafeParseReturnType, trackedVueComponent, validVariant, zSchema, zValidVariants, };
