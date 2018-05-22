// import decode from 'jwt-decode';

export default class DashboardService {
  constructor(domain) {
    this.domain = domain || process.env.DOMAIN;
    this.getUserProfile = this.getUserProfile.bind(this);
    this.getUserEmail = this.getUserEmail.bind(this);
  }

  // TODO: We need to wrap our requests to check if the token is expired

  getUserProfile(firstname, lastname) {

    const token = this.getToken();
    // eslint-disable-next-line
    console.log('DashboardService - Get User Profile: ', firstname, lastname, ' Token: ', token);

    return fetch(`${this.domain}/employees/findByForenameAndSurname/` + firstname + '/' + lastname, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then(this._checkStatus)
      .then(response => {
        // eslint-disable-next-line
        console.log('Response before .json: ', response);
        response.json();
        // eslint-disable-next-line
        console.log('Response: ', response);
        return (response);
      })
      .then(res => {
        // eslint-disable-next-line
        console.log('Res: ', res);
        return Promise.resolve(res);
      });
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  getUserEmail() {
    return localStorage.getItem('user_email');
  }

  getNamesFromEmail() {
    const email = this.DashboardService.getUserEmail();

    var splitOne = email.split('.');
    var splitTwo = splitOne[1].split('@');

    const firstName = splitOne[0];
    const lastName = splitTwo[0];

    return { firstName, lastName };
  }

  _checkStatus = (response) => new Promise((resolve) => {
    // eslint-disable-next-line
    console.log('_checkStatus call');
    if (response.status >= 200 && response.status < 300) {
      // eslint-disable-next-line
      console.log('200 Response');
      resolve(response);
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      // eslint-disable-next-line
      console.log('Error Response');
      throw error;
    }
  })
}
