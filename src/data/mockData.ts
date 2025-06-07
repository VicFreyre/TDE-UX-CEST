// Arquivo com dados mock (simulados) para a aplicação Nordeste+,
// que envolvem usuários, cursos, vagas de emprego, depoimentos e dados estatísticos regionais.
//
// Objetivo:
// - Fornecer dados estáticos para testes e desenvolvimento do sistema,
//   simulando entidades reais como usuários, cursos disponíveis, vagas, depoimentos de alunos,
//   e informações socioeconômicas dos estados do Nordeste.
//
// Estruturas de dados utilizadas:
// - Objetos para representar entidades (User, Curso, Vaga, Depoimento, EstadoNordeste).
// - Arrays para armazenar listas de cursos, vagas, depoimentos e estados.
// - Dados com propriedades de tipos primitivos (string, number, arrays) organizados hierarquicamente.
// - Uso de arrays dentro dos objetos para listas (ex: requisitos de vagas, cursos do usuário).
// - Tipagem TypeScript para garantir a forma e consistência dos dados.

import { User, Curso, Vaga, Depoimento, EstadoNordeste } from '../types';

export const usuarioMock: User = {
  id: '1',
  nome: 'Maria Silva',
  foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTExPxsVqJ2urgG0lgVA-IGL0pvCsDGOUbDJDPJXfDMaLS3F11LnglMIGwB4sMuujY2EA4&usqp=CAU',
  estado: 'MA',
  cursos: [
    {
      id: '1',
      titulo: 'Técnico em Desenvolvimento Web',
      descricao: 'Aprenda a criar websites responsivos utilizando HTML, CSS e JavaScript',
      imagem: 'https://blog.fecap.br/wp-content/uploads/Fecap-programador-1200x627.jpg',
      categoria: 'Tecnologia',
      duracao: '80 horas',
      progresso: 75,
      matriculado: true,
      concluido: false
    },
    {
      id: '2',
      titulo: 'Auxiliar Administrativo',
      descricao: 'Desenvolva habilidades essenciais para trabalhar em ambientes administrativos',
      imagem: 'https://universae.com/wp-content/uploads/2023/09/min-auxiliar-administrativo-funciones.webp',
      categoria: 'Administração',
      duracao: '60 horas',
      progresso: 100,
      matriculado: true,
      concluido: true
    }
  ],
  certificados: [
    {
      id: '1',
      cursoId: '2',
      cursoNome: 'Auxiliar Administrativo',
      dataEmissao: '10/01/2024',
      imagem: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ],
  vagasAplicadas: [
    {
      id: '3',
      titulo: 'Assistente Administrativo',
      empresa: 'Empresa XYZ',
      local: 'Recife, PE',
      salario: 'R$ 1.800,00',
      tipo: 'CLT',
      setor: 'Administração',
      descricao: 'Atuar no suporte administrativo da empresa, organização de documentos e atendimento.',
      requisitos: ['Ensino médio completo', 'Curso de auxiliar administrativo', 'Conhecimento em Excel'],
      dataPublicacao: '25/04/2024',
      aplicado: true
    }
  ]
};

export const cursosMock: Curso[] = [
  {
    id: '1',
    titulo: 'Técnico em Desenvolvimento Web',
    descricao: 'Aprenda a criar websites responsivos utilizando HTML, CSS e JavaScript',
    imagem: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoria: 'Tecnologia',
    duracao: '80 horas'
  },
  {
    id: '2',
    titulo: 'Auxiliar Administrativo',
    descricao: 'Desenvolva habilidades essenciais para trabalhar em ambientes administrativos',
    imagem: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoria: 'Administração',
    duracao: '60 horas'
  },
  {
    id: '3',
    titulo: 'Técnico em Atendimento ao Cliente',
    descricao: 'Aprenda as melhores práticas de atendimento ao cliente e resolução de problemas',
    imagem: 'https://blog.adcosprofissional.com.br/wp-content/uploads/2020/12/shutterstock_1668940354.jpg',
    categoria: 'Atendimento',
    duracao: '40 horas'
  },
  {
    id: '4',
    titulo: 'Marketing Digital Básico',
    descricao: 'Conheça as principais ferramentas e estratégias de marketing digital',
    imagem: 'https://universodenegocios.com.br/wp-content/uploads/2023/03/Marketing-digital-no-Brasil.jpg',
    categoria: 'Marketing',
    duracao: '50 horas'
  },
  {
    id: '5',
    titulo: 'Técnicas de Vendas',
    descricao: 'Desenvolva habilidades para aumentar suas vendas e conquistar clientes',
    imagem: 'https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoria: 'Vendas',
    duracao: '45 horas'
  },
  {
    id: '6',
    titulo: 'Fundamentos de Logística',
    descricao: 'Aprenda os conceitos básicos de logística e gestão da cadeia de suprimentos',
    imagem: 'https://www.truckpad.com.br/wp-content/uploads/2020/05/logistica-desafios-oportunidades.jpg',
    categoria: 'Logística',
    duracao: '70 horas'
  }
];

export const vagasMock: Vaga[] = [
  {
    id: '1',
    titulo: 'Desenvolvedor Web Júnior',
    empresa: 'Tech Solutions',
    local: 'Salvador, BA',
    salario: 'R$ 2.800,00',
    tipo: 'CLT',
    setor: 'Tecnologia',
    descricao: 'Desenvolver e manter websites utilizando HTML, CSS e JavaScript.',
    requisitos: ['Curso técnico em desenvolvimento web', 'Conhecimento em HTML/CSS/JS', 'Disponibilidade para trabalhar 40h semanais'],
    dataPublicacao: '28/04/2024'
  },
  {
    id: '2',
    titulo: 'Assistente de Marketing Digital',
    empresa: 'Agência Criativa',
    local: 'Recife, PE',
    salario: 'R$ 2.200,00',
    tipo: 'CLT',
    setor: 'Marketing',
    descricao: 'Auxiliar na criação e gerenciamento de campanhas de marketing digital.',
    requisitos: ['Curso de marketing digital', 'Conhecimento em redes sociais', 'Criatividade'],
    dataPublicacao: '27/04/2024'
  },
  {
    id: '3',
    titulo: 'Assistente Administrativo',
    empresa: 'Empresa XYZ',
    local: 'Recife, PE',
    salario: 'R$ 1.800,00',
    tipo: 'CLT',
    setor: 'Administração',
    descricao: 'Atuar no suporte administrativo da empresa, organização de documentos e atendimento.',
    requisitos: ['Ensino médio completo', 'Curso de auxiliar administrativo', 'Conhecimento em Excel'],
    dataPublicacao: '25/04/2024'
  },
  {
    id: '4',
    titulo: 'Atendente de SAC',
    empresa: 'Telecom NE',
    local: 'Fortaleza, CE',
    salario: 'R$ 1.700,00',
    tipo: 'CLT',
    setor: 'Atendimento',
    descricao: 'Realizar atendimento ao cliente via telefone e chat, registrar ocorrências e dar suporte.',
    requisitos: ['Ensino médio completo', 'Curso de atendimento ao cliente', 'Boa comunicação'],
    dataPublicacao: '26/04/2024'
  },
  {
    id: '5',
    titulo: 'Vendedor(a)',
    empresa: 'Loja Nordestina',
    local: 'Natal, RN',
    tipo: 'CLT',
    setor: 'Vendas',
    descricao: 'Atendimento ao cliente, apresentação de produtos e fechamento de vendas.',
    requisitos: ['Ensino médio completo', 'Curso de técnicas de vendas', 'Experiência em atendimento'],
    dataPublicacao: '23/04/2024'
  },
  {
    id: '6',
    titulo: 'Auxiliar de Logística',
    empresa: 'Distribuidora Rápida',
    local: 'João Pessoa, PB',
    salario: 'R$ 1.600,00',
    tipo: 'CLT',
    setor: 'Logística',
    descricao: 'Auxiliar no controle de estoque, recebimento e expedição de mercadorias.',
    requisitos: ['Ensino médio completo', 'Curso de logística', 'Organização'],
    dataPublicacao: '24/04/2024'
  }
];

export const depoimentosMock: Depoimento[] = [
  {
    id: '1',
    nome: 'Eduardo Faria',
    foto: 'https://i.ytimg.com/vi/PUnA5tk0Ilw/maxresdefault.jpg',
    texto: 'Graças ao curso de Desenvolvimento Web do Nordeste+, consegui meu primeiro emprego na área de tecnologia. A plataforma mudou minha vida profissional!',
    curso: 'Técnico em Desenvolvimento Web',
    emprego: 'Desenvolvedor Front-end',
    estado: 'MA'
  },
  {
    id: '2',
    nome: 'Juliana Silva',
    foto: 'https://www.otempo.com.br/content/dam/otempo/editorias/entretenimento/2025/1/entretenimento-juliana-bonde-1737633823.webp',
    texto: 'Depois de concluir o curso de Auxiliar Administrativo, encontrei uma vaga pelo Emprega+ e fui contratada em menos de um mês. Super recomendo!',
    curso: 'Auxiliar Administrativo',
    emprego: 'Assistente Administrativo',
    estado: 'PE'
  },
  {
    id: '3',
    nome: 'Arthur Esvael',
    foto: 'https://i.ytimg.com/vi/Ob6myB4VMvM/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-BIAC4AOKAgwIABABGBMgTyh_MA8=&rs=AOn4CLAAO7isd_PPcXzxgIcV6GUwd_RaOA',
    texto: 'O Nordeste+ me deu a oportunidade de me qualificar sem custo algum. Hoje trabalho na área de vendas e tenho uma renda muito melhor para minha família.',
    curso: 'Técnicas de Vendas',
    emprego: 'Consultor de Vendas',
    estado: 'CE'
  }
];

export const estadosNordesteMock: EstadoNordeste[] = [
  {
    nome: 'Maranhão',
    sigla: 'MA',
    taxaDesemprego: [12.5, 11.8, 11.2, 10.7, 10.1, 9.6]
  },
  {
    nome: 'Piauí',
    sigla: 'PI',
    taxaDesemprego: [13.2, 12.5, 11.9, 11.1, 10.4, 9.8]
  },
  {
    nome: 'Ceará',
    sigla: 'CE',
    taxaDesemprego: [14.1, 13.5, 12.8, 12.0, 11.2, 10.5]
  },
  {
    nome: 'Rio Grande do Norte',
    sigla: 'RN',
    taxaDesemprego: [15.3, 14.6, 13.9, 13.0, 12.2, 11.4]
  },
  {
    nome: 'Paraíba',
    sigla: 'PB',
    taxaDesemprego: [13.8, 13.1, 12.5, 11.7, 11.0, 10.3]
  },
  {
    nome: 'Pernambuco',
    sigla: 'PE',
    taxaDesemprego: [16.2, 15.4, 14.5, 13.6, 12.7, 11.9]
  },
  {
    nome: 'Alagoas',
    sigla: 'AL',
    taxaDesemprego: [17.5, 16.8, 15.9, 15.0, 14.1, 13.2]
  },
  {
    nome: 'Sergipe',
    sigla: 'SE',
    taxaDesemprego: [16.8, 16.0, 15.1, 14.2, 13.3, 12.5]
  },
  {
    nome: 'Bahia',
    sigla: 'BA',
    taxaDesemprego: [18.3, 17.5, 16.6, 15.7, 14.8, 13.9]
  }
];

export const estatisticasMock = {
  totalCursos: 28,
  totalMatriculas: 15483,
  totalContratacoes: 4729,
  totalVagas: 632
};