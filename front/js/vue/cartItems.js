import {
    getCartItems,
    setCartItem,
    removeCartItem,
    getProductById,
} from "../core/api.js";

function updateCartTotal(totalQuantity, totalPrice) {
    const totalQuantityElement = document.getElementById("totalQuantity");
    const totalPriceElement = document.getElementById("totalPrice");

    totalQuantityElement.innerHTML = `${totalQuantity}`;
    totalPriceElement.innerHTML = `${totalPrice}`;
}

async function changeCartTotal(items) {
    let totalQuantity = 0;
    let totalPrice = 0;

    for (const item of items) {
        const product = await getProductById.execute(item.productId);
        totalQuantity += item.quantity;
        totalPrice += item.quantity * product.price;
    }

    updateCartTotal(totalQuantity, totalPrice);
}

function findIndexOfItem(items, itemElement) {
    const id = itemElement.getAttribute("data-id");
    const color = itemElement.getAttribute("data-color");

    for (let i = 0; i < items.length; i++) {
        if (items[i].productId === id && items[i].productColor === color) {
            return i;
        }
    }
    return null;
}

function findCartItemParent(element) {
    return element.closest(".cart__item");
}

async function updateQuantity(event) {
    const quantity = parseInt(event.target.value);

    const cartItemParent = findCartItemParent(event.target);

    const items = await getCartItems.execute();
    const index = findIndexOfItem(items, cartItemParent);
    console.log("index: ", index);

    if (index === null) {
        return;
    }

    await setCartItem.execute(index, quantity);

    await changeCartTotal(items);
}

async function deleteItemElement(event) {
    const cartItemParent = findCartItemParent(event.target);
    const items = await getCartItems.execute();
    const index = findIndexOfItem(items, cartItemParent);
    await removeCartItem.execute(index);
    const updatedItems = await getCartItems.execute();
    await changeCartTotal(updatedItems);

    cartItemParent.remove();
}

function listenToCartItems() {
    const quantityElements = document.getElementsByClassName("itemQuantity");
    Array.from(quantityElements, (element) =>
        element.addEventListener("change", updateQuantity)
    );

    const deleteItemButtons = document.getElementsByClassName("deleteItem");
    Array.from(deleteItemButtons, (button) =>
        button.addEventListener("click", deleteItemElement)
    );
}

function createCartItem(product, { id, productId, productColor, quantity }) {
    const itemElement = document.createElement("article");
    itemElement.setAttribute("class", "cart__item");
    itemElement.setAttribute("data-id", `${productId}`);
    itemElement.setAttribute("data-color", `${productColor}`);
    itemElement.innerHTML = `
    <div class="cart__item__img">
        <img src=${product.img.src} alt=${product.img.alt}>
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${productColor}</p>
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
    return itemElement;
}

export async function createCartItems() {
    const items = await getCartItems.execute();
    const cartElement = document.getElementById("cart__items");

    let totalQuantity = 0;
    let totalPrice = 0;

    for (const item of items) {
        const product = await getProductById.execute(item.productId);
        cartElement.appendChild(createCartItem(product, item));

        totalQuantity += item.quantity;
        totalPrice += item.quantity * product.price;
    }

    updateCartTotal(totalQuantity, totalPrice);

    listenToCartItems();
}
