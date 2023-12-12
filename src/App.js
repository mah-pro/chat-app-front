// Importation des modules nécessaires depuis React et d'autres fichiers du projet
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import IndexPage from "./Pages/IndexPage";
import ChatroomPage from "./Pages/ChatroomPage";
import io from "socket.io-client";  // Importation du client Socket.IO
import makeToast from "./Toaster";   // Importation d'une fonction utilitaire pour afficher des messages toast

// Définition du composant principal de l'application
function App() {
  const [socket, setSocket] = useState(null);  // État local pour stocker l'instance du socket

  // Fonction pour configurer la connexion du socket
  const setupSocket = () => {
    try {
      const token = localStorage.getItem("CC_Token");  // Récupération du jeton d'authentification depuis le stockage local
      if (token && !socket) {
        const newSocket = io("http://localhost:8000", {  // Initialisation d'une nouvelle instance de socket.io-client
          query: {
            token,
          },
        });

        // Gestionnaire d'événement pour la déconnexion du socket
        newSocket.on("disconnect", () => {
          setSocket(null);  // Réinitialisation du socket à null
          setTimeout(setupSocket, 3000);  // Tentative de reconnexion après 3 secondes
          makeToast("error", "Prise déconnectée !");  // Affichage d'un message toast d'erreur
        });

        // Gestionnaire d'événement pour la connexion réussie du socket
        newSocket.on("connect", () => {
          makeToast("success", "Prise connectée !");  // Affichage d'un message toast de succès
        });

        setSocket(newSocket);  // Mise à jour de l'état local avec la nouvelle instance de socket
      }
    } catch (error) {
      console.error("Erreur lors de la configuration de la socket :", error);  // Affichage d'une erreur en cas de problème
    }
  };

  // Effet secondaire pour configurer le socket lors du montage du composant
  useEffect(() => {
    setupSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rendu du composant avec la configuration de React Router
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage setupSocket={setupSocket} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage socket={socket} />} />
        <Route path="/chatroom/:id" element={<ChatroomPage socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;  // Exportation du composant principal
