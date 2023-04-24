
import { add, stringBuilder, Gender, getUserId, Calculator, getUsers } from './../src/sample';

/* eslint-disable @typescript-eslint/no-unused-vars */

describe('add', () => {

  it('should pass test case 1', () => {
    expect(add(0, 0)).toBe(0);
  });

  it('should pass test case 2', () => {
    expect(add(0, 1)).toBe(1);
  });

  it('should pass test case 3', () => {
    expect(add(0, 1.7976931348623157e+308)).toBe(1.7976931348623157e+308);
  });

  it('should pass test case 4', () => {
    expect(add(0, 5e-324)).toBe(5e-324);
  });

  it('should pass test case 5', () => {
    expect(add(1, 0)).toBe(1);
  });

  it('should pass test case 6', () => {
    expect(add(1, 1)).toBe(2);
  });

  it('should pass test case 7', () => {
    expect(add(1, 1.7976931348623157e+308)).toBe(1.7976931348623158e+308);
  });

  it('should pass test case 8', () => {
    expect(add(1, 5e-324)).toBe(1.0000000000000001);
  });

  it('should pass test case 9', () => {
    expect(add(1.7976931348623157e+308, 0)).toBe(1.7976931348623157e+308);
  });

  it('should pass test case 10', () => {
    expect(add(1.7976931348623157e+308, 1)).toBe(1.7976931348623158e+308);
  });

  it('should pass test case 11', () => {
    expect(add(1.7976931348623157e+308, 1.7976931348623157e+308)).toBe(Infinity);
  });

  it('should pass test case 12', () => {
    expect(add(1.7976931348623157e+308, 5e-324)).toBe(1.7976931348623157e+308);
  });

  it('should pass test case 13', () => {
    expect(add(5e-324, 0)).toBe(5e-324);
  });

  it('should pass test case 14', () => {
    expect(add(5e-324, 1)).toBe(1.0000000000000001);
  });

  it('should pass test case 15', () => {
    expect(add(5e-324, 1.7976931348623157e+308)).toBe(1.7976931348623157e+308);
  });

  it('should pass test case 16', () => {
    expect(add(5e-324, 5e-324)).toBe(1e-323);
  });
  // TODO: Add more test cases for 'add'
});

describe('stringBuilder', () => {

  it('should pass test case 1', () => {
    expect(stringBuilder(0, '')).toBe('0');
  });

  it('should pass test case 2', () => {
    expect(stringBuilder(0, 'sample')).toBe('0sample');
  });

  it('should pass test case 3', () => {
    expect(stringBuilder(0, 'another sample')).toBe('0another sample');
  });

  it('should pass test case 4', () => {
    expect(stringBuilder(1, '')).toBe('1');
  });
  it('should pass test case 5', () => {
    expect(stringBuilder(1, 'sample')).toBe('1sample');
  });

  it('should pass test case 6', () => {
    expect(stringBuilder(1, 'another sample')).toBe('1another sample');
  });

  it('should pass test case 7', () => {
    expect(stringBuilder(42, '')).toBe('42');
  });

  it('should pass test case 8', () => {
    expect(stringBuilder(42, 'sample')).toBe('42sample');
  });

  it('should pass test case 9', () => {
    expect(stringBuilder(42, 'another sample')).toBe('42another sample');
  });

  it('should pass test case 10', () => {
    expect(stringBuilder(-1, '')).toBe('-1');
  });

  it('should pass test case 11', () => {
    expect(stringBuilder(-1, 'sample')).toBe('-1sample');
  });

  it('should pass test case 12', () => {
    expect(stringBuilder(-1, 'another sample')).toBe('-1another sample');
  });
  // TODO: Add more test cases for 'stringBuilder'
});

describe('Gender', () => {
  it('should have the expected enum values', () => {
    const expectedValues = [Gender.Male, Gender.Female, Gender.Other];
    expect(Object.values(Gender)).toEqual(expectedValues);
  });

  // TODO: Add more test cases for 'Gender'
});

