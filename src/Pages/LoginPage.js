import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import makeToast from "../Toaster";

// Définition du composant fonctionnel LoginPage
const LoginPage = (props) => {
// Références aux champs de saisie d'email et de mot de passe
const emailRef = useRef();
const passwordRef = useRef();

// Hook de navigation pour rediriger l'utilisateur
const navigate = useNavigate();

// Fonction asynchrone pour gérer la connexion de l'utilisateur
const loginUser = async () => {
try {
    // Récupération des valeurs d'email et de mot de passe depuis les références
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Envoi de la requête de connexion au serveur
    const response = await axios.post("/user/login", {
    email,
    password,
    });

    // Affichage d'un message de succès et enregistrement du token dans le stockage local
    makeToast("success", response.data.message);
    localStorage.setItem("CC_Token", response.data.token);

    // Redirection vers la page du tableau de bord et configuration du socket
    navigate("/dashboard");
    props.setupSocket();
} catch (err) {
    // Gestion des erreurs en cas d'échec de la requête
    if (err.response && err.response.data && err.response.data.message) {
    makeToast("error", err.response.data.message);
    } else {
    makeToast("error", "Une erreur s'est produite");
    }
}
};

// Fonction pour gérer le clic sur le bouton de retour
const handleBackClick = () => {
// Retour à la page d'accueil
navigate("/");
};

// Rendu du composant
return (
<div className="card">
    <div className="cardHeader">Connexion</div>
    <div className="cardBody">
    <div className="inputGroup">
        <label htmlFor="email">Email</label>
        <input
        type="email"
        name="email"
        id="email"
        placeholder="abc@example.com"
        ref={emailRef}
        />
    </div>
    <div className="inputGroup">
        <label htmlFor="password">Mot de passe</label>
        <input
        type="password"
        name="password"
        id="password"
        placeholder="Votre mot de passe"
        ref={passwordRef}
        />
    </div>
    <button onClick={loginUser}>Se Connecter</button>
    </div>
    <br />
    <div>
    <button onClick={handleBackClick}>RETOUR</button>
    </div>
</div>
);
};

// Exportation du composant LoginPage
export default LoginPage;
