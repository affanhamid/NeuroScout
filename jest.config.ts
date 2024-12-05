import type { Config } from "jest";
const config: Config = {
  preset: "ts-jest", // Ensure ts-jest is used
  testEnvironment: "node", // Set the test environment to node
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Adjust this mapping for your setup
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Use ts-jest to transform TS files
  },
};

export default config;
