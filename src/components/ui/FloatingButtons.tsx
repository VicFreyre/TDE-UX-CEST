import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, X, Plus, Eye, MoveUp, MoveDown, Volume2, VolumeX } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useAcessibilidade } from '../../context/AcessibilidadeContext';

const FloatingButtons: React.FC = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [acessibilidadeAberta, setAcessibilidadeAberta] = useState(false);
  const { user } = useUser();
  const { 
    config, 
    aumentarFonte, 
    diminuirFonte, 
    toggleAltoContraste, 
    setModoDaltonismo,
    toggleNarrador
  } = useAcessibilidade();

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
    if (menuAberto) {
      setPerfilAberto(false);
      setAcessibilidadeAberta(false);
    }
  };

  const togglePerfil = () => {
    setPerfilAberto(!perfilAberto);
    setAcessibilidadeAberta(false);
  };

  const toggleAcessibilidade = () => {
    setAcessibilidadeAberta(!acessibilidadeAberta);
    setPerfilAberto(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Mini Perfil Preview */}
      <AnimatePresence>
        {perfilAberto && user && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-4 w-72 mb-4"
          >
            <div className="flex items-center mb-4">
              <img 
                src={user.foto} 
                alt={user.nome} 
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="font-medium text-neutral-800">{user.nome}</h3>
                <p className="text-sm text-neutral-500">Estado: {user.estado}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Resumo</h4>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-primary-50 p-2 rounded">
                  <p className="text-lg font-bold text-primary-700">{user.cursos.length}</p>
                  <p className="text-xs text-neutral-600">Cursos</p>
                </div>
                <div className="bg-secondary-50 p-2 rounded">
                  <p className="text-lg font-bold text-secondary-700">{user.certificados.length}</p>
                  <p className="text-xs text-neutral-600">Certificados</p>
                </div>
              </div>
            </div>
            
            {user.cursos.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Curso em Andamento</h4>
                {user.cursos.filter(c => !c.concluido)[0] && (
                  <div className="bg-neutral-50 p-2 rounded">
                    <p className="text-sm font-medium">{user.cursos.filter(c => !c.concluido)[0].titulo}</p>
                    <div className="w-full bg-neutral-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${user.cursos.filter(c => !c.concluido)[0].progresso}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-neutral-600">
                      {user.cursos.filter(c => !c.concluido)[0].progresso}%
                    </p>
                  </div>
                )}
              </div>
            )}
            
            <a 
              href="/perfil"
              className="block w-full text-center bg-primary-500 hover:bg-primary-600 text-white py-2 rounded transition-colors text-sm"
            >
              Ver Perfil Completo
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Painel de Acessibilidade */}
      <AnimatePresence>
        {acessibilidadeAberta && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-4 w-72 mb-4"
          >
            <h3 className="font-medium text-neutral-800 mb-4">Opções de Acessibilidade</h3>
            
            <div className="space-y-4">
              {/* Tamanho da Fonte */}
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Tamanho da Fonte</h4>
                <div className="flex items-center justify-between">
                  <button
                    onClick={diminuirFonte}
                    className="bg-neutral-100 hover:bg-neutral-200 p-2 rounded transition-colors"
                    aria-label="Diminuir tamanho da fonte"
                  >
                    <MoveDown size={18} />
                  </button>
                  <span className="text-sm">
                    {Math.round(config.tamanhoFonte * 100)}%
                  </span>
                  <button
                    onClick={aumentarFonte}
                    className="bg-neutral-100 hover:bg-neutral-200 p-2 rounded transition-colors"
                    aria-label="Aumentar tamanho da fonte"
                  >
                    <MoveUp size={18} />
                  </button>
                </div>
              </div>
              
              {/* Alto Contraste */}
              <div>
                <button
                  onClick={toggleAltoContraste}
                  className={`flex items-center justify-between w-full p-2 rounded transition-colors ${
                    config.modoAltoContraste ? 'bg-secondary-100 text-secondary-700' : 'bg-neutral-100 hover:bg-neutral-200'
                  }`}
                >
                  <span className="text-sm font-medium">Modo Alto Contraste</span>
                  <Eye size={18} />
                </button>
              </div>
              
              {/* Filtros de Daltonismo */}
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Filtros para Daltonismo</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setModoDaltonismo(config.modoDaltonismo === 'protanopia' ? null : 'protanopia')}
                    className={`text-xs p-2 rounded transition-colors ${
                      config.modoDaltonismo === 'protanopia' ? 'bg-secondary-100 text-secondary-700' : 'bg-neutral-100 hover:bg-neutral-200'
                    }`}
                  >
                    Protanopia
                  </button>
                  <button
                    onClick={() => setModoDaltonismo(config.modoDaltonismo === 'deuteranopia' ? null : 'deuteranopia')}
                    className={`text-xs p-2 rounded transition-colors ${
                      config.modoDaltonismo === 'deuteranopia' ? 'bg-secondary-100 text-secondary-700' : 'bg-neutral-100 hover:bg-neutral-200'
                    }`}
                  >
                    Deuteranopia
                  </button>
                  <button
                    onClick={() => setModoDaltonismo(config.modoDaltonismo === 'tritanopia' ? null : 'tritanopia')}
                    className={`text-xs p-2 rounded transition-colors ${
                      config.modoDaltonismo === 'tritanopia' ? 'bg-secondary-100 text-secondary-700' : 'bg-neutral-100 hover:bg-neutral-200'
                    }`}
                  >
                    Tritanopia
                  </button>
                  <button
                    onClick={() => setModoDaltonismo(config.modoDaltonismo === 'achromatopsia' ? null : 'achromatopsia')}
                    className={`text-xs p-2 rounded transition-colors ${
                      config.modoDaltonismo === 'achromatopsia' ? 'bg-secondary-100 text-secondary-700' : 'bg-neutral-100 hover:bg-neutral-200'
                    }`}
                  >
                    Acromático
                  </button>
                </div>
              </div>
              
              {/* Narrador */}
              <div>
                <button
                  onClick={toggleNarrador}
                  className={`flex items-center justify-between w-full p-2 rounded transition-colors ${
                    config.narrador ? 'bg-secondary-100 text-secondary-700' : 'bg-neutral-100 hover:bg-neutral-200'
                  }`}
                >
                  <span className="text-sm font-medium">Narrador</span>
                  {config.narrador ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botões flutuantes */}
      <div className="flex flex-col items-end space-y-4">
        <AnimatePresence>
          {menuAberto && (
            <>
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                onClick={togglePerfil}
                className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors ${
                  perfilAberto 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                }`}
                aria-label="Perfil"
              >
                <User size={22} />
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={toggleAcessibilidade}
                className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors ${
                  acessibilidadeAberta 
                    ? 'bg-secondary-600 text-white' 
                    : 'bg-secondary-500 hover:bg-secondary-600 text-white'
                }`}
                aria-label="Acessibilidade"
              >
                <Settings size={22} />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
            menuAberto
              ? 'bg-neutral-700 text-white'
              : 'bg-gradient-primary text-white'
          }`}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuAberto ? <X size={24} /> : <Plus size={24} />}
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingButtons;