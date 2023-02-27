const baseJestConfig = require("../../jest.config");

module.exports = {
	...baseJestConfig,
	testEnvironment: "jsdom",
	testMatch: [
		"**/__tests__/unit/**/*.spec.tsx",
		"**/__tests__/unit/**/*.spec.ts",
	],
};
