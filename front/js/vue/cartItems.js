import { getCartItems, getProductById } from "../core/api.js";

function createCartItem(product, { id, productId, productColor, quantity }) {
    console.log("product: ", product);
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
    console.log(itemElement);
    return itemElement;
}

async function getProduct(productId) {
    const product = await getProductById.execute(productId);
    return product;
}

export async function createCartItems() {
    const items = await getCartItems.execute();
    const cartElement = document.getElementById("cart__items");

    for (const item of items) {
        const product = await getProduct(item.productId);
        cartElement.appendChild(createCartItem(product, item));
    }
}
