
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk"

import { composeWithDevTools } from "redux-devtools-extension";

import {
    productReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    productsReducer,
    productReviewsReducer,
    reviewReducer
} from "./reducers/productReducer";

import { profileReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { load } from "webfontloader";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, returnReducer } from "./reducers/orderReducer";


const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,

    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    returnproduct: returnReducer


});


// let initialState = {}; // this changes after making cartreducer and cartAction
let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    }
}

const middleware = [thunk];

const store = legacy_createStore(reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;


