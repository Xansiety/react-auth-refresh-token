import { BackendRegisterUserResponse, User } from '../models';

export const UserRegisterAdapter = (data: BackendRegisterUserResponse): User => {
  // <--- This is the adapter
  return {
    uid: data.usuario.uid,
    name: data.usuario.name,
    role: ['test', data.usuario.role.toString()],
    // role: data.usuario.role,
    token: data.token,
    expiresIn: data.expiresIn
  };
};

export const UserLoginAdapter = (data: BackendRegisterUserResponse): User => {
  // <--- This is the adapter
  return {
    uid: data.usuario.uid,
    name: data.usuario.name,
    // role: data.usuario.role,
    role: ['test', data.usuario.role.toString()],
    token: data.token,
    expiresIn: data.expiresIn
  };
};
