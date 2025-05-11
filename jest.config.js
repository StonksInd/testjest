module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/src/tests/**/*.test.ts',
    '**/src/tests/**/*.spec.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
};