// Ce script permet de connecter l'infrastructure utilisée
// (localStorage, backend, in memory arrays...) aux fonctions métier

// In memory tests
//import { InMemoryProductRepository } from "./infra/InMemoryProductRepository.js";
//import { InMemoryItemRepository } from "./infra/InMemoryItemRepository.js";
//import { products, cartItems } from "./infra/inMemoryInit.js";

// Backend
import { BackendProductRepository } from "./infra/BackendProductRepository.js";
// LocalStorage
import { LocalStorageItemRepository } from "./infra/LocalStorageItemRepository.js";
// Domain
import { GetProducts, GetProductById } from "./domain/productService.js";
import {
    GetCartItems,
    AddItemToCart,
    CalcCartTotal,
    UpdateCartItem,
    RemoveCartItem,
    PlaceOrder,
} from "./domain/cartService.js";

// export const productRepository = new InMemoryProductRepository(products);
const productRepository = new BackendProductRepository();
export const getProducts = new GetProducts(productRepository);
export const getProductById = new GetProductById(productRepository);

// const itemRepository = new InMemoryItemRepository(cartItems);
const itemRepository = new LocalStorageItemRepository();
export const getCartItems = new GetCartItems(itemRepository);
export const addItemToCart = new AddItemToCart(itemRepository);
export const calcCartTotal = new CalcCartTotal(itemRepository);
export const updateCartItem = new UpdateCartItem(itemRepository);
export const removeCartItem = new RemoveCartItem(itemRepository);

export const placeOrder = new PlaceOrder(itemRepository, productRepository);
