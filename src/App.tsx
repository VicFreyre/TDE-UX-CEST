// Componente principal da aplicação React que configura a estrutura geral da SPA (Single Page Application).
// Ele inclui provedores de contexto para acessibilidade e dados do usuário, além do roteamento entre páginas.
// Utiliza React Router para navegação entre HomePage, UniPlusPage, EmpregaPlusPage e ProfilePage.
//
// Estruturas de dados e conceitos usados:
// - Componentes funcionais React (React.FC implícito).
// - Context API para gerenciamento global de estado (AcessibilidadeProvider e UserProvider).
// - React Router (BrowserRouter, Routes, Route) para navegação entre rotas.
// - JSX para composição da interface, com Navbar, Footer, FloatingButtons e área principal de conteúdo.
// - Layout baseado em flexbox (classe CSS "flex flex-col min-h-screen bg-neutral-50").
//
// O componente encapsula toda a aplicação, garantindo que a navegação e os estados globais estejam disponíveis para todos os componentes internos.


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import FloatingButtons from './components/ui/FloatingButtons';
import HomePage from './pages/HomePage';
import UniPlusPage from './pages/UniPlusPage';
import EmpregaPlusPage from './pages/EmpregaPlusPage';
import ProfilePage from './pages/ProfilePage';
import { AcessibilidadeProvider } from './context/AcessibilidadeContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <AcessibilidadeProvider>
      <UserProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-neutral-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/uni-plus" element={<UniPlusPage />} />
                <Route path="/emprega-plus" element={<EmpregaPlusPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
              </Routes>
            </main>
            <Footer />
            <FloatingButtons />
          </div>
        </Router>
      </UserProvider>
    </AcessibilidadeProvider>
  );
}

export default App;