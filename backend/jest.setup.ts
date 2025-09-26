// This file runs before all tests
import { jest } from '@jest/globals';

process.env.NODE_ENV = 'test';
process.env.PORT = '3031'; // Different port for tests
process.env.DB_NAME = 'issuetracker_test';

// Increase test timeout
jest.setTimeout(10000);