import {createStore , combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'

import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { userOptions,loggingOutUser,editUser,resetPw} from "./reducers/userReducers"

//root reducers
const rootReducer = combineReducers({
    userOptions,
    loggingOutUser,
    editUser,
    resetPw
})

const middleware = [thunk];

const initialState = {}

// configuration object for redux-persist
const persistConfig = { 
    key: 'root',
    storage, // define which storage to use
}

// create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer) 


//creating store
const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

// used to create the persisted store
const  persistor = persistStore(store); 

export {store,persistor}
