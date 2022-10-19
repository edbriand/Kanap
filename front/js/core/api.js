import { InMemoryProductRepository } from "./infra/productsInMemory.js";
import { InMemoryItemRepository } from "./infra/itemsInMemory.js";
import {
    GetProduct,
    GetProductById,
    GetCartItems,
} from "./domain/productService.js";

export const productRepository = new InMemoryProductRepository();
export const getProduct = new GetProduct(productRepository);
export const getProductById = new GetProductById(productRepository);

export const itemRepository = new InMemoryItemRepository();
export const getCartItems = new GetCartItems(itemRepository);
