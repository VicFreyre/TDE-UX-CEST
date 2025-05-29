export interface User {
  id: string;
  nome: string;
  foto: string;
  estado: string;
  cursos: Curso[];
  certificados: Certificado[];
  vagasAplicadas: Vaga[];
}

export interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  categoria: string;
  duracao: string;
  progresso?: number;
  matriculado?: boolean;
  concluido?: boolean;
}

export interface Certificado {
  id: string;
  cursoId: string;
  cursoNome: string;
  dataEmissao: string;
  imagem: string;
}

export interface Vaga {
  id: string;
  titulo: string;
  empresa: string;
  local: string;
  salario?: string;
  tipo: string;
  setor: string;
  descricao: string;
  requisitos: string[];
  dataPublicacao: string;
  aplicado?: boolean;
}

export interface Estatistica {
  label: string;
  valor: number;
  porcentagem?: number;
}

export interface Depoimento {
  id: string;
  nome: string;
  foto: string;
  texto: string;
  curso?: string;
  emprego?: string;
  estado: string;
}

export interface EstadoNordeste {
  nome: string;
  sigla: string;
  taxaDesemprego: number[];
}

export interface AcessibilidadeConfig {
  tamanhoFonte: number;
  modoAltoContraste: boolean;
  modoDaltonismo: string | null;
  narrador: boolean;
}