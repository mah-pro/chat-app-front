// Importation de React depuis la bibliothèque React
import React from "react";
// Importation du hook useNavigate depuis la bibliothèque react-router-dom
import { useNavigate } from "react-router-dom";

// Définition du composant fonctionnel IndexPage
const IndexPage = () => {
// Utilisation du hook useNavigate pour obtenir la fonction de navigation
const navigate = useNavigate();

// Fonction appelée lorsque le bouton "Register" est cliqué
const handleRegisterClick = () => {
// Utilisation de la fonction navigate pour rediriger l'utilisateur vers la page de registration ("/register")
navigate("/register");
};

// Fonction appelée lorsque le bouton "Login" est cliqué
const handleLoginClick = () => {
// Utilisation de la fonction navigate pour rediriger l'utilisateur vers la page de connexion ("/login")
navigate("/login");
};

// Rendu du composant
return (
<>
    {/* Section du titre de l'application */}
    <div className="title-container">
    <div className="app-container">
        <h1 className="app-title">NIO FARR MESSENGER</h1>
        <h2 className="app-title">HOME</h2>
    </div>
    </div>

    {/* Section de l'image du corps */}
    <div className="body-img">
    {/* Utilisation de l'image avec le chemin "src/téléchargement-removebg-preview.png" et l'alt "mon logo" */}
    <img src="src/téléchargement-removebg-preview.png" alt="mon logo" />
    </div>

    {/* Section du conteneur central avec les boutons */}
    <div className="center-container">
    <div className="button-container">
        {/* Bouton "Register" avec la gestion du clic associée à la fonction handleRegisterClick */}
        <button className="click-button" onClick={handleRegisterClick}>
        INSCRIPTION
        </button>
        {/* Bouton "Login" avec la gestion du clic associée à la fonction handleLoginClick */}
        <button className="click-button" onClick={handleLoginClick}>
        CONNEXION
        </button>
    </div>
    </div>
</>
);
};

// Exportation du composant IndexPage comme composant par défaut
export default IndexPage;
