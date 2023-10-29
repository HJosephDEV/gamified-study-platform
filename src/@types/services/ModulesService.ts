export type POSTCreateModule = {
  id: number;
  nome: string;
  descricao: string;
};

export type GETInitializedModules = POSTCreateModule[];
