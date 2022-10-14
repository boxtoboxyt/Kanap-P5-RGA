// Récupération de l'ID qui est un chiffre renvoyé par le backend affiché dans l'URL du site
let productLocation = new URLSearchParams(window.location.search).get("orderId");

// Lancement d'une fonction qui récupère ce ID l'affiche ce ID un numéro de commande 
// La fonction vide totalement notre panier depuis le localstorage après l'envoi de la commande 
function searchId() {
  let textId = document.querySelector("#orderId");
  textId.innerHTML = `<br> ${productLocation}`;
  localStorage.clear();
}
// Appel de la fonction pour qu'elle s'exécute 
searchId();