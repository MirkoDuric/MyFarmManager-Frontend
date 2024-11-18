export const formatDate = (date, locale = "en-GB", options = {}) =>
  new Date(date).toLocaleDateString(locale, options);

export const daysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.floor((end - start) / (1000 * 60 * 60 * 24));
};
