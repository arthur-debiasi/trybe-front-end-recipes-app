import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import clipboardCopy from 'clipboard-copy';
import { fetchDetais, fetchGetTypeInvert, setLocalStorage,
  getLocalStorage } from '../services/APIfetch';
import MyContext from '../context/MyContext';
import RecommendationCard from '../components/RecommendationCard';
import './RecipesDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';

function RecipeInProgress({ history }) {
  const [recipe, setRecipe] = useState({});
  const [trueFalse, setTrue] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [recipeId, setRecipeId] = useState('');
  const [isInProgress, setIsInProgress] = useState(false);
  const [isCliped, setIsCliped] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [checked, setChecked] = useState([]);
  const { setApiForType } = useContext(MyContext);

  const filtFunc = (meals) => {
    const entries = Object.entries(meals);
    const filteredIngredients = entries
      .filter((e) => e[0].includes('strIngredient'))
      .filter((e) => e[1] !== '' && e[1] !== null);
    const filteredMeasures = entries
      .filter((e) => e[0].includes('strMeasure'));
    setIngredients(filteredIngredients);
    setMeasures(filteredMeasures);
    setTrue(true);
  };

  const { pathname } = history.location;
  const type = pathname.split('/')[1];
  const idRecipe = pathname.split('/')[2];
  const recipeKey = type === 'meals' ? 'idMeal' : 'idDrink';
  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetchDetais(idRecipe, type);
      setRecipe(response[0]);
      filtFunc(response[0]);
      setRecipeId(response[0][recipeKey]);
    };

    const response = async () => {
      const data = await fetchGetTypeInvert(type);
      setApiForType(data);
    };
    response();
    getRecipe();
  }, [history.location.pathname, pathname, setApiForType, idRecipe, recipeKey, type]);

  useEffect(() => {
    const doneRecipes = getLocalStorage('doneRecipes', []);
    const inProgressRecipes = getLocalStorage('inProgressRecipes', {
      drinks: {}, meals: {},
    });
    const array = inProgressRecipes[type][recipeId];
    setChecked(array || []);
    const isProgress = inProgressRecipes[type];
    const isDone = doneRecipes.some((e) => e.id === recipeId);
    setIsInProgress(Object.keys(isProgress).includes(recipeId));
    setIsRecipeDone(isDone);
  }, [isInProgress, recipe, recipeId, type]);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const isRecipeFavorited = favoriteRecipes.some((e) => e.id === recipeId);
    setIsFavorited(isRecipeFavorited);
  }, [recipeId]);

  const handleShare = () => {
    clipboardCopy(`http://localhost:3000/${type}/${recipeId}`);
    setIsCliped(true);
  };

  const handleIngredientClick = (i) => {
    let markedIngredients = [];
    if (checked.includes(i[1])) {
      markedIngredients = checked.filter((e) => e !== i[1]);
    } else {
      markedIngredients = [...checked, i[1]];
    }
    setChecked(markedIngredients);
    const actualInProgress = getLocalStorage('inProgressRecipes', {
      drinks: {}, meals: {},
    });
    const newInProgress = {
      ...actualInProgress,
      [type]: {
        ...actualInProgress[type],
        [recipeId]: markedIngredients,
      },
    };
    setLocalStorage('inProgressRecipes', newInProgress);
  };
  const handleFavoriteBtn = () => {
    const favoriteRecipes = getLocalStorage('favoriteRecipes', []);
    const newFavoriteRecipes = [...favoriteRecipes, {
      id: recipe[recipeKey],
      type: type === 'meals' ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strDrink || recipe.strMeal,
      image: recipe.strDrinkThumb || recipe.strMealThumb,
    }];
    if (!isFavorited) {
      setLocalStorage('favoriteRecipes', newFavoriteRecipes);
      setIsFavorited(true);
    } else {
      const newFavorited = getLocalStorage('favoriteRecipes', [])
        .filter((e) => e.id !== recipeId);
      setLocalStorage('favoriteRecipes', newFavorited);
      setIsFavorited(false);
    }
  };
  // if (recipe.strTags) console.log(recipe.strTags.split(', '));
  const handleFinishbtn = () => {
    const date = new Date();
    const doneRecipes = getLocalStorage('doneRecipes', []);
    const newDoneRecipes = [...doneRecipes, {
      id: recipe[recipeKey],
      type: type === 'meals' ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strDrink || recipe.strMeal,
      image: recipe.strDrinkThumb || recipe.strMealThumb,
      doneDate: date,
      tags: recipe.strTags
        .split(','),
    }];
    console.log(newDoneRecipes);
    setLocalStorage('doneRecipes', newDoneRecipes);
    history.push('/done-recipes');
  };
  return (
    <div>
      <h1 data-testid="recipe-in-progress">Recipe in Progress</h1>
      <button type="button" onClick={ handleShare } data-testid="share-btn">
        <img src={ shareIcon } alt="share-link" />
      </button>
      {isCliped && 'Link copied!'}
      <button type="button" onClick={ handleFavoriteBtn }>
        <img
          data-testid="favorite-btn"
          src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-link"
        />
      </button>
      {
        trueFalse
         && (
           <div>
             <img
               data-testid="recipe-photo"
               src={ recipe.strMealThumb || recipe.strDrinkThumb }
               alt={ recipe.strMeal || recipe.strDrink }
             />
             <h2
               data-testid="recipe-title"
             >
               { recipe.strMeal || recipe.strDrink }
             </h2>
             <p
               data-testid="recipe-category"
             >
               {recipe.strAlcoholic || recipe.strCategory }
             </p>
             <text data-testid="instructions">{recipe.strInstructions}</text>
             <ul>
               { ingredients.map((i, index) => {
                 const isChecked = checked.some((e) => e === i[1]);
                 return (
                   <li key={ i[1] }>
                     <label
                       htmlFor="ingredient"
                       data-testid={ `${index}-ingredient-step` }
                       className={ isChecked === true
                         ? 'finished'
                         : 'unfinished' }
                     >
                       <input
                         type="checkbox"
                         checked={ isChecked }
                         name="ingredient"
                         onClick={ () => handleIngredientClick(i) }
                       />
                       {`${i[1]} ${measures[index][1] || ''}`}
                     </label>
                   </li>
                 );
               })}
             </ul>
             {type === 'meals' && (
               <iframe
                 title={ recipe.strMeal || recipe.strDrink }
                 data-testid="video"
                 width="420"
                 height="315"
                 src={ recipe.strYoutube }
               />
             )}
           </div>
         )
      }
      { !isRecipeDone && (

        <button
          className="startRecipe"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ checked.length !== ingredients.length }
          onClick={ handleFinishbtn }
        >
          Finish
        </button>

      )}
      <div className="scrolling"><RecommendationCard /></div>
    </div>
  );
}
RecipeInProgress.propTypes = { history: PropTypes.shape }.isRequired;
export default RecipeInProgress;
