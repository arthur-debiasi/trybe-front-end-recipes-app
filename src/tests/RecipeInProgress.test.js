import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testa RecipeDetails', () => {
  it('simula interação de usuário', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(history.location.pathname).toBe('/meals');
    const imglink = await screen.findByTestId('0-card-img');
    expect(imglink).toBeDefined();
    userEvent.click(imglink);
    const a = waitFor(() => screen.getByTestId('start-recipe-btn'));
    const b = waitFor(() => screen.getByTestId('0-ingredient-name-and-measure'));
    const c = waitFor(() => screen.getAllByRole('listitem'));
    expect(a).toBeDefined();
    expect(b).toBeDefined();
    expect(c).toBeDefined();
    // expect(screen.getByTestId('instructions')).toBeDefined();
  });
});
