export const validateReminderText = (text) => {
  return (
    typeof text === "string" && text.trim().length > 0 && text.length <= 200
  );
};

export const validateReminderDate = (date) => {
  const today = new Date();
  const reminderDate = new Date(date);
  return reminderDate > today;
};

export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const isNonEmptyString = (str) =>
  typeof str === "string" && str.trim().length > 0;

export const isPositiveInteger = (num) => Number.isInteger(num) && num > 0;

/**
 * Validates password strength.
 * Checks for:
 * - Minimum length of 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const validatePasswordStrength = (password) => {
  const minLength = 8;
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (!password || password.length < minLength) {
    return "Password must be at least 8 characters long.";
  }

  if (!regex.test(password)) {
    return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  return null; // Null means the password is valid
};

/**
 * Validates that a date string is in a valid format (e.g., ISO 8601).
 */
export const isValidDateFormat = (dateStr) => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime()); // Returns true if the date is valid
};

/**
 * Checks if a given value is a valid phone number.
 * (Adjust regex for specific country formatting if needed)
 */
export const isValidPhoneNumber = (phoneNumber) => {
  const regex = /^[0-9]{10,15}$/; // Allows 10 to 15 digits
  return regex.test(phoneNumber);
};

/**
 * Checks if a given string is a valid postal code (adjust for your region).
 */
export const isValidPostalCode = (postalCode) => {
  const regex = /^[0-9]{4,10}$/; // Allows numeric postal codes of length 4 to 10
  return regex.test(postalCode);
};
