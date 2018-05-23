import React from 'react';
import Swal from 'sweetalert2';
import styles from './style.css';
import { PropTypes as PT } from 'prop-types';
import { userLogin } from '../../services/userService';
import container from './container';

const Login = (props) => {
  
    return (
      <div className={styles.center}>
        <div className={styles.card}>
          <h1>Login</h1>
          <form onSubmit={props.handleSubmit}>
            <input
              className={styles.item}
              placeholder="Email goes here..."
              name="email"
              type="text"
              onChange={props.handleChange}
            />
            <input
              className={styles.item}
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={props.handleChange}
            />
            <input className={styles.submit} value="SUBMIT" type="submit" />
          </form>
        </div>
      </div>
    );  
}

Login.propTypes = {
  handleChange: PT.function,
  handleSubmit: PT.function
};

export default container(Login);
