import { CartItem } from "./cartItem.js";

export class GetCartItems {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    execute() {
        return this.itemRepository.getCartItems();
    }
}

export class UpdateCartItem {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    execute(item) {
        this.itemRepository.updateCartItem(item);
    }
}

export class RemoveCartItem {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    execute(index) {
        this.itemRepository.removeCartItem(index);
    }
}

export class AddItemToCart {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    execute({ product, color, quantity }) {
        // TO DO: If product and color already exist in cart, add quantity
        // const cartItems = this.itemRepository.getCartItems;
        const item = new CartItem({ product, color, quantity });
        this.itemRepository.addItemToCart(item);
    }
}

export class CalcCartTotal {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    execute() {
        let totalQuantity = 0;
        let totalPrice = 0;

        const cartItems = this.itemRepository.getCartItems();

        for (const item of cartItems) {
            totalQuantity += parseInt(item.quantity);
            totalPrice +=
                parseInt(item.quantity) * parseInt(item.product.price);
        }

        return { totalQuantity, totalPrice };
    }
}