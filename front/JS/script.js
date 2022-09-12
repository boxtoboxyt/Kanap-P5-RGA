/* Appel de l'API */
const urlApi = "http://localhost:3000/api/products";

fetch(urlApi)
.then((resp) => resp.json())
.then(function(data){
  let canapes = data.products;
  return canapes.map(function(canapes){
    let link = document.createElement("a");
    let img = document.createElement("img");
    let span = createNode('span');
    img.src = author.picture.medium;
  })
})