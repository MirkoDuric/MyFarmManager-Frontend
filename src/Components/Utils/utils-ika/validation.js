const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isNonEmptyString = (str) =>
  typeof str === "string" && str.trim().length > 0;
const isPositiveInteger = (num) => Number.isInteger(num) && num > 0;

export { isValidEmail, isNonEmptyString, isPositiveInteger };
