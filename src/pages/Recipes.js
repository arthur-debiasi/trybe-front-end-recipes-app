import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import DisplayRecipe from '../components/DisplayRecipe';
import CardRecipes from '../components/CardRecipes';
import TagsForFilters from '../components/TagsForFilters';
import RecipeProvider from '../context/RecipeProvider';

function Recipes({ history }) {
  return (
    <RecipeProvider history={ history }>
      <Header history={ history } />
      <TagsForFilters history={ history } />
      {/* <DisplayRecipe history={ history } /> */}
      <CardRecipes history={ history } />

      <Footer />
    </RecipeProvider>
  );
}

Recipes.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Recipes;
