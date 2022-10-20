import { CartItem } from "../domain/productService.js";

let cartItemsArray = [
    new CartItem({
        id: "760985peNM4",
        productId: "48j9rftr9",
        productColor: "Grey",
        quantity: 1,
    }),
    new CartItem({
        id: "50Nqn3khDW6f",
        productId: "LHk4u22PFmEx8l",
        productColor: "Offwhite",
        quantity: 2,
    }),
];

export class InMemoryItemRepository {
    constructor(items) {
        this.items = items;
    }

    getCartItems() {
        return cartItemsArray;
    }

    getItemById(id) {
        const items = this.getitems();
        const item = items.find((item) => id === item.id);
        return item;
    }

    setCartItemQuantity(index, quantity) {
        cartItemsArray[index].quantity = quantity;
    }

    removeCartItem(index) {
        cartItemsArray.splice(index, 1);
    }
}
