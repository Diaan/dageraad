
module.exports = {
  preset: 'jest-preset-angular',
  roots: [
    './src/app'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/src/test.ts',
    '<rootDir>/coverage',
    '<rootDir>/.*\.e2e\.ts'
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/src/setup-jest.ts',
    '!**/src/**/index.ts',
    '!**/src/**/*.module.ts'
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text-summary'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts']
};
