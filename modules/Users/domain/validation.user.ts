export function validateName(name: unknown) {
  if (typeof name !== 'string') throw new Error('Name must be a string');

  const regex = /^[a-zA-Z ]+$/;
  const valid =  regex.test(name) && name.length >= 3 && name.length <= 30;

  if (!valid) throw new Error('Invalid name');
}

export function validateEmail(email: unknown) {
  if (typeof email !== 'string') throw new Error('Email must be a string');

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  const valid = regex.test(email);

  if (!valid) throw new Error('Invalid email');
}

export function validBalance(balance: unknown) {
  if (typeof balance !== 'number') throw new Error('Balance must be a number');
  if (isNaN(balance)) throw new Error('Balance must be a number');
  if (balance < 0) throw new Error('Balance must be a positive number');
}
