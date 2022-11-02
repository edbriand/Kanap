// Renvoie l'identifiant de commande contenu dans l'url
function getOrderIdFromPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("orderid");
    return id;
}

// Affiche l'identifiant de commande sur la page
export async function showOrderId() {
    const orderId = getOrderIdFromPage();

    const orderIdElement = document.getElementById("orderId");

    orderIdElement.innerHTML = orderId;
}
