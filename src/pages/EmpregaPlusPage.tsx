// Componente funcional React que representa a página "EmpregaPlus".
// Esta página exibe uma lista de vagas de emprego por meio do componente JobsList.

// Estruturas de dados utilizadas:
// - JSX para estruturação da interface.
// - Componente funcional React (React.FC).
// - Componente JobsList importado, que utiliza arrays de vagas para renderizar a lista.


import React from 'react';
import JobsList from '../components/empregaplus/JobsList';

const EmpregaPlusPage: React.FC = () => {
  return (
    <div>
      <JobsList />
    </div>
  );
};

export default EmpregaPlusPage;