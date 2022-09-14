const recupUrl = window.location.href;
const url = new URL(recupUrl);
const id = url.searchParams.get("id");
console.log(id);


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


let addButtonCart = document.getElementById("addToCart");

function addProduitCarte() {
let addButtonCart = document.getElementById("addToCart");
addButtonCart.addEventListener("click", (event) => {
    console.log(event.target);
})}


    
addProduitCarte();
produitKanap();