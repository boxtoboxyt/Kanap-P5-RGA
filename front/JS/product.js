const recupUrl = window.location.href;
const url = new URL(recupUrl);
const id = url.searchParams.get("id");

// Appel de l'API en fonction de l'ID
function produitKanap () {
fetch(`http://localhost:3000/api/products/${id}`)
.then(function (response) {
    if (response.ok) {
          return response.json();
    }
})
// Réponse, function DOM ajout de l'ensemble des éléments visuelles
.then(function (infosKanap) {

    const imageProduit = document.createElement("img");
    document.querySelector(".item__img").appendChild(imageProduit);
    imageProduit.setAttribute("src", infosKanap.imageUrl);
    imageProduit.setAttribute("alt", infosKanap.altTxt);

    const titreProduit = document.getElementById("title");
    titreProduit.innerText = infosKanap.name;

    const prixProduit = document.getElementById("price");
    prixProduit.innerText = infosKanap.price;

    const descriptionProduit = document.getElementById("description");
    descriptionProduit.innerText = infosKanap.description;

// Boucle For pour appliquer la méthode sur chaque couleur
    for (let color of infosKanap.colors) {
        const option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        document.getElementById("colors").append(option);
    };
})}

produitKanap();

// LOCAL STORAGE ET GESTION DU PANIER //

//--------------------------------gestion du panier ------------------------
//selection btn ajout produit
const addBtn = document.querySelector("#addToCart")


//ecoute btn envoi panier
addBtn.addEventListener("click", (e)=>{

const couleur = document.querySelector("#colors").value;
const quantité = document.querySelector("#quantity").value;

if (quantité > 0 && quantité <=100 && couleur != "--SVP, choisissez une couleur --") {

  let kanapDetails = {
    colors: couleur,
    id: id,
    quantity: quantité
  }


  //---------------------------local storage-------------------------------------------------------------
  
  function saveBasket(basket) {
    localStorage.setItem("kanapProduit",JSON.stringify(basket));
  }
  
  function getBasket() {
    let basket = localStorage.getItem("kanapProduit");
    if (basket == null){
      return [];
    }else {
      return JSON.parse(basket);
    }
  }
  
  //ajout au panier
  function addBasket(kanapDetails) {
    //si le produit est déja ajouté au panier
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id === id && p.colors === couleur)
    if (foundProduct != undefined) {
      let newQuantity = parseInt(kanapDetails.quantity) + parseInt(foundProduct.quantity);
      foundProduct.quantity = newQuantity;
    }else {
      basket.push(kanapDetails);
    }
  
    saveBasket(basket);
  }

  addBasket(kanapDetails);
  
  if (confirm("Votre produit a bien été ajouté au panier! Voulez-vous voir votre panier?")) { 
  window.location.href = "cart.html"
}}else{
  return alert ("Pour ajouter au panier: \n-Sélectionner une couleur\n-sélectionner une quantité entre 1 et 100") 
}
});