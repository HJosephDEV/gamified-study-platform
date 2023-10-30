export type GETTaskParams = {
  taskId: string;
};

type AnswerProps = {
  id: number;
  descricao: string;
  id_tarefa: number;
};

type TaskProps = {
  id: number;
  nome: string;
  conteudo: string;
  tipo: number;
  respostas: AnswerProps[];
};

export type GETTask = {
  message: string;
  data: {
    id_modulo: number;
    nome_modulo: string;
    perc_completo: number;
    tarefa: TaskProps;
  };
};
