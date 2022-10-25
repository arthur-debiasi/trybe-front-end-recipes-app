import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DisplayRecipe from '../components/DisplayRecipe';
/*
 As receitas devem ser carregadas ao inicializar a página.
 Caso as receitas sejam de comidas, deve-se carregar as 12 primeiras receitas obtidas através do endpoint `https://www.themealdb.com/api/json/v1/1/search.php?s=`
 Caso as receitas sejam de bebidas, deve-se carregar as 12 primeiras receitas obtidas através do endpoint `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
 O card deve ter o `data-testid="${index}-recipe-card"`
 A foto (`strMealThumb` ou `strDrinkThumb`) deve ter o `data-testid="${index}-card-img"`
 O nome (`strMeal` ou `strDrink`) deve ter o `data-testid="${index}-card-name"`

- A tela tem os data-testids de todos os 12 cards da tela de comidas
- Caso as receitas sejam de comida, deve-se carregar as 12 primeiras receitas
- A tela tem os data-testids de todos os 12 cards da tela de bebidas
- Caso as receitas sejam de bebida, deve-se carregar as 12 primeiras receitas
 */

function Recipes({ history }) {
  return (
    <div>
      <Header history={ history } />
      <DisplayRecipe history={ history } />
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Recipes;
