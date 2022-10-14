// Récupération des données du local storage
let itemsFromCart = JSON.parse(localStorage.getItem("kanapProduit"));

// Appel API
fetch ('http://localhost:3000/api/products')
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(products => {
    // Message si le panier est vide
    if (itemsFromCart === null || itemsFromCart == 0) {
      document.querySelector("h1").textContent = 'Votre panier est vide.';
      document.getElementById("totalQuantity").textContent = 0;
      document.getElementById("totalPrice").textContent = 0;
    }

    // Création des éléments et des données de la page à afficher dans le panier
    else {
      for (const item of itemsFromCart) {
        const productFromApi = products.find(p => p._id === item.id);

        const produits = document.getElementById('cart__items');
  
        const article = document.createElement('article');
              article.className = "cart__item";
              article.setAttribute('data-id',`${item.id}`);
              article.setAttribute('data-color',`${item.color}`);
              produits.appendChild(article);

        const divImg = document.createElement('div');
              divImg.className = "cart__item__img";
              article.appendChild(divImg);

        const img = document.createElement('img');
              img.src=`${productFromApi.imageUrl}`;
              img.setAttribute('alt',`${productFromApi.altTxt}`);
              divImg.appendChild(img);

        const divDescription = document.createElement('div');
              divDescription.className = "cart__item__content";
              article.appendChild(divDescription);

        const description = document.createElement('div');
              description.className = "cart__item__content__description";
             divDescription.appendChild(description);

        const nameItem = document.createElement('h2');
              description.appendChild(nameItem).textContent = `${productFromApi.name}`;

        const colorItem = document.createElement('p');
              description.appendChild(colorItem).textContent = `${item.colors}`;

        const priceItem = document.createElement('p');
              description.appendChild(priceItem).textContent = `${productFromApi.price} €`;

        const descriptionSettings = document.createElement('div');
              descriptionSettings.className = "cart__item__content__settings";
              divDescription.appendChild(descriptionSettings);

        const descriptionSettingsQuantity = document.createElement('div');
              descriptionSettingsQuantity.className = "cart__item__content__settings__quantity";
              descriptionSettings.appendChild(descriptionSettingsQuantity);

        const productQuantity = document.createElement('p');
              descriptionSettingsQuantity.appendChild(productQuantity).textContent = "Qté : ";

        const input = document.createElement('input');
              input.className = "itemQuantity";
              input.setAttribute('type','number');
              input.setAttribute('name','itemQuantity');
              input.setAttribute('min', "1");
              input.setAttribute('max', "100");
              input.setAttribute('value',`${item.quantity}`);
              descriptionSettingsQuantity.appendChild(input);

        const supprimer = document.createElement('div');
              supprimer.className = "cart__item__content__settings__delete";
              descriptionSettings.appendChild(supprimer);

        const deleteItem = document.createElement('p');
              deleteItem.className = "deleteItem";
              supprimer.appendChild(deleteItem).textContent = "Supprimer";

        //----------------------- Fonction de changement de quantité dans le panier----------------
        function changeQuantity() {
          input.addEventListener('change', function (e) {

          let itemsFromCart = JSON.parse(localStorage.getItem("kanapProduit"));
          itemsFromCart.find((element) => element.id == item.id && element.colors == item.colors).quantity= input.value;
          localStorage.setItem('kanapProduit', JSON.stringify(itemsFromCart));
          })}
        changeQuantity();
        //----------------- Fonction de suppression d'un produit dans le panier----------------------
        function suppression() {
          supprimer.addEventListener('click', function (e) {

            let itemsFromCart = JSON.parse(localStorage.getItem("kanapProduit"));
            const itemsFromCartIndex = itemsFromCart.findIndex(element=> element.id === item.id && element.colors === item.colors);
            itemsFromCart.splice(itemsFromCartIndex, 1);
            localStorage.setItem('kanapProduit', JSON.stringify(itemsFromCart));
            article.remove();
          // Message de demande de confirmation pour supprimer un produit du panier
          
          })}
          suppression();
          // Message si tous les éléments du panier sont supprimés
          
        
        //-------------------- Fonction de calcul total du prix et des quantités des éléments du panier------------
        function totalPrice() {
          let itemsFromCart = JSON.parse(localStorage.getItem("kanapProduit"));
          let totalQuantity = 0;
          let totalPrice = 0;

          for (const item of itemsFromCart) {
            
            const productFromApi = products.find(p => p._id === item.id);

            let quantityCart = parseInt(item.quantity);
            let priceCart= parseInt(productFromApi.price * quantityCart);
  

            totalQuantity += quantityCart;
            totalPrice += priceCart;
          }

          const totalQuantityText = document.getElementById('totalQuantity');
          const totalPriceText = document.getElementById('totalPrice');
          totalQuantityText.textContent = totalQuantity;
          totalPriceText.textContent = totalPrice;
          
        }
         totalPrice(); 
          
          // Affichage du total des quantités et des prix
            
      }}});
