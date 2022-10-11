const recuperationStorage = JSON.parse(localStorage.getItem("kanapProduit"));

function appelApi() {
    fetch (`http://localhost:3000/api/products/${id}`)
    .then(function (response) {
        if (response.ok) {
              return response.json();
        }
    })
}