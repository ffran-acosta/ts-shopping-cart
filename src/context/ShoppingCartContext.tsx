import { Cart } from "@/components"
import { useLocalStorage } from "@/hooks"
import { CartItem, ShoppingCartContextM, ShoppingCartProps } from "@/models"
import { createContext, useContext, useState } from "react"

const ShoppingCartContext = createContext({} as ShoppingCartContextM)

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])

    // GET QUANTITY FOR CART MODAL
    const cartquantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )
    
    // CART MODAL OPEN CLOSE FUNCTIONALITY
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    
    // GET QUANTITY FROM LOCAL STORAGE
    const getItemQuantity = (id: number) => cartItems.find(item => item.id === id)?.quantity || 0
    
    // ADD TO CART AND INCREMENT FUNCTIONALITY
    const increaseCartQuantity = (id: number) => {
        setCartItems(currentItems => {
            if (!currentItems.find(item => item.id === id)) {
                return [...currentItems, { id, quantity: 1 }]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity++ }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    // DECREMENT CART FUNCTIONALITY
    const decreaseCartQuantity = (id: number) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity-- }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    // REMOVE CART FUNCTIONALITY
    const removeFromCart = (id: number) => {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartquantity,
            }}>
            {children} <Cart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}