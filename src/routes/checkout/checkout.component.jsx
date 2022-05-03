import { CartContext } from '../../contexts/cart.context.component'
import { useContext, useEffect } from 'react'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import './checkout.styles.scss'


const Checkout = () => {
    const { isCartOpen, setIsCartOpen, cartItems, cartTotal } = useContext(CartContext)


    useEffect(() => {
        if (isCartOpen)
            setIsCartOpen(!isCartOpen)
    }, [])


    return (
        <div className='checkout-container'>
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
        </div>
    )
}


export default Checkout