module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	plugins: ['@typescript-eslint/eslint-plugin', 'import'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'import/no-default-export': 'error',
		'import/no-unresolved': 'off',
	},
	settings: {
		'import/resolver': {
			typescript: true,
			node: true,
		},
	},
};
