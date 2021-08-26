
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <nav className='navbar navbar-container'>
      <div>'LOGO'</div>
      <ul className='navlinks-container'>
        <li>
          <NavLink to='/' exact={true} activeClassName='active' className='navbar navlink' id='home'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active' className='navbar navlink' id='login'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active' className='navbar navlink' id='signup'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active' className='navbar navlink' id='users'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
