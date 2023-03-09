import { z } from 'zod'

export type myType = z.infer<typeof myRecord>
const myRecord = zRecord(['keyOne', 'keyTwo', 'keyThree'], z.string())

/**Zod's "record" method, but all keys are Required instead of Optional in the infered type */
export function zRecord<T extends z.ZodTypeAny, K extends string>(keys: Readonly<K[]>, schema: T) {
	const object = {} as Record<K, T>
	keys.forEach(x => object[x as K] = schema)
	return z.object(object)
}