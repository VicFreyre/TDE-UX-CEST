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