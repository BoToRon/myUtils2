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
		'arrow-body-style': ['error', 'as-needed'],
		'func-style': ['error', 'declaration'],
		'quote-props': ['error', 'as-needed'],
		quotes: ['error', 'single'],
		'no-undef': 'off',
	}
}
