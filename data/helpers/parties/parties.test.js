const parties = require("./parties.js");
const db = require("../../dbConfig.js");

beforeAll(() => {
  return db("users").insert({ username: "test", password: "testp" });
});

afterAll(() => {
  return db("users").truncate();
});

beforeEach(() => {
  return db("parties").truncate();
});

xdescribe("the parties table helper methods", () => {
  describe("the add function", () => {
    it("should add party to parties table, and return party id", async () => {
      const added = await parties.add({ id: 1 });
      expect(added[0]).toBe(1);
      await db("parties").truncate();
    });
  });
  describe("the get function", () => {
    beforeEach(() => {
      return db("parties").insert({
        budget: 23,
        numberGuest: 56,
        theme: "sock-hop",
        user_id: 1,
        when: "May 04, 2019"
      });
    });

    it("should retrieve an array containing parties associated with the passed user_id", async () => {
      const gotParty = await parties.get(1);
      expect(gotParty).toEqual([
        {
          id: 1,
          budget: 23,
          numberGuest: 56,
          theme: "sock-hop",
          username: "test",
          when: "May 04, 2019",
          spentBudget: null
        }
      ]);
      await db("parties").insert({
        budget: 43,
        numberGuest: 23,
        theme: "toga",
        user_id: 1,
        when: "May 14, 2019"
      });
      const anotherReq = await parties.get(1);
      expect(anotherReq).toEqual([
        {
          budget: 23,
          id: 1,
          numberGuest: 56,
          theme: "sock-hop",
          username: "test",
          when: "May 04, 2019",
          spentBudget: null
        },
        {
          id: 2,
          budget: 43,
          numberGuest: 23,
          theme: "toga",
          username: "test",
          when: "May 14, 2019",
          spentBudget: null
        }
      ]);
    });
  });
  describe("the edit function", () => {
    beforeEach(() => {
      return db("parties").insert({ user_id: 1 });
    });

    afterEach(() => {
      return db('parties').truncate();
    })
    it("should update the party when passed an object containing new values", async () => {
      const newInfo = {
        theme: "yoga",
        when: "May 27, 2019",
        numberGuest: 17,
        budget: 35
      };
      const updated = await parties.edit(1, newInfo);
      expect(updated).toBe(1);
    });
  });
  describe('the delete function', () => {
    beforeEach(() => {
      return db('parties').insert([{user_id: 1}, {user_id: 2}])
    })
    it('should delete the party associated with the passed id', async () => {
      const removed = await parties.remove(1);
      expect(removed).toBe(1);
    })
  })
});
