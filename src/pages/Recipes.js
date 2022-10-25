import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipes from '../components/CardRecipes';

function Recipes({ history }) {
  return (
    <div>
      <Header history={ history } />
      <CardRecipes history={ history } />
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Recipes;
