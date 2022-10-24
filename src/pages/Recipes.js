import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

function Recipes({ history }) {
  return (
    <div>
      <Header history={ history } />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Recipes;
