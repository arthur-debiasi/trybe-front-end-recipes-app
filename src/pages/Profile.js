import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

function Profile({ history }) {
  return (
    <div>
      <Header history={ history } />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Profile;