describe('getUserId', () => {
    
  it('should pass test case 1', () => {
    expect(getUserId({"id":1,"name":"John Doe","email":"john.doe@example.com"})).toBe(1);
  });

  it('should pass test case 2', () => {
    expect(getUserId({"id":2,"name":"Jane Doe","email":"jane.doe@example.com"})).toBe(2);
  });

  // TODO: Add more test cases for 'getUserId'
});

describe('Calculator', () => {

  it('should pass test case 1', () => {
    const instance = new Calculator();
    expect(instance).toBeInstanceOf(Calculator);
  });
  // TODO: Add more test cases for 'Calculator'
});
describe('multiply', () => {
    
  it('should pass test case 1', () => {
    const instance = new Calculator();
    expect(instance.multiply(0, 0)).toBe(0);
  });

  it('should pass test case 2', () => {
    const instance = new Calculator();
    expect(instance.multiply(0, 1)).toBe(0);
  });

  it('should pass test case 3', () => {
    const instance = new Calculator();
    expect(instance.multiply(0, 1.7976931348623157e+308)).toBe(0);
  });

  it('should pass test case 4', () => {
    const instance = new Calculator();
    expect(instance.multiply(0, 5e-324)).toBe(0);
  });

  it('should pass test case 5', () => {
    const instance = new Calculator();
    expect(instance.multiply(1, 0)).toBe(0);
  });

  it('should pass test case 6', () => {
    const instance = new Calculator();
    expect(instance.multiply(1, 1)).toBe(1);
  });

  it('should pass test case 7', () => {
    const instance = new Calculator();
    expect(instance.multiply(1, 1.7976931348623157e+308)).toBe(1.7976931348623157e+308);
  });

  it('should pass test case 8', () => {
    const instance = new Calculator();
    expect(instance.multiply(1, 5e-324)).toBe(5e-324);
  });

  it('should pass test case 9', () => {
    const instance = new Calculator();
    expect(instance.multiply(1.7976931348623157e+308, 0)).toBe(0);
  });

  it('should pass test case 10', () => {
    const instance = new Calculator();
    expect(instance.multiply(1.7976931348623157e+308, 1)).toBe(1.7976931348623157e+308);
  });

  it('should pass test case 11', () => {
    const instance = new Calculator();
    expect(instance.multiply(1.7976931348623157e+308, 1.7976931348623157e+308)).toBe(Infinity);
  });

  it('should pass test case 12', () => {
    const instance = new Calculator();
    expect(instance.multiply(1.7976931348623157e+308, 5e-324)).toBe(8.881784197001251e-16);
  });

  it('should pass test case 13', () => {
    const instance = new Calculator();
    expect(instance.multiply(5e-324, 0)).toBe(0);
  });

  it('should pass test case 14', () => {
    const instance = new Calculator();
    expect(instance.multiply(5e-324, 1)).toBe(5e-324);
  });

  it('should pass test case 15', () => {
    const instance = new Calculator();
    expect(instance.multiply(5e-324, 1.7976931348623157e+308)).toBe(8.881784197001251e-16);
  });

  it('should pass test case 16', () => {
    const instance = new Calculator();
    expect(instance.multiply(5e-324, 5e-324)).toBe(0);
  });

  // TODO: Add more test cases for 'multiply'
});

describe('getUsers', () => {
    
  // TODO: Add more test cases for 'getUsers'
  it('should return an array of users', async () => {
    const users = await getUsers();
    expect(Array.isArray(users)).toBe(true);
  });

  it('should return at least one user in the array', async () => {
    const users = await getUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should return users with the expected properties', async () => {
    const users = await getUsers();
    const user = users[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });
  
  it('should return a user with a specific id when called with that id', async () => {
    const id = 1;
    const users = await getUsers(id);
    const user = users.find(u => u.id === id);
    expect(user).not.toBeUndefined();
    if(user === undefined) return;
 
    expect(user.id).toBe(id);
  });

});
