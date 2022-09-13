
var url = "http://localhost:3000/api/products/";

function displayAllcanapes() {
  fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (canapes) {
      console.log(canapes);
      canapes.forEach(canape => {
        console.log(canape);

        let canapeLink = document.createElement('a');
        canapeLink.setAttribute('href', `canape.html?id=${canape._id}`);
        document.getElementById('items').appendChild(canapeLink);

        let article = document.createElement('article');
        canapeLink.appendChild(article);

        let image = document.createElement('img');
        image.setAttribute('src', canape.imageUrl);
        image.setAttribute('alt', canape.altTxt);
        article.appendChild(image);

        let title = document.createElement('h3');
        title.setAttribute('class', 'canapeName');
        article.appendChild(title);
        title.innerText = canape.name;

        let description = document.createElement('p');
        description.setAttribute('class', 'canapeDescription');
        article.appendChild(description);
        description.innerText = canape.description;

      });

    })
    .catch(function (error) {
      alert("⚠️ Error! Fetch()!")
    });
}
displayAllcanapes();