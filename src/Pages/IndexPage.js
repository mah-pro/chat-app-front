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
    <div className="home-page">
    {/* Section du titre de l'application */}
    <section className="title-container">
	    <div className="content">
		    <h2>NIOFARR</h2>
		    <h2>NIOFARR</h2>
	    </div>
    </section>  

    {/* Section de l'image du corps */}
    <div className="body-img">
        <img src="./mon-logo.jpeg" alt="mon logo" />
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
    </div>
</>
);
};

// Exportation du composant IndexPage comme composant par défaut
export default IndexPage;
