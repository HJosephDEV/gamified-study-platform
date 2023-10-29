export type POSTCreateModule = {
  id: number;
  nome: string;
  descricao: string;
};

export type GETModules = POSTCreateModule[];

export type GETInitializedModules = POSTCreateModule[];
