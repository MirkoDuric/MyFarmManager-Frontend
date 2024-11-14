export const mapIdsToNames = (data, idKey = 'id', nameKey = 'name') => {
    return data.reduce((acc, item) => {
      acc[item[idKey]] = item[nameKey];
      return acc;
    }, {});
  };