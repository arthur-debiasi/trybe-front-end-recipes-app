// import Proptypes from 'prop-types';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { fetchRecipesByType } from '../services/APIfetch';
import RecipeContext from './RecipeContext';

export default function RecipeProvider({ children, history }) {
  const { location: { pathname } } = history;

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const type = pathname.substring(1);
    const fetchAndSetRecipes = async () => {
      const result = await fetchRecipesByType(type);
      // const initialRecipes = result.slice(0, INITIAL_RECIPES_TO_RENDER);
      setApiData(result);
    };
    fetchAndSetRecipes();
  }, [pathname]);

  const contextValue = useMemo(() => ({
    apiData,
    setApiData,
  }), [
    apiData,
  ]);

  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node,
}.inRequired;
