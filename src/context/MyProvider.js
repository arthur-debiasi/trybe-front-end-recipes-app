import Proptypes from 'prop-types';
import { useMemo, useState } from 'react';
import MyContext from './MyContext';

export default function MyProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassWord = ({ target }) => {
    setPassword(target.value);
  };
  const contextValue = useMemo(() => ({
    handleChangeEmail,
    handleChangePassWord,
    email,
    password,
  }), [email, password]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: Proptypes.node.isRequired,
};
