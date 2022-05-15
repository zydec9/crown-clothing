import { useEffect, } from "react";
import {useDispatch} from 'react-redux'

import { Route, Routes } from 'react-router-dom'


import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component.jsx";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component"
import { setCurrentUser, checkUserSession } from "./store/user/user.action";



import { 
  onAuthStateChangedListener, 
  createUserDocumentFromAuth,
  getCategoriesAndDocuments,
getCurrentUser } 
  from "./utils/firebase/firebase.utils";



 const App = () => {
 const dispatch = useDispatch()

//   useEffect(() => {
//     const unsubscribe = onAuthStateChangedListener((user) => {
//         if (user) {
//             createUserDocumentFromAuth(user)
//         }

//         dispatch(setCurrentUser(user))
        

//     })
//     return unsubscribe
// }, [])


// instead of having a listenner 
//responds every time a user state update (in the app component)
// the code is wrapped in a promise bases function call in firebase utils


useEffect(() => {
dispatch(checkUserSession())
},[])



  return (
<Routes >
  <Route path="/" element={<Navigation />}>


      <Route index element={<Home />} />
      <Route path='shop/*' element={<Shop />} />
      <Route path='auth' element={<Authentication />} />
      <Route path='checkout' element={<Checkout />} />


      </Route>
       
    

    </Routes>

    
    
  )
}

export default App; 




    //set the collections in the database, (just one time)
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // },[])