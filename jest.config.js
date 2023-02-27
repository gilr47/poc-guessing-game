module.exports = {
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest", {
				isolatedModules: true,
			},
		],
	},
	forceExit: true,
	maxWorkers: 1,
	testEnvironment: "node",
	testMatch: [
		"**/__tests__/**/*.test.ts",
	],
	collectCoverage: true,
	runtime: "@side/jest-runtime",
};
