let _

//TYPES PLACEHOLDED THAT WILL BECOME IMPORTED FROM THE PROJECT USING IT

const mongoCollections = ['SAMPLE_MONGO_COLLECTION_NAME'] as const //placeholder - DONOTEDIT
_
export type validMongoCollection = typeof mongoCollections[number]

//NORMAL IMPORTS

import { zValidVariants } from './constants.js'
_
import { type SafeParseReturnType, z } from 'zod'

/**Generic to get the type of an object/interface while preserving key-value typing */
export type objectEntriesT<T, amount extends 'plural' | 'single'> = { [K in keyof T]: [K, amount extends 'plural' ? T[K][] : T[K]] }[keyof T]
/**Generic to get the type of an object/interface while preserving key-value typing */
export type zSchema<T> = { _def: object, safeParse: (x: T) => SafeParseReturnType<T, T>, strict?: () => zSchema<T> }
/**Syntaxic-sugar */
export type nullable<T> = T | null //@btr-ignore

//^^ EXPORTABLE GENERICS ABOVE ^^ vv EXPORTABLE TYPES BELOW vv

export type recordOfCommands<C extends string> = Record<C, { description: string, fn: () => maybePromise<unknown> }> //@btr-ignore
export type btr_newToastFn = (title: string, message: string, variant: btr_validVariant) => void
export type btr_nonVoidFn = <F extends (...args: Parameters<F>) => ReturnType<F>> () => unknown
export type btr_trackedVueComponent = { id: string, name: string, beforeDestroy?: () => void }
export type btr_socketEventInfo = { event: string, timestamp: number, data: unknown }
export type btr_bvModal = { show: (id: string) => void, hide: (id: string) => void }
export type btr_globalAlert = { message: string, show: boolean }
export type btr_adminFetch = { command: string, data: unknown }
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

export type cachedFile = { path: string, content: string }
export type maybePromise<T> = T | Promise<T>
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
		cancelledAt: nullable<string>
		timeElapsedBeforeCancelation: nullable<string>
		timeLeftBeforeCancelation: nullable<string>
		onCompleteFn: string
		onCancelFn: string
		cancelStack: string
	}
}