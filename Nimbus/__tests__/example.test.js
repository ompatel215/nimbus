// example.js
function add(a, b) {
    return a + b;
  }
  module.exports = add;
  
  // example.test.js
  const add = require('../example');
  
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  