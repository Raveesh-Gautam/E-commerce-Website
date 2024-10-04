import React from 'react';
import navlogo from '../../assets/Admin_Assets/nav-logo.svg';
import navProfile from '../../assets/Admin_Assets/nav-profile.svg';
import './Navbar.css';
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className='nav-logo' />
        <img src={navProfile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar