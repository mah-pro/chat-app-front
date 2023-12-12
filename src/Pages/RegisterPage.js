import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import makeToast from "../Toaster";

// Définition du composant de la page d'inscription
const RegisterPage = () => {
    // Références pour les champs de saisie
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // Utilisation de useNavigate pour la navigation dans l'application
    const navigate = useNavigate();

    // Fonction pour enregistrer un utilisateur
    const registerUser = async () => {
        try {
            // Récupération des valeurs des champs
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            // Appel à l'API pour enregistrer l'utilisateur
            const response = await axios.post("/user/register", {
                name,
                email,
                password,
            });

            // Affichage d'un message de succès
            makeToast("success", response.data.message);

            // Redirection vers la page du tableau de bord après une inscription réussie
            navigate("/dashboard");
        } catch (error) {
            // Gestion des erreurs lors de l'inscription
            if (error.response && error.response.data && error.response.data.message) {
                // Affichage d'un message d'erreur spécifique s'il est disponible dans la réponse
                makeToast("error", error.response.data.message);
            } else {
                // Affichage d'un message d'erreur générique en cas d'erreur non spécifiée
                makeToast("error", "Une erreur s'est produite lors de l'inscription.");
            }
        }
    };

    // Fonction pour revenir à la page précédente
    const handleBackClick = () => {
        navigate("/");
    };

    // Rendu du composant
    return (
        <div className="card">
            <div className="cardHeader">Inscription</div>
            <div className="cardBody">
                {/* Champ de saisie pour le nom */}
                <div className="inputGroup">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" placeholder="John Doe" ref={nameRef} />
                </div>
                {/* Champ de saisie pour l'email */}
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="abc@example.com" ref={emailRef} />
                </div>
                {/* Champ de saisie pour le mot de passe */}
                <div className="inputGroup">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" placeholder="Votre mot de passe" ref={passwordRef} />
                </div>
                {/* Bouton d'inscription avec gestion de l'événement onClick */}
                <button onClick={registerUser}>S'inscrire</button>
            </div>
            <br />
            <div>
                {/* Bouton pour revenir à la page précédente */}
                <button onClick={handleBackClick}>Retour</button>
            </div>
        </div>
    );
};

// Exportation du composant pour une utilisation dans d'autres parties de l'application
export default RegisterPage;
