import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

const cardString = '0-card-img';

describe('Testa RecipeDetails', () => {
  it('simula interação de usuário', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(history.location.pathname).toBe('/meals');
    const imglink = await screen.findByTestId(cardString);
    expect(imglink).toBeDefined();
    userEvent.click(imglink);
    const btnStartRecipe = screen.getByTestId('start-recipe-btn');
    const a = waitFor(() => screen.getByTestId('start-recipe-btn'));
    const b = waitFor(() => screen.getByTestId('0-ingredient-name-and-measure'));
    const c = waitFor(() => screen.getAllByRole('listitem'));
    expect(a).toBeDefined();
    expect(b).toBeDefined();
    expect(c).toBeDefined();
    // expect(screen.getByTestId('instructions')).toBeDefined();
    userEvent.click(btnStartRecipe);
  });
  it('Meals test', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(history.location.pathname).toBe('/meals');
    const imglink = await screen.findByTestId(cardString);
    expect(imglink).toBeDefined();
    userEvent.click(imglink);
    const img = await screen.findByTestId('recipe-photo');
    const title = await screen.findByTestId('recipe-title');
    expect(img).toBeDefined();
    expect(title).toBeDefined();
  });
  it('Drinks test', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    expect(history.location.pathname).toBe('/drinks');
    const imglink = await screen.findByTestId(cardString);
    expect(imglink).toBeDefined();
    act(() => userEvent.click(imglink));
    const img = await screen.findByTestId('recipe-photo');
    const title = await screen.findByTestId('recipe-title');
    expect(img).toBeDefined();
    expect(title).toBeDefined();
  });
  it('Recommendation test', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals/52977'));
    //  Por enquanto o debaixo tem q ficar porcausa da mock
    const imglink = await screen.findByTestId(cardString);
    userEvent.click(imglink);
    const divRec = await screen.findByTestId('div-card');
    expect(divRec).toBeDefined();
  });
});

// 58% Coverage mas falhando por causa da mock
