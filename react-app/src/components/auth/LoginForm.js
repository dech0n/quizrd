import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import DemoLoginButton from './DemoLoginButton';
import { login } from '../../store/session';
import './auth.css'

// TODO: Make this into a modal -- less styling!
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='auth-form' onSubmit={onLogin}>
      <div className='all-auth-errors-container'>
        {errors.map((error, ind) => (
          <div
            className='auth-error-container'
            key={ind}>{error}</div>
        ))}
      </div>
      <div className='email-container auth-field-container form-field-container'>
        <input
          className='email-input auth-input form-input'
          name='email'
          type='text'
          // placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
        <label
          className='email-label auth-label form-label'
          htmlFor='email'>Email</label>
      </div>
      <div className='password-container auth-field-container form-field-container'>
        <input
          className='password-input auth-input form-input'
          name='password'
          type='password'
          // placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <label
          className='password-label auth-label form-label' htmlFor='password'>Password</label>
        <button
          className='submit-btn auth-btn form-btn'
          id='login-btn'
          type='submit'>Login</button>
          <p id='or'>or</p>
        <DemoLoginButton />
      </div>
      <Link to='/sign-up'
        className='auth-link'>Don't have an account?<br />Sign up here!</Link>
    </form>
  );
};

export default LoginForm;
