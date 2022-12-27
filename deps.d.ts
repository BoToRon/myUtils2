declare const _ = "prevent imports and comments from collapsing";
import fs from 'fs';
import eris from 'eris';
import path from 'path';
import http from 'http';
import chalk from 'chalk';
import express from 'express';
import fetch from 'node-fetch';
import getReadLine from 'readline';
import { exec, execSync } from 'child_process';
import mongodb, { MongoClient } from 'mongodb';
import { z, type SafeParseReturnType } from 'zod';
import { fromZodError } from 'zod-validation-error';
type pipe_mutable_type = {
    <T, A>(source: T, a: (value: T) => A): A;
    <T, A, B>(source: T, a: (value: T) => A, b: (value: A) => B): B;
    <T, A, B, C>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C): C;
    <T, A, B, C, D>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D): D;
    <T, A, B, C, D, E>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D, e: (value: D) => E): E;
};
type packageJson = {
    default: {
        scripts: {
            [key: string]: unknown;
        };
        name: string;
        type: string;
        version: string;
        description: string;
    };
};
declare const zValidVariants: any;
type toastOptions = {
    toaster: string;
    autoHideDelay: number;
    solid: boolean;
    variant: validVariant;
    title: string;
};
type validChalkColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'grey' | 'magentaBright';
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
declare const zValidNpmCommand: any;
declare const zValidVersionIncrement: any;
type validNpmCommand = z.infer<typeof zValidNpmCommand>;
type validVariant = z.infer<typeof zValidVariants>;
type pipe_persistent_type<T> = (arg: T) => T;
export { _, bvToast, chalk, eris, exec, execSync, express, fetch, fromZodError, fs, getReadLine, http, mongodb, MongoClient, newToastFn, packageJson, path, pipe_mutable_type, pipe_persistent_type, SafeParseReturnType, trackedVueComponent, validChalkColor, validNpmCommand, validVariant, z, zSchema, zValidNpmCommand, zValidVariants, zValidVersionIncrement };
