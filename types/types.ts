let _
import { type SafeParseReturnType, z } from 'zod'
_
import { zMyEnv, zValidNpmCommand_package, zValidNpmCommand_project, zValidVariants } from '../constants/constants.js'
_

/**Generic to get the type of an object/interface while preserving key-value typing */
export type objectEntriesT<T, amount extends 'plural' | 'single'> = { [K in keyof T]: [K, amount extends 'plural' ? T[K][] : T[K]] }[keyof T]
/**Generic to get the type of an object/interface while preserving key-value typing */
export type zSchema<T> = { _def: object, safeParse: (x: T) => SafeParseReturnType<T, T>, strict?: () => zSchema<T> }
/**Syntaxic-sugar */
export type nullable<T> = T | null

//^^ EXPORTABLE GENERICS ABOVE ^^ vv EXPORTABLE "btr_" TYPES BELOW vv

export type btr_newToastFn = (title: string, message: string, variant: btr_validVariant) => void
export type btr_nonVoidFn = <F extends (...args: Parameters<F>) => ReturnType<F>> () => unknown
export type btr_trackedVueComponent = { id: string, name: string, beforeDestroy?: () => void }
export type btr_socketEventInfo = { event: string, timestamp: number, data: unknown }
export type btr_globalAlert = { message: string, show: boolean }
export type btr_validVariant = z.infer<typeof zValidVariants>
export type btr_language = 'English' | 'Español'
export type btr_fieldsForColumnOfTable = string | {
	key: string
	label?: string
	formatter?: (value: unknown, key: string, item: unknown) => unknown
	sortable: boolean
	thStyle?: btr_validVariant
}

/**Exclusive for this package */

export type myEnv = z.infer<typeof zMyEnv>
export type validNpmCommand_package = z.infer<typeof zValidNpmCommand_package>
export type validNpmCommand_project = z.infer<typeof zValidNpmCommand_project>

export type toastOptions = { toaster: string, autoHideDelay: number, solid: boolean, variant: btr_validVariant, title: string }
export type validChalkColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'grey' | 'magentaBright'	//DELETETHISFORCLIENT
export type packageJson = { name: string, version: string, scripts: { [key: string]: string } }
export type vueComponentsTracker<T extends string> = Record<T, btr_trackedVueComponent[]>
export type bvToast = { toast: (message: string, toastOptions: toastOptions) => void }
export type bvModal = { show: (id: string) => void, hide: (id: string) => void }
export type cachedFile = { path: string, content: string }
export type messageHandler = (message: string) => void
export type arrayPredicate<T> = (arg1: T) => boolean
export type pipe_persistent_type<T> = (arg: T) => T
export type maybePromise<T> = T | Promise<T>
export type pipe_mutable_type = {
	<T, A>(source: T, a: (value: T) => A): A
	<T, A, B>(source: T, a: (value: T) => A, b: (value: A) => B): B
	<T, A, B, C>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C): C
	<T, A, B, C, D>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D): D
	<T, A, B, C, D, E>(source: T, a: (value: T) => A, b: (value: A) => B, c: (value: B) => C, d: (value: C) => D, e: (value: D) => E): E
	//can always make it longer 😉
}
export type timer = {
	id: string,
	runAt: number,
	startedAt: number,
	onComplete: btr_nonVoidFn,
	onCancel: btr_nonVoidFn,
	cancelStack: string,
	cancelledAt: number,
	wasCancelled: boolean,
	value_onCancel: unknown,
	value_onComplete: unknown,

	resolveInfo: {
		timerId: string
		startedAt: string
		intendedRunAt: string
		cancelledAt: string | null
		timeElapsedBeforeCancelation: string | null
		timeLeftBeforeCancelation: string | null
		onCompleteFn: string
		onCancelFn: string
		cancelStack: string
	}
}

