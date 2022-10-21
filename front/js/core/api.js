import { InMemoryProductRepository } from "./infra/productsInMemory.js";
import { InMemoryItemRepository } from "./infra/itemsInMemory.js";
import { GetProduct, GetProductById } from "./domain/productService.js";
import {
    GetCartItems,
    AddItemToCart,
    CalcCartTotal,
    UpdateCartItem,
    RemoveCartItem,
} from "./domain/cartService.js";
import { products, cartItems } from "./infra/inMemoryInit.js";

export const productRepository = new InMemoryProductRepository(products);
export const getProduct = new GetProduct(productRepository);
export const getProductById = new GetProductById(productRepository);

export const itemRepository = new InMemoryItemRepository(cartItems);
export const getCartItems = new GetCartItems(itemRepository);
export const addItemToCart = new AddItemToCart(itemRepository);
export const calcCartTotal = new CalcCartTotal(itemRepository);
export const updateCartItem = new UpdateCartItem(itemRepository);
export const removeCartItem = new RemoveCartItem(itemRepository);
