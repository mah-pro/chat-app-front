// Import de la bibliothèque SweetAlert2
import Swal from 'sweetalert2';

// Configuration du Toast
const Toast = Swal.mixin({
toast: true,                      // Définit le type de notification comme un toast
position: 'top-end',              // Position du toast en haut à droite de l'écran
showConfirmButton: false,          // Ne montre pas de bouton de confirmation
timer: 3000,                       // Durée d'affichage du toast en millisecondes (ici, 3 secondes)
timerProgressBar: true,            // Affiche une barre de progression pendant la durée du toast
onOpen: (toast) => {
// Pause du minuteur en survol de la souris
toast.addEventListener('mouseenter', Swal.stopTimer);    // Si la souris survole le toast, le minuteur est mis en pause
toast.addEventListener('mouseleave', Swal.resumeTimer);   // Si la souris quitte le toast, le minuteur reprend
},
});

// Fonction pour créer un toast
const makeToast = (type, msg) => {
// Affiche le toast avec l'icône et le message spécifiés
Toast.fire({
icon: type,     // Type d'icône du toast (success, error, warning, info, etc.)
title: msg,     // Message à afficher dans le toast
});
};

// Exporte la fonction makeToast pour qu'elle puisse être utilisée ailleurs dans le code
export default makeToast;
