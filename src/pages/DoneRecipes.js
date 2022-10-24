import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

function DoneRecipes({ history }) {
  return (
    <div>
      <Header history={ history } />
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default DoneRecipes;
