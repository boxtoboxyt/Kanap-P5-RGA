// Appel the API
const api = "http://localhost:3000/api/products/";

function affichageKanaps () {
      fetch(api)
      .then(function (response) {
            if (response.ok) {
                  return response.json();
            }
      })
      .then(function (canapes) {
           
            canapes.forEach(canape => {
                 
            const lien = document.createElement("a");
            items.appendChild(lien);
            lien.setAttribute("href", `product.html?id=${canape._id}`);
      
            const article = document.createElement("article");
            lien.appendChild(article);

            const img = document.createElement("img");
            article.appendChild(img);
            img.setAttribute("src", canape.imageUrl);
            img.setAttribute("alt", canape.altTxt);

            const title = document.createElement("h3");
            article.appendChild(title);
            title.innerText = canape.name;

            const description = document.createElement("p");
            article.appendChild(description);
            description.innerText = canape.description;
            
      });

})
.catch(function (error) {
  alert("⚠️ Error! Fetch()!")
});
}
affichageKanaps();