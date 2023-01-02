module.exports = {
	ignorePatterns: ['btr.d.ts', 'client'],
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:@typescript-eslint/recommended'
	],
	overrides: [
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'vue',
		'@typescript-eslint'
	],
	rules: {
		quotes: ['error', 'single'],
		'quote-props': ['error', 'as-needed'],
		'func-style': ['error', 'declaration'],
		'arrow-body-style': ['error', 'as-needed'],
	}
}
