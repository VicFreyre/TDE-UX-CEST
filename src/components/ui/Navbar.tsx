import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, GraduationCap, Briefcase, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

const Navbar: React.FC = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  const estaAtivo = (caminho: string) => {
    return location.pathname === caminho;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={fecharMenu}>
            <motion.div 
              className="flex items-center" 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">N+</span>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-mixed">
                Nordeste+
              </span>
            </motion.div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                estaAtivo('/') 
                  ? 'text-primary-700 font-medium' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              <Home size={18} className="mr-1" />
              <span>Início</span>
            </Link>
            <Link
              to="/uni-plus"
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                estaAtivo('/uni-plus') 
                  ? 'text-primary-700 font-medium' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              <GraduationCap size={18} className="mr-1" />
              <span>Uni+</span>
            </Link>
            <Link
              to="/emprega-plus"
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                estaAtivo('/emprega-plus') 
                  ? 'text-primary-700 font-medium' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              <Briefcase size={18} className="mr-1" />
              <span>Emprega+</span>
            </Link>
            <Link
              to="/perfil"
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                estaAtivo('/perfil') 
                  ? 'text-primary-700 font-medium' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              <User size={18} className="mr-1" />
              <span>Perfil</span>
            </Link>
          </div>

          {/* Botão do menu mobile */}
          <button
            className="md:hidden text-neutral-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuAberto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {menuAberto && (
          <motion.div 
            className="md:hidden mt-3 pb-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`flex items-center px-4 py-3 rounded-md ${
                  estaAtivo('/') 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                onClick={fecharMenu}
              >
                <Home size={18} className="mr-2" />
                <span>Início</span>
              </Link>
              <Link
                to="/uni-plus"
                className={`flex items-center px-4 py-3 rounded-md ${
                  estaAtivo('/uni-plus') 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                onClick={fecharMenu}
              >
                <GraduationCap size={18} className="mr-2" />
                <span>Uni+</span>
              </Link>
              <Link
                to="/emprega-plus"
                className={`flex items-center px-4 py-3 rounded-md ${
                  estaAtivo('/emprega-plus') 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                onClick={fecharMenu}
              >
                <Briefcase size={18} className="mr-2" />
                <span>Emprega+</span>
              </Link>
              <Link
                to="/perfil"
                className={`flex items-center px-4 py-3 rounded-md ${
                  estaAtivo('/perfil') 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                onClick={fecharMenu}
              >
                <User size={18} className="mr-2" />
                <span>Perfil</span>
              </Link>
            </div>
            
            {user && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center px-4 py-2">
                  <img 
                    src={user.foto} 
                    alt={user.nome} 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium text-neutral-800">{user.nome}</p>
                    <p className="text-sm text-neutral-500">Estado: {user.estado}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;