const myMock = function(item) {
  if (item == 987654321) {
    return { sub: 1234 };
  }
  if (item < Date.now() / 1000) {
    return { exp: item };
  }
  else {
    throw new Error('error');
  }
};

export default myMock;