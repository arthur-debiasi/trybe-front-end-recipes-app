import React, { useEffect } from 'react';
import profileIcon from '../images/profileIcon.svg'
import searchIcon from '../images/searchIcon.svg'

function Header(props) {
  useEffect(() => {
    const { history } = props
    
  })
  return (
    <div>
      <h1 data-testid='page-title'>Title</h1>
      <img src={profileIcon} data-testid='profile-top-btn' alt='profile'/>
      <img src={searchIcon} data-testid='profile-top-btn' alt='search'/>
    </div>
  );
}

export default Header;
