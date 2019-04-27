const parties = require("./parties.js");
const db = require("../dbConfig.js");

beforeAll(async () => {
  return await db("users").insert({ username: "test", password: "testp" });
});

afterAll(() => {
  return db("users").truncate();
});

beforeEach(() => {
  return db("parties").truncate();
});

describe("the parties table helper methods", () => {
  describe("the addParty function", () => {
    it("should add party to parties table, and return party id", async () => {
      const added = await parties.addParty({ id: 1 });
      expect(added[0]).toBe(1);
      await db("parties").truncate();
    });
  });
  describe("the getParty function", () => {
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
      const gotParty = await parties.getParty(1);
      expect(gotParty).toEqual([
        {
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
      const anotherReq = await parties.getParty(1);
      expect(anotherReq).toEqual([
        {
          budget: 23,
          numberGuest: 56,
          theme: "sock-hop",
          username: "test",
          when: "May 04, 2019",
          spentBudget: null
        },
        {
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
});
