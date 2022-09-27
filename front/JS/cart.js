let kanapInfos = JSON.parse(localStorage.getItem("Kanap"));

if (kanapInfos) {
    for (let Kanap of kanapInfos) {
        let item = {
            Id: Kanap.Id,
            color: Kanap.Color,
            quantity: Kanap.Quantity,
        }

        fetch("http://localhost:3000/api/products/" + item.Id)
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })

        .then(function(kanap) {

            let section = document.getElementById("cart__items");

            let article = document.createElement("article");
            article.classList.add("cart__item");

            let itemImg = document.createElement("div");
            itemImg.classList.add("cart__item__img");

            let image = document.createElement("img");
            image.src = kanap.imageUrl;
            image.alt = kanap.altTxt;

            let itemContent = document.createElement("div");
            itemContent.classList.add("cart__item__content");

            let itemDesc = document.createElement("div");
            itemDesc.classList.add("cart__item__content__description");

            let h2 = document.createElement("h2");
            h2.classList.add("productName");
            h2.innerHTML = kanap.name;

            let color = document.createElement("p");
            color.innerHTML = item.color;

            let price = document.createElement("p");
            price.innerHTML = kanap.price + (' €');

            let itemSettings = document.createElement("div");
            itemSettings.classList.add("cart__item__content__settings");

            let itemSetQuantity = document.createElement("div");
            itemSetQuantity.classList.add("cart__item__content__settings__quantity");

            let nomQte = document.createElement("p");
            nomQte.innerHTML = ('Qté : ');

            let productQuantity = document.createElement("input");
            itemSetQuantity.appendChild(productQuantity);
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
            productQuantity.setAttribute("value", item.quantity);

            let itemDelete = document.createElement("div");
            itemDelete.classList.add("cart__item__content__settings__delete");

            let deleteAccept = document.createElement("p");
            deleteAccept.classList.add("itemDelete");
            deleteAccept.innerHTML = ('Supprimer');

            section.appendChild(article);

            article.appendChild(itemImg);
            article.appendChild(itemContent);

            itemImg.appendChild(image);

            itemContent.appendChild(itemDesc);

            itemDesc.appendChild(h2);
            itemDesc.appendChild(color);
            itemDesc.appendChild(price);

            article.appendChild(itemSettings);

            itemSettings.appendChild(itemSetQuantity);

            itemSetQuantity.appendChild(nomQte);
            itemSetQuantity.appendChild(productQuantity);

            article.appendChild(itemDelete);

            itemDelete.appendChild(deleteAccept);

            deleteAccept.addEventListener("click", (event) => {
                event.preventDefault();

                //Selection de l'element à supprimer en fonction de son id ET sa couleur
                let idDelete = item.Id;
                let colorDelete = item.color;

                let Cart = kanapInfos.filter(el => el.Id !== idDelete || el.Color !== colorDelete);
                event.target.closest(".cart__item").remove();

                localStorage.setItem("Kanap", JSON.stringify(Cart));

                //Alerte produit supprimé et refresh
                alert("Ce produit a bien été supprimé du panier");
                location.reload();
            })

            productQuantity.addEventListener("change", (e) => {
                e.preventDefault();

                //Selection de l'element à modifier en fonction de son id ET sa couleur
                let qttModifValue = Number(productQuantity.value);
                let idModif = item.Id;
                let colorModif = item.color;

                let Cart = kanapInfos.find((el) => el.Id === idModif) && kanapInfos.find((el) => el.Color === colorModif);
                if (Cart) {
                    Cart.Quantity = qttModifValue;
                    localStorage.setItem("Kanap", JSON.stringify(kanapInfos));
                } else {
                    Cart.push(Kanap);
                    localStorage.setItem("Kanap", JSON.stringify(kanapInfos));
                }

                // refresh rapide
                location.reload();
            })

            function totalQuantitePrix() {
                // Récupération du total des quantités
                let quantityElement = document.getElementsByClassName('itemQuantity');
                let monTableau = quantityElement.length,
                    totalQuantity = 0;

                for (let i = 0; i < monTableau; ++i) {
                    totalQuantity += quantityElement[i].valueAsNumber;
                }

                let productTotalQuantity = document.getElementById('totalQuantity');
                productTotalQuantity.innerHTML = totalQuantity;

                // Récupération du prix total
                let prixTotal = 0;

                for (let i = 0; i < monTableau; ++i) {
                    prixTotal += (quantityElement[i].valueAsNumber * kanap.price);
                }

                let productprixTotal = document.getElementById('prixTotal');
                productprixTotal = prixTotal;

                let affichagePrixHTML = document.getElementById("totalPrice");
                affichagePrixHTML.innerHTML = prixTotal;
            }
            totalQuantitePrix();
        })
    }
}


