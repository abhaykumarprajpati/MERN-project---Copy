import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
// import axios from "axios";



import axios from '../../axiosConfig'; // Import the Axios instance




// Add to Cart

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/product/${id}`);
   
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,//we send url of first element from images array
            stock: data.product.Stock,
            quantity
        }
    });

    // console.log('debugging  in cartaction', getState().cart.cartItems)
   
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//REMOVE FROM CART
//we give only  id  of product which we want to remove from cart 
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    console.log('again debug cartaction 1')
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id, //we are sending id via payload
    })
    console.log('again debug cartaction 2')
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

};

//SAVE SHIPPING INFO
// we receive data from shipping.jsx
export const saveShippingInfo = (data) => async (dispatch) => {
    
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    })
    localStorage.setItem("shippingInfo", JSON.stringify(data));

}
