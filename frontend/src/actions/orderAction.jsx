import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,

    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDERS_REQUEST,
    UPDATE_ORDERS_SUCCESS,
    UPDATE_ORDERS_FAIL,
    UPDATE_ORDERS_RESET,
    RETURN_ORDERS_REQUEST,
    RETURN_ORDERS_SUCCESS,
    RETURN_ORDERS_RESET,
    RETURN_ORDERS_FAIL,

    DELETE_ORDERS_REQUEST,
    DELETE_ORDERS_SUCCESS,
    DELETE_ORDERS_FAIL,
    DELETE_ORDERS_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/orderConstants";

import axios from "../axiosConfig";


//Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        console.log("I am order", order)
        const { data } = await axios.post("/api/v1/order/new", order, config)
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
};

//My Orders 
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get("/api/v1/orders/me")

        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }


};

//Get All orders (Admin)
export const getAllOrders = () => async (dispatch) => {
    
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.get("/api/v1/admin/orders")

        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });

    } catch (error) {

        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {

    try {

        dispatch({ type: UPDATE_ORDERS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config)
        
        dispatch({ type: UPDATE_ORDERS_SUCCESS, payload: data.success });

    } catch (error) {

        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
};
// Return order
// export const returnOrder = () => async () => {
//     try {
//         dispatch({ type: RETURN_ORDERS_REQUEST });

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         }
//         const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config)
//         dispatch({ type: RETURN_ORDERS_SUCCESS, payload: data.success })


//     } catch (error) {
//         dispatch({
//             type: RETURN_ORDERS_FAIL,
//             payload: error.response.data.message,
//         })

//     }
// }

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {

    try {

        dispatch({ type: DELETE_ORDERS_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data.success });

    } catch (error) {

        dispatch({
            type: DELETE_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }



};



//Get Order Details

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });



        const { data } = await axios.get(`/api/v1/order/${id}`)
        console.log(data);

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
};



// Clearing Errors

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};