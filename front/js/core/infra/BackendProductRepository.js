import axios from "../../../node_modules/axios/dist/esm/axios.js";

export class BackendProductRepository {
    async getProducts() {
        const response = await fetch("http://localhost:3000/api/products");
        const products = await response.json();

        return products.map((product) => {
            return {
                id: product._id,
                colors: product.colors,
                name: product.name,
                price: product.price,
                img: { src: product.imageUrl, alt: product.altTxt },
                desc: product.description,
            };
        });
    }

    async getProductById(id) {
        const response = await fetch(
            `http://localhost:3000/api/products/${id}`
        );
        const product = await response.json();
        const products = [product];
        return products.map((product) => {
            return {
                id: product._id,
                colors: product.colors,
                name: product.name,
                price: product.price,
                img: { src: product.imageUrl, alt: product.altTxt },
                desc: product.description,
            };
        })[0];
    }

    async order({ firstName, lastName, address, city, email, items }) {
        const products = items.map((item) => {
            return item.product.id;
        });
        console.log(products);

        const orderObject = {
            contact: {
                firstName,
                lastName,
                address,
                city,
                email,
            },
            products,
        };

        const orderResponse = await fetch(
            "http://localhost:3000/api/products/order",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderObject),
            }
        );

        const orderObj = await orderResponse.json();
        return orderObj;
    }
}
