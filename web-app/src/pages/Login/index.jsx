import React from 'react';
import { PropTypes as PT } from 'prop-types';
import styles from './style.css';
import container from './container';

export const Login = props => {
  return (
    <div className={styles.center}>
      <div className={styles.card}>
        <h1>Login</h1>
        <form id="loginForm" onSubmit={props.handleSubmit}>
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
};

Login.propTypes = {
  handleChange: PT.func,
  handleSubmit: PT.func,
};

export default container(Login);
