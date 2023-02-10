import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@ui": "<rootDir>/@ui/index",
    "@tests/$1": "<rootDir>/@tests/$1",
  },
};

export default createJestConfig(config);
