import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { isEmpty } from 'lodash';

import css from './LoginView.module.scss';

export const LoginView = ({ setIsLoggedIn }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState({});

  const getIsValidEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val);

  const handleEmailChange = e => {
    setErrors({});
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setErrors({});
    setPassword(e.target.value);
  };

  const getFormIsValid = () => {
    const errorObj = {};

    if (email && !getIsValidEmail(email)) {

      errorObj.email = 'Please enter a valid email address.';
    }

    if (!email) {
      errorObj.email = 'Required';
    }

    if (!password) {
      errorObj.password = 'Required';
    }

    setErrors(errorObj);

    return isEmpty(errorObj);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!getFormIsValid()) {
      return false;
    }

    setIsLoggedIn(true);
    return true;
  };

  return (
    <div>
      <header className={css.header}>
        <h2>Welcome</h2>
      </header>
      <div className={css.page}>
        <h1>Login</h1>
        <form noValidate onSubmit={handleSubmit}>
          <div className={css.fieldWrapper}>
            <label htmlFor="email" />
            <input
              id="email"
              className={css.fieldInput}
              type="email" value={email}
              placeholder="Email"
              onChange={handleEmailChange}
            />
            {errors.email && (
              <p className={css.errorText}>{errors.email}</p>
            )}
          </div>
          <div className={css.fieldWrapper}>
            <label htmlFor="password" />
            <input
              id="password"
              className={css.fieldInput}
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <p className={css.errorText}>{errors.password}</p>
            )}
          </div>
          <div className={css.buttonWrapper}>
            <button className={css.loginButton} type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

LoginView.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};
