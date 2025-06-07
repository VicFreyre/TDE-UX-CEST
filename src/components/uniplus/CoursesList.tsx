// Componente React que exibe uma lista de cursos profissionalizantes com filtros, busca e estatísticas visuais.
// Funcionalidades principais:
// - Busca por texto no título e descrição dos cursos.
// - Filtro por categoria dos cursos.
// - Filtro para mostrar apenas cursos não matriculados pelo usuário.
// - Exibição do status do curso para o usuário (cursando, concluído, não matriculado).
// - Exibição de gráficos (barras e linha) com estatísticas de matrículas e taxa de conclusão mensal.
// - Animações na renderização dos cursos usando framer-motion.

// Estruturas de dados utilizadas:
// - Array: para armazenar e manipular listas de cursos (cursosMock), categorias únicas e cursos filtrados.
// - Set: para extrair categorias únicas dos cursos.
// - Objetos: para representar cursos, usuário, dados dos gráficos e opções de configuração.
// - State (useState): para armazenar valores reativos como filtros, visibilidade das estatísticas e busca.


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BarChart2, X } from 'lucide-react';
import { Curso } from '../../types';
import { cursosMock } from '../../data/mockData';
import { Line, Bar } from 'react-chartjs-2';
import { useUser } from '../../context/UserContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CoursesList: React.FC = () => {
  const { user, matricularCurso } = useUser();
  const [filtroBusca, setFiltroBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
  const [mostrarApenasCursosNaoMatriculados, setMostrarApenasCursosNaoMatriculados] = useState(false);
  const [mostrarEstatisticas, setMostrarEstatisticas] = useState(false);

  // Extrair categorias únicas
  const categorias = Array.from(new Set(cursosMock.map(curso => curso.categoria)));

  // Filtrar cursos
  const cursosFiltrados = cursosMock.filter(curso => {
    const cursando = user?.cursos.some(c => c.id === curso.id && c.matriculado && !c.concluido);
    const concluido = user?.cursos.some(c => c.id === curso.id && c.concluido);
    
    // Filtro por texto
    const matchTexto = curso.titulo.toLowerCase().includes(filtroBusca.toLowerCase()) || 
                       curso.descricao.toLowerCase().includes(filtroBusca.toLowerCase());
    
    // Filtro por categoria
    const matchCategoria = filtroCategoria ? curso.categoria === filtroCategoria : true;
    
    // Filtro por não matriculados
    const matchMatriculados = mostrarApenasCursosNaoMatriculados 
      ? !cursando && !concluido
      : true;
    
    return matchTexto && matchCategoria && matchMatriculados;
  });

  // Verificar status do curso para o usuário
  const getStatusCurso = (cursoId: string) => {
    if (!user) return null;
    
    const cursosUsuario = user.cursos.find(c => c.id === cursoId);
    
    if (!cursosUsuario) return null;
    if (cursosUsuario.concluido) return { status: 'concluido', progresso: 100 };
    if (cursosUsuario.matriculado) return { status: 'cursando', progresso: cursosUsuario.progresso };
    
    return null;
  };

  // Dados para os gráficos
  const dadosMatriculas = {
    labels: categorias,
    datasets: [
      {
        label: 'Matrículas por Categoria',
        data: categorias.map(categoria => 
          Math.floor(Math.random() * 1000) + 500
        ),
        backgroundColor: 'rgba(255, 95, 31, 0.7)',
        borderColor: '#FF5F1F',
        borderWidth: 1
      }
    ]
  };

  const dadosConclusao = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Taxa de Conclusão (%)',
        data: [68, 72, 75, 79, 82, 85],
        borderColor: '#8A2BE2',
        backgroundColor: 'rgba(138, 43, 226, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const chartOptions: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Cursos Profissionalizantes</h1>
        <p className="text-neutral-600">
          Explore nossa seleção de cursos gratuitos e de alta qualidade, 
          desenvolvidos para atender às demandas do mercado de trabalho.
        </p>
      </div>

      {/* Barra de busca e filtros */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-neutral-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
              placeholder="Buscar cursos..."
              value={filtroBusca}
              onChange={e => setFiltroBusca(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                value={filtroCategoria || ''}
                onChange={e => setFiltroCategoria(e.target.value || null)}
              >
                <option value="">Todas as categorias</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter size={16} className="text-neutral-400" />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="naoMatriculados"
                className="mr-2"
                checked={mostrarApenasCursosNaoMatriculados}
                onChange={() => setMostrarApenasCursosNaoMatriculados(!mostrarApenasCursosNaoMatriculados)}
              />
              <label htmlFor="naoMatriculados" className="text-sm text-neutral-700">
                Apenas cursos não matriculados
              </label>
            </div>

            <button
              onClick={() => setMostrarEstatisticas(!mostrarEstatisticas)}
              className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                mostrarEstatisticas
                  ? 'bg-secondary-100 text-secondary-700 border border-secondary-200'
                  : 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200'
              }`}
            >
              <BarChart2 size={16} className="mr-2" />
              Estatísticas
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      {mostrarEstatisticas && (
        <motion.div 
          className="bg-white rounded-xl shadow-md p-4 mb-8"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Estatísticas dos Cursos</h2>
            <button 
              onClick={() => setMostrarEstatisticas(false)}
              className="p-1 rounded-full hover:bg-neutral-100"
            >
              <X size={20} className="text-neutral-500" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-center">Matrículas por Categoria</h3>
              <div className="h-64">
                <Bar data={dadosMatriculas} options={chartOptions} />
              </div>
            </div>
            
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-center">Taxa de Conclusão Mensal</h3>
              <div className="h-64">
                <Line data={dadosConclusao} options={chartOptions} />
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-neutral-500 text-center">
            Dados baseados nas interações dos usuários com a plataforma nos últimos 6 meses.
          </div>
        </motion.div>
      )}

      {/* Lista de cursos */}
      {cursosFiltrados.length > 0 ? (
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cursosFiltrados.map((curso) => {
            const statusCurso = getStatusCurso(curso.id);
            
            return (
              <motion.div 
                key={curso.id}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
                variants={itemVariants}
              >
                <img
                  src={curso.imagem}
                  alt={curso.titulo}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 mb-4">
                    {curso.categoria}
                  </span>
                  <h3 className="text-lg font-bold mb-2">{curso.titulo}</h3>
                  <p className="text-neutral-600 text-sm mb-4">{curso.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500">Duração: {curso.duracao}</span>
                  </div>
                  
                  {statusCurso ? (
                    <div className="mt-4">
                      {statusCurso.status === 'cursando' ? (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-primary-600">Progresso</span>
                            <span>{statusCurso.progresso}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full" 
                              style={{ width: `${statusCurso.progresso}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-neutral-500 mt-2">Você está matriculado neste curso</p>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-success-500 text-white">
                            Concluído
                          </span>
                          <p className="text-sm text-neutral-500 mt-2">Você já concluiu este curso</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => matricularCurso(curso)}
                      className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 rounded-lg transition-colors"
                    >
                      Matricular-se
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center shadow-md">
          <p className="text-neutral-600">
            Nenhum curso encontrado com os filtros selecionados.
          </p>
          <button
            onClick={() => {
              setFiltroBusca('');
              setFiltroCategoria(null);
              setMostrarApenasCursosNaoMatriculados(false);
            }}
            className="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesList;