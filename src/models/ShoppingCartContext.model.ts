import { CartItem } from "./CartItem.model";

export interface ShoppingCartContextM {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartquantity: number;
    cartItems: CartItem[];
}