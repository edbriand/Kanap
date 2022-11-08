export class CartItem {
    constructor({ id = this.generateId(), product, color, quantity }) {
        this.validateItem({ product, color, quantity });
        this.id = id;
        this.product = product;
        this.color = color;
        this.quantity = quantity;
    }

    // Génère un identifiant unique
    generateId() {
        const id =
            Math.random().toString(36).substring(2) +
            new Date().getTime().toString(36);
        return id;
    }

    // Valide l'item: la quantité doit être entre 0 et 100
    // la couleur choisie doit faire partie des couleurs du produit
    validateItem({ product, color, quantity }) {
        this.validateProduct(product);
        this.validateQuantity(quantity);
        this.validateColor(product.colors, color);
    }

    validateProduct(product) {
        if (!product) {
            throw new Error("No product found");
        }
    }

    validateQuantity(quantity) {
        // Verify quantity: if 0 or if > 100, throw error
        if (typeof quantity != "number") {
            throw new Error("Quantity must be a number");
        } else if (quantity > 100) {
            throw new Error("The maximum quantity is 100");
        } else if (quantity <= 0) {
            throw new Error("Quantity cannot be 0 or inferior");
        }
    }

    validateColor(colors, color) {
        // Verify color: if unknown for this product, throw error
        if (!colors.includes(color)) {
            throw new Error("The color is not a valid color for this product");
        }
    }
}
