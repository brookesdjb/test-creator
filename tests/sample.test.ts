
import { add, Gender, getUserId, Calculator } from './../src/sample';

/* eslint-disable @typescript-eslint/no-unused-vars */

  describe('add', () => {
    it('should pass a sample test case', () => {
      expect(add(1, 1)).toBe('// add expected output here//');
    });
  
    // TODO: Add more test cases for 'add'
  });
  
describe('Gender', () => {
  it('should have the expected enum values', () => {
    const expectedValues = [Gender.Male, Gender.Female, Gender.Other];
    expect(Object.values(Gender)).toEqual(expectedValues);
  });

  // TODO: Add more test cases for 'Gender'
});

  describe('getUserId', () => {
    it('should pass a sample test case', () => {
      expect(getUserId({ id: 1, name: 'John Doe', email: 'john.doe@example.com' })).toBe('// add expected output here//');
    });
  
    // TODO: Add more test cases for 'getUserId'
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
  