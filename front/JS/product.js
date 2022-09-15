const recupUrl = window.location.href;
const url = new URL(recupUrl);
const id = url.searchParams.get("id");

function produitKanap () {
fetch(`http://localhost:3000/api/products/${id}`)
.then(function (response) {
    if (response.ok) {
          return response.json();
    }
})
.then(function (infosKanap) {

    const imageProduit = document.createElement("img");
    document.querySelector(".item__img").appendChild(imageProduit);
    imageProduit.setAttribute('src', infosKanap.imageUrl);
    imageProduit.setAttribute('alt', infosKanap.altTxt);

    const titreProduit = document.getElementById("title");
    titreProduit.innerText = infosKanap.name;

    const prixProduit = document.getElementById("price");
    prixProduit.innerText = infosKanap.price;

    const descriptionProduit = document.getElementById("description");
    descriptionProduit.innerText = infosKanap.description;

    infosKanap.colors.forEach(color => {
    const couleurProduit = document.createElement("option");
    document.getElementById("colors").appendChild(couleurProduit);
    couleurProduit.setAttribute("value", infosKanap.colors);
    couleurProduit.innerText = color;
        
    });
})}

produitKanap();

const colors = document.getElementById("colors");
const quantity = document.getElementById("quantity");
const addPanier = document.getElementById("addToCart");
const local = JSON.parse(localStorage.getItem("dataPanier"));

function addToCart() {
addPanier.addEventListener('click', (event) => {
    const dataPanier = {
        id: produitKanap._id,
        quantite : quantity.value,
        couleurs : colors.value
 }
    
});
};

console.log(addToCart)