import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testes do Profile', () => {
  it('01 - Testa se o botão Done Recipes redireciona para a rota /done-recipes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/profile'));
    console.log(history.location.pathname);
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('02 - Testa se o botão Favorite Recipes redireciona para a rota /favorite-recipes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/profile'));
    console.log(history.location.pathname);
    const doneRecipesBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('03 - Testa se o botão de Logout limpa o localstorage e redireciona para a rota "/"', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');

    expect(email).toBeDefined();
    expect(password).toBeDefined();

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '12345678');
    userEvent.click(btnLogin);
    act(() => history.push('/profile'));
    const userEmail = screen.getByText(/teste@teste.com/i);
    expect(userEmail).toBeInTheDocument();

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    expect(localStorage.getItem('user')).toEqual(null);
    expect(history.location.pathname).toBe('/');
  });
});
