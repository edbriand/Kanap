export class InMemoryProductRepository {
    constructor(products) {
        this.products = products;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find((product) => id === product.id);
        return product;
    }
}
