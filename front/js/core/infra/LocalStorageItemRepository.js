export class LocalStorageItemRepository {
    getCartItems() {
        const items = JSON.parse(localStorage.getItem("items"));
        if (!items) return [];
        return items;
    }

    getItemById(id) {
        const items = this.getCartItems();
        const item = items.find((item) => id === item.id);
        return item;
    }

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

    addItemToCart(item) {
        const items = this.getCartItems();
        items.push(item);
        console.log(items);
        localStorage.setItem("items", JSON.stringify(items));
    }

    removeCartItem(index) {
        const items = this.getCartItems();
        items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(items));
    }
}
