import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';

export default function Login() {
  const [redirect, setRedirect] = useState(false);

  const {
    handleChangeEmail,
    handleChangePassWord,
    email,
    password,
  } = useContext(MyContext);

  const handleDisableBtn = () => {
    const regex = /\S+@\S+\.\S+/;
    const passLength = 7;
    const verifyEmail = email && regex.test(email);
    const verifyName = password.length >= passLength;
    return (verifyEmail && verifyName);
  };

  const onClickBtnLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    setRedirect(true);
  };

  return (
    <form>
      Login
      <input
        onChange={ handleChangeEmail }
        type="text"
        value={ email }
        data-testid="email-input"
      />
      <input
        onChange={ handleChangePassWord }
        value={ password }
        type="password"
        data-testid="password-input"
      />
      <button
        onClick={ onClickBtnLogin }
        type="button"
        data-testid="login-submit-btn"
        disabled={ !handleDisableBtn() }
      >
        Enter
      </button>
      {
        redirect && <Redirect to="/meals" />

      }
    </form>
  );
}
