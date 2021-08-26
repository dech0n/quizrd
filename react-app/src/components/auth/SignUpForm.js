import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth.css'

// TODO: Make this into a modal -- less styling!
const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='auth-form' onSubmit={onSignUp}>
      <div
      className='auth-error-container'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='auth-field-container'>
        <input
          className='username-input auth-input'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        />
        <label>User Name</label>
      </div>
      <div className='email-container auth-field-container'>
        <input
          className='email-input auth-input'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          />
          <label>Email</label>
      </div>
      <div className='password-container auth-field-container'>
        <input
          className='password-input auth-input'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          />
          <label>Password</label>
      </div>
      <div className='password-container auth-field-container'>
        <input
          className='password-input auth-input'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          />
          <label>Repeat Password</label>
      </div>
      <button
        className='submit-btn auth-btn'
        id='signup-btn'
        type='submit'>Sign Up</button>
        <Link to='/sign-up'
        className='auth-link'>Already have an account?<br />Log in here!</Link>
    </form>
  );
};

export default SignUpForm;
