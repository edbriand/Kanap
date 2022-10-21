export class InMemoryItemRepository {
    constructor(items) {
        this.items = items;
    }

    getCartItems() {
        return this.items;
    }

    getItemById(id) {
        const items = this.getitems();
        const item = items.find((item) => id === item.id);
        return item;
    }

    updateCartItem(item) {
        const index = this.items.findIndex((i) => i.id === item.id);

        if (index < 0) {
            console.log("did not find item index in cart");
            return;
        }
        this.items[index] = item;
    }

    addItemToCart(item) {
        this.items.push(item);
        console.log(this.items);
    }

    removeCartItem(index) {
        this.items.splice(index, 1);
    }
}
