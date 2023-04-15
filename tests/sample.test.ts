
import { add, Calculator } from './../src/sample';

/* eslint-disable @typescript-eslint/no-unused-vars */

describe('add', () => {
  it('should pass a sample test case', () => {
    expect(true).toBe(true);
    expect(add(1, 2)).toBe(3);

  });

  // TODO: Add more test cases for 'add'
});

describe('Calculator', () => {
  it('should pass a sample test case', () => {
    expect(true).toBe(true);
  });

  // TODO: Add more test cases for 'Calculator'
});

describe('multiply', () => {
  it('should pass a sample test case', () => {
const calculator = new Calculator();
    expect(calculator.multiply(2, 2)).toBe(4)
  });

  // TODO: Add more test cases for 'multiply'
});
