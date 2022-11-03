import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchDetais, fetchGetTypeInvert } from '../services/APIfetch';
import MyContext from '../context/MyContext';
import RecommendationCard from '../components/RecommendationCard';
import './RecipesDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import logozinho from '../images/logozinho.png';

function RecipeDetails({ history }) {
  const [recipe, setRecipe] = useState({});
  const [trueFalse, setTrue] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [recipeId, setRecipeId] = useState('');
  const [isInProgress, setIsInProgress] = useState(false);
  const [isCliped, setIsCliped] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const { setApiForType } = useContext(MyContext);

  const path = history.location.pathname;
  const typeMelsDrink = history.location.pathname.substring(1).includes('meals')
    ? 'meals' : 'drinks';
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
        const entries = Object.entries(responseMeals[0]);
        const filteredIngredients = entries
          .filter((e) => e[0].includes('strIngredient'))
          .filter((e) => e[1] !== '' && e[1] !== null);
        const filteredMeasures = entries
          .filter((e) => e[0].includes('strMeasure'));
        setIngredients(filteredIngredients);
        setMeasures(filteredMeasures);
        setTrue(true);
        setRecipeId(responseMeals[0].idMeal);
      }
      if (type !== 'meals') {
        const idDrinks = path.substring(OITO);
        const response = await fetchDetais(idDrinks, 'drinks');
        setRecipe(response);
        const entries = Object.entries(response[0]);
        const filteredIngredients = entries
          .filter((e) => e[0].includes('strIngredient'))
          .filter((e) => e[1] !== '' && e[1] !== null);
        const filteredMeasures = entries
          .filter((e) => e[0].includes('strMeasure'));
        setIngredients(filteredIngredients);
        setMeasures(filteredMeasures);
        setTrue(true);
        setRecipeId(response[0].idDrink);
      }
    };

    const response = async () => {
      const data = await fetchGetTypeInvert(typeMelsDrink);
      setApiForType(data);
    };
    response();
    getId();
  }, [history.location.pathname, path, setApiForType, type, typeMelsDrink]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const inProgressRecipes = !localStorage.getItem('inProgressRecipes')
      ? { drinks: {}, meals: {} } : JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isProgress = inProgressRecipes[typeMelsDrink];
    const isDone = doneRecipes.some((e) => e.id === recipeId);
    setIsInProgress(Object.keys(isProgress).includes(recipeId));
    setIsRecipeDone(isDone);
  }, [isInProgress, recipe, recipeId, typeMelsDrink]);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const isRecipeFavorited = favoriteRecipes.some((e) => e.id === recipeId);
    setIsFavorited(isRecipeFavorited);
  }, [recipeId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCliped(true);
  };

  const handleFavoriteBtn = () => {
    const idRecipe = typeMelsDrink === 'meals' ? 'idMeal' : 'idDrink';
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const newFavoriteRecipes = [...favoriteRecipes, {
      id: recipe[0][idRecipe],
      type: typeMelsDrink === 'meals' ? 'meal' : 'drink',
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory || '',
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      name: recipe[0].strDrink || recipe[0].strMeal,
      image: recipe[0].strDrinkThumb || recipe[0].strMealThumb,
    }];
    if (!isFavorited) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setIsFavorited(true);
    } else {
      const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavorited = favorited.filter((e) => e.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorited));
      setIsFavorited(false);
    }
  };
  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={ 0.5 }
      >
        <Link to="/meals">
          <img src={ logozinho } alt="logo" width="80px" />
        </Link>
        <Typography variant="h5" data-testid="recipe-details">Recipe Details</Typography>
        <Stack
          direction="column"
          spacing={ 0.2 }
        >
          <Button
            variant="contained"
            type="button"
            onClick={ handleShare }
            data-testid="share-btn"
          >
            <img
              src={ shareIcon }
              alt="share-link"
            />
          </Button>
          <Typography
            variant="p"
            sx={ { fontSize: '0.8em' } }
          >
            {isCliped && 'Link copied!'}
          </Typography>
          <Button
            variant="contained"
            type="button"
            onClick={ handleFavoriteBtn }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
              alt="favorite-link"
            />

          </Button>
        </Stack>
      </Stack>
      {
        trueFalse
         && (
           <div>
             <img
               data-testid="recipe-photo"
               src={ recipe[0].strMealThumb || recipe[0].strDrinkThumb }
               alt={ recipe[0].strMeal || recipe[0].strDrink }
               width="350"
             />
             <Typography
               variant="h4"
               data-testid="recipe-title"
             >
               { recipe[0].strMeal || recipe[0].strDrink }
             </Typography>
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
                 width="350"
                 height="300"
                 src={ `https://www.youtube.com/embed/${recipe[0].strYoutube.split('watch?v=')[1]}` }
               />
             )}
           </div>
         )
      }
      {
        !isRecipeDone && (
          <Button
            variant="contained"
            color="primary"
            className="startRecipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/${typeMelsDrink}/${recipeId}/in-progress`) }
          >
            {

              isInProgress ? 'Continue Recipe' : 'Start Recipe'
            }

          </Button>
        )

      }
      <div className="scrolling">
        <RecommendationCard />
      </div>
    </Stack>
  );
}

RecipeDetails.propTypes = { history: PropTypes.shape }.isRequired;
export default RecipeDetails;
