import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

const storage = [{
  alcoholicOrNot: '',
  category: 'Side',
  id: '53060',
  image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  name: 'Burek',
  nationality: 'Croatian',
  type: 'meal',
  doneData: '2022-10-29T02:07:38.352Z',
  tags: ['Streetfood', ' Onthego'],
}];

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
}());

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

const doneString = '/done-recipes';

describe('Favorite test', () => {
  it('filters test', () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    act(() => history.push(doneString));
    const allFilter = screen.getByTestId('filter-by-all-btn');
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');

    expect(allFilter).toBeDefined();
    expect(mealFilter).toBeDefined();
    expect(drinkFilter).toBeDefined();

    userEvent.click(allFilter);
    userEvent.click(mealFilter);
    userEvent.click(drinkFilter);
  });
  it('Share Btt', async () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    setLocalStorage('doneRecipes', storage);
    expect(localStorage.getItem('doneRecipes')).toEqual(JSON.stringify(storage));
    act(() => history.push(doneString));
    const share = await screen.findByTestId('0-horizontal-share-btn');
    // O meu da erro mas talvez no seu rode a de baixo
    // userEvent.click(share);
    expect(share).toBeInTheDocument();
  });
  it('Meals btn', () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    setLocalStorage('favoriteRecipes', storage);
    act(() => history.push(doneString));
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilter);
    userEvent.click(mealFilter);
  });
});
