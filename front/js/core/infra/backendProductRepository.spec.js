import { BackendProductRepository } from "./BackendProductRepository";

describe("getProducts", () => {
    it("should log products", async () => {
        const repository = new BackendProductRepository();
        const products = await repository.getProducts();
        expect(Array.isArray(products)).toBeTruthy();
    });
    it("should return an array of domain products", async () => {
        const repository = new BackendProductRepository();
        const products = await repository.getProducts();
        const firstProduct = products[0];
        expect(firstProduct).toEqual({
            colors: ["Blue", "White", "Black"],
            id: "107fb5b75607497b96722bda5b504926",
            name: "Kanap Sinopé",
            price: 1849,
            img: {
                src: "http://localhost:3000/images/kanap01.jpeg",
                alt: "Photo d'un canapé bleu, deux places",
            },
            desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        });
    });
});
