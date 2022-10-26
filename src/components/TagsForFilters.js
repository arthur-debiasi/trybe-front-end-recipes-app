import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchByCategory,
  fetchRecipesByCategory, fetchRecipesByType } from '../services/APIfetch';
import RecipeContext from '../context/RecipeContext';

function TagsForFilters({ history }) {
  const { setApiData } = useContext(RecipeContext);
  const cinco = 5;
  const [fetchCategory, setFetchCategory] = useState([]);
  const [toggle, setToggle] = useState(false);
  const type = history.location.pathname.substring(1);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchByCategory(type);
      setFetchCategory(response);
      console.log(response);
    };
    fetch();
  }, [type]);

  const handleClickCategory = async (categoryParam) => {
    const response = await fetchRecipesByCategory(type, categoryParam);
    setApiData(response);
    setToggle(!toggle);
  };

  const fetchAndSetRecipes = async () => {
    const result = await fetchRecipesByType(type);
    // const initialRecipes = result.slice(0, INITIAL_RECIPES_TO_RENDER);
    setApiData(result);
    setToggle(!toggle);
  };
  return (
    <div>
      {
        fetchCategory.slice(0, cinco).map((e, index) => (
          <button
            onClick={
              !toggle ? () => handleClickCategory(e.strCategory) : fetchAndSetRecipes
            }
            key={ index }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
          >
            {e.strCategory}

          </button>))
      }
      <button
        onClick={ fetchAndSetRecipes }
        data-testid="All-category-filter"
        type="button"
      >
        All
      </button>
    </div>
  );
}

TagsForFilters.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.shape({
        substring: PropTypes.func,
      }),
    }),
    push: PropTypes.func,
  }),
}.isRequired;

export default TagsForFilters;
