import { getProduct } from "../core/api.js";

function createProductCard({ id, name, img: { src, alt }, desc }) {
    const productElement = document.createElement("a");
    productElement.setAttribute("href", `./product.html?id=${id}`);
    productElement.innerHTML = `
    <article>
        <img
            src=${src}
            alt=${alt}
        />
        <h3 class="productName">${name}</h3>
        <p class="productDescription">
            ${desc}
        </p>
    </article>
`;
    return productElement;
}

export async function createProductCards() {
    const products = await getProduct.execute();
    const productsElement = document.getElementById("items");

    products.forEach((product) => {
        productsElement.appendChild(createProductCard(product));
    });
}
