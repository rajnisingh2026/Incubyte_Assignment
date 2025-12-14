const request = require('supertest');
const app = require('../server');
const Sweet = require('../models/Sweet');
const User = require('../models/User');
const mongoose = require('mongoose');

let authToken;
let adminToken;

describe('Sweet Controller Tests', () => {
  beforeAll(async () => {
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'user@test.com',
        password: 'password123'
      });
    authToken = userResponse.body.token;

    const adminResponse = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'admin',
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin'
      });
    adminToken = adminResponse.body.token;
  });

  describe('POST /api/sweets', () => {
    it('should create a new sweet', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 2.99,
          quantity: 100
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.sweet).toHaveProperty('name', 'Chocolate Bar');
    });

    it('should fail without authentication', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .send({
          name: 'Candy',
          category: 'Hard Candy',
          price: 1.99,
          quantity: 50
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/sweets', () => {
    it('should get all sweets', async () => {
      const res = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('sweets');
      expect(Array.isArray(res.body.sweets)).toBe(true);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    it('should purchase a sweet successfully', async () => {
      const sweet = await Sweet.create({
        name: 'Test Sweet',
        category: 'Test',
        price: 1.99,
        quantity: 10
      });

      const res = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quantity: 2 });

      expect(res.statusCode).toBe(200);
      expect(res.body.sweet.quantity).toBe(8);
    });

    it('should fail with insufficient stock', async () => {
      const sweet = await Sweet.create({
        name: 'Low Stock',
        category: 'Test',
        price: 1.99,
        quantity: 1
      });

      const res = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quantity: 5 });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('Insufficient stock');
    });
  });

  describe('DELETE /api/sweets/:id (Admin Only)', () => {
    it('should allow admin to delete sweet', async () => {
      const sweet = await Sweet.create({
        name: 'To Delete',
        category: 'Test',
        price: 1.99,
        quantity: 5
      });

      const res = await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
    });

    it('should deny regular user from deleting', async () => {
      const sweet = await Sweet.create({
        name: 'Protected',
        category: 'Test',
        price: 1.99,
        quantity: 5
      });

      const res = await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(403);
    });
  });
});