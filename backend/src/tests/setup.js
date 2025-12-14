require('dotenv').config();
const dbHandler = require('./db-handler');

// Set test environment
process.env.NODE_ENV = 'test';

// Increase timeout for all tests
jest.setTimeout(30000);

// Connect to in-memory database before all tests
beforeAll(async () => {
  await dbHandler.connect();
});

// Close database connection after all tests
afterAll(async () => {
  await dbHandler.closeDatabase();
});
