// Initialisation du panier
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Condition qui affiche un message pour notifier à l'utilisateur que son panier est vide
// L'intérêt de la condition est d'empêcher l'utilisateur de tenter d'envoyer une commande en ayant aucun article
function emptyCart() {
  if(cart.length <= 0) {
    document.querySelector('.cart__order').style.display = 'none'; 
    document.querySelector('.cart__price').style.display = 'none'; 
    document.querySelector('h1').innerHTML = 'Votre Panier est vide'; 
  }
}
// Appel à la fonctiuon pour la lancer 
emptyCart(); 

let globalSection = document.querySelector("#cart__items");
// Boucler à travers le panier pour afficher tous les articles qu'il contient 
for (i = 0; i < cart.length; i++) {
  let itemId = cart[i].productId;
  let itemColor = cart[i].colorsProduct;
  let itemQuantity = cart[i].quantityProduct;
  // Appel à l'API avec l'ID du produit sélectionné pour afficher ses propres informations à lui 
  fetch(`http://localhost:3000/api/products/${itemId}`)
    .then((response) => response.json())
    .then((data) => {

      // Création et placement des éléments HTML dans le DOM

      // Création de l'élément HTML Article
      let newSection = document.createElement("article");
      newSection.classList.add("cart__item");
      newSection.dataset.id = `${itemId}`;
      newSection.dataset.color = `${itemColor}`;
      globalSection.appendChild(newSection);

      // Option de suppression d'article
      let deleteContainer = document.createElement("div");
      deleteContainer.classList.add("cart__item__content__settings__delete");
      let deleteParagraph = document.createElement("p");
      deleteParagraph.classList.add("deleteItem");
      deleteParagraph.innerHTML = "Supprimer";
      deleteParagraph.dataset.id = `${itemId}`;
      deleteParagraph.dataset.color = `${itemColor}`;

      // Partie HTML concernant la quantité contenant un texte et un input
      let quantityContainer = document.createElement("div");
      quantityContainer.classList.add("cart__item__content__settings");
      let quantityUnderContainer = document.createElement("div");
      quantityUnderContainer.classList.add(
        "cart__item__content__settings__quantity"
      );
      let quantityParagraph = document.createElement("p");
      quantityParagraph.innerHTML = "Qté:";
      let quantityInput = document.createElement("input");
      quantityInput.value = itemQuantity;
      quantityInput.setAttribute("type", "number");
      quantityInput.classList.add("itemQuantity");
      quantityInput.setAttribute("name", "itemQuantity");
      Object.assign(quantityInput, { min: 1, max: 100 });

      // Nom du canapé
      let newTitle = document.createElement("h2");
      newTitle.innerText = data.name;

      // Couleur du canapé
      let newColor = document.createElement("p");
      newColor.innerHTML += `${itemColor}`;
      // Prix du canapé
      let newPrice = document.createElement("p");
      newPrice.innerText = data.price * itemQuantity + `${" €"}`;
      // Image du canapé
      let newImage = document.createElement("img");
      newImage.src = data.imageUrl;
      newImage.alt += `${data.altTxt}`;
      let imageContainer = document.createElement("div");
      imageContainer.classList.add("cart__item__img");
      newSection.appendChild(imageContainer);
      // Container qui regroupe l'image, le prix, la quantité, le nom et l'image du canapé
      let descriptionContainer = document.createElement("div");
      descriptionContainer.classList.add("cart__item__content");
      newSection.appendChild(descriptionContainer);

      // On imbrique des éléments HTML pour correspondre au design initial imposé en HTML
      itemDescription = document.createElement("div");
      itemDescription.classList.add("cart__item__content__description");
      descriptionContainer.appendChild(itemDescription);
      descriptionContainer.appendChild(quantityContainer);
      quantityContainer.appendChild(quantityUnderContainer);
      quantityContainer.appendChild(deleteContainer);
      deleteContainer.appendChild(deleteParagraph);
      quantityUnderContainer.appendChild(quantityParagraph);
      quantityUnderContainer.appendChild(quantityInput);
      itemDescription.appendChild(newTitle);
      itemDescription.appendChild(newColor);
      itemDescription.appendChild(newPrice);
      imageContainer.appendChild(newImage);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Regex pour interdire à l'utiliser d'entrer des strings dans les inputs de quantité
      quantityInput.addEventListener("input", setInputValue);

      function valideInteger(e) {
        
        let regexInput = /^[0-9]+$/;
        return e.match(regexInput);
      }

      function setInputValue() {
        
        if (
          !valideInteger(quantityInput.value) ||
          quantityInput.value > 100 ||
          quantityInput.value <= 0
        ) {
          quantityInput.value = quantityInput.value.substring(
            0,
            quantityInput.value.length - 1
          );
        }
      }

      // Fonction qui affiche le prix et la quantité des éléments sélectionnés 
      function cartCount() {
        let totalArticle = 0;
        let totalPrice = 0;
        cart.forEach((product) => {
          totalArticle += parseInt(product.quantityProduct);
          totalPrice += product.priceProduct * parseInt(product.quantityProduct);
          document.getElementById("totalQuantity").textContent  = totalArticle;
          document.getElementById("totalPrice").textContent     = totalPrice;
        });
      }
      // Appel de la fonction pour qu'elle s'exécute
      cartCount();

      // Suppression d'un article
      function deleteOneArticle()  {
        deleteParagraph.addEventListener("click", function(p) {
          for (g = 0; g < cart.length; g++) {
            if (
              cart[g].productId === deleteParagraph.dataset.id &&
              cart[g].colorsProduct === deleteParagraph.dataset.color
            ) {
              p.target.closest(".cart__item").remove();
              let newCart = JSON.parse(localStorage.getItem("cart"));
              newCart.splice([g], 1);
              localStorage.setItem("cart", JSON.stringify(newCart));
              location.reload();
            }
          }
        });
      }
      // Appel de la fonction pour qu'elle s'exécute
      deleteOneArticle(); 

      // Fonction qui incrémente ou décremente le nombre total d'articles en appuyant sur les inputs 
      function changeQuantity() {
        newSection.addEventListener("change", (o) => {
          o.preventDefault(); 
          for (item of cart) if (
            item.productId === newSection.getAttribute('data-id') &&
            item.colorsProduct === newSection.getAttribute('data-color')
          ) {
              item.quantityProduct = o.target.value; 
              localStorage.setItem("cart", JSON.stringify(cart))
              calculateTotals(); 
          }
        });
      }
      //Appel de la fonction pour qu'elle s'exécute
      changeQuantity(); 

        // Fonction qui calcule l'ensemble des produits et des prix additionnées 
        function calculateTotals() {   
          let allTotalPrice = 0; 
          let FinalPrices = 0; 
          let allTotalArticles =0; 

          // Condition pour règler le problème des inputs vides 
          if(quantityInput.value === '' || quantityInput.value <= 0) {
            quantityInput.value = 1; 
            item.quantityProduct = 1; 
            localStorage.setItem("cart", JSON.stringify(cart))
          }

          // Mise à jour du prix de chaque produit invidiuel à chaque fois qu'on change la quantité grâce à l'input qui lui est attribué
          newPrice.innerText = item.priceProduct * item.quantityProduct + `${" €"}`;
          
          // Boucle à travers le panier pour avoir le prix et la quantité gloabaux des articles
          for(item of cart) {
            allTotalArticles += JSON.parse(item.quantityProduct); 
            FinalPrices = JSON.parse(item.quantityProduct) * JSON.parse(item.priceProduct); 
            allTotalPrice += FinalPrices;
          }
          // Injection dans le HTML des totaux des articles et des prix venant du panier 
          document.getElementById("totalQuantity").textContent = allTotalArticles;
          document.getElementById("totalPrice").textContent = allTotalPrice;
          
          // Conditions pour accorder le pluriel et le singulier de 'articles' avec la quantité de produits
          if(allTotalArticles == 1) {
            document.getElementById("totalQuantity").nextSibling.textContent = " article) :"
          } else {
            document.getElementById("totalQuantity").nextSibling.textContent = " articles) :"
          } 
        }
        // Appel à la fonction pour qu'elle s'exécute
        calculateTotals();      

    });
}

  
// Section du formulaire avec validation de tous les champs

// Création des expressions régulières => RegExp

// Cette première Rgex sera mobilisée pour le prenom, nom et la ville
let textRegExp = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$");
let addressRegExp = new RegExp(
  "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
);
let emailReg = new RegExp(
  "^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$"
);

// Récupérer le formulaire en dehors du contexte de la fonction pour ne pas avoir à le rappeler
let formulaire = document.querySelector(".cart__order__form");

// Validation du formulaire
function ValidationFormulaire() {
  
  // Validation du prénom
  formulaire.firstName.addEventListener("input", function () {
    validPrenom(this);
  });

  let validPrenom = function (inputPrenom) {
    let erreurPrenom = inputPrenom.nextElementSibling;
    erreurPrenom.innerHTML = "";
    if (!textRegExp.test(inputPrenom.value)) {
      erreurPrenom.innerHTML = "Votre prénom est invalide";
    }
  };

  // Validation du choix du nom
  formulaire.lastName.addEventListener("input", function () {
    valideNomFamille(this);
  });

  let valideNomFamille = function (inputNom) {
    let erreurNom = inputNom.nextElementSibling;
    erreurNom.innerHTML = "";
    if (!textRegExp.test(inputNom.value)) {
      erreurNom.innerHTML = "Votre nom est invalide";
    }
  };

  // Validation de l'adresse postale
  formulaire.address.addEventListener("input", function () {
    validAddresse(this);
  });

  let validAddresse = function (inputAddresse) {
    let erreurAdresse = inputAddresse.nextElementSibling;
    erreurAdresse.innerHTML = "";
    if (!addressRegExp.test(inputAddresse.value)) {
      erreurAdresse.innerHTML = "Votre adresse est invalide";
    }
  };

  // Validation du nom de la ville
  formulaire.city.addEventListener("input", function () {
    validVille(this);
  });

  let validVille = function (inputVille) {
    let erreurVille = inputVille.nextElementSibling;
    erreurVille.innerHTML = "";
    if (!textRegExp.test(inputVille.value)) {
      erreurVille.innerHTML = "Le nom de votre ville est invalide";
    }
  };

  // Vdlidation du mail
  formulaire.email.addEventListener("input", function () {
    validEmail(this);
  });

  let validEmail = function (inputEmail) {
    let erreurMail = inputEmail.nextElementSibling;
    erreurMail.innerHTML = "";
    if (!emailReg.test(inputEmail.value)) {
      erreurMail.innerHTML = "Votre adresse mail est invalide";
    }
  };
}
// Appel à la fonction pour qu'elle s'exécute
ValidationFormulaire();

