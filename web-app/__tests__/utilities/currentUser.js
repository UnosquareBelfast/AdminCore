import * as currentUser from '../../src/utilities/currentUser';

beforeAll(() => {
  localStorage.setItem('id_token', 123);
  localStorage.setItem('user_id', 1);
});

describe('Current User', () => {
  it('getProfile returns id_token from localStorage', () => {
    const value = currentUser.getProfile();
    expect(value).toEqual('123');
  });

  it('isLoggedIn returns true if token is not expired and id_token is set', () => {
    var date = new Date();
    date.setDate(date.getDate() + 5);
    date = date / 1000;
    localStorage.setItem('id_token', date);

    const isLoggedIn = currentUser.isLoggedIn();
    expect(isLoggedIn).toEqual(true);
  });

  it('isLoggedIn returns false if token IS expired and id_token is set', () => {
    var date = new Date();
    date.setDate(date.getDate() - 5);
    date = date / 1000;
    localStorage.setItem('id_token', date);

    const isLoggedIn = currentUser.isLoggedIn();
    expect(isLoggedIn).toEqual(false);
  });

  it('isLoggedIn returns false if token IS expired and id_token is NOT set', () => {
    var date = new Date();
    date.setDate(date.getDate() - 5);
    date = date / 1000;
    localStorage.removeItem('id_token');

    const isLoggedIn = currentUser.isLoggedIn();
    expect(isLoggedIn).toEqual(false);
  });

  it('isTokenExpired returns true if id_token is out of date', () => {
    var date = new Date();
    date.setDate(date.getDate() - 5);
    date = date / 1000;
    localStorage.setItem('id_token', date);

    const value = currentUser.isTokenExpired();
    expect(value).toEqual(true);
  });

  it('isTokenExpired returns false if id_token is out of date', () => {
    var date = new Date();
    date.setDate(date.getDate() + 5);
    date = date / 1000;
    localStorage.setItem('id_token', date);

    const value = currentUser.isTokenExpired();
    expect(value).toEqual(false);
  });

  it('userLogout deletes from localStorage', () => {    
    currentUser.userLogout();
    expect(localStorage.getItem('id_token')).toBeNull();
    expect(localStorage.getItem('user_id')).toBeNull();
  });
});
