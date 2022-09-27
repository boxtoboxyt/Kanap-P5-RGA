const recupUrl = window.location.href;
const url = new URL(recupUrl);
const id = url.searchParams.get("orderId");

const dataId = document.getElementById("orderId");
dataId.innerHTML = `<br>${id}`;