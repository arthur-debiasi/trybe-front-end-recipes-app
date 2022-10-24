import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MyProvider from './context/MyProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route path="/meals/:id" component={ RecipeDetails } />
          <Route path="/drinks/:id" component={ RecipeDetails } />
          <Route path="/meals" component={ Recipes } />
          <Route path="/drinks" component={ Recipes } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
