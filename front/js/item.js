import { getItems } from "./itemservice.js";

export async function getItem(id) {
    const items = await getItems();
    let foundItem = null;

    items.forEach((item) => {
        if (item.id === id) {
            foundItem = item;
        }
    });

    return foundItem;
}
