import { createContext } from 'react';
import { User } from '../../models/user.model';

interface AuthContextProps {
  auth: any;
  setAuth: (auth: User) => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
