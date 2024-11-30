module.exports = {
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
