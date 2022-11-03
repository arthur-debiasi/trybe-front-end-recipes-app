import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Stack } from '@mui/material';
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
    // <Stack  display='collumn' justifyContent='center' alignItems='center'>
    <div className="aaa">
      <RecipeProvider history={ history }>
        <Header history={ history } />
      </RecipeProvider>
      <p
        data-testid="profile-email"
      >
        {getUser
          ? (
            <Typography
              sx={ { wordWrap: 'break-word', width: '100%', marginTop: '20%' } }
              className="email-profile"
              variant="h5"
            >
              { getUser.email }

            </Typography>) : 'Email não encontrado'}
      </p>
      <Stack
        className="btns-profile"
        spacing={ 2 }
        sx={ { marginTop: '60px' } }
        direction="column"
        justifyContent="space-around"
        alignItems="space-around"
      >
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
        <Button
          className="btn-log"
          variant="contained"
          color='warning'
          size="large"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </Button>
      </Stack>
      <Footer />
    </div>
    // </Stack>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Profile;
