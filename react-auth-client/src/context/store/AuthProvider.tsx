import { useState } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
