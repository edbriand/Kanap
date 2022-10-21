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
