/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  transform: { '^.+\\.(t|j)sx?$': '@swc/jest' },
  moduleNameMapper: {
    // If you import CSS anywhere, this keeps Jest from choking on it.
    '\\.(css|less|sass|scss)$': '<rootDir>/src/test/styleMock.js',
  },
};