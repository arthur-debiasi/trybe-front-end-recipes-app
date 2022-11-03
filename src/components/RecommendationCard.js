import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function RecommendationCard({ type }) {
  const { apiForType } = useContext(MyContext);
  const seis = 6;
  return (
    <div>
      <Typography variant="h5">
        {`${type === 'meals' ? 'Drink' : 'Meal'} recomendations!`}
      </Typography>
      <div data-testid="div-card" className="divCard">
        {
          apiForType.slice(0, seis).map((e, index) => (
            <Card
              sx={ { textAlign: 'center', width: '174px', marginRight: '2px' } }
              className="card"
              key={ e.idMeal || e.idDrink }
              data-testid={ `${index}-recommendation-card` }
            >
              <h2 data-testid={ `${index}-recommendation-title` }>
                {e.strMeal || e.strDrink}
                {' '}
              </h2>
            </Card>))
        }
      </div>
    </div>
  );
}

RecommendationCard.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default RecommendationCard;
