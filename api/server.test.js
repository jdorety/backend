const server = require("./server.js");
const request = require("supertest");

xdescribe("/ root endpoint", () => {
  it("server responds", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Welcome to build week!");
  });
});
