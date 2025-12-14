const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

const connect = async () => {
  try {
    // Close any existing connections
    await mongoose.disconnect();
    
    // Create new in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    
    console.log('Connected to in-memory MongoDB for testing');
  } catch (error) {
    console.error('Error connecting to in-memory MongoDB:', error);
    throw error;
  }
};

const closeDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
  } catch (error) {
    console.error('Error closing database:', error);
    throw error;
  }
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
};
