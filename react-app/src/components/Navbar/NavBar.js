
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navbar.css'

const NavBar = () => {
  return (
    <nav className='navbar navbar-container'>
      <div id='logo'>[****LOGO****]</div>
      <ul className='all-navlinks-container'>
        <li className='navlink-container'>
          <NavLink to='/' exact={true} activeClassName='active' className='navbar navlink' id='home'>
            Home
          </NavLink>
        </li>
        <li className='navlink-container'>
          <NavLink to='/login' exact={true} activeClassName='active' className='navbar navlink' id='login'>
            Login
          </NavLink>
        </li>
        <li className='navlink-container'>
          <NavLink to='/sign-up' exact={true} activeClassName='active' className='navbar navlink' id='signup'>
            Sign Up
          </NavLink>
        </li>
        {/* <li className='navlink-container'>
          <NavLink to='/users' exact={true} activeClassName='active' className='navbar navlink' id='users'>
            Users
          </NavLink>
        </li> */}
        <li className='navlink-container' id='logout-btn-container'>
          <LogoutButton id='logout'/>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
