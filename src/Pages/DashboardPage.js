// Importation des modules nécessaires depuis React et Axios
import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Importation de la fonction makeToast pour afficher des notifications
import makeToast from '../Toaster';

// Définition du composant DashboardPage
const DashboardPage = () => {
    // État local pour stocker la liste des salons de discussion
    const [chatrooms, setChatrooms] = useState([]);

    // Référence pour accéder à la valeur du champ de saisie du nom du salon
    const chatroomNameRef = useRef();

    // Fonction asynchrone pour récupérer la liste des salons de discussion depuis le serveur
    const getChatrooms = useCallback(() => {
        axios
            .get("http://localhost:8000/chatroom", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("CC_Token")}`,
                },
            })
            .then((response) => {
                setChatrooms(response.data);
            })
            .catch((err) => {
                // En cas d'erreur, réessayer après 3 secondes
                setTimeout(getChatrooms, 3000);
            });
    }, []); // Les dépendances sont vides car la fonction ne dépend d'aucune variable extérieure

    // Utilisation de useEffect pour appeler getChatrooms au montage du composant
    useEffect(() => {
        getChatrooms();
    }, [getChatrooms]); // Ajout de getChatrooms au tableau des dépendances

    // Fonction pour créer un nouveau salon de discussion
    const createChatroom = () => {
        const chatroomName = chatroomNameRef.current.value;

        axios
            .post(
                "http://localhost:8000/chatroom",
                {
                    name: chatroomName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("CC_Token")}`,
                    },
                }
            )
            .then((response) => {
                // Afficher une notification de succès
                makeToast("success", response.data.message);
                // Mettre à jour la liste des salons de discussion
                getChatrooms();
                // Effacer le champ de saisie
                chatroomNameRef.current.value = "";
            })
            .catch((err) => {
                // En cas d'erreur, afficher une notification d'erreur
                if (err.response && err.response.data && err.response.data.message) {
                    makeToast("error", err.response.data.message);
                }
            });
    };

    // Fonction pour supprimer un salon de discussion
    const deleteChatroom = (chatroomId) => {
        axios
            .delete(`http://localhost:8000/chatroom/${chatroomId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("CC_Token")}`,
                },
            })
            .then((response) => {
                // Afficher une notification de succès
                makeToast("success", response.data.message);
                // Mettre à jour la liste des salons de discussion
                getChatrooms();
            })
            .catch((err) => {
                // En cas d'erreur, afficher une notification d'erreur
                if (err.response && err.response.data && err.response.data.message) {
                    makeToast("error", err.response.data.message);
                } else {
                    // En cas d'erreur inattendue, afficher un message dans la console
                    console.error("Error deleting chatroom:", err);
                    makeToast("error", "An error occurred while deleting the chatroom.");
                }
            });
    };

    // Utilisation de useEffect pour créer un intervalle de rafraîchissement automatique des salons de discussion
    useEffect(() => {
        const interval = setInterval(() => {
            getChatrooms();
        }, 30000);

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(interval);
    }, [getChatrooms]);

    // Rendu du composant
    return (
        <div className="card">
            <div className="cardHeader">Chatrooms</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="chatroomName">Chatroom Name</label>
                    <input
                        type="text"
                        name="chatroomName"
                        id="chatroomName"
                        ref={chatroomNameRef}
                        placeholder="ChatterBox Nepal"
                    />
                </div>
            </div>
            {/* Bouton pour créer un nouveau salon de discussion */}
            <button onClick={createChatroom}>Create Chatroom</button>
            <div className="chatrooms">
                {/* Affichage de la liste des salons de discussion */}
                {chatrooms.map((chatroom) => (
                    <div key={chatroom._id} className="chatroom">
                        <div>{chatroom.name}</div>
                        {/* Lien pour rejoindre un salon de discussion */}
                        <Link to={`/chatroom/${chatroom._id}`}>
                            <div className="join">Join</div>
                        </Link>
                        <div>
                            {/* Bouton pour supprimer un salon de discussion */}
                            <button onClick={() => deleteChatroom(chatroom._id)} className="delete">
                                DELETE
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Exportation du composant DashboardPage
export default DashboardPage;
