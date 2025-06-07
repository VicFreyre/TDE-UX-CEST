// Este componente principal configura a aplicação React como uma SPA (Single Page Application).
// Ele usa React Router para gerenciar a navegação entre páginas diferentes (HomePage, UniPlusPage, EmpregaPlusPage e ProfilePage).
// 
// Uso de pilha:
// A navegação entre páginas no React Router utiliza o histórico do navegador, que funciona internamente como uma pilha (LIFO).
// Cada vez que uma rota é acessada, ela é adicionada ao topo da pilha do histórico.
// Ao navegar para trás (back), a pilha desempilha a página atual e retorna à anterior.
// Essa pilha de navegação é gerenciada pelo próprio navegador e manipulada pelo React Router, portanto não há uma pilha explícita no código React, mas sim uma pilha implícita no histórico de navegação.
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
