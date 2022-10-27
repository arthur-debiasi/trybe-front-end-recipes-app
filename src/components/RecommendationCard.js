import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function RecommendationCard() {
  const { apiForType } = useContext(MyContext);
  const seis = 6;
  return (
    <div>
      {
        apiForType.slice(0, seis).map((e, index) => (
          <div
            className="card"
            key={ e.idMeal || e.idDrink }
            data-testid={ `${index}-recommendation-card` }
          >
            <h2 data-testid={ `${index}-recommendation-title` }>
              {e.strMeal || e.strDrink}
              {' '}
            </h2>
          </div>))
      }
    </div>
  );
}

export default RecommendationCard;
