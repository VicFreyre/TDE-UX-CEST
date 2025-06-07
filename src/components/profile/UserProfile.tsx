// Este código define um componente React chamado UserProfile que exibe o perfil de um usuário, 
// incluindo suas informações pessoais, cursos, certificados e vagas de emprego para as quais se candidatou.
// Ele utiliza hooks do React para gerenciar o estado da aba selecionada e a expansão/retração das listas.
// Usa animações da biblioteca framer-motion para transições suaves nos elementos da interface.
// A interação principal é a simulação do progresso em cursos não concluídos, permitindo atualizar o progresso do usuário.

// Estruturas de dados utilizadas:
// - Estado (state) do React via useState para controlar abas e expansões (strings e booleanos).
// - Arrays (listas) para armazenar e iterar sobre cursos, certificados e vagas aplicadas (user.cursos, user.certificados, user.vagasAplicadas).
// - Objetos para representar cada curso, certificado e vaga, contendo propriedades como id, título, descrição, progresso, etc.


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, GraduationCap, Award, Briefcase, 
  Calendar, ChevronDown, ChevronUp 
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

const UserProfile: React.FC = () => {
  const { user, atualizarProgressoCurso } = useUser();
  const [abaSelecionada, setAbaSelecionada] = useState('cursos');
  const [cursosExpanded, setCursosExpanded] = useState(true);
  const [certificadosExpanded, setCertificadosExpanded] = useState(true);
  const [vagasExpanded, setVagasExpanded] = useState(true);
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl p-8 text-center shadow-md">
          <p className="text-neutral-600">Usuário não encontrado.</p>
        </div>
      </div>
    );
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  // Função para atualizar o progresso (simulação)
  const simularProgresso = (cursoId: string) => {
    const cursoAtual = user.cursos.find(c => c.id === cursoId);
    if (!cursoAtual || cursoAtual.concluido) return;
    
    const novoProgresso = Math.min(cursoAtual.progresso! + 10, 100);
    atualizarProgressoCurso(cursoId, novoProgresso);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        className="bg-white rounded-xl shadow-md overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Cabeçalho do perfil */}
        <motion.div 
          className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-8 text-white"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src={user.foto} 
              alt={user.nome} 
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{user.nome}</h1>
              <p className="text-white/80">Estado: {user.estado}</p>
            </div>
          </div>
        </motion.div>
        
        {/* Estatísticas do perfil */}
        <motion.div 
          className="grid grid-cols-3 border-b border-neutral-200"
          variants={itemVariants}
        >
          <div className="px-4 py-6 text-center border-r border-neutral-200">
            <p className="text-2xl font-bold text-primary-600">{user.cursos.length}</p>
            <p className="text-sm text-neutral-500">Cursos</p>
          </div>
          <div className="px-4 py-6 text-center border-r border-neutral-200">
            <p className="text-2xl font-bold text-secondary-600">{user.certificados.length}</p>
            <p className="text-sm text-neutral-500">Certificados</p>
          </div>
          <div className="px-4 py-6 text-center">
            <p className="text-2xl font-bold text-success-500">{user.vagasAplicadas.length}</p>
            <p className="text-sm text-neutral-500">Candidaturas</p>
          </div>
        </motion.div>
        
        {/* Abas de navegação */}
        <motion.div 
          className="flex border-b border-neutral-200"
          variants={itemVariants}
        >
          <button
            onClick={() => setAbaSelecionada('cursos')}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
              abaSelecionada === 'cursos'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <GraduationCap size={18} className="mr-2" />
            Cursos
          </button>
          <button
            onClick={() => setAbaSelecionada('certificados')}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
              abaSelecionada === 'certificados'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <Award size={18} className="mr-2" />
            Certificados
          </button>
          <button
            onClick={() => setAbaSelecionada('vagas')}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
              abaSelecionada === 'vagas'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <Briefcase size={18} className="mr-2" />
            Candidaturas
          </button>
        </motion.div>
        
        {/* Conteúdo da aba */}
        <motion.div className="p-6" variants={itemVariants}>
          {/* Cursos */}
          {abaSelecionada === 'cursos' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <GraduationCap size={20} className="mr-2 text-primary-500" />
                  Meus Cursos
                </h2>
                <button
                  onClick={() => setCursosExpanded(!cursosExpanded)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  {cursosExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              {cursosExpanded && (
                <div className="space-y-4">
                  {user.cursos.length > 0 ? (
                    user.cursos.map(curso => (
                      <div 
                        key={curso.id}
                        className="bg-neutral-50 rounded-lg p-4 border border-neutral-200"
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          <img 
                            src={curso.imagem} 
                            alt={curso.titulo} 
                            className="w-full sm:w-40 h-32 object-cover rounded-lg"
                          />
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold">{curso.titulo}</h3>
                            <p className="text-sm text-neutral-600 mb-3">{curso.descricao}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-neutral-500">Duração: {curso.duracao}</span>
                              <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700">
                                {curso.categoria}
                              </span>
                            </div>
                            
                            {curso.matriculado && !curso.concluido && (
                              <div className="mt-3">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progresso</span>
                                  <span>{curso.progresso}%</span>
                                </div>
                                <div className="w-full bg-neutral-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary-500 h-2 rounded-full" 
                                    style={{ width: `${curso.progresso}%` }}
                                  ></div>
                                </div>
                                <button
                                  onClick={() => simularProgresso(curso.id)}
                                  className="mt-3 text-sm bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded transition-colors"
                                >
                                  Avançar (Simulação)
                                </button>
                              </div>
                            )}
                            
                            {curso.concluido && (
                              <div className="mt-3">
                                <span className="inline-block px-2 py-1 text-xs font-medium bg-success-500 text-white rounded-full">
                                  Concluído
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-neutral-500 text-center py-4">
                      Você ainda não está matriculado em nenhum curso.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
          
          {/* Certificados */}
          {abaSelecionada === 'certificados' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Award size={20} className="mr-2 text-primary-500" />
                  Meus Certificados
                </h2>
                <button
                  onClick={() => setCertificadosExpanded(!certificadosExpanded)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  {certificadosExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              {certificadosExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.certificados.length > 0 ? (
                    user.certificados.map(certificado => (
                      <motion.div 
                        key={certificado.id}
                        className="bg-white rounded-lg overflow-hidden shadow-card border border-neutral-200"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <div className="h-32 bg-gradient-mixed flex items-center justify-center relative">
                          <Award size={60} className="text-white" />
                          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                          <img 
                            src={certificado.imagem} 
                            alt={certificado.cursoNome} 
                            className="absolute top-0 left-0 w-full h-full object-cover mix-blend-overlay"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-1">{certificado.cursoNome}</h3>
                          <div className="flex items-center text-sm text-neutral-500">
                            <Calendar size={14} className="mr-1" />
                            Emitido em: {certificado.dataEmissao}
                          </div>
                          <button className="mt-4 w-full bg-primary-100 hover:bg-primary-200 text-primary-700 text-sm py-2 rounded transition-colors">
                            Visualizar Certificado
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-neutral-500 text-center py-4 col-span-2">
                      Você ainda não possui certificados. Conclua cursos para obtê-los.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
          
          {/* Vagas */}
          {abaSelecionada === 'vagas' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Briefcase size={20} className="mr-2 text-primary-500" />
                  Minhas Candidaturas
                </h2>
                <button
                  onClick={() => setVagasExpanded(!vagasExpanded)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  {vagasExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              {vagasExpanded && (
                <div className="space-y-4">
                  {user.vagasAplicadas.length > 0 ? (
                    user.vagasAplicadas.map(vaga => (
                      <div 
                        key={vaga.id}
                        className="bg-neutral-50 rounded-lg p-4 border border-neutral-200"
                      >
                        <div>
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center text-white mr-3">
                              <Briefcase size={20} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">{vaga.titulo}</h3>
                              <p className="text-neutral-600">{vaga.empresa}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
                              {vaga.setor}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                              {vaga.local}
                            </span>
                            {vaga.salario && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
                                {vaga.salario}
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-3 flex justify-between items-center">
                            <span className="text-xs text-neutral-500">
                              Aplicado em: {vaga.dataPublicacao}
                            </span>
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-success-500 text-white rounded-full">
                              Candidatura Enviada
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-neutral-500 text-center py-4">
                      Você ainda não se candidatou a nenhuma vaga.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserProfile;