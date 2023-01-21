//npm install --save-dev eslint-plugin-jsdoc

module.exports = {
	env: { browser: true, es2021: true, node: true },
	plugins: ['vue', '@typescript-eslint',], //'jsdoc'

	extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	parser: '@typescript-eslint/parser',

	rules: {
		//'jsdoc/require-jsdoc': 1,
		'arrow-body-style': ['error', 'as-needed'],
		'max-lines-per-function': ['error', 100],
		'func-style': ['error', 'declaration'],
		'quote-props': ['error', 'as-needed'],
		quotes: ['error', 'single'],
		'require-await': 'error',
		semi: ['error', 'never'],
		'no-undef': 'off',
	},

	overrides: [{
		files: ['*.vue'],
		parser: 'vue-eslint-parser',
		parserOptions: { parser: '@typescript-eslint/parser', ecmaVersion: 'latest', sourceType: 'module' },
	}],
}
