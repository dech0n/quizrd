import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import './auth.css'

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <button id='logout-btn' className='auth-btn' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
