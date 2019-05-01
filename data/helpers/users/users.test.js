const users = require("./users.js");
const db = require("../../dbConfig.js");

beforeEach(async () => {
  return await db("users").truncate();
});


xdescribe("Database Helpers", () => {

  describe("users table helpers", () => {
    it("adds user to users table", async () => {
      const testUser = { username: "test", password: "test" };
      const success = await users.registerUser(testUser);
      expect(success).toEqual({ username: "test", id: 1 });
    });

    it("retrieves user from user object with id", async () => {
      const user = { username: "testname", password: "testpass" };
      await db("users").insert(user);
      const gotUser = await users.getUser({ id: 1 });
      expect(gotUser).toEqual(user);
    });
    
  });
});

afterAll(async () => {
  return await db('users').truncate();
})

