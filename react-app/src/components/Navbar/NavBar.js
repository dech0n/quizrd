
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav className='navbar navbar-container'>
        <img id='logo' src='public/images/logo_wizard-red.png' alt='logo' />
        <span id='logo-title'>QUIZRD</span>
      <ul className='all-navlinks-container'>
        {!user ? (
          <>
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
          </>
        ) : (
          <>
            <li className='navlink-container'>
              <NavLink to='/' exact={true} activeClassName='active' className='navbar navlink' id='home'>
                Home
              </NavLink>
            </li>
            <li className='navlink-container' id='logout-btn-container'>
              <LogoutButton id='logout-btn' />
            </li>
          </>
        )
        }
        {/* <li className='navlink-container'>
          <NavLink to='/users' exact={true} activeClassName='active' className='navbar navlink' id='users'>
            Users
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
