import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipeProvider from '../context/RecipeProvider';
import { getLocalStorage } from '../services/APIfetch';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes({ history }) {
  const [favRecipes, setFavRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const getFavorites = getLocalStorage('favoriteRecipes', []);
    setFavRecipes(getFavorites);
  }, []);

  const handleShare = (type, id) => {
    console.log(id);
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setLinkCopied(true);
  };

  const handleDesfavorite = (r) => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorited = favorited.filter((e) => e.id !== r.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorited));
    setFavRecipes(newFavorited);
  };

  return (
    <div>
      <RecipeProvider history={ history }>
        <Header history={ history } />
        <button
          onClick={ () => setFilter('drinks') }
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        <button
          onClick={ () => setFilter('meals') }
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ () => setFilter('all') }
          type="button"
          data-testid="filter-by-all-btn"

        >
          All
        </button>
        {
          favRecipes.filter((element) => {
            switch (filter) {
            case 'meals': return element.type === 'meal';
            case 'drinks': return element.type === 'drink';
            default: return element;
            }
          })
            .map((r, index) => (
              <div key={ index }>
                <Link to={ `/${r.type}s/${r.id}` }>
                  <img
                    alt={ r.id }
                    src={ r.image }
                    width="250px"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <Link to={ `/${r.type}s/${r.id}` }>
                  <div>
                    <p data-testid={ `${index}-horizontal-name` }>{r.name}</p>
                  </div>
                </Link>
                {
                  r.type === 'meal' ? (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {`${r.nationality} - ${r.category}`}
                    </p>)
                    : (
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {r.alcoholicOrNot}
                      </p>)
                }
                <p data-testid={ `${index}-horizontal-done-date` }>{r.doneDate}</p>
                <button
                  type="button"
                  onClick={ () => handleShare(r.type, r.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    alt="Share Icon"
                    src={ shareIcon }
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => handleDesfavorite(r) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="favorite-link"
                  />

                </button>
                {
                  linkCopied && <p>Link copied!</p>
                }
              </div>
            ))
        }
      </RecipeProvider>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default FavoriteRecipes;
