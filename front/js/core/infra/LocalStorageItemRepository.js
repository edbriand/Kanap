export class LocalStorageItemRepository {
    // Renvoie la liste des items du panier
    getCartItems() {
        const items = JSON.parse(localStorage.getItem("items"));
        if (!items) return [];
        return items;
    }

    // Renvoie l'item ayant l'identifiant donné
    getItemById(id) {
        const items = this.getCartItems();
        const item = items.find((item) => id === item.id);
        return item;
    }

    // Met à jour un item du panier
    updateCartItem(item) {
        const items = this.getCartItems();
        const index = items.findIndex((i) => i.id === item.id);

        if (index < 0) {
            console.log("did not find item index in cart");
            return;
        }
        items[index] = item;

        localStorage.setItem("items", JSON.stringify(items));
    }

    // Ajoute un item au panier
    addItemToCart(item) {
        const items = this.getCartItems();
        items.push(item);
        console.log(items);
        localStorage.setItem("items", JSON.stringify(items));
    }

    // Retire un item du panier
    removeCartItem(itemToRemove) {
        const items = this.getCartItems();
        const item = items.find((item) => itemToRemove.id === item.id);
        const index = items.indexOf(item);
        if (index < 0) return;
        items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(items));
    }
}
