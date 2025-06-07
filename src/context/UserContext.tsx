// Contexto React para gerenciar o estado do usuário em uma aplicação educacional/ofertas de vagas.
// Funcionalidades principais:
// - Armazenar os dados do usuário (usuário mock inicial).
// - Permitir matrícula em cursos, garantindo que não haja duplicidade.
// - Atualizar o progresso de um curso específico do usuário e gerar certificados automaticamente quando o curso é concluído.
// - Permitir candidatura a vagas, evitando candidaturas duplicadas.

// Estruturas de dados utilizadas:
// - Objeto User que contém arrays de cursos, vagas aplicadas e certificados.
// - Array para armazenar cursos matriculados, vagas aplicadas e certificados.
// - useState para manter o estado reativo do usuário.
// - Context API (createContext) para fornecer dados e funções do usuário a todos os componentes da aplicação.
// - Funções que manipulam e atualizam esses arrays imutavelmente (spread operator e map).

import React, { createContext, useState, useContext } from 'react';
import { User, Curso, Vaga } from '../types';
import { usuarioMock } from '../data/mockData';

interface UserContextType {
  user: User | null;
  matricularCurso: (curso: Curso) => void;
  aplicarVaga: (vaga: Vaga) => void;
  atualizarProgressoCurso: (cursoId: string, progresso: number) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  matricularCurso: () => {},
  aplicarVaga: () => {},
  atualizarProgressoCurso: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(usuarioMock);

  const matricularCurso = (curso: Curso) => {
    if (!user) return;

    // Verificar se o usuário já está matriculado
    const jaCursando = user.cursos.some(c => c.id === curso.id);
    
    if (!jaCursando) {
      const cursosAtualizados = [...user.cursos, {
        ...curso,
        matriculado: true,
        progresso: 0,
        concluido: false
      }];
      
      setUser({
        ...user,
        cursos: cursosAtualizados
      });
    }
  };

  const atualizarProgressoCurso = (cursoId: string, progresso: number) => {
    if (!user) return;

    const cursosAtualizados = user.cursos.map(curso => {
      if (curso.id === cursoId) {
        const concluido = progresso >= 100;
        
        // Se o curso foi concluído e ainda não tem certificado, adiciona um
        let certificadosAtualizados = [...user.certificados];
        
        if (concluido && !curso.concluido && !user.certificados.some(cert => cert.cursoId === cursoId)) {
          certificadosAtualizados.push({
            id: `cert-${Date.now()}`,
            cursoId: curso.id,
            cursoNome: curso.titulo,
            dataEmissao: new Date().toLocaleDateString('pt-BR'),
            imagem: curso.imagem
          });
        }
        
        return {
          ...curso,
          progresso,
          concluido
        };
      }
      return curso;
    });

    setUser({
      ...user,
      cursos: cursosAtualizados,
      certificados: cursosAtualizados.find(c => c.id === cursoId && c.progresso === 100 && !c.concluido) 
        ? [...user.certificados, {
            id: `cert-${Date.now()}`,
            cursoId: cursoId,
            cursoNome: cursosAtualizados.find(c => c.id === cursoId)?.titulo || '',
            dataEmissao: new Date().toLocaleDateString('pt-BR'),
            imagem: cursosAtualizados.find(c => c.id === cursoId)?.imagem || ''
          }]
        : user.certificados
    });
  };

  const aplicarVaga = (vaga: Vaga) => {
    if (!user) return;

    // Verificar se o usuário já aplicou para esta vaga
    const jaAplicou = user.vagasAplicadas.some(v => v.id === vaga.id);
    
    if (!jaAplicou) {
      const vagasAtualizadas = [...user.vagasAplicadas, {
        ...vaga,
        aplicado: true
      }];
      
      setUser({
        ...user,
        vagasAplicadas: vagasAtualizadas
      });
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        matricularCurso, 
        aplicarVaga, 
        atualizarProgressoCurso 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};