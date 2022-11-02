import { CartItem } from "./cartItem.js";
import { Order } from "./order.js";

// Renvoie la liste des items du panier
export class GetCartItems {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    execute() {
        return this.itemRepository.getCartItems();
    }
}

// Met à jour un item du panier
export class UpdateCartItem {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    execute(item) {
        this.itemRepository.updateCartItem(item);
    }
}

// Ajoute un item au panier
export class AddItemToCart {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    execute({ product, color, quantity }) {
        // If product and color already exist in cart, add quantity
        const cartItems = this.itemRepository.getCartItems();

        const foundItem = cartItems.find(
            (item) => item.product === product && item.color === color
        );
        if (foundItem) {
            const updatedItem = new CartItem({
                id: foundItem.id,
                product,
                color,
                quantity: quantity + foundItem.quantity,
            });
            this.itemRepository.updateCartItem(updatedItem);

            const newcartItems = this.itemRepository.getCartItems();
            console.log(newcartItems);
            return;
        }

        // else add the item to the cart
        const item = new CartItem({ product, color, quantity });
        this.itemRepository.addItemToCart(item);
    }
}

// Retire un item du panier
export class RemoveCartItem {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    execute(item) {
        this.itemRepository.removeCartItem(item);
    }
}

// Calcule et renvoie la quantité et le prix totale des items du panier
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

// Essaye de créer la commande avec les informations reçue
// Envoie la commande
// Recoie ces informations et un identifiant de commande
export class PlaceOrder {
    constructor(itemRepository, productRepository) {
        this.itemRepository = itemRepository;
        this.productRepository = productRepository;
    }
    async execute({ firstName, lastName, address, city, email }) {
        const cartItems = this.itemRepository.getCartItems();
        let order;
        try {
            order = new Order({
                firstName,
                lastName,
                address,
                city,
                email,
                items: cartItems,
            });
        } catch (error) {
            throw error;
        }

        const orderObj = await this.productRepository.order(order);
        return orderObj;
    }
}
