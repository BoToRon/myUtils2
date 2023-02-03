import { fileURLToPath, URL } from 'node:url'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	build: { outDir: '../../dist/public' },
	optimizeDeps: { exclude: ['node_modules/@botoron/utils'], },
	resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
	plugins: [
		vue2(),
		legacy({
			targets: ['ie >= 11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime']
		})
	],
})