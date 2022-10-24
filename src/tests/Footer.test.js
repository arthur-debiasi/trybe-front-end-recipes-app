import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testes do Footer', () => {
  it('01 - Testa se o link meals redireciona para a rota /meals', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    const mealsLink = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsLink);
    expect(history.location.pathname).toBe('/meals');

    expect(mealsLink).toBeInTheDocument();
  });

  it('01 - Testa se o link drinks redireciona para a rota /drinks', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const drinksLink = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksLink);
    expect(history.location.pathname).toBe('/drinks');

    expect(drinksLink).toBeInTheDocument();
  });
});
