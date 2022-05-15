import {takeLatest, call, all, put} from 'redux-saga/effects'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'

import { fetchCategoriesSuccess,fetchCategoriesFailed } from './categories.action'

import { CATEGORIES_ACTION_TYPE } from './categories.types'



export function* fetchCategoriesAsync () {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories')
        yield put(fetchCategoriesSuccess(categoriesArray))

    } catch (error) {
        yield put(fetchCategoriesFailed(error))
    }
}

//generators respond to action the same way reducer inside switch
export function* onFetchCategories(){
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}



// export from this saga file
//accumulator that contains all the sagas related to the categories
export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}