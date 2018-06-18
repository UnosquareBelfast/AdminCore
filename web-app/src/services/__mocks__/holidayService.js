export const getAllHolidays = function() {
  return new Promise((resolve, reject) => {
    resolve({ data: [ { holidayId: 1 }, { holidayId: 2} ]});
  });
};