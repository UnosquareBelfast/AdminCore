const myMock = jest.fn();
myMock.mockReturnValueOnce({ sub : 1} );

module.exports = myMock;