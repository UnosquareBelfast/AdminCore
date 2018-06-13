export const createUser = function(data) {
  return new Promise((resolve, reject) => {
    if (data.forename == null) {
      reject('error');
    }
    else {
      resolve();
    }
  });
};
