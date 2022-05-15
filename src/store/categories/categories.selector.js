import {createSelector} from 'reselect'

const selectCategoriesReducer = (state) => state.categories

const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => 
    categories.reduce((acc, category) => {
        const { title, items } = category
        acc[title.toLowerCase()] = items
        return acc
 }, {}))

export const selectCategoriesIsLoading = createSelector(
    [selectCategoriesReducer],
(categoriesSlice) => categoriesSlice.isLoading
)



    // why not two selectors instead of three ?

    // const selectCategoriesReducer = (state) => state.categories

    // export const selectCategoriesMap = createSelector(
    //     [selectCategoriesReducer],
    //     (categories) => categories.categories
    //     .reduce((acc, category) => {
    //         const { title, items } = category
    //         acc[title.toLowerCase()] = items
    //         return acc
    //     }, {}))
   

        //ça marche aussi

        //peut être pour selectionner encore plus spécifiquement une certaine variable du global state
        //un selector par niveau ?