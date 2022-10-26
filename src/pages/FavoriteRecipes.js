import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import RecipeProvider from '../context/RecipeProvider';

function FavoriteRecipes({ history }) {
  return (
    <div>
      <RecipeProvider history={ history }>
        <Header history={ history } />
      </RecipeProvider>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default FavoriteRecipes;
