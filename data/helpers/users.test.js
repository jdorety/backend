const users = require('./users.js');
const db = require('../dbConfig.js');

describe("Database Helpers", () => {

  beforeEach(() => {
    return db('users').truncate();
  })

  describe('users table helpers', () => {
    it('adds user to users table', async () => {
      const testUser = {username: "test", password: "test"};
      const success = await users.registerUser(testUser);
      expect(success).toEqual({username: "test", password:"test", id: 1})
      
    })
  })
})
