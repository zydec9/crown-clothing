import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context.component'



import {CheckoutItemContainer} from './checkout-item.styles'


const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, name, price, quantity } = cartItem

    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext)

 

const addItemHandler = () => addItemToCart(cartItem)


const removeItemHandler = () => removeItemFromCart(cartItem)


const ClearItemHandler = () => clearItemFromCart(cartItem)





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