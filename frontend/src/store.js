import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import { productListReducer, productDetailReducer } from "./reducer/productReducer";
import { cartReducer } from "./reducer/cartReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
})

const cartFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialSate = {
    cart: { cartItems: cartFromLocalStorage},
}

const middleware = [thunk]

const store = createStore(reducer, initialSate, applyMiddleware(...middleware))

export default store