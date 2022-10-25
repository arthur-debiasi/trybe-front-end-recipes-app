import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import MyContext from '../context/MyContext';

function Header(props) {
  const [visibleInput, setVisibleInput] = useState(false);
  const { setInputSearch } = useContext(MyContext);
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

  const onInputSearchChenage = ({ target }) => {
    setInputSearch(target.value);
  };

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
        trueFalse() && (
          <button onClick={ () => setVisibleInput(!visibleInput) } type="button">
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="busca"
            />
          </button>
        )
      }
      {
        visibleInput && <input
          onChange={ onInputSearchChenage }
          data-testid="search-input"
          type="text"
          placeholder="Search"
        />
      }

      <SearchBar history={ history } />
    </div>

  );
}

Header.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Header;
