import {
    getCartItems,
    updateCartItem,
    removeCartItem,
    calcCartTotal,
    placeOrder,
} from "../core/api.js";

function updateCartTotal({ totalQuantity, totalPrice }) {
    const totalQuantityElement = document.getElementById("totalQuantity");
    const totalPriceElement = document.getElementById("totalPrice");

    totalQuantityElement.innerHTML = `${totalQuantity}`;
    totalPriceElement.innerHTML = `${totalPrice}`;
}

function findIndexOfItem(items, itemElement) {
    const id = itemElement.getAttribute("data-id");
    const color = itemElement.getAttribute("data-color");

    for (let i = 0; i < items.length; i++) {
        if (items[i].product.id === id && items[i].color === color) {
            return i;
        }
    }
    return null;
}

async function updateQuantity(item) {
    await updateCartItem.execute(item);
    await updateCartTotal(calcCartTotal.execute());
}

async function deleteItemElement(itemElement) {
    const items = await getCartItems.execute();
    const index = findIndexOfItem(items, itemElement);
    await removeCartItem.execute(index);
    await updateCartTotal(calcCartTotal.execute());

    itemElement.remove();
}

function createCartItem(cartElement, { id, product, color, quantity }) {
    const itemElement = document.createElement("article");
    [
        { key: "class", value: "cart__item" },
        { key: "data-id", value: product.id },
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
                    product,
                    color,
                    quantity: event.target.value,
                })
            );

            const deleteItemButton = element.querySelector(".deleteItem");
            deleteItemButton.addEventListener("click", (event) =>
                deleteItemElement(itemElement)
            );
        }
    });
}

export async function createCartItems() {
    const items = await getCartItems.execute();
    const cartElement = document.getElementById("cart__items");

    let totalQuantity = 0;
    let totalPrice = 0;

    if (items) {
        for (const item of items) {
            createCartItem(cartElement, item);

            totalQuantity += item.quantity;
            totalPrice += item.quantity * item.product.price;
        }
    }

    updateCartTotal({ totalQuantity, totalPrice });

    const orderButton = document.getElementById("order");
    orderButton.addEventListener("click", orderCart);
}

function findSentence(sentences, key) {
    let foundSentence;
    sentences?.forEach((sentence) => {
        if (sentence.includes(key)) {
            foundSentence = sentence;
        }
    });
    return foundSentence;
}

function getMsgElements(errorMsg) {
    const msgElementsObj = [
        { title: "first name", id: "firstNameErrorMsg" },
        { title: "last name", id: "lastNameErrorMsg" },
        { title: "address", id: "addressErrorMsg" },
        { title: "city", id: "cityErrorMsg" },
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

function displayErrorMsg(msg) {
    const msgElements = getMsgElements(msg);

    msgElements.forEach(({ element, text }) => {
        element.innerHTML = text;
    });
}

function orderCart(event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;

    try {
        placeOrder.execute({ firstName, lastName, address, city, email });
    } catch (error) {
        console.log(`%c${error}`, "color: red");
        displayErrorMsg(error.message);
    }
}
