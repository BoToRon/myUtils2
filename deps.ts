const _ = 'prevent imports and comments from collapsing'
_
import fs from 'fs'	//DELETETHISFORCLIENT
_
import eris from 'eris'	//DELETETHISFORCLIENT
_
import path from 'path'	//DELETETHISFORCLIENT
_
import http from 'http'	//DELETETHISFORCLIENT
_
import chalk from 'chalk'	//DELETETHISFORCLIENT
_
import express from 'express'	//DELETETHISFORCLIENT
_
import fetch from 'node-fetch'	//DELETETHISFORCLIENT
_
import getReadLine from 'readline'	//DELETETHISFORCLIENT
_
import { exec, execSync } from 'child_process'	//DELETETHISFORCLIENT
_
import mongodb, { MongoClient } from 'mongodb'	//DELETETHISFORCLIENT
_
import { fromZodError } from 'zod-validation-error'
_
import type { SafeParseReturnType } from 'zod'
_
import { z } from 'zod'

type pipe_mutable_type = {
	<T, A>(source: T, a: (value: T) => A): A
	<T, A, B>(source: T, a: (value: T) => A, b: (value: A) => B): B
	<T, A, B, C>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C): C
	<T, A, B, C, D>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D): D
	<T, A, B, C, D, E>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D, e: (value: D) => E): E
	//can always make it longer 😉
}

const zValidVariants = z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark'])
type toastOptions = { toaster: string, autoHideDelay: number, solid: boolean, variant: validVariant, title: string }
type validChalkColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'grey' | 'magentaBright'	//DELETETHISFORCLIENT
type trackedVueComponent = { _name: string, beforeCreate?: () => void, beforeDestroy?: () => void }
declare global { interface Window { vueComponents: trackedVueComponent[], newToast: newToastFn } }
type bvToast = { toast: (message: string, toastOptions: toastOptions) => void }
type newToastFn = (title: string, message: string, variant: validVariant) => void
type zSchema<T> = { safeParse: (x: T) => SafeParseReturnType<T, T> }
const zValidNpmCommand = z.enum(['gitPush', 'publish', 'transpile'])
const zValidVersionIncrement = z.enum(['major', 'minor', 'patch'])	//DELETETHISFORCLIENT
type pck = { objects: [{ package: { version: string } }] }
type validNpmCommand = z.infer<typeof zValidNpmCommand>	//DELETETHISFORCLIENT
type validVariant = z.infer<typeof zValidVariants>
type pipe_persistent_type<T> = (arg: T) => T

export {
	chalk, eris, exec, execSync, express, fetch, fs, getReadLine, http, mongodb, MongoClient,	//DELETETHISFORCLIENT
	path, validChalkColor, validNpmCommand, z, zValidNpmCommand, zValidVersionIncrement,	//DELETETHISFORCLIENT
	_, bvToast, fromZodError, newToastFn, pipe_mutable_type, pipe_persistent_type,
	SafeParseReturnType, trackedVueComponent, validVariant, zSchema, zValidVariants,
}

