const sum = require('../sum');

test('correctly adds two numbers', () => {
  expect(sum(1, 2)).toBe(3);
});
