import { useSelector, useDispatch } from 'react-redux'
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'



import {CheckoutItemContainer} from './checkout-item.styles'


const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, name, price, quantity } = cartItem

    const cartItems = useSelector(selectCartItems)

   const dispatch = useDispatch()

 

const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))


const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))


const ClearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))





    return (
        <CheckoutItemContainer>

<div className='image-container'>
    <img src={imageUrl} alt={name} />
</div>
        <span className='name'>{name}</span>  
        <span className='quantity'>
            <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>  
        <span className='price'>{price}</span>  
        <div className='remove-button' onClick={ClearItemHandler}>&#10005;</div>

        </CheckoutItemContainer>
    )
}


export default CheckoutItem