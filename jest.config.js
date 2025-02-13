// jest.config.mjs
export default {
  testEnvironment: "jest-environment-jsdom", // Use jsdom environment
  transform: {}, // Don't transform the files (no Babel)
  moduleFileExtensions: ["js", "mjs", "json", "node"], // Support for .js and .mjs files
  testMatch: [
    "**/?(*.)+(spec|test).mjs", // Look for .mjs files ending with .test.mjs or .spec.mjs
  ],
};
