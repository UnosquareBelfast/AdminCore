import React from 'react';
import Swal from 'sweetalert2';
import styles from './style.css';
import LoginService from './LoginService';
import { userLogin } from '../../services/userService';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.Auth = new LoginService();
  }
  render() {
    return (
      <div className={styles.center}>
        <div className={styles.card}>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className={styles.item}
              placeholder="Email goes here..."
              name="email"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className={styles.item}
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input className={styles.submit} value="SUBMIT" type="submit" />
          </form>
        </div>
      </div>
    );
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    userLogin(this.state.email, this.state.password)
      .then(() => {
        this.props.history.replace('/');
      })
      .catch(error => {
        Swal({ title: 'Could not log in', text: error.message, type: 'error' });
      });
  }
}

export default Login;
