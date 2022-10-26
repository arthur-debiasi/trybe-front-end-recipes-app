import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';

export default function CardRecipes({ history }) {
  const doze = 12;
  const { apiData } = useContext(MyContext);
  const arrayRecipes = apiData.slice(0, doze);

  const type = history.location.pathname.substring(1);
  const info = type === 'drinks' ? 'Drink' : 'Meal';

  return (
    <div>
      {
        arrayRecipes.map((element, index) => (
          <div key={ element[`id${info}`] } data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ element[`str${info}Thumb`] }
              alt={ element[`str${info}`] }
            />
            <p data-testid={ `${index}-card-name` }>{element[`str${info}`]}</p>
          </div>))
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
