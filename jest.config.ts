import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
				diagnostics: true,
			},
		],
	},
	moduleFileExtensions: ['js', 'ts'],
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/src/$1',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)'],
	setupFiles: ['<rootDir>/test/setup-tests.ts'],
};

module.exports = config;