// Envoi du formulaire validé vers le Backend
formulaire.addEventListener("submit", function sendFormulaire (e) {
  e.preventDefault();

  let productsId = [];
  for (let i = 0; i < cart.length; i++) {
    productsId.push(cart[i].productId);
  }
  // Constitution de l'objet à envoyer au Backend avec des éléments correspondant au format attendu dans le dossier controllers
  let order = {
    contact: {
      firstName: formulaire.firstName.value,
      lastName: formulaire.lastName.value,
      address: formulaire.address.value,
      city: formulaire.city.value,
      email: formulaire.email.value,
    },
    products: productsId,
  };

  let options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "content-type": "application/json",
    },
  };
  // Envoi de la requête avec la méthode POST et mise en place d'une condition pour gérer le cas d'un panier vide 
  fetch("http://localhost:3000/api/products/order", options)
    .then((res) => res.json())
    .then((data) => {
      if (!cart.length <= 0) {
        window.location.href = `/front/html/confirmation.html?orderId=${data.orderId}`;
      } else {
        alert(
          "Votre panier est vide, vous ne pouvez pas envoyer de commande. Donc nous vous renvoyons vers notre sélection d'articles"
        );
        window.location.href = "index.html";
      }
    });
});
// Appel à la fonction pour qu'elle s'exécute
sendFormulaire(); 