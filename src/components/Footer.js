import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/meals">
        <Button type="button" variant="contained">
          <img src={ mealIcon } alt="meal icon" data-testid="meals-bottom-btn" />
        </Button>
      </Link>
      <Link to="/drinks">
        <Button type="button" variant="contained">
          <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
        </Button>
      </Link>
    </footer>
  );
}

export default Footer;
