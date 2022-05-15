import { combineReducers } from 'redux'
import { categoriesReducer } from './categories/categories.reducer'
import { cartReducer } from './cart/cart.reducer'
import { userReducer } from './user/user.reducer'

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
})