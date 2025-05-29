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