import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Paper, TextField, Typography } from '@mui/material';
import MyContext from '../context/MyContext';
import '../css/Login.css';
import logo from '../images/LOGORECIPES2.png';

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
    <form className="form-login">
      <img src={ logo } alt="logo" width="340px" />
      <Typography gutterBottom variant="h5">Login</Typography>
      <Paper className="paper-login" elevation={ 5 }>
        <TextField
          margin="dense"
          required
          label="Email"
          onChange={ handleChangeEmail }
          type="email"
          value={ email }
          data-testid="email-input"
        />
        <TextField
          margin="dense"
          required
          label="Password"
          onChange={ handleChangePassWord }
          value={ password }
          type="password"
          data-testid="password-input"
        />
        <Button
          size="medium"
          variant="contained"
          onClick={ onClickBtnLogin }
          type="button"
          data-testid="login-submit-btn"
          disabled={ !handleDisableBtn() }
        >
          Enter
        </Button>
        {
          redirect && <Redirect to="/meals" />

        }
      </Paper>
    </form>
  );
}
