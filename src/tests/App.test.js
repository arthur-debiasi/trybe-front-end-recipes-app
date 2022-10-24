import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<App />);
  const email = screen.getByTestId('email-input');
  const password = screen.getByTestId('password-input');
  const btnLogin = screen.getByTestId('login-submit-btn');

  expect(email).toBeDefined();
  expect(password).toBeDefined();

  userEvent.type(email, 'teste@teste.com');
  userEvent.type(password, '12345678');
  userEvent.click(btnLogin);
});
