export type AvatarProps = {
  id: number;
  url: string;
  level_req: number;
  selecionado: boolean;
  desbloqueado: boolean;
};

export type GetAvatarsProps = {
  message: string;
  data: AvatarProps[];
};
