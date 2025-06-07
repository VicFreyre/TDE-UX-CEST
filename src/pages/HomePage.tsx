// Componente funcional React que representa a página inicial (HomePage) do aplicativo.
// A página renderiza diversos componentes principais: Hero, ProgramCards, UnemploymentChart e Testimonials,
// que juntos compõem a interface inicial com destaque, programas oferecidos, gráfico de desemprego e depoimentos.
//
// Estruturas de dados utilizadas:
// - JSX para estruturar a interface da página.
// - Componente funcional React (React.FC).
// - Componentes filhos importados que utilizam arrays e objetos para renderizar conteúdo dinâmico.


import React from 'react';
import Hero from '../components/home/Hero';
import UnemploymentChart from '../components/home/UnemploymentChart';
import ProgramCards from '../components/home/ProgramCards';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <ProgramCards />
      <UnemploymentChart />
      <Testimonials />
    </div>
  );
};

export default HomePage;