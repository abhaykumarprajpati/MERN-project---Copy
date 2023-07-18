import React, { useEffect } from 'react';
import "./orderDetails.css"

import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';


const OrderDetails = () => {

    const params = useParams();
    const { id } = params;
    const { order, error, loading, } = useSelector((state) => state.orderDetails);
    const { products } = useSelector((state) => state.products)
    console.log(order)


    // const { user } = useSelector((state) => state.user)

    const dispatch = useDispatch();
    const alert = useAlert();


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());

        }
        dispatch(getOrderDetails(id))
    }, [dispatch, alert, error, id])








    return (
        <>

            {loading ? <Loader /> :
                <>
                    <MetaData title="Order Details" />

                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">
                            <h5>

                                Order# {order?._id}
                            </h5>
                            <h2>Shipping Info</h2>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <label className='fs-4'>Name:</label>
                                    <span>
                                        {order?.user.name}
                                    </span>
                                </div>
                                <div>
                                    <label className='fs-4'>Phone:</label>
                                    <span>{order?.shippingInfo.phoneNo}</span>
                                </div>
                                <div>
                                    <label className='fs-4'>Address:</label>
                                    <span>
                                        {`${order?.shippingInfo.address} , ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.pinCode}, ${order?.shippingInfo.country}`}
                                    </span>
                                </div>

                            </div>
                            <h2>Payment</h2>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p className={order?.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}
                                    >
                                        {
                                            order?.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"
                                        }
                                    </p>
                                </div>
                                <div>
                                    <label className='fs-4'>Amount:</label>
                                    <span>{order?.totalPrice}</span>
                                </div>
                            </div>
                            <h2>Order Status</h2>
                            <div className="orderDetailsContainerBox">

                                <div>
                                    <label
                                        className={
                                            order?.orderStatus === "Delivered" ? "greenColor" : "redColor"
                                        }
                                    >{order?.orderStatus}</label>
                                </div>


                            </div>

                        </div>
                        <div className="orderDetailsCartItems">
                            <p>Order Items:</p>
                            <div className="orderDetailsCartItemsContainer">
                                {
                                    order?.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            <span className='me-2'>
                                                {item.quantity}X Rs.{item.price}=<b>Rs.{item.price * item.quantity}</b>
                                            </span>
                                            {order.orderStatus === "Delivered" ? <div>
                                                <Link to={`/return/${item.product}`} style={{ "textDecoration": "none", "color": "tomato" }}>Return</Link>
                                            </div> : ""}

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </>
            }

        </>
    )
}

export default OrderDetails
