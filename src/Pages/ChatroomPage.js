// Importation des modules nécessaires depuis React
import React, { useEffect, useRef, useState } from 'react';
// Importation du hook useParams de react-router-dom pour extraire les paramètres de l'URL
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



// Composant fonctionnel ChatroomPage avec une prop socket
const ChatroomPage = ({ socket }) => {
    // Extraction de l'identifiant de la chatroom à partir des paramètres de l'URL
    const { id } = useParams();
    // État local pour stocker les messages de la chatroom
    const [messages, setMessages] = useState([]);
    // Référence pour stocker l'élément de champ de texte
    const messageRef = useRef();
    // État local pour stocker l'identifiant de l'utilisateur actuel
    const [userId, setUserId] = useState("");
    
    const navigate = useNavigate();


    // Fonction pour envoyer un message à la chatroom
    const sendMessage = () => {
        // Vérification de l'existence de la connexion socket
        if (socket) {
            // Émission de l'événement "chatroomMessage" avec les détails du message
            socket.emit("chatroomMessage", {
                chatroomId: id,
                message: messageRef.current.value,
            });

            // Effacement du champ de texte après l'envoi du message
            messageRef.current.value = "";
        }
    };

    // Effet pour extraire l'identifiant de l'utilisateur à partir du token stocké dans le localStorage
    useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (token) {
            // Décodage du token et extraction des données utilisateur
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.id);
        }
    }, []);

    // Effet pour écouter les nouveaux messages provenant de la socket et les ajouter à l'état local
    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }
    }, [socket]);

    // Effet pour rejoindre la chatroom lors du chargement du composant et quitter la chatroom lors du démontage
    useEffect(() => {
        if (socket) {
            // Émission de l'événement "joinRoom" avec l'identifiant de la chatroom
            socket.emit("joinRoom", {
                chatroomId: id,
            });

            // Fonction de nettoyage pour quitter la chatroom lors du démontage
            return () => {
                socket.emit("leaveRoom", {
                    chatroomId: id,
                });
            };
        }
    }, [id, socket]);
    

    const handleBack = () => {
        navigate("/dashboard");
    };

    // Rendu du composant ChatroomPage
    return (
        <div className="chatroomPage">
            <button onClick={handleBack}>RETOUR</button> 
            <div className="chatroomSection">
                {/* En-tête de la chatroom (peut être dynamiquement rempli avec le nom de la chatroom) */}
                <div className="cardHeader">Chatroom Name</div>
                {/* Section des messages de la chatroom */}
                <div className="chatroomContent">
                    {messages.map((message, i) => (
                        // Affichage de chaque message avec une classe différente pour les messages de l'utilisateur actuel
                        <div key={i} className="message">
                            <span
                                className={
                                    userId === message.userId ? "ownMessage" : "otherMessage"
                                }
                            >
                                {message.name}:
                            </span>{" "}
                            {message.message}
                        </div>
                    ))}
                </div>
                {/* Section des actions de la chatroom (saisie de message et bouton d'envoi) */}
                <div className="chatroomActions">
                    <div>
                        {/* Champ de saisie de message avec une référence pour accéder à sa valeur */}
                        <input
                            type="text"
                            name="message"
                            placeholder="Say something!"
                            ref={messageRef}
                        />
                    </div>
                    <div>
                        {/* Bouton d'envoi de message avec gestionnaire d'événement onClick */}
                        <button className="join" onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Exportation du composant ChatroomPage comme composant par défaut
export default ChatroomPage;
