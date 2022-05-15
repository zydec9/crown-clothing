
import { useDispatch } from 'react-redux'

import { useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'


import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { setCategories,fetchCategoriesAsync, fetchCategoriesStart } from '../../store/categories/categories.action'








const Shop = () => {

    const dispatch = useDispatch()


    // the asynchronous code is inside a thunk(asynchronous) action / saga

    // useEffect(() => {
    //     const getCategoriesMap = async () => {
    //         const categoriesArray = await getCategoriesAndDocuments('categories')

    //         dispatch(setCategories(categoriesArray))
    //     }
    //     getCategoriesMap()
    // }, [])


   useEffect(() => {
dispatch(fetchCategoriesStart())

   },[])




    return (


        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>


    )
}


export default Shop