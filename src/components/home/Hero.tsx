// Componente Hero.tsx
// Este componente React exibe uma seção de destaque para uma plataforma de capacitação profissional.
// Ele apresenta um título, uma descrição, botões de navegação e um painel de estatísticas de impacto
// que são animadas e atualizadas dinamicamente a cada 7 segundos.
//
// Estruturas de dados usadas:
// - Objeto (stats): para armazenar os valores das estatísticas atuais (totalCursos, totalMatriculas, etc).
// - Matriz (statsArray): um array multidimensional que contém pares [string, number], onde cada par
//   representa o nome da estatística e seu valor atual. Essa matriz é usada para renderizar dinamicamente os cards de estatísticas.
//
// O componente também utiliza a biblioteca Framer Motion para animar os elementos da interface.

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { estatisticasMock } from '../../data/mockData';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  // Estado para armazenar as estatísticas em objeto
  const [stats, setStats] = useState({
    totalCursos: 0,
    totalMatriculas: 0,
    totalContratacoes: 0,
    totalVagas: 0
  });

  useEffect(() => {
    animateStats();
    const interval = setInterval(() => {
      animateStats();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const animateStats = () => {
    const increasePercentage = {
      cursos: 1 + Math.random() * 0.03,
      matriculas: 1 + Math.random() * 0.03,
      contratacoes: 1 + Math.random() * 0.03,
      vagas: 1 + Math.random() * 0.03
    };

    setStats({
      totalCursos: Math.floor(estatisticasMock.totalCursos * increasePercentage.cursos),
      totalMatriculas: Math.floor(estatisticasMock.totalMatriculas * increasePercentage.matriculas),
      totalContratacoes: Math.floor(estatisticasMock.totalContratacoes * increasePercentage.contratacoes),
      totalVagas: Math.floor(estatisticasMock.totalVagas * increasePercentage.vagas)
    });
  };

  // Matriz contendo pares [label, valor]
  // Usamos o estado stats para preencher os valores dinamicamente
  const statsArray: [string, number][] = [
    ['Cursos Disponíveis', stats.totalCursos],
    ['Matrículas Realizadas', stats.totalMatriculas],
    ['Contratações', stats.totalContratacoes],
    ['Vagas Disponíveis', stats.totalVagas],
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const statCardVariants = {
    initial: {
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      },
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)"
    },
    tap: {
      scale: 0.95,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-secondary-700 text-white overflow-hidden py-16 md:py-24">
      {/* Círculos decorativos animados */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.div 
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white opacity-5"
          animate={{ 
            x: [0, 10, 0], 
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut", 
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-white opacity-5"
          animate={{ 
            x: [0, -10, 0], 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 9, 
            ease: "easeInOut", 
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute bottom-40 left-40 w-40 h-40 rounded-full bg-white opacity-5"
          animate={{ 
            x: [0, 15, 0], 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 7, 
            ease: "easeInOut", 
            repeat: Infinity,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Transformando o Nordeste através da educação e do emprego
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl opacity-90 mb-8"
            variants={itemVariants}
          >
            Uma plataforma gratuita de capacitação profissional e oportunidades 
            de emprego para transformar a realidade da região Nordeste.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Link
              to="/uni-plus"
              className="px-6 py-3 bg-white text-primary-700 font-medium rounded-lg shadow-lg hover:bg-neutral-100 transition-colors"
            >
              Conhecer os cursos
            </Link>
            <Link
              to="/emprega-plus"
              className="px-6 py-3 bg-secondary-600 text-white font-medium rounded-lg shadow-lg hover:bg-secondary-700 transition-colors"
            >
              Ver vagas disponíveis
            </Link>
          </motion.div>
        </motion.div>

        {/* Estatísticas de impacto geradas dinamicamente a partir da matriz */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {statsArray.map(([label, value], index) => (
            <motion.div 
              key={label}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center relative overflow-hidden"
              variants={statCardVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute inset-0 bg-white/5"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              />
              <motion.p 
                className="text-3xl md:text-4xl font-bold mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                {(label === 'Matrículas Realizadas' || label === 'Contratações') 
                  ? value.toLocaleString('pt-BR') 
                  : value}
              </motion.p>
              <p className="text-sm opacity-90">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
