import React, { useState, useEffect } from 'react';
import { fetchDetais } from '../services/APIfetch';

function RecipeDetails({ history }) {
  const [recipe, setRecipe] = useState({});
  const [trueFalse, setTrue] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  useEffect(() => {
    const getId = async () => {
      const path = history.location.pathname;
      const UM = 1;
      const SEIS = 6;
      const SETE = 7;
      const OITO = 8;
      const type = path.substring(UM, SEIS);
      if (type === 'meals') {
        const idMeals = path.substring(SETE);
        const responseMeals = await fetchDetais(idMeals, 'meals');
        setRecipe(responseMeals.meals);
        console.log(responseMeals.meals);
        const entries = Object.entries(responseMeals.meals[0]);
        const filteredIngredients = entries.filter((e) => e[0].includes('strIngredient')).filter((e) => e[1] !== '');
        const filteredMeasures = entries.filter((e) => e[0].includes('strMeasure')).filter((e) => e[1] !== '');
        setIngredients(filteredIngredients);
        setMeasures(filteredMeasures);
        console.log(filteredIngredients, filteredMeasures);
        setTrue(true);
      }
      if (type !== 'meals') {
        const idDrinks = path.substring(OITO);
        const response = await fetchDetais(idDrinks, 'drinks');
        setRecipe(response.drinks);
        setTrue(true);
      }
    };
    getId();
  }, []);
  console.log(recipe);
  return (
    <div>
      <h1 data-testid="recipe-details">RecipeDetails</h1>
      {
        trueFalse
         && <div>
           <img data-testid="recipe-photo" src={ recipe[0].strMealThumb } />
           <h2 data-testid="recipe-title">{recipe[0].strMeal}</h2>
           <p>{recipe[0].strCategory}</p>
           <text data-testid="recipe-category">{recipe[0].strInstructions}</text>
           <ul>
            {
              ingredients.map((i, index) => {
                return (
                  <li data-testid={`${index}-ingredient-name-and-measure`}>{`${i[1]} (${measures[index][1]})`}</li>
                )
              })
            }
           </ul>
           <iframe
             data-testid="video"
             width="420"
             height="315"
             src={ recipe[0].strYoutube }
           />
            </div>
      }
    </div>
  );
}

export default RecipeDetails;
