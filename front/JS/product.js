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

    for (let color of infosKanap.colors) {
        const option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        document.getElementById("colors").append(option);
    };
})}

produitKanap();

const addToCart = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");
const colors = document.getElementById("colors");


addToCart.addEventListener("click", function (e){

    let kanapDetails = {
        Id: id,
        Color: colors.value,
        Quantity: quantity.value
    }

    let kanapInfos = JSON.parse(localStorage.getItem("Kanap"));
     //Si le panier comporte déjà au moins 1 article
    if (kanapInfos) {
        const resultFind = kanapInfos.find((element) => element.Id === id && element.Color === colors.value);
            //Si le produit commandé est déjà dans le panier
            if (resultFind) {
                let newQuantite =
                parseInt(kanapDetails.Quantity) + parseInt(resultFind.Quantity);
                resultFind.Quantity = newQuantite;
                localStorage.setItem("Kanap", JSON.stringify(kanapInfos));
            //Si le produit commandé n'est pas dans le panier
            } else {
                kanapInfos.push(kanapDetails);
                localStorage.setItem("Kanap", JSON.stringify(kanapInfos));
            }
        //Si le panier est vide
        } else {
            kanapInfos =[];
            kanapInfos.push(kanapDetails);
            localStorage.setItem("Kanap", JSON.stringify(kanapInfos));
    }

    let validator = true
  if (colors.value == 0){
    alert("Merci de choisir votre couleur");
    validator = false;
  }
  if (quantity.value == 0){
    alert("Merci de choisir la quantité d'article souhaité");
    validator = false;
  }
  if (quantity.value > 100){
    alert("Merci de choisir une quantité comprise entre 1 et 100");
    validator = false;
}})


