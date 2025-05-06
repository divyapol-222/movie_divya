/**
 * Jest configuration file (CommonJS)
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/tests'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  passWithNoTests: true,
  cacheDirectory: './tmp/jest_cache',
  verbose: true,
};