import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { fetchDetais } from '../services/APIfetch';

function RecipeDetails({ history }) {
  const [recipe, setRecipe] = useState({});
  const [trueFalse, setTrue] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const path = history.location.pathname;
  const UM = 1;
  const SEIS = 6;
  const SETE = 7;
  const OITO = 8;
  const type = path.substring(UM, SEIS);
  useEffect(() => {
    const getId = async () => {
      if (type === 'meals') {
        const idMeals = path.substring(SETE);
        const responseMeals = await fetchDetais(idMeals, 'meals');
        setRecipe(responseMeals);
        console.log(responseMeals);
        const entries = Object.entries(responseMeals[0]);
        const filteredIngredients = entries
          .filter((e) => e[0].includes('strIngredient')).filter((e) => e[1] !== '');
        const filteredMeasures = entries
          .filter((e) => e[0].includes('strMeasure')).filter((e) => e[1] !== '');
        setIngredients(filteredIngredients);
        setMeasures(filteredMeasures);
        console.log(filteredIngredients, filteredMeasures);
        setTrue(true);
      }
      if (type !== 'meals') {
        const idDrinks = path.substring(OITO);
        const response = await fetchDetais(idDrinks, 'drinks');
        setRecipe(response);
        const entries = Object.entries(response[0]);
        // console.log(entries[3][1]);
        const filteredIngredients = entries
          .filter((e) => e[0].includes('strIngredient')).filter((e) => e[1] !== null);
        const filteredMeasures = entries
          .filter((e) => e[0].includes('strMeasure')).filter((e) => e[1] !== 'null');
        setIngredients(filteredIngredients);
        setMeasures(filteredMeasures);
        console.log(filteredIngredients, filteredMeasures);
        setTrue(true);
      }
    };
    getId();
  }, [history.location.pathname, path, type]);
  console.log(recipe);
  return (
    <div>
      <h1 data-testid="recipe-details">RecipeDetails</h1>
      {
        trueFalse
         && (
           <div>
             <img
               data-testid="recipe-photo"
               src={ recipe[0].strMealThumb || recipe[0].strDrinkThumb }
               alt={ recipe[0].strMeal || recipe[0].strDrink }
             />
             <h2
               data-testid="recipe-title"
             >
               { recipe[0].strMeal || recipe[0].strDrink }
             </h2>
             <p
               data-testid="recipe-category"
             >
               {recipe[0].strAlcoholic || recipe[0].strCategory }
             </p>
             <text data-testid="instructions">{recipe[0].strInstructions}</text>
             <ul>
               {
                 ingredients.map((i, index) => (
                   <li
                     key={ i[1] }
                     data-testid={ `${index}-ingredient-name-and-measure` }
                   >
                     {`${i[1]} ${measures[index][1] || ''}`}

                   </li>
                 ))
               }
             </ul>
             {type === 'meals' && (
               <iframe
                 title={ recipe[0].strMeal || recipe[0].strDrink }
                 data-testid="video"
                 width="420"
                 height="315"
                 src={ recipe[0].strYoutube }
               />
             )}
           </div>
         )
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.shape({
        substring: PropTypes.func,
      }),
    }),
  }),
}.isRequired;

export default RecipeDetails;
