import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './auth.css'

// TODO: Make demo user into me!
const DemoLoginButton = () => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const onDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <button
        id='demo-login-btn'
        className='auth-btn'
        onClick={onDemoLogin}>DEMO USER</button>
      <div className='all-auth-errors-container'>
        {errors.map((error, ind) => (
          <div
            className='auth-error-container'
            key={ind}>{error}</div>
        ))}
      </div>
    </>
  )
};

export default DemoLoginButton;
