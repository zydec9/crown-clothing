import {compose, createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

import { rootReducer } from './root-reducer'


//redux-persist:

const persistConfig = {
    key: 'root',
    storage,
    // blacklist : ['user']
    whitelist : ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// creating saga middleware:
const sagaMiddleware = createSagaMiddleware()


const middleWares = [process.env.NODE_ENV !== 'production' && logger, 
sagaMiddleware
// tunk
]
.filter(Boolean)

// composeEnhancer instead of compose to use reduxdevtools

const composeEnhancer = 
(process.env.NODE_ENV !== 'production' && window && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

// export const store = createStore(
    // rootReducer, 
    // undefined, 
    // composedEnhancers
    // )


// use the persistedReducer as rootReducer
export const store = createStore(
    persistedReducer, 
    undefined, 
    composedEnhancers
    )

    sagaMiddleware.run(rootSaga)


export const persistor = persistStore(store)