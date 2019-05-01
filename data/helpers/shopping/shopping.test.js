const shopping = require('./shopping.js');
const db = require('../../dbConfig.js');

describe('the budget function', () => {
  it('should return an array of numbers reflecting the cost described in the shopping list', async () => {
    const spentBudget = await shopping.getBudget(1);
    expect(spentBudget).toBe(4)
  })
})