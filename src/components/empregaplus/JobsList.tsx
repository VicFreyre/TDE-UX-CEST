// Este componente React chamado JobsList exibe uma lista de vagas de emprego com funcionalidades de busca, filtro por setor, localidade e status de candidatura. 
// Também permite ao usuário visualizar estatísticas das vagas disponíveis (por setor e média salarial), além de se candidatar a vagas diretamente na interface.
// Ele utiliza os hooks do React, contexto de usuário para saber as vagas aplicadas, animações com Framer Motion, ícones do Lucide, 
// gráficos com Chart.js e dados simulados de vagas.
// A PRINCIPAL ESTRUTURA DE DADOS UTILIZADA NESSE MODULO É: ARRAY (VETOR)


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BarChart2, X, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Vaga } from '../../types';
import { vagasMock } from '../../data/mockData';
import { Bar, Pie } from 'react-chartjs-2';
import { useUser } from '../../context/UserContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const JobsList: React.FC = () => {
  const { user, aplicarVaga } = useUser();
  const [filtroBusca, setFiltroBusca] = useState('');
  const [filtroSetor, setFiltroSetor] = useState<string | null>(null);
  const [filtroLocal, setFiltroLocal] = useState<string | null>(null);
  const [mostrarApenasVagasNaoAplicadas, setMostrarApenasVagasNaoAplicadas] = useState(false);
  const [mostrarEstatisticas, setMostrarEstatisticas] = useState(false);

  // Extrair setores e locais únicos
  const setores = Array.from(new Set(vagasMock.map(vaga => vaga.setor)));
  const locais = Array.from(new Set(vagasMock.map(vaga => vaga.local.split(',')[1].trim())));

  // Filtrar vagas
  const vagasFiltradas = vagasMock.filter(vaga => {
    const aplicada = user?.vagasAplicadas.some(v => v.id === vaga.id);
    
    // Filtro por texto
    const matchTexto = vaga.titulo.toLowerCase().includes(filtroBusca.toLowerCase()) || 
                       vaga.empresa.toLowerCase().includes(filtroBusca.toLowerCase());
    
    // Filtro por setor
    const matchSetor = filtroSetor ? vaga.setor === filtroSetor : true;
    
    // Filtro por local
    const matchLocal = filtroLocal ? vaga.local.includes(filtroLocal) : true;
    
    // Filtro por não aplicadas
    const matchAplicadas = mostrarApenasVagasNaoAplicadas 
      ? !aplicada
      : true;
    
    return matchTexto && matchSetor && matchLocal && matchAplicadas;
  });

  // Verificar se usuário já aplicou para a vaga
  const jaAplicouParaVaga = (vagaId: string) => {
    return user?.vagasAplicadas.some(v => v.id === vagaId) || false;
  };

  // Dados para os gráficos
  const dadosVagasPorSetor = {
    labels: setores,
    datasets: [
      {
        label: 'Vagas por Setor',
        data: setores.map(setor => 
          vagasMock.filter(vaga => vaga.setor === setor).length
        ),
        backgroundColor: [
          'rgba(255, 95, 31, 0.7)',
          'rgba(138, 43, 226, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(236, 72, 153, 0.7)'
        ],
        borderColor: [
          '#FF5F1F',
          '#8A2BE2',
          '#10B981',
          '#3B82F6',
          '#F59E0B',
          '#EC4899'
        ],
        borderWidth: 1
      }
    ]
  };

  const dadosSalarios = {
    labels: setores,
    datasets: [
      {
        label: 'Média Salarial (R$)',
        data: setores.map(setor => {
          const vagasComSalario = vagasMock.filter(vaga => 
            vaga.setor === setor && vaga.salario
          );
          
          if (vagasComSalario.length === 0) return 0;
          
          const mediaSalarial = vagasComSalario.reduce((acc, vaga) => {
            const salarioNumerico = parseFloat(vaga.salario?.replace(/[^\d,]/g, '').replace(',', '.') || '0');
            return acc + salarioNumerico;
          }, 0) / vagasComSalario.length;
          
          return mediaSalarial;
        }),
        backgroundColor: 'rgba(138, 43, 226, 0.7)',
        borderColor: '#8A2BE2',
        borderWidth: 1
      }
    ]
  };

  const chartOptions: ChartOptions<'bar' | 'pie'> = {
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
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Vagas de Emprego</h1>
        <p className="text-neutral-600">
          Encontre oportunidades de emprego alinhadas com as habilidades desenvolvidas 
          nos cursos do Uni+ e inicie sua carreira profissional.
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
              className="pl-10 pr-4 py-2 w-full border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-300"
              placeholder="Buscar vagas..."
              value={filtroBusca}
              onChange={e => setFiltroBusca(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-300"
                value={filtroSetor || ''}
                onChange={e => setFiltroSetor(e.target.value || null)}
              >
                <option value="">Todos os setores</option>
                {setores.map(setor => (
                  <option key={setor} value={setor}>
                    {setor}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Briefcase size={16} className="text-neutral-400" />
              </div>
            </div>

            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-300"
                value={filtroLocal || ''}
                onChange={e => setFiltroLocal(e.target.value || null)}
              >
                <option value="">Todos os estados</option>
                {locais.map(local => (
                  <option key={local} value={local}>
                    {local}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <MapPin size={16} className="text-neutral-400" />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="naoAplicadas"
                className="mr-2"
                checked={mostrarApenasVagasNaoAplicadas}
                onChange={() => setMostrarApenasVagasNaoAplicadas(!mostrarApenasVagasNaoAplicadas)}
              />
              <label htmlFor="naoAplicadas" className="text-sm text-neutral-700">
                Apenas vagas não aplicadas
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
            <h2 className="text-xl font-semibold">Estatísticas das Vagas</h2>
            <button 
              onClick={() => setMostrarEstatisticas(false)}
              className="p-1 rounded-full hover:bg-neutral-100"
            >
              <X size={20} className="text-neutral-500" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-center">Vagas por Setor</h3>
              <div className="h-64">
                <Pie data={dadosVagasPorSetor} options={chartOptions} />
              </div>
            </div>
            
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-center">Média Salarial por Setor</h3>
              <div className="h-64">
                <Bar data={dadosSalarios} options={chartOptions} />
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-neutral-500 text-center">
            Dados baseados nas vagas disponíveis atualmente na plataforma.
          </div>
        </motion.div>
      )}

      {/* Lista de vagas */}
      {vagasFiltradas.length > 0 ? (
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {vagasFiltradas.map((vaga) => {
            const aplicada = jaAplicouParaVaga(vaga.id);
            
            return (
              <motion.div 
                key={vaga.id}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
                variants={itemVariants}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-grow">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center text-white">
                          <Briefcase size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{vaga.titulo}</h3>
                          <p className="text-neutral-600">{vaga.empresa}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
                          <Briefcase size={12} className="mr-1" />
                          {vaga.setor}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                          <MapPin size={12} className="mr-1" />
                          {vaga.local}
                        </span>
                        {vaga.salario && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success-100 text-success-500">
                            <DollarSign size={12} className="mr-1" />
                            {vaga.salario}
                          </span>
                        )}
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
                          {vaga.tipo}
                        </span>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-neutral-700">{vaga.descricao}</p>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-neutral-700 mb-2">Requisitos:</h4>
                        <ul className="list-disc list-inside text-sm text-neutral-600">
                          {vaga.requisitos.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4 text-sm text-neutral-500">
                        Publicada em: {vaga.dataPublicacao}
                      </div>
                    </div>
                    
                    <div className="md:ml-4 mt-4 md:mt-0 flex md:flex-col justify-between items-center md:items-end gap-4">
                      {aplicada ? (
                        <div className="text-center">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-success-500 text-white mb-2">
                            Aplicado
                          </span>
                          <p className="text-xs text-neutral-500">Você já se candidatou a esta vaga</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => aplicarVaga(vaga)}
                          className="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg transition-colors"
                        >
                          Candidatar-se
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center shadow-md">
          <p className="text-neutral-600">
            Nenhuma vaga encontrada com os filtros selecionados.
          </p>
          <button
            onClick={() => {
              setFiltroBusca('');
              setFiltroSetor(null);
              setFiltroLocal(null);
              setMostrarApenasVagasNaoAplicadas(false);
            }}
            className="mt-4 px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsList;