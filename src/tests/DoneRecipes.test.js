import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

test('Favorite test', () => {
  renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  act(() => history.push('/done-recipes'));
  const allFilter = screen.getByTestId('filter-by-all-btn');
  const mealFilter = screen.getByTestId('filter-by-meal-btn');
  const drinkFilter = screen.getByTestId('filter-by-drink-btn');

  expect(allFilter).toBeDefined();
  expect(mealFilter).toBeDefined();
  expect(drinkFilter);

  userEvent.click(allFilter);
  userEvent.click(mealFilter);
  userEvent.click(drinkFilter);
});
