

import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { selectIsCartOpen } from '../../store/cart/cart.selector'



import { selectCurrentUser } from '../../store/user/user.selector'



import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import { signOutStart } from '../../store/user/user.action'



import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles'



const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser)

 const isCartOpen = useSelector(selectIsCartOpen)

 const dispatch = useDispatch()

const signOutUser = () => {
  return dispatch(signOutStart())
}

  return (
    <Fragment>
      <NavigationContainer>

        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>

        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>


          {
            currentUser ? <span className="nav-link" onClick={signOutUser}>SIGN OUT</span> : (
              <Link className='nav-link' to='auth'>
                SIGN IN
              </Link>
            )
          }

          <CartIcon />


        </NavLinks>
        {isCartOpen && <CartDropdown />}

      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}



export default Navigation