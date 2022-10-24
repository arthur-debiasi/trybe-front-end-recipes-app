import Proptypes from 'prop-types';
import { useMemo } from 'react';
import MyContext from './MyContext';

export default function MyProvider({ children }) {
  const contextValue = useMemo(() => ({
  }), []);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: Proptypes.node.isRequired,
};
