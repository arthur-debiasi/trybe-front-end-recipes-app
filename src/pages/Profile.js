import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ history }) {
  return (
    <div>
      <Header history={ history } />
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Profile;
