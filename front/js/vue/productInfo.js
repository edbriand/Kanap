import { getProductById, addItemToCart } from "../core/api.js";

// Renvoie le produit ayant l'identifiant donné
async function getProduct(id) {
    try {
        const product = await getProductById.execute(id);
        return product;
    } catch (error) {
        //console.log("error:", error);
    }
}

// Récupére l'identifiant depuis l'url de la page
function getIdFromPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    return id;
}

// Compléte la page produit selon l'identifiant inclu
export async function fillProductPage() {
    const id = getIdFromPage();
    const product = await getProduct(id);

    if (product) {
        fillProductInfos(product);
    } else {
        //console.log("error: cannot find a product with this id: ", id);
    }

    const addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener("click", addItem);
}

// Crée l'élement option d'une couleur donnée
function createColor(color) {
    const colorElement = document.createElement("option");
    colorElement.setAttribute("value", color);
    colorElement.textContent = `${color}`;
    return colorElement;
}

// Remplis la page avec les informations du produit
function fillProductInfos({ price, name, img: { src, alt }, desc, colors }) {
    const productImg = document.getElementsByClassName("item__img")[0];
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", src);
    imgElement.setAttribute("alt", alt);
    productImg.appendChild(imgElement);

    document.getElementById("title").textContent = `${name}`;
    document.getElementById("price").textContent = `${price}`;
    document.getElementById("description").textContent = `${desc}`;

    const colorsElement = document.getElementById("colors");

    colors.forEach((color) => {
        colorsElement.appendChild(createColor(color));
    });
}

// Ajoute un item au panier selon les champs remplis par l'utilisateur
async function addItem() {
    const quantity = parseInt(document.getElementById("quantity").value);

    const colorSelector = document.getElementById("colors");
    const color = colorSelector.options[colorSelector.selectedIndex].text;

    const productId = getIdFromPage();
    const product = await getProduct(productId);

    // try to add item to cart
    try {
        await addItemToCart.execute({ product, color, quantity });
        displayMessage("Le produit a été ajouté dans le panier");
    } catch (error) {
        displayMessage(`Erreur: ${error.message}`);
    }
}

function displayMessage(message) {
    const itemContentElement =
        document.getElementById("addToCart").parentElement.parentElement;
    const messageElement = document.createElement("p");
    messageElement.setAttribute("id", "addToCartMessage");
    if (message.includes("Error")) {
        messageElement.setAttribute("style", "color: #fbbcbc");
    }
    messageElement.textContent = `${message}`;
    setTimeout(function () {
        messageElement.remove();
    }, 3000);
    itemContentElement.append(messageElement);
}
