import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { history } = props;
  const title = history.location.pathname;
  const trueFalse = () => {
    switch (title) {
    case '/profile':
      return false;
    case '/done-recipes':
      return false;
    case '/favorite-recipes':
      return false;
    default:
      return true;
    }
  };
  const newTitle = title[1].toUpperCase() + title.substring(2);
  const temTraco = () => {
    switch (title) {
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return newTitle;
    }
  };
  const finalTitle = temTraco();
  return (
    <div>
      <h1 data-testid="page-title">{finalTitle}</h1>
      <Link to="/profile">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="profile"
        />
      </Link>
      {
        trueFalse() && <img src={ searchIcon } data-testid="search-top-btn" alt="busca" />
      }
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Header;
