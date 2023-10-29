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

type TaskProps = {
  id: number;
  nome: string;
  conteudo: string;
  tipo: number;
  tarefa_exp: number;
  id_modulo: number;
  completo: boolean;
};

export type GETModuleTasks = {
  message: string;
  data: {
    id_modulo: number;
    nome_modulo: string;
    perc_completo: number;
    tarefas: TaskProps[];
  };
};

export type GETModuleTasksParams = {
  id_module: string;
};
