// spaghetti code ?
// should maybe not import productService since api.js import both this script and productService
import { Product, ProductId } from "../domain/productService.js";

const productsArray = [
    new Product({
        id: new ProductId("48j9rftr9"),
        colors: ["Blue", "Offwhite", "Grey"],
        name: "Canapé d'angle",
        price: 2990,
        img: {
            src: "https://robohash.org/canapedangle",
            alt: "Photo d'un canapé d'angle",
        },
        desc: "Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto",
    }),
    new Product({
        id: new ProductId("450tsdksh9pk1v"),
        colors: ["Red", "Green", "Black", "Grey"],
        name: "Canapé 3 places",
        price: 1890,
        img: {
            src: "https://robohash.org/canape3places",
            alt: "Photo d'un canapé 3 places",
        },
        desc: "Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.",
    }),
    new Product({
        id: new ProductId("59trk4ip08wzS0"),
        colors: ["Red", "Green", "Black", "Orange"],
        name: "Fauteuil retro",
        price: 930,
        img: {
            src: "https://robohash.org/fauteuil retro",
            alt: "Photo d'un fauteuil retro",
        },
        desc: "Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint. Sed quibusdam recusandae alias error harum.",
    }),
    new Product({
        id: new ProductId("LHk4u22PFmEx8l"),
        colors: [
            "Light Grey",
            "Dark Grey",
            "Offwhite",
            "Terracota",
            "Vine Green",
        ],
        name: "Chaise minimaliste",
        price: 280,
        img: {
            src: "https://robohash.org/chaiseminimalise",
            alt: "Photo d'une chaise minimaliste",
        },
        desc: "Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora.",
    }),
];

export class InMemoryProductRepository {
    constructor(products) {
        this.products = products;
    }

    getProducts() {
        return productsArray;
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find((product) => id === product.id);
        return product;
    }
}
