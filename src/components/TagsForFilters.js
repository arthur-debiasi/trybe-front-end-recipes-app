import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@mui/material';
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
    <Grid justifyContent="space-around" container spacing={ 0 }>
      {
        fetchCategory.slice(0, cinco).map((e, index) => (
          <Button
            variant="contained"
            size="small"
            onClick={
              !toggle ? () => handleClickCategory(e.strCategory) : fetchAndSetRecipes
            }
            key={ index }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
          >
            {e.strCategory}

          </Button>))
      }
      <Button
        variant="contained"
        onClick={ fetchAndSetRecipes }
        data-testid="All-category-filter"
        type="button"
      >
        All
      </Button>
    </Grid>
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
