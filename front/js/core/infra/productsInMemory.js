const productsArray = [
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
        return productsArray;
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find((product) => id === product.id);
        return product;
    }

    getCartItemList() {
        return cartItemArray;
    }
}
