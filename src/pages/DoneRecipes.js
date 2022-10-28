import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeProvider from '../context/RecipeProvider';
import { getLocalStorage } from '../services/APIfetch';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes({ history }) {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const getDones = getLocalStorage('doneRecipes', []);
    setDoneRecipes(getDones);
  }, []);

  const handleShare = (type, id) => {
    console.log(id);
    clipboardCopy(`http://localhost:3000/${type}/${id}`);
  };

  return (
    <div>
      <RecipeProvider history={ history }>
        <Header history={ history } />
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          All
        </button>
        {
          doneRecipes.map((r, index) => (
            <div key={ index }>
              <img
                alt={ r.id }
                src={ r.image }
                data-testid={ `${index}-horizontal-image` }
              />
              {
                r.type === 'meals' ? (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${r.category} ${r.nationality}`}
                  </p>)
                  : (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {r.alcoholicOrNot}
                    </p>)
              }
              <p data-testid={ `${index}-horizontal-name` }>{r.name}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{r.doneDate}</p>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleShare(r.type, r.id) }
              >
                <img alt="Share Icon" src={ shareIcon } />
              </button>
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
