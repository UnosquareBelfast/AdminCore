import axios from '../../src/utilities/AxiosInstance';
import MockAdapter from 'axios-mock-adapter';
var mock = new MockAdapter(axios);

import { 
  cancelHoliday, 
  getHolidays,
  requestHoliday,
  updateHoliday,
  updateHolidays,
} from '../../src/services/holidayService';

afterAll(() => {
  mock.restore();
});

describe('Requests', () => {
  localStorage.setItem('id_token', 1234);

  it('cancelHolidays returns 200', () => {
    mock
      .onPost(`${process.env.DOMAIN}/holidays/cancel/1`).reply(200);

    cancelHoliday(1).then((res) => {
      expect(res.status).toEqual(200);
    });
  }); 
  it('getHolidays returns 200 and holiday object', () => {
    mock
      .onGet(`${process.env.DOMAIN}/holidays/findByEmployeeId/1`).reply(200,
        { id: 1, name: 'fakeEmployee'});

    getHolidays(1).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual({ id: 1, name: 'fakeEmployee'});
    });
  }); 
  it('requestHoliday returns 200 if successful', () => {
    mock
      .onPost(`${process.env.DOMAIN}/holidays/`).reply(200)
      .onPost(`${process.env.DOMAIN}/holidays/createMultiple/`).reply(200);
      
    
    var holidays = [{ id: 1, halfDay: false }];

    requestHoliday(holidays).then((res) => {
      expect(res.status).toEqual(200);
    });
  });
  it('updateHoliday returns 200 if successful', () => {
    mock
      .onPut(`${process.env.DOMAIN}/holidays/`).reply(200);
      
    
    var holidays = [{ id: 1, halfDay: false }];

    updateHoliday(holidays).then((res) => {
      expect(res.status).toEqual(200);
    });
  });  
  it('updateHolidays returns 200 if successful', () => {
    mock
      .onPut(`${process.env.DOMAIN}/holidays/updateMultiple/`).reply(200);
      
    
    var holidays = [{ id: 1, halfDay: false }];

    updateHolidays(holidays).then((res) => {
      expect(res.status).toEqual(200);
    });
  });  
});
