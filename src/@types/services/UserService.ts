export type UserProps = {
  id: number;
  nome: string;
  sobrenome: string;
  login: string;
  email: string;
  user_level: number;
  user_exp: number;
  user_next_level_exp: number;
  bloqueado: boolean;
  vidas: number;
  id_avatar: number;
  is_admin: boolean;
  url_avatar: string;
  token: string;
};

export type GetUserProps = {
  message: string;
  data: UserProps;
};

export type GetLoginProps = {
  message: string;
  data: UserProps;
};

export type LoginProps = {
  login: string;
  senha: string;
};

export type RegisterParams = {
  nome: string;
  sobrenome: string;
  login: string;
  email: string;
  senha: string;
  is_admin: boolean;
  id_avatar: number;
};
