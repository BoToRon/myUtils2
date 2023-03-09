//npm install --save-dev eslint-plugin-jsdoc

module.exports = {
	env: { browser: true, es2021: true, node: true },
	plugins: ['@typescript-eslint', 'no-floating-promise', 'sonarjs', 'vue'], //'jsdoc'

	extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', 'plugin:sonarjs/recommended'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	parser: '@typescript-eslint/parser',

	rules: {
		//'jsdoc/require-jsdoc': 1,
		'sonarjs/cognitive-complexity': 'off',
		'no-floating-promise/no-floating-promise': 2,
		'arrow-body-style': ['error', 'as-needed'],
		'max-lines-per-function': ['error', 100],
		'func-style': ['error', 'declaration'],
		'quote-props': ['error', 'as-needed'],
		'no-multiple-empty-lines': 'error',
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
