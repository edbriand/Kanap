import { InMemoryProductRepository } from "./infra/productsInMemory.js";
import {
    GetProduct,
    GetProductById,
    GetCartItemList,
} from "./domain/productService.js";

export const productRepository = new InMemoryProductRepository();
export const getProduct = new GetProduct(productRepository);
export const getProductById = new GetProductById(productRepository);
export const getCartItemList = new GetCartItemList(productRepository);
