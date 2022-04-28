import Home from "./routes/home/home.component";
import SingIn from "./routes/sign-in/sign-in.component";
import Navigation from "./routes/navigation/navigation.component";
import { Route, Routes } from 'react-router-dom'







const Shop = () => {
  return(
    <h1>here is the shop page</h1>
  )
}



const App = () => {
  return (
<Routes >
  <Route path="/" element={<Navigation />}>


      <Route index element={<Home />} />
      <Route path='shop' element={<Shop />} />
      <Route path='sign-in' element={<SingIn />} />

      </Route>
       
    

    </Routes>

    
    
  )
}

export default App; 