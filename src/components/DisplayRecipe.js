import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { fetchRecipesByType } from '../services/APIfetch';

function DisplayRecipe({ history }) {
  const { location: { pathname } } = history;
  const [recipes, setRecipes] = useState([]);
  const INITIAL_RECIPES_TO_RENDER = 12;

  useEffect(() => {
    const type = pathname.substring(1);
    console.log(`Location Pathname: ${type}`);
    const fetchAndSetRecipes = async () => {
      const result = await fetchRecipesByType(type);
      const initialRecipes = result.slice(0, INITIAL_RECIPES_TO_RENDER);
      setRecipes(initialRecipes);
    };
    fetchAndSetRecipes();
  }, [pathname]);
  return (
    <section>
      {recipes.map((recipe, index) => (
        <div
          key={ recipe.idMeal || recipe.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal || recipe.strDrink}</p>
        </div>
      ))}
    </section>
  );
}

DisplayRecipe.propTypes = {
  history: PropTypes.shape,
}.isRequired;
export default DisplayRecipe;
