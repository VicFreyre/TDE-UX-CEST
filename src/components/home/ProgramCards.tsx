// ESTE COMPONENTE EXIBE DOIS CARDS PRINCIPAIS ("Uni+" e "Emprega+") COM INFORMAÇÕES SOBRE PROGRAMAS EDUCACIONAIS E DE EMPREGABILIDADE DO NORDESTE+.
// CADA CARD POSSUI ÍCONE, TÍTULO, DESCRIÇÃO E UM LINK PARA A PÁGINA DO PROGRAMA, COM ANIMAÇÕES SUAVES AO PASSAR O MOUSE.
// É UM COMPONENTE VISUAL E INTERATIVO.

// ESTRUTURAS DE DADOS UTILIZADAS:

// 1. JSX (Árvore de Elementos React): estrutura de árvore para descrever a interface visual dos componentes.
// 2. OBJETO: usado implicitamente em props como `transition={{ type: "spring", stiffness: 400, damping: 10 }}` e `whileHover={{ y: -5 }}`.
// 3. FUNÇÕES: `ProgramCards` é uma função componente (`React.FC`), e o `motion.div` usa funções para animação.
// 4. STRINGS: usadas para rotas (`to="/uni-plus"`), textos de interface e nomes de classes CSS.
// 5. COMPONENTES (como estruturas compostas): `Link`, `motion.div`, `GraduationCap`, `Briefcase`, etc., encapsulam lógica e visual.

// NÃO HÁ USO EXPLÍCITO DE VETORES (arrays) OU ESTRUTURAS COMO LISTAS, FILAS, PILHAS OU MAPAS NESTA PARTE DO CÓDIGO.
// O FOCO ESTÁ NA COMPOSIÇÃO VISUAL E COMPORTAMENTAL (INTERAÇÃO) USANDO COMPONENTES E PROPRIEDADES.


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

const ProgramCards: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Nossos Programas</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Conheça as duas principais iniciativas do Nordeste+ para impulsionar a educação 
            profissionalizante e a empregabilidade na região.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Uni+ */}
          <motion.div 
            className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="h-40 bg-gradient-primary flex items-center justify-center">
              <GraduationCap size={80} color="white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-primary-700">Uni+</h3>
              <p className="text-neutral-600 mb-6">
                Cursos profissionalizantes gratuitos e de alta qualidade para 
                desenvolvimento de habilidades técnicas alinhadas às demandas do mercado. 
                Certificação reconhecida e apoio para inserção profissional.
              </p>
              <Link 
                to="/uni-plus" 
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                Acessar cursos
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Card Emprega+ */}
          <motion.div 
            className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="h-40 bg-gradient-secondary flex items-center justify-center">
              <Briefcase size={80} color="white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-secondary-700">Emprega+</h3>
              <p className="text-neutral-600 mb-6">
                Portal de vagas de emprego com foco nas habilidades desenvolvidas nos cursos Uni+. 
                Conexão direta com empresas parceiras e acompanhamento personalizado do processo 
                seletivo.
              </p>
              <Link 
                to="/emprega-plus" 
                className="inline-flex items-center text-secondary-600 font-medium hover:text-secondary-700 transition-colors"
              >
                Ver vagas disponíveis
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramCards;