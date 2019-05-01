const todos = require("./todos.js");
const db = require("../../dbConfig.js");

xdescribe("the todo list helpers", () => {
  describe("add item to todos table", () => {
    beforeAll(async () => {
      return await db("users").insert({
        username: "todotest",
        password: "todopass"
      });
    });

    beforeAll(async () => {
      return await db("parties").insert({ user_id: 1 });
    });

    it("should add a todo list item to the table", async () => {
      const success = await todos.add(1, "get the led out");
      expect(success).toBe(2);
    });

    afterAll(async () => {
      return await db("user").truncate();
    });

    afterAll(async () => {
      return await db("parties").truncate();
    });

    afterAll(() => {
      return db("todos").truncate();
    });
  });
});
