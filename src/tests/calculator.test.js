const { compute } = require('../calculator');

describe('Calculator basic operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(compute('+', 2, 3)).toBe(5);
    expect(compute('add', 10, 4)).toBe(14);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(compute('-', 10, 4)).toBe(6);
    expect(compute('subtract', 20, 5)).toBe(15);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(compute('*', 45, 2)).toBe(90);
    expect(compute('multiply', 3, 7)).toBe(21);
  });

  test('division: 20 / 5 = 4', () => {
    expect(compute('/', 20, 5)).toBe(4);
    expect(compute('divide', 9, 3)).toBe(3);
  });

  test('division by zero throws', () => {
    expect(() => compute('/', 1, 0)).toThrow('Division by zero');
  });

  test('modulo: 5 % 2 = 1', () => {
    expect(compute('%', 5, 2)).toBe(1);
    expect(compute('mod', 10, 3)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => compute('%', 1, 0)).toThrow('Modulo by zero');
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(compute('^', 2, 3)).toBe(8);
    expect(compute('pow', 2, 8)).toBe(256);
  });

  test('square root: sqrt 16 = 4', () => {
    expect(compute('sqrt', 16)).toBe(4);
  });

  test('square root of negative throws', () => {
    expect(() => compute('sqrt', -1)).toThrow('Cannot compute square root of negative number');
  });

  test('unknown operation throws', () => {
    expect(() => compute('foo', 2, 2)).toThrow('Unknown operation');
  });
});
