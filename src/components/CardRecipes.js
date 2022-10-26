import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import MyContext from '../context/MyContext';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function CardRecipes({ history }) {
  const doze = 12;
  const { apiData } = useContext(RecipeContext);
  const arrayRecipes = apiData.slice(0, doze);

  const type = history.location.pathname.substring(1);
  const info = type === 'drinks' ? 'Drink' : 'Meal';

  return (
    <div>
      {
        arrayRecipes.map((element, index) => (
          <Link to={ `/${type}/${element[`id${info}`]}` } key={ element[`id${info}`] }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ element[`str${info}Thumb`] }
                alt={ element[`str${info}`] }
              />
              <p data-testid={ `${index}-card-name` }>{element[`str${info}`]}</p>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

CardRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.shape({
        substring: PropTypes.func,
      }),
    }),
    push: PropTypes.func,
  }),
}.isRequired;