//LES REGEX//
let regexPrenom = /^[a-zA-Z\-\‘]+$/;
let regexAdress = /^[a-zA-Z0-9\s,‘-]*$/;
let regexEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;


//LES MESSAGES D'ERREURS//
let messagePrenomError = 'Le prénom est invalide';
let messageNomError = 'Le nom de famille est invalide';
let messageAdresseError = 'L‘adresse saisie est invalide';
let messageVilleError = 'La ville indiquée est invalide';
let messageEmailError = 'L‘email indiqué est invalide';

let regexFormulaire = document.querySelector(".cart__order__form");

let validFirstName = false;
let validLastName = false;
let validAddress = false;
let validCity = false;
let validMail = false;

let prenomError = document.getElementById("firstNameErrorMsg");
let prenom = document.getElementById("firstName").value;

regexFormulaire.firstName.addEventListener("input", function() {
    let firstNameValidator = regexPrenom.test(this.value);
    if (firstNameValidator) {
        validFirstName = true;
        prenomError.innerHTML = "";
    } else {
        validFirstName = false;
        prenomError.innerHTML = messagePrenomError;
    }
})

let nomError = document.getElementById("lastNameErrorMsg");
let nom = document.getElementById("lastName").value;

regexFormulaire.lastName.addEventListener("input", function() {
    let lastNameValidator = regexPrenom.test(this.value);
    if (lastNameValidator) {
        validLastName = true;
        nomError.innerHTML = "";
    } else {
        validlastName = false;
        nomError.innerHTML = messageNomError;
    }
})

let adressError = document.getElementById("addressErrorMsg");
let adresse = document.getElementById("address").value;

regexFormulaire.address.addEventListener("input", function() {
    let adressValidator = regexAdress.test(this.value);
    if (adressValidator) {
        validAdress = true;
        adressError.innerHTML = "";
    } else {
        validAdress = false;
        adressError.innerHTML = messageAdresseError;
    }
})

let villeError = document.getElementById("cityErrorMsg");
let ville = document.getElementById("city").value;

regexFormulaire.city.addEventListener("input", function() {
    let villeValidator = regexPrenom.test(this.value);
    if (villeValidator) {
        validVille = true;
        villeError.innerHTML = "";
    } else {
        validVille = false;
        villeError.innerHTML = messageVilleError;
    }
})

let emailError = document.getElementById("emailErrorMsg");
let email = document.getElementById("email").value;

regexFormulaire.email.addEventListener("input", function() {
    let emailValidator = regexEmail.test(this.value);
    if (emailValidator) {
        validEmailName = true;
        emailError.innerHTML = "";
    } else {
        validEmail = false;
        emailError.innerHTML = messageEmailError;
    }
});

const btn_commander = document.getElementById("order");

//Ecouter le panier
btn_commander.addEventListener("click", (ev) => {
    ev.preventDefault();

    //Construction d'un array depuis le local storage
    let idProduits = [];
    for (Kanap of kanapInfos) {
        idProduits.push(Kanap.Id);
    }

    //Récupération des coordonnées du formulaire client
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let adress = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let mail = document.getElementById('email').value;

    const order = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: adress,
            city: city,
            email: mail,
        },
        products: idProduits,
    };
    console.log(order);

    const options = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    };

    fetch("http://localhost:3000/api/products/order", options)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) {
            console.log(data);
            //localStorage.clear();
            //localStorage.setItem("orderId", data.orderId);

            window.location.href = 'confirmation.html?orderId=' + data.orderId;
        })
})