import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipeProvider from '../context/RecipeProvider';
import { getLocalStorage } from '../services/APIfetch';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes({ history }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const getDones = getLocalStorage('doneRecipes', []);
    setDoneRecipes(getDones);
  }, []);

  const handleShare = (type, id) => {
    setLinkCopied(true);
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
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
          doneRecipes.filter((element) => {
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
                {
                  linkCopied && <p data-testid="copied-msg">Link copied!</p>
                }
                <ul>
                  {
                    r.tags.map((tag) => (
                      <li
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        key={ tag }
                      >
                        {tag}

                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
        }
      </RecipeProvider>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default DoneRecipes;
