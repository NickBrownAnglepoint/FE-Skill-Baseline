export default {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  };