export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const isNonEmptyString = (str) => typeof str === 'string' && str.trim().length > 0;
export const isPositiveInteger = (num) => Number.isInteger(num) && num > 0;
