// Componente funcional React que representa a página UniPlus (UniPlusPage).
// Essa página exibe o componente CoursesList, que lista os cursos disponíveis para o usuário.
//
// Estruturas de dados utilizadas:
// - JSX para estruturar a interface da página.
// - Componente funcional React (React.FC).
// - O componente CoursesList utiliza arrays de objetos para armazenar e renderizar os cursos.


import React from 'react';
import CoursesList from '../components/uniplus/CoursesList';

const UniPlusPage: React.FC = () => {
  return (
    <div>
      <CoursesList />
    </div>
  );
};

export default UniPlusPage;