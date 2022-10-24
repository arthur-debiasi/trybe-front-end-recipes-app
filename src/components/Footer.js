import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/meals">
        <img src={ mealIcon } alt="meal icon" data-testid="meals-bottom-btn" />
      </Link>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
