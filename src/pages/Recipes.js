import React, { useEffect } from 'react';
import Header from '../components/Header';

function Recipes(props) {
  useEffect(() => {
    const { history } = props
    console.log(history.location)
  })
  return (
    <div>
      <Header history={history} />
    </div>
  );
}

export default Recipes;
