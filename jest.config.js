export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: [
    '<rootDir>/src/tests/unit/**/*.test.ts',
    '<rootDir>/src/tests/integration/**/*.test.ts'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/services/**/*.ts',
    '!src/services/**/*.d.ts'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  setupFiles: ['<rootDir>/src/tests/setupTests.ts'],
};