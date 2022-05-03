
import { createContext, useState, useEffect } from "react";

// helper function
const addCartItem = (cartItems, productToAdd) => {

    const existingCartiItem = cartItems.find(
        cartItem => cartItem.id === productToAdd.id
    )

    if (existingCartiItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }


    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

// helper function
const removeCartItem = (cartItems, cartItemToRemove) => {

    const existingCartiItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    )

    if (existingCartiItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }


    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )

}

// helper function

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    cartTotal: 0,
    addOneItem: () => { },
    lessOneItem: () => { },
    removeItemFromCart: () => { },
   clearItemFromCart: () => { }
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const count = cartItems.reduce((sum, item) => {
            return sum += item.quantity
        }, 0)
        setCartCount(count)
    }, [cartItems])


    useEffect(() => {
        const price = cartItems.reduce((total, item) => {
            return total += item.quantity * item.price
        }, 0)
        setCartTotal(price)
    }, [cartItems])


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        cartTotal,
        removeItemFromCart,
        clearItemFromCart
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}