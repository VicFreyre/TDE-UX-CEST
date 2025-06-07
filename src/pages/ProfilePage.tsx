// Componente funcional React que representa a página de perfil do usuário (ProfilePage).
// A página exibe o componente UserProfile, responsável por mostrar os dados e informações do usuário.
//
// Estruturas de dados utilizadas:
// - JSX para estruturar a interface da página.
// - Componente funcional React (React.FC).
// - O componente UserProfile utiliza objetos para armazenar e exibir os dados do usuário.


import React from 'react';
import UserProfile from '../components/profile/UserProfile';

const ProfilePage: React.FC = () => {
  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;