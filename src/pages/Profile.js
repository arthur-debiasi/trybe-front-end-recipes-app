import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeProvider from '../context/RecipeProvider';
import '../css/Profile.css';

function Profile(props) {
  const getUser = JSON.parse(localStorage.getItem('user'));
  const { history } = props;
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <div>
      <RecipeProvider history={ history }>
        <Header history={ history } />
      </RecipeProvider>
      <p
        data-testid="profile-email"
      >
        {getUser ? <Typography className='email-profile' variant='h4'>{ getUser.email }</Typography> : 'Email não encontrado'}
      </p>

      <div className='btns-profile'>
        <Link to="/done-recipes">
          <Button
            variant="contained"
            size="medium"
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes

          </Button>
        </Link>
        <Link to="/favorite-recipes">
          <Button
            variant="contained"
            size="medium"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes

          </Button>
        </Link>
        </div>
        <Button
        className='btn-logout'
          variant="contained"
          size="medium"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </Button>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Profile;
