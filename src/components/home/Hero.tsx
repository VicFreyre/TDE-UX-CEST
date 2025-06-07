// Este componente React chamado "Hero" representa a seção principal (hero section) de uma página inicial,
// destacando o impacto de uma plataforma educacional no Nordeste do Brasil. Ele utiliza animações do Framer Motion
// para exibir estatísticas animadas sobre cursos, matrículas, contratações e vagas de emprego. Os dados são simulados
// (mockados) e atualizados periodicamente com pequenas variações aleatórias para simular crescimento dinâmico.
// Além disso, o layout inclui elementos animados de fundo e botões com links para outras seções da plataforma,
// promovendo os cursos disponíveis e as vagas de emprego.

// ESTRUTURAS DE DADOS UTILIZADAS:
// 1. OBJETO: usado para agrupar estatísticas em pares chave-valor (ex: totalCursos, totalMatriculas, etc.)
// 2. ARRAY: usado implicitamente nas animações do framer-motion (ex: [0, 10, 0]) para simular movimentos cíclicos
// 3. FUNÇÕES: tratadas como dados em React (ex: passadas para hooks como useEffect e setInterval)
// 4. PRIMITIVOS: strings (ex: títulos, textos, rotas) e números (valores estatísticos)
// 5. ÁRVORE (Virtual DOM): estrutura em forma de árvore JSX que representa os elementos visuais da interface
// Estas estruturas juntas permitem organizar, animar e renderizar o conteúdo interativo da seção principal do aplicativo.

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { estatisticasMock } from '../../data/mockData';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [stats, setStats] = useState({
    totalCursos: 0,
    totalMatriculas: 0,
    totalContratacoes: 0,
    totalVagas: 0
  });

  useEffect(() => {
    // Initial animation
    animateStats();

    // Set up interval for periodic updates
    const interval = setInterval(() => {
      animateStats();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const animateStats = () => {
    // Generate random increase percentages between 2-5%
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
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" // Initial subtle shadow
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      },
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)" // Slightly more prominent shadow on hover
    },
    tap: {
      scale: 0.95,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" // Shadow when tapped
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

        {/* Estatísticas de impacto */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center relative overflow-hidden"
            variants={statCardVariants}
            initial="initial" // Set initial state for shadow
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
                ease: "easeInOut"
              }}
            />
            <motion.p 
              className="text-3xl md:text-4xl font-bold mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              {stats.totalCursos}
            </motion.p>
            <p className="text-sm opacity-90">Cursos Disponíveis</p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center relative overflow-hidden"
            variants={statCardVariants}
            initial="initial" // Set initial state for shadow
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
                delay: 0.5
              }}
            />
            <motion.p 
              className="text-3xl md:text-4xl font-bold mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              {stats.totalMatriculas.toLocaleString('pt-BR')}
            </motion.p>
            <p className="text-sm opacity-90">Matrículas Realizadas</p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center relative overflow-hidden"
            variants={statCardVariants}
            initial="initial" // Set initial state for shadow
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
                delay: 1
              }}
            />
            <motion.p 
              className="text-3xl md:text-4xl font-bold mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              {stats.totalContratacoes.toLocaleString('pt-BR')}
            </motion.p>
            <p className="text-sm opacity-90">Contratações</p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center relative overflow-hidden"
            variants={statCardVariants}
            initial="initial" // Set initial state for shadow
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
                delay: 1.5
              }}
            />
            <motion.p 
              className="text-3xl md:text-4xl font-bold mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              {stats.totalVagas}
            </motion.p>
            <p className="text-sm opacity-90">Vagas Disponíveis</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;