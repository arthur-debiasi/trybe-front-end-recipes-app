import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Typography, Stack } from '@mui/material';
import Header from '../components/Header';
import RecipeProvider from '../context/RecipeProvider';
import { getLocalStorage } from '../services/APIfetch';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/FavoriteRecipes.css';

function FavoriteRecipes({ history }) {
  const [favRecipes, setFavRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const getFavorites = getLocalStorage('favoriteRecipes', []);
    setFavRecipes(getFavorites);
  }, []);

  const handleShare = (type, id) => {
    setLinkCopied(true);
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
  };

  const handleDesfavorite = (r) => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorited = favorited.filter((e) => e.id !== r.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorited));
    setFavRecipes(newFavorited);
  };

  return (
    <div>
      <RecipeProvider history={ history }>
        <Header history={ history } />
        <div className="filters">
          <Button
            variant="contained"
            size="medium"
            onClick={ () => setFilter('drinks') }
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={ () => setFilter('meals') }
            type="button"
            data-testid="filter-by-meal-btn"
          >
            Meals
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={ () => setFilter('all') }
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </Button>
        </div>
        <div className="favorite-cards">
          {
            favRecipes.filter((element) => {
              switch (filter) {
              case 'meals': return element.type === 'meal';
              case 'drinks': return element.type === 'drink';
              default: return element;
              }
            })
              .map((r, index) => (
                <Card
                  className="card"
                  key={ index }
                  sx={ { maxWidth: 345,
                    marginBottom: '1em',
                    padding: '1em',
                    borderRadius: '10px' } }
                >
                  <Link to={ `/${r.type}s/${r.id}` }>
                    <img
                      className="card-image"
                      alt={ r.id }
                      src={ r.image }
                      width="250px"
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                  <Link to={ `/${r.type}s/${r.id}` }>
                    <Typography
                      className="name-link"
                      variant="h4"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {r.name}
                    </Typography>
                  </Link>
                  {
                    r.type === 'meal' ? (
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        {`${r.nationality} - ${r.category}`}
                      </p>)
                      : (
                        <p
                          data-testid={ `${index}-horizontal-top-text` }
                        >
                          {r.alcoholicOrNot}
                        </p>)
                  }
                  <p data-testid={ `${index}-horizontal-done-date` }>{r.doneDate}</p>
                  <Stack
                    direction="row"
                    spacing={ 2 }
                  >
                    <Button
                      variant="contained"
                      type="button"
                      onClick={ () => handleShare(r.type, r.id) }
                      data-testid="share-btn"
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        alt="Share Icon"
                        src={ shareIcon }
                      />
                    </Button>
                    <Button
                      variant="contained"
                      type="button"
                      onClick={ () => handleDesfavorite(r) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        alt="favorite-link"
                      />
                    </Button>
                  </Stack>
                  {
                    linkCopied && <p>Link copied!</p>
                  }
                </Card>
              ))
          }
        </div>
      </RecipeProvider>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default FavoriteRecipes;
