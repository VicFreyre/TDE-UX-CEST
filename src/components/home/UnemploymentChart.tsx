// ESTE COMPONENTE EXIBE UM GRÁFICO DE LINHA INTERATIVO QUE MOSTRA A EVOLUÇÃO DA TAXA DE DESEMPREGO NOS ESTADOS DO NORDESTE DO BRASIL NOS ÚLTIMOS SEMESTRES.
// O USUÁRIO PODE SELECIONAR QUAIS ESTADOS DESEJA VISUALIZAR ATRAVÉS DE BOTÕES INTERATIVOS, QUE ALTERAM DINAMICAMENTE OS DADOS EXIBIDOS NO GRÁFICO.

// ESTRUTURAS DE DADOS UTILIZADAS:

// 1. ARRAY:
//    - `labels`: array de strings que representam os períodos semestrais (rótulos do eixo X).
//    - `estadosSelecionados`: array de strings (siglas dos estados) armazenado no estado do componente (useState).
//    - `estadosNordesteMock`: array de objetos importado, onde cada objeto representa um estado com suas propriedades, incluindo a taxa de desemprego.

// 2. OBJETOS:
//    - Cada elemento de `estadosNordesteMock` é um objeto com propriedades como `sigla`, `nome` e `taxaDesemprego` (array de números).
//    - O objeto `chartData` que estrutura os dados para o gráfico, contendo `labels` e `datasets` (array de objetos que representam cada linha do gráfico).

// 3. FUNÇÕES:
//    - `toggleEstado`: função que adiciona ou remove siglas de estados do array `estadosSelecionados`.
//    - `generateGradient`: função que cria gradientes de cor para estilizar as linhas do gráfico dinamicamente.

// 4. HOOKS:
//    - `useState` para gerenciar o estado dos estados selecionados.

// 5. JSX:
//    - Estrutura visual com botões dinâmicos para seleção dos estados e o componente de gráfico `Line` da biblioteca react-chartjs-2.

// 6. ANIMAÇÕES:
//    - Uso do `motion` para animação suave da aparição do gráfico.

// O COMPONENTE INTEGRA DADOS ESTÁTICOS SIMULADOS (MOCK) E ESTADO INTERNO PARA UMA EXPERIÊNCIA INTERATIVA E VISUAL RICA.


import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { estadosNordesteMock } from '../../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UnemploymentChart: React.FC = () => {
  const [estadosSelecionados, setEstadosSelecionados] = useState<string[]>(['BA', 'PE', 'CE']);

  // Labels para os últimos 6 semestres
  const labels = [
    '2º Sem 2022',
    '1º Sem 2023',
    '2º Sem 2023',
    '1º Sem 2024',
    '2º Sem 2024',
    '1º Sem 2025',
  ];

  const generateGradient = (ctx: CanvasRenderingContext2D, index: number) => {
    const colors = [
      { start: '#FF5F1F', end: '#FF9A5A' },
      { start: '#8A2BE2', end: '#C29FFF' },
      { start: '#10B981', end: '#34D399' },
      { start: '#F59E0B', end: '#FBBF24' },
      { start: '#3B82F6', end: '#93C5FD' },
      { start: '#EC4899', end: '#F9A8D4' },
      { start: '#8B5CF6', end: '#C4B5FD' },
      { start: '#EF4444', end: '#FCA5A5' },
      { start: '#06B6D4', end: '#67E8F9' },
    ];
    
    const colorIndex = index % colors.length;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colors[colorIndex].start);
    gradient.addColorStop(1, colors[colorIndex].end);
    
    return gradient;
  };

  const toggleEstado = (sigla: string) => {
    setEstadosSelecionados(prev => 
      prev.includes(sigla)
        ? prev.filter(e => e !== sigla)
        : [...prev, sigla]
    );
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13
        },
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 8,
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          font: {
            family: "'Inter', sans-serif"
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif"
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.3
      },
      point: {
        radius: 4,
        hoverRadius: 6
      }
    }
  };

  const chartData = {
    labels,
    datasets: estadosNordesteMock
      .filter(estado => estadosSelecionados.includes(estado.sigla))
      .map((estado, index) => ({
        label: estado.nome,
        data: estado.taxaDesemprego,
        borderColor: function(context: any) {
          const chart = context.chart;
          const { ctx } = chart;
          return generateGradient(ctx, index);
        },
        backgroundColor: function(context: any) {
          const chart = context.chart;
          const { ctx } = chart;
          return generateGradient(ctx, index);
        },
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: 'white',
        pointBorderWidth: 2
      }))
  };

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Queda no Desemprego!</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Acompanhe a evolução da taxa de desemprego nos estados do Nordeste nos últimos semestres.
            Nossos programas têm contribuído para a redução constante destes índices.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <div className="mb-6 flex flex-wrap gap-2 justify-center">
            {estadosNordesteMock.map((estado) => (
              <button
                key={estado.sigla}
                onClick={() => toggleEstado(estado.sigla)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  estadosSelecionados.includes(estado.sigla)
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                    : 'bg-neutral-100 text-neutral-600 border-2 border-neutral-200 hover:bg-neutral-200'
                }`}
              >
                {estado.nome}
              </button>
            ))}
          </div>

          <motion.div 
            className="h-[400px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Line options={options} data={chartData} />
          </motion.div>
          
          <div className="mt-6 text-center text-sm text-neutral-500">
            <p>
              Fonte: Dados simulados baseados em tendências de redução do desemprego na região Nordeste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnemploymentChart;