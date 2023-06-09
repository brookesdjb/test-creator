// Add the 'export' keyword before the function or class declaration
export function add(a: number, b: number): number {
  return a + b;
}

export function stringBuilder(a: number, b: string): string {
  return a + b;
}

export enum Gender{
  Male,
  Female,
  Other

}
interface User{
  name: string;
  id :   number;
  email: string;
}
const users: User[] = []
export function getUserId(user: User ): number {
return user.id;
};
export class Calculator {
  public multiply(a: number, b: number): number {
    return a * b;
  }
}
export async function getUsers(id?:number): Promise<User[]> {
try{
  const newUsers = await fetch('https://jsonplaceholder.typicode.com/users')
  return newUsers.json();
}
catch(err){
  throw err;

}}