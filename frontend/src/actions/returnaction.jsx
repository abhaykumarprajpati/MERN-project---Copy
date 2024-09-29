import { RETURN_ORDERS_REQUEST, RETURN_ORDERS_SUCCESS, RETURN_ORDERS_FAIL } from "../constants/orderConstants";
import axios from "../axiosConfig";


export const returnproduct = (productId, reason, returnDate) => async (dispatch) => {
    try {
        // const data = { productId, reason, returnDate }
        console.log("this is return action", data)
        dispatch({ type: RETURN_ORDERS_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`/api/v1/returnproduct`, { productId, reason, returnDate }, config);
        dispatch({ type: RETURN_ORDERS_SUCCESS, payload: data.success })
    } catch (error) {
        // dispatch({
        //     type: RETURN_ORDERS_FAIL,
        //     payload:data.message,
        // })

        alert("error")



    }



}