const mongoose = require('mongoose');
const User = require('../models/User');

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should create a user successfully', async () => {
    const validUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    };
    const user = new User(validUser);
    const savedUser = await user.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(validUser.username);
    expect(savedUser.email).toBe(validUser.email);
  });

  it('should fail without required fields', async () => {
    const userWithoutEmail = new User({ username: 'testuser' });
    let err;
    try {
      await userWithoutEmail.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should hash password before saving', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();
    expect(user.password).not.toBe('password123');
  });
});