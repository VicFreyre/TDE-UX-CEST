// Contexto React para gerenciar configurações de acessibilidade da aplicação.
// Funcionalidades:
// - Controle do tamanho da fonte (aumentar/diminuir dentro de limites).
// - Ativação/desativação do modo de alto contraste para melhor visualização.
// - Seleção de modos de daltonismo (protanopia, deuteranopia, tritanopia, achromatopsia).
// - Ativação/desativação de narrador (leitor de tela).
// - Persistência das configurações no localStorage para manter preferências do usuário.
// - Aplicação dinâmica das configurações no estilo do documento HTML via classes CSS e alteração do tamanho da fonte.

// Estruturas de dados utilizadas:
// - Objeto (interface AcessibilidadeConfig) para armazenar o estado da configuração de acessibilidade.
// - State (useState) para controlar e atualizar a configuração atual de forma reativa.
// - Context API (createContext) para fornecer e compartilhar as configurações e funções para toda a árvore de componentes React.
// - localStorage para persistência de dados no navegador entre sessões.
// - String para classes CSS aplicadas dinamicamente ao elemento <html> para estilos de acessibilidade.


import React, { createContext, useState, useContext, useEffect } from 'react';
import { AcessibilidadeConfig } from '../types';

interface AcessibilidadeContextType {
  config: AcessibilidadeConfig;
  aumentarFonte: () => void;
  diminuirFonte: () => void;
  toggleAltoContraste: () => void;
  setModoDaltonismo: (modo: string | null) => void;
  toggleNarrador: () => void;
}

const initialConfig: AcessibilidadeConfig = {
  tamanhoFonte: 1,
  modoAltoContraste: false,
  modoDaltonismo: null,
  narrador: false,
};

const AcessibilidadeContext = createContext<AcessibilidadeContextType>({
  config: initialConfig,
  aumentarFonte: () => {},
  diminuirFonte: () => {},
  toggleAltoContraste: () => {},
  setModoDaltonismo: () => {},
  toggleNarrador: () => {},
});

export const useAcessibilidade = () => useContext(AcessibilidadeContext);

export const AcessibilidadeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AcessibilidadeConfig>(() => {
    const savedConfig = localStorage.getItem('acessibilidadeConfig');
    return savedConfig ? JSON.parse(savedConfig) : initialConfig;
  });

  useEffect(() => {
    localStorage.setItem('acessibilidadeConfig', JSON.stringify(config));
    
    // Aplicar configurações ao documento
    document.documentElement.style.fontSize = `${100 * config.tamanhoFonte}%`;
    
    if (config.modoAltoContraste) {
      document.documentElement.classList.add('alto-contraste');
    } else {
      document.documentElement.classList.remove('alto-contraste');
    }
    
    // Remover todas as classes de daltonismo
    document.documentElement.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia');
    
    // Adicionar classe específica para o tipo de daltonismo
    if (config.modoDaltonismo) {
      document.documentElement.classList.add(config.modoDaltonismo);
    }
    
  }, [config]);

  const aumentarFonte = () => {
    setConfig(prev => ({
      ...prev,
      tamanhoFonte: Math.min(prev.tamanhoFonte + 0.1, 1.5)
    }));
  };

  const diminuirFonte = () => {
    setConfig(prev => ({
      ...prev,
      tamanhoFonte: Math.max(prev.tamanhoFonte - 0.1, 0.8)
    }));
  };

  const toggleAltoContraste = () => {
    setConfig(prev => ({
      ...prev,
      modoAltoContraste: !prev.modoAltoContraste
    }));
  };

  const setModoDaltonismo = (modo: string | null) => {
    setConfig(prev => ({
      ...prev,
      modoDaltonismo: modo
    }));
  };

  const toggleNarrador = () => {
    setConfig(prev => ({
      ...prev,
      narrador: !prev.narrador
    }));
  };

  return (
    <AcessibilidadeContext.Provider 
      value={{ 
        config, 
        aumentarFonte, 
        diminuirFonte, 
        toggleAltoContraste, 
        setModoDaltonismo,
        toggleNarrador 
      }}
    >
      {children}
    </AcessibilidadeContext.Provider>
  );
};