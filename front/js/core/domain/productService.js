// Retourne la liste des produits
export class GetProducts {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    execute() {
        return this.productRepository.getProducts();
    }
}

// Retourne le produit ayant l'identifiant donné
export class GetProductById {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    execute(id) {
        return this.productRepository.getProductById(id);
    }
}
