function getOrderIdFromPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("orderid");
    return id;
}

export async function showOrderId() {
    const orderId = getOrderIdFromPage();

    const orderIdElement = document.getElementById("orderId");

    orderIdElement.innerHTML = orderId;
}
