import {
    getCartItems,
    updateCartItem,
    removeCartItem,
    calcCartTotal,
    placeOrder,
    getProductById,
} from "../core/api.js";

// Affiche les totaux mis à jour sur la page
function updateCartTotal({ totalQuantity, totalPrice }) {
    const totalQuantityElement = document.getElementById("totalQuantity");
    const totalPriceElement = document.getElementById("totalPrice");

    totalQuantityElement.textContent = `${totalQuantity}`;
    totalPriceElement.textContent = `${totalPrice}`;
}

// Met à jour la quantité de l'item
async function updateQuantity(item) {
    await updateCartItem.execute(item);
    await updateCartTotal(await calcCartTotal.execute());
}

// Supprime l'item et l'élément de l'item
async function deleteItemElement(item, itemElement) {
    await removeCartItem.execute(item);
    await updateCartTotal(await calcCartTotal.execute());

    itemElement.remove();
}

// Crée l'élément de l'item
async function createCartItem(cartElement, { id, productId, color, quantity }) {
    const product = await getProductById.execute(productId);

    const itemElement = document.createElement("article");
    [
        { key: "class", value: "cart__item" },
        { key: "data-id", value: productId },
        { key: "data-color", value: color },
    ].forEach(({ key, value }) => itemElement.setAttribute(key, value));

    itemElement.innerHTML = `
        <div class="cart__item__img">
            <img src=${product.img.src} alt=${product.img.alt}>
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${color}</p>
            <p>${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${quantity}>
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
            </div>
        </div>
    `;

    cartElement.appendChild(itemElement);

    const itemElements = cartElement.getElementsByClassName("cart__item");

    // Listen for quantity input change and delete button click on item element
    Array.from(itemElements, (element) => {
        if (itemElement.isSameNode(element)) {
            const quantityElement = element.querySelector(".itemQuantity");
            quantityElement.addEventListener("change", (event) =>
                updateQuantity({
                    id,
                    productId,
                    color,
                    quantity: event.target.value,
                })
            );

            const deleteItemButton = element.querySelector(".deleteItem");
            deleteItemButton.addEventListener("click", (event) => {
                const item = { id, productId, color, quantity };
                deleteItemElement(item, itemElement);
            });
        }
    });
}

// Crée les élements de tous le items du panier
export async function createCartItems() {
    const items = await getCartItems.execute();
    const cartElement = document.getElementById("cart__items");

    items?.forEach((item) => createCartItem(cartElement, item));

    updateCartTotal(await calcCartTotal.execute());

    const orderButton = document.getElementById("order");
    orderButton.addEventListener("click", orderCart);
}

// Cherches une phrase contenant ces mots clés dans un texte
function findSentence(sentences, key) {
    let foundSentence;
    sentences?.forEach((sentence) => {
        if (sentence.includes(key)) {
            foundSentence = sentence;
        }
    });
    return foundSentence;
}

// Renvoie les éléments sensés afficher les erreur ainsi que leur message d'erreur
function getMsgElements(errorMsg) {
    const msgElementsObj = [
        { title: "prénom", id: "firstNameErrorMsg" },
        { title: " nom", id: "lastNameErrorMsg" },
        { title: "addresse", id: "addressErrorMsg" },
        { title: "ville", id: "cityErrorMsg" },
        { title: "email", id: "emailErrorMsg" },
    ];

    let msgElements = [];
    const regex = /\w+\s+[^.!?:]*[.!?]/g;
    const messages = errorMsg.match(regex);

    msgElementsObj.forEach(({ title, id }) => {
        let text = "";
        const message = findSentence(messages, title);
        if (message) {
            text = message;
        }
        msgElements.push({ element: document.getElementById(id), text });
    });

    return msgElements;
}

// Affiche les messages d'erreur dans leurs éléments respectifs
function displayErrorMsg(msg) {
    const msgElements = getMsgElements(msg);

    msgElements.forEach(({ element, text }) => {
        element.textContent = text;
    });
}

// Redirige l'utilisateur vers la page confirmation concernant sa commande
function redirectToConfirmationPage(order) {
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace("cart", "confirmation");
    const url = `${newUrl}?orderid=${order.orderId}`;
    window.location.href = url;
}

// Affiche un message à l'utilisateur
function displayMessage(message) {
    const oldMessageElement = document.getElementById("orderMessage");
    if (oldMessageElement) return;
    const cartElement =
        document.getElementById("order").parentElement.parentElement;
    const messageElement = document.createElement("p");
    messageElement.setAttribute("id", "orderMessage");
    messageElement.setAttribute("style", "color: #fbbcbc");
    messageElement.textContent = `${message}`;
    cartElement.append(messageElement);
}

// Envoie le contenu du formulaire
async function orderCart(event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;

    // Verify the cart is not empty
    const items = await getCartItems.execute();

    if (!items[0]) {
        displayMessage("Erreur: Le panier est vide");
        return;
    }

    // Vérifie la validité des champs de la commande
    try {
        const order = await placeOrder.execute({
            firstName,
            lastName,
            address,
            city,
            email,
        });
        redirectToConfirmationPage(order);
    } catch (error) {
        //console.log(`%c${error}`, "color: red");
        displayErrorMsg(error.message);
    }
}
