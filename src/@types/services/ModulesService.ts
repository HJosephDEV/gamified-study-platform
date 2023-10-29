type Module = {
  id: number;
  nome: string;
  descricao: string;
};

export type POSTCreateModule = {
  message: string;
  data: Module;
};

export type GETModules = {
  message: string;
  data: Module[];
};

export type GETInitializedModules = GETModules;
