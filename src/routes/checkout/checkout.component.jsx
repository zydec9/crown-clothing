import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotal, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'


import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import PaymentForm from '../../components/payment-form/payment-form.component'


import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total,
  } from './checkout.styles';


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
        <CheckoutHeader>
          <HeaderBlock>
            <span>Product</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Description</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Quantity</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Price</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Remove</span>
          </HeaderBlock>
        </CheckoutHeader>
        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <Total>Total: ${cartTotal}</Total>
        <PaymentForm />
      </CheckoutContainer>
    )
}


export default Checkout