export class ProductId {
    constructor(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
    equals(other) {
        return this.id === other;
    }
}

export class Product {
    constructor({ id, name, price, desc, colors, img: { src, alt } }) {
        this.id = id.id;
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.colors = colors;
        this.img = { src, alt };
    }
}

export class GetProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    execute() {
        return this.productRepository.getProducts();
    }
}

export class GetProductById {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    execute(id) {
        return this.productRepository.getProductById(id);
    }
}

export class CartItem {
    constructor({ id, productId, productColor, quantity }) {
        this.id = id;
        this.productId = productId;
        this.productColor = productColor;
        this.quantity = quantity;
    }
}

export class GetCartItems {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    execute() {
        return this.itemRepository.getCartItems();
    }
}

export class SetCartItem {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    execute(index, quantity) {
        this.itemRepository.setCartItemQuantity(index, quantity);
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
