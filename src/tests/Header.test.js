import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Header test', () => {
  const pageTest = 'page-title';
  it('Drinks test', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    const linkElement = screen.getByTestId(pageTest);
    expect(linkElement).toBeInTheDocument();
  });
  it('Done Recipes test', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/done-recipes'));
    const linkElement = screen.getByTestId(pageTest);
    expect(linkElement).toBeInTheDocument();
  });
  it('Favorite Recipes test', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/favorite-recipes'));
    const linkElement = screen.getByTestId(pageTest);
    expect(linkElement).toBeInTheDocument();
  });
  it('Profile test', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/profile'));
    const linkElement = screen.getByTestId(pageTest);
    expect(linkElement).toBeInTheDocument();
  });
});
