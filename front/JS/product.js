// Récupération dans l'URL de l'ID du produit sur lequel on a cliqué
let productId = new URLSearchParams(window.location.search).get("id");

// Appel à l'API pour afficher les détails spécifiques de chaque produit
function productComponents() {
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(
        ".item__img"
      ).innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
      document.querySelector(".item #title").innerText = data.name;
      document.querySelector(".item #price").innerHTML = `${data.price}`;
      document.querySelector(".item #description").innerText = data.description;
      document.querySelector(".item #colors").insertAdjacentHTML("beforeend",
        data.colors.map((color) => `<option value="${color}">${color}</option>`)
      );
      function addProduct() {
        // Lancement d'une fonction anonyme lors du clique sur le bouton "ajouter au panier"
        // La fonction permet d'ajouter un nouveau produit à notre localstorage et vous redirige directement sur la page du panier
        document.querySelector("#addToCart").addEventListener("click", () => {
          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          // Initialistion de propriétés qui permettent d'identifier chque produit
          let colorsProduct = document.querySelector(".item #colors").value;
          let quantityProduct = parseInt(document.querySelector("#quantity").value);
          let priceProduct = parseInt(document.querySelector('#price').innerHTML); 

          // Création d'un objet contenant les propriétés dont on a besoin pour stocker le produit dans le localstorage
          let productContainer = {
            colorsProduct,
            quantityProduct,
            productId,
            priceProduct,
          };

          // Condition pour accepter un produit dans le localStorage
          // L'utilisateur doit sélectionner une couleur et entre 1 et 100 canapés pour continuer à avancer

          if (
            quantityProduct <= 0 ||
            quantityProduct > 100 ||
            isNaN(quantityProduct) ||
            colorsProduct == ""
          ) {
            // Si la condition n'est pas respectée, l'utilisateur reçoit une alerte
            alert(
              "Vous devez choisir une quantité entre 1 et 100 et une couleur pour votre objet"
            );
          } else {
            // Si la condition est respectée, le produit est stocké et l'utilisateur est redirigé vers la page panier
            addSameProduct();
            setLocalStorage();
            window.location.href = "cart.html";
          }

          // Une fonction qui nous permet de ne pas dupliquer plusieurs fois le même produit et elle nous permet d'additionner différentes quantités pour un seul produit
          function addSameProduct() {
            let findProduct = cart.find(
              (p) =>
                p.colorsProduct == productContainer.colorsProduct &&
                p.productId == productContainer.productId
            );
            if (findProduct != undefined) {
              findProduct.quantityProduct += productContainer.quantityProduct;
            } else {
              quantityProduct = 1;
              cart.push(productContainer);
            }
          }
          // Fonction qui nous permet de prendre notre panier et le transformer en chaîne de caractères pour le stocker
          function setLocalStorage() {
            localStorage.setItem("cart", productContainer);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }

      // Appel de la fonction pour l'exécuter /
      addProduct();
    });
}
// Appel de la fonction pour l'exécuter
productComponents();