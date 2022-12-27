const _ = 'prevent imports and comments from collapsing'


_
import fs from 'fs'
_
import Eris from 'eris'
_
import http from 'http'
_
import express from 'express'
_
import getReadLine from 'readline'
_
import mongodb, { MongoClient } from 'mongodb'
_
import { z, type SafeParseReturnType } from 'zod'
_
import { fromZodError } from 'zod-validation-error'

type pipe_mutable_type = {
	<T, A>(source: T, a: (value: T) => A): A
	<T, A, B>(source: T, a: (value: T) => A, b: (value: A) => B): B
	<T, A, B, C>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C): C
	<T, A, B, C, D>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D): D
	<T, A, B, C, D, E>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D, e: (value: D) => E): E
	//can always make it longer 😉
}

type packageJson = { default: { scripts: { [key: string]: unknown }, name: string, type: string, version: string, description: string } }
const zValidVariants = z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark'])
type toastOptions = { toaster: string, autoHideDelay: number, solid: boolean, variant: validVariant, title: string }
type validChalkColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'grey' | 'magentaBright'
type trackedVueComponent = { _name: string, beforeCreate?: () => void, beforeDestroy?: () => void }
declare global { interface Window { vueComponents: trackedVueComponent[], newToast: newToastFn } }
type bvToast = { toast: (message: string, toastOptions: toastOptions) => void }
type newToastFn = (title: string, message: string, variant: validVariant) => void
type zSchema<T> = { safeParse: (x: T) => SafeParseReturnType<T, T> }
const zValidNpmCommand = z.enum(['gitPush', 'publish', 'transpile'])
const zValidVersionIncrement = z.enum(['major', 'minor', 'patch'])
type pck = { objects: [{ package: { version: string } }] }
type validNpmCommand = z.infer<typeof zValidNpmCommand>
type validVariant = z.infer<typeof zValidVariants>
type pipe_persistent_type<T> = (arg: T) => T

export {
	//chalk and node-fetch are imported dynamically by the one auto-delete-for-the-client function that uses each, so that vite doesn't detect them
	_, bvToast, Eris, express, fromZodError, fs, getReadLine, http, mongodb, MongoClient, newToastFn, packageJson,
	pipe_mutable_type, pipe_persistent_type, SafeParseReturnType, trackedVueComponent, validChalkColor,
	validNpmCommand, validVariant, z, zSchema, zValidNpmCommand, zValidVariants, zValidVersionIncrement
}

