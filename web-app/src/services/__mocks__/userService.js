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

export const userLogin = function(email, password) {
  return new Promise((resolve, reject) => {
    if (email == null || password == null) {
      reject('error');
    }
    else {
      resolve();
    }
  });
};
