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
        name: "Lampe ronde",
        price: 75,
        img: {
            src: "https://robohash.org/lamperonde",
            alt: "Photo d'une lampe ronde",
        },
        desc: "Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.",
    }),
];

const cartItemArray = [
    {
        id: "48j9rftr9",
        colors: ["Blue", "Offwhite", "Grey"],
        name: "Canapé d'angle",
        price: 2990,
        img: {
            src: "https://robohash.org/canapedangle",
            alt: "Photo d'un canapé d'angle",
        },
        desc: "Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto",
    },
    {
        id: "450tsdksh9pk1v",
        colors: ["Red", "Green", "Black", "Grey"],
        name: "Lampe ronde",
        price: 75,
        img: {
            src: "https://robohash.org/lamperonde",
            alt: "Photo d'une lampe ronde",
        },
        desc: "Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.",
    },
];

export class InMemoryProductRepository {
    constructor(products) {
        this.products = products;
    }

    getProducts() {
        console.log(productsArray);
        return productsArray;
    }

    getProductById(id) {
        console.log("wanted id: ", id);
        const products = this.getProducts();
        const product = products.find((product) => id === product.id);
        console.log(products[0]);
        return product;
    }

    getCartItemList() {
        return cartItemArray;
    }
}
