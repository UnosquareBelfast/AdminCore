import decode from 'jwt-decode';

export default class LoginService {
  constructor(domain) {
    this.domain = domain || process.env.DOMAIN;
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }


  // TODO: We need to wrap our requests to check if the token is expired

  login(email, password) {
    return fetch(`${this.domain}/authentication/login`, {
      method: 'POST',
      headers: { 'content-type': 'Application/json'},
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(this._checkStatus)
      .then(response => response.json())
      .then(res => {
        this.setUserEmail(email);
        this.setToken(res.accessToken);
        return Promise.resolve(res);
      });
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return (decoded.exp < Date.now() / 1000);
    }
    catch (err) {
      return false;
    }
  }

  setUserEmail(email) {
    localStorage.setItem('user_email', email);
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  getProfile() {
    return decode(this.getToken());
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
