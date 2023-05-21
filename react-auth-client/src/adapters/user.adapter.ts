import { BackendRegisterUserResponse, User } from '../models';

export const UserRegisterAdapter = (data: BackendRegisterUserResponse): User => { // <--- This is the adapter
  return {
    uid: data.usuario.uid,
    name: data.usuario.name,
    token: data.token,
    expiresIn: data.expiresIn
  };
};
