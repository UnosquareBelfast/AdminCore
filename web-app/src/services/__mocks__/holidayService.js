export const getAllHolidays = function() {
  return new Promise((resolve) => {
    resolve({ data: [ { holidayId: 1 }, { holidayId: 2} ]});
  });
};
