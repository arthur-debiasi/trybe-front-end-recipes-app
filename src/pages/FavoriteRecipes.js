import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes({ history }) {
  return (
    <div>
      <Header history={ history } />
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default FavoriteRecipes;
