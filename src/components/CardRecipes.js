import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import MyContext from '../context/MyContext';
import { Link } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import RecipeContext from '../context/RecipeContext';

export default function CardRecipes({ history }) {
  const doze = 12;
  const { apiData } = useContext(RecipeContext);
  const arrayRecipes = apiData.slice(0, doze);

  const type = history.location.pathname.substring(1);
  const info = type === 'drinks' ? 'Drink' : 'Meal';

  return (
    <div className="geral-recipes">
      {
        arrayRecipes.map((element, index) => (
          <Card
            key={ index }
            className="card-recipes"
            sx={ { maxWidth: 345,
              marginBottom: '1em',
              padding: '1em',
              borderRadius: '10px' } }
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/${type}/${element[`id${info}`]}` } key={ element[`id${info}`] }>
              <img
                width="250"
                data-testid={ `${index}-card-img` }
                src={ element[`str${info}Thumb`] }
                alt={ element[`str${info}`] }
              />
            </Link>
            <Typography
              variant="h5"
              data-testid={ `${index}-card-name` }
            >
              {element[`str${info}`]}

            </Typography>
          </Card>
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
