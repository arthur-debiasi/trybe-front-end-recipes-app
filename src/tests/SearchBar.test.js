import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import oneDrink from '../../cypress/mocks/oneDrink';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testes do SearchBar', () => {
  it('01 - Testa Ingrediente SerchBar Meals', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const searchButton = screen.getByTestId('search-top-btn')
    const ingredientLink = screen.getByTestId('ingredient-search-radio');
    const bttSearch2 = screen.getByTestId('exec-search-btn')
    userEvent.click(searchButton)
    const searchInput = screen.getByTestId('search-input')
    userEvent.type(searchInput, 'Butter')
    userEvent.click(ingredientLink);
    userEvent.click(bttSearch2)
    expect(searchButton).toBeInTheDocument()
    expect(ingredientLink).toBeInTheDocument()
    expect(bttSearch2).toBeInTheDocument()
  });
  it('01 - Testa Ingrediente SerchBar Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    const searchButton = screen.getByTestId('search-top-btn')
    const ingredientLink = screen.getByTestId('ingredient-search-radio');
    const bttSearch2 = screen.getByTestId('exec-search-btn')
    userEvent.click(searchButton)
    const searchInput = screen.getByTestId('search-input')
    userEvent.type(searchInput, 'butter')
    userEvent.click(ingredientLink);
    userEvent.click(bttSearch2)
    expect(searchButton).toBeInTheDocument()
    expect(ingredientLink).toBeInTheDocument()
    expect(bttSearch2).toBeInTheDocument()
    const recipeTitle = await screen.findByTestId('recipe-details')
    expect(recipeTitle).toBeInTheDocument()
    expect(history.location.pathname).toBe('/drinks/12738')
  });
  it('01 - Testa Name SerchBar Meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const searchButton = screen.getByTestId('search-top-btn')
    const nameLink = screen.getByTestId('name-search-radio');
    const bttSearch2 = screen.getByTestId('exec-search-btn')
    userEvent.click(searchButton)
    const searchInput = screen.getByTestId('search-input')
    userEvent.type(searchInput, 'Apple')
    userEvent.click(nameLink);
    userEvent.click(bttSearch2)
    expect(searchButton).toBeInTheDocument()
    expect(nameLink).toBeInTheDocument()
    expect(bttSearch2).toBeInTheDocument()
    expect(history.location.pathname).toBe('/meals')
  });
  it('01 - Testa Name SerchBar Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    const searchButton = screen.getByTestId('search-top-btn')
    userEvent.click(searchButton)
    const searchInput = screen.getByTestId('search-input')
    userEvent.type(searchInput, 'orangeade')
    const nameLink = screen.getByTestId('name-search-radio');
    const bttSearch2 = screen.getByTestId('exec-search-btn')
    expect(searchButton).toBeInTheDocument()
    expect(nameLink).toBeInTheDocument()
    expect(bttSearch2).toBeInTheDocument()
    userEvent.click(nameLink);
    userEvent.click(bttSearch2)
    const recipeTitle = await screen.findByTestId('recipe-details')
    expect(recipeTitle).toBeInTheDocument()
    expect(history.location.pathname).toBe('/drinks/12618')
  });
  it('01 - Testa First Letter SerchBar Meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const searchButton = screen.getByTestId('search-top-btn')
    const letterLink = screen.getByTestId('first-letter-search-radio');
    const bttSearch2 = screen.getByTestId('exec-search-btn')
    userEvent.click(searchButton)
    const searchInput = screen.getByTestId('search-input')
    userEvent.type(searchInput, 'y')
    userEvent.click(letterLink);
    userEvent.click(bttSearch2)
    expect(searchButton).toBeInTheDocument()
    expect(letterLink).toBeInTheDocument()
    expect(bttSearch2).toBeInTheDocument()
    const recipeTitle = await screen.findByTestId('recipe-details')
    expect(recipeTitle).toBeInTheDocument()
    expect(history.location.pathname).toBe('/meals/52871')
  });
  it('01 - Testa First Letter SerchBar Drinks', async () => {
    global.alert = jest.fn()
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink)
    })
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    const searchButton = screen.getByTestId('search-top-btn')
    const letterLink = screen.getByTestId('first-letter-search-radio');
    const bttSearch2 = screen.getByTestId('exec-search-btn')
    userEvent.click(searchButton)
    const searchInput = screen.getByTestId('search-input')
    userEvent.type(searchInput, 'aa')
    userEvent.click(letterLink);
    userEvent.click(bttSearch2)
    await waitFor(() => screen.getByRole('alert'))
    expect(global.alert).toHaveBeenCalledTimes(1)
    expect(searchButton).toBeInTheDocument()
    expect(letterLink).toBeInTheDocument()
    expect(bttSearch2).toBeInTheDocument()
  });
});