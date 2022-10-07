import { getItems } from "./itemservice.js";
import { getItem } from "./item.js";

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

export async function createArticle(id) {
    const item = await getItem(id);

    if (item === null) {
        console.log("Error: no product found with this id");
        return;
    }

    function fillArticleInfos({
        price,
        name,
        img: { src, alt },
        desc,
        colors,
    }) {
        const itemImg = document.getElementsByClassName("item__img")[0];
        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", src);
        imgElement.setAttribute("alt", alt);
        itemImg.appendChild(imgElement);

        document.getElementById("title").innerHTML = `${name}`;
        document.getElementById("price").innerHTML = `${price}`;
        document.getElementById("description").innerHTML = `${desc}`;

        const colorsElement = document.getElementById("colors");

        function createColor(color) {
            const colorElement = document.createElement("option");
            colorElement.setAttribute("value", color);
            colorElement.innerHTML = `${color}`;
            return colorElement;
        }

        colors.forEach((color) => {
            colorsElement.appendChild(createColor(color));
        });
    }

    fillArticleInfos(item);
}
