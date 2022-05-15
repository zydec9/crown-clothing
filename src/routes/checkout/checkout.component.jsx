import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotal, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'


import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import {CheckoutContainer} from './checkout.styles'


const Checkout = () => {
    const dispatch = useDispatch()
 
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    const isCartOpen = useSelector(selectIsCartOpen)

// I add this effect to close the dropdown when checkout is opening
    useEffect(() => {
        if (isCartOpen)
            dispatch(setIsCartOpen(!isCartOpen))
    }, [])


    return (
        <CheckoutContainer>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>

            {cartItems.map(item =>  <CheckoutItem key={item.id} cartItem={item} />
        )}

<span className='total'>Total: ${cartTotal}</span>
        </CheckoutContainer>
    )
}


export default Checkout