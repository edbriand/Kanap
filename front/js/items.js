import { getItems } from "./itemservice.js";

export async function createItems() {
    const items = await getItems();

    function createItem({ id, name, img: { src, alt }, desc }) {
        const itemElement = document.createElement("a");
        itemElement.innerHTML = `
        <a href="./product.html?id=${id}">
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
        </a>
    `;
        return itemElement;
    }

    const itemsElement = document.getElementById("items");
    items.forEach((item) => {
        itemsElement.appendChild(createItem(item));
    });
}
