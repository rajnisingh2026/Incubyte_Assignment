const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};
