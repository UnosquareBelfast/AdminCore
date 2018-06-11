import axios from '../../src/utilities/AxiosInstance';
import MockAdapter from 'axios-mock-adapter';
var mock = new MockAdapter(axios);

import { 
  userLogin, 
  getAllUsers,
  getUserProfile,
} from '../../src/services/userService';

beforeAll(() => {
  localStorage.setItem('id_token', 1234);
  localStorage.setItem('user_id', 1);
});

afterEach(() => {
  mock.restore();
});

describe('Requests', () => {
  xit('userLogin returns 200 if successful', () => {
    mock
      .onPost(`${process.env.DOMAIN}authentication/login`).reply(200, 
        { accessToken: 1234 });

    userLogin('email@email.com', 'password').then((res) => {
      expect(res.status).toEqual(200);
    });
  });

  it('getAllUsers returns 200 and all employees', () => {
    mock
      .onGet(`${process.env.DOMAIN}/employees/`).reply(200, 
        [ { id: 1, name: 'fakeName'}, { id: 2, name: 'fakeName'}]);

    getAllUsers().then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual([{ id: 1, name: 'fakeName'}, { id: 2, name: 'fakeName'}]);
    });
  });

  it('getUserProfile returns 200 and user profile', () => {
    mock
      .onGet(`${process.env.DOMAIN}/employees/1`).reply(200, 
        { id: 1, name: 'fakeName', totalHolidays: 12});

    getUserProfile(1).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual({ id: 1, name: 'fakeName', totalHolidays: 12});
    });
  });  
});
