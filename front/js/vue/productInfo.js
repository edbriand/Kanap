import { getProductById, addItemToCart } from "../core/api.js";

async function getProduct(id) {
    try {
        const product = await getProductById.execute(id);
        return product;
    } catch (error) {
        console.log("error:", error);
    }
}

function getIdFromPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    return id;
}

export async function fillProductPage() {
    const id = getIdFromPage();
    const product = await getProduct(id);

    if (product) {
        fillProductInfos(product);
    } else {
        console.log("error: cannot find a product with this id: ", id);
    }

    const addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener("click", addItem);
}

function createColor(color) {
    const colorElement = document.createElement("option");
    colorElement.setAttribute("value", color);
    colorElement.innerHTML = `${color}`;
    return colorElement;
}

function fillProductInfos({ price, name, img: { src, alt }, desc, colors }) {
    const productImg = document.getElementsByClassName("item__img")[0];
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", src);
    imgElement.setAttribute("alt", alt);
    productImg.appendChild(imgElement);

    document.getElementById("title").innerHTML = `${name}`;
    document.getElementById("price").innerHTML = `${price}`;
    document.getElementById("description").innerHTML = `${desc}`;

    const colorsElement = document.getElementById("colors");

    colors.forEach((color) => {
        colorsElement.appendChild(createColor(color));
    });
}

async function addItem() {
    const quantity = parseInt(document.getElementById("quantity").value);

    const colorSelector = document.getElementById("colors");
    const color = colorSelector.options[colorSelector.selectedIndex].text;

    const productId = getIdFromPage();
    const product = await getProduct(productId);
    // try to add item to cart
    try {
        addItemToCart.execute({ product, color, quantity });
    } catch (error) {
        console.log(error);
    }
}
