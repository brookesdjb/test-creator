
import { add, Calculator } from './../src/sample';

/* eslint-disable @typescript-eslint/no-unused-vars */

  describe('add', () => {
    it('should pass a sample test case', () => {
      expect(add(1, 1)).toBe('// add expected output here//');
    });
  
    // TODO: Add more test cases for 'add'
  });
  
  describe('Calculator', () => {
    it('should pass a sample test case', () => {
      const instance = new Calculator();
    expect(instance).toBeInstanceOf(Calculator);
    });
  
    // TODO: Add more test cases for 'Calculator'
  });
  
  describe('multiply', () => {
    it('should pass a sample test case', () => {
      const instance = new Calculator();
    expect(instance.multiply(1, 1)).toBe('// add expected output here//');
    });
  
    // TODO: Add more test cases for 'multiply'
  });
  