export const validateReminderText = (text) => {
    return typeof text === 'string' && text.trim().length > 0 && text.length <= 200;
  };
  
  export const validateReminderDate = (date) => {
    const today = new Date();
    const reminderDate = new Date(date);
    return reminderDate > today;
  };
  
  export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  export const isNonEmptyString = (str) => typeof str === 'string' && str.trim().length > 0;
  export const isPositiveInteger = (num) => Number.isInteger(num) && num > 0;
  