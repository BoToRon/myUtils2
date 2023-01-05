module.exports = {
	env: { browser: true, es2021: true, node: true },
	plugins: ['vue', '@typescript-eslint', 'jsdoc'],

	extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	parser: '@typescript-eslint/parser',

	rules: {
		'arrow-body-style': ['error', 'as-needed'],
		'func-style': ['error', 'declaration'],
		'quote-props': ['error', 'as-needed'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-undef': 'off',
		//'jsdoc/require-jsdoc': 1,
	},

	overrides: [{
		files: ['*.vue'],
		parser: 'vue-eslint-parser',
		parserOptions: { parser: '@typescript-eslint/parser', ecmaVersion: 'latest', sourceType: 'module' },
	}],
}
