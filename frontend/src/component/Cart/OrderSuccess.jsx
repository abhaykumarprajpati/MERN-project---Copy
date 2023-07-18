import React from 'react'
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { Link } from 'react-router-dom';
import "./orderSuccess.css";

const OrderSuccess = () => {
    return (
        <>
            <div className="orderSuccess">

                <CheckCircleIcon />
                <p>Your Order has been Placed successfully</p>
                <Link to="/orders">View Orders</Link>
            </div>
        </>
    )
}

export default OrderSuccess
