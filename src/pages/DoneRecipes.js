import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import RecipeProvider from '../context/RecipeProvider';

function DoneRecipes({ history }) {
  return (
    <div>
      <RecipeProvider history={ history }>
        <Header history={ history } />
      </RecipeProvider>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default DoneRecipes;
