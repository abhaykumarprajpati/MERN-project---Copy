import React from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from "react-redux"
import MetaData from '../layout/MetaData'
import { Link, useNavigate } from 'react-router-dom'
import "./ConfirmOrder.css";

const ConfirmOrder = () => {

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user)


    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const Ttax = subtotal * 0.18;
    const tax = Ttax.toString().split(".")[0];


    const TtotalPrice = subtotal + Ttax + shippingCharges;
    const totalPrice = TtotalPrice.toString().split(".")[0]

    const address = `${shippingInfo.address} , ${shippingInfo.city} , ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`

    const navigate = useNavigate();

    const proceedToPayment = () => {

        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data)); // session storage means on closing page data remove from sessionStorage

        navigate("/process/payment")


    }





    return (
        <>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage row ">
                <div className='col-md-8 confirm' style={{ "borderRight": "1px solid " }}>
                    <div className='confirmshippingArea'>
                        <h4>Shipping Info</h4>
                        <div className='confirmshippingAreaBox'>
                            <div className='d-flex'>
                                <p>Name:</p>
                                <span>{user?.name}</span>
                            </div>
                            <div className='d-flex'>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>

                            </div>
                            <div className='d-flex'>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>

                        </div>


                    </div>
                    <div className="confirmCartItems">
                        <h4>Your Cart Items:</h4>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div className='row align-items-center mb-3' key={item.product} >
                                        <div className='col-md-8 ' >
                                            <img src={item.image} alt="Product" className='w-25 me-4' />
                                            <Link className='text-decoration-none text-secondary fw-bold fs-5' to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        <span className='col-md-4'>

                                            {item.quantity} x Rs{item.price}={" "}
                                            <b>Rs{item.price * item.quantity}</b>

                                        </span>


                                    </div>
                                ))
                            }


                        </div>

                    </div>

                </div>

                {/*  */}
                <div className='col-md-4 d-flex justify-content-center'>

                    <div className="orderSummary ">
                        <p className='fs-2 fw-bold'>Order Summary</p>
                        <div>

                            <div className='d-flex'>
                                <p>Subtotal:</p>
                                <span>Rs{subtotal}</span>
                            </div>
                            <div className='d-flex'>
                                <p>Shipping Charges:</p>
                                <span>Rs {shippingCharges}</span>
                            </div>
                            <div className='d-flex'>
                                <p className='fw-bold me-1'>GST:</p>
                                <span>Rs{tax}</span>
                            </div>
                        </div>
                        <div className="orderSummaryTotal d-flex">
                            <p>
                                <b className='me-1'>Total:</b>
                            </p>
                            <span>Rs {totalPrice}</span>


                        </div>
                        <button className='btn btn-custom' onClick={proceedToPayment}>Proceed to Payment</button>


                    </div>
                </div>



            </div>
        </>
    )
}

export default ConfirmOrder
