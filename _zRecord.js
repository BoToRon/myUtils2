import { z } from 'zod';
const myRecord = zRecord(['keyOne', 'keyTwo', 'keyThree'], z.string());
/**Zod's "record" method, but all keys are Required instead of Optional in the infered type */
export function zRecord(keys, schema) {
    const object = {};
    keys.forEach(x => object[x] = schema);
    return z.object(object);
}
