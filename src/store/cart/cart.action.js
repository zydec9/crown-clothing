import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (boolean) => 
createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)


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






export const addItemToCart = (cartItems, productToAdd) => {
     const newCartItems = (addCartItem(cartItems, productToAdd))
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = (removeCartItem(cartItems, cartItemToRemove))
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = (clearCartItem(cartItems, cartItemToClear))
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}