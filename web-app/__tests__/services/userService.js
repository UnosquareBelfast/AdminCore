import axios from '../../src/utilities/AxiosInstance';
import MockAdapter from 'axios-mock-adapter';
var mock = new MockAdapter(axios);

jest.unmock('../../src/services/userService');

import { 
  userLogin, 
  getAllUsers,
  getUserProfile,
} from '../../src/services/userService';

afterEach(() => {
  mock.reset();
});

describe('Requests', () => {
  it('userLogin returns 200 if successful', () => {
    mock
      .onPost(`${process.env.DOMAIN}/authentication/login`).reply(200, 
        { accessToken: 987654321 });

    userLogin('email@email.com', 'password').then(() => {
      expect(localStorage.getItem('id_token')).toBe('987654321');
      expect(localStorage.getItem('user_id')).toBe('1234');
    });
  });

  it('getAllUsers returns 200 and all employees', () => {
    mock
      .onGet().reply(200, 
        [ { id: 1, name: 'fakeName'}, { id: 2, name: 'fakeName'}]);

    return getAllUsers().then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual([{ id: 1, name: 'fakeName'}, { id: 2, name: 'fakeName'}]);
    });
  });

  xit('getUserProfile returns 200 and user profile', () => {
    mock
      .onGet(`${process.env.DOMAIN}/employees/1`).reply(200, 
        { id: 1, forename: 'fakeName', totalHolidays: 12});

    getUserProfile(1).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual({ id: 1, forename: 'fakeName', totalHolidays: 12});
    }).catch((err) => {
      console.log('Caught three: ' , err);
    });
  });  
});
