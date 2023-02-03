import { resolve } from 'path'
export const assetsDir = resolve(__dirname, '../assets')
export const devServer = { proxy: 'http://localhost:' + process.env.port }