const myMock = function(item) {
  if (item === '123') {
    return '123';
  }
  if (item < Date.now() / 1000) {
    return { exp: item };
  }
  else {
    throw new Error('error');
  }
};

export default myMock;