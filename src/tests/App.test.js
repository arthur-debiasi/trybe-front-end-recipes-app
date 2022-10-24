import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

test('Farewell, front-end', () => {
  renderWithRouter(<App />);
  const email = screen.getByTestId('email-input');
  const password = screen.getByTestId('password-input');
  const btnLogin = screen.getByTestId('login-submit-btn');

  expect(email).toBeDefined();
  expect(password).toBeDefined();

  userEvent.type(email, 'teste@teste.com');
  userEvent.type(password, '12345678');
  userEvent.click(btnLogin);
});
