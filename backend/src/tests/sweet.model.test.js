const mongoose = require('mongoose');
const Sweet = require('../models/Sweet');

describe('Sweet Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Sweet.deleteMany({});
  });

  it('should create a sweet successfully', async () => {
    const validSweet = {
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: 2.99,
      quantity: 100
    };
    const sweet = new Sweet(validSweet);
    const savedSweet = await sweet.save();
    
    expect(savedSweet._id).toBeDefined();
    expect(savedSweet.name).toBe(validSweet.name);
    expect(savedSweet.quantity).toBe(validSweet.quantity);
  });

  it('should fail without required fields', async () => {
    const sweetWithoutName = new Sweet({ price: 2.99 });
    let err;
    try {
      await sweetWithoutName.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should not allow negative price', async () => {
    const sweet = new Sweet({
      name: 'Candy',
      category: 'Hard Candy',
      price: -5,
      quantity: 10
    });
    let err;
    try {
      await sweet.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});