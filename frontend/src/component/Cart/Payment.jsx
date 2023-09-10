import React, { useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,

} from "@stripe/react-stripe-js";

import axios from 'axios';
import { useNavigate } from "react-router-dom"
import "./payment.css"
import { clearErrors, createOrder } from '../../actions/orderAction'



const Payment = () => {


    const dispatch = useDispatch()
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));



    const stripe = useStripe();
    const elements = useElements();

    const alert = useAlert();


    const navigate = useNavigate();

    const payBtn = useRef(null);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,

    };





    const submitHandler = async (e) => {

        e.preventDefault();

        payBtn.current.disabled = true;// by doing payBtn.current we can access html property

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process", paymentData,
                config
            );
            const client_secret = data.client_secret;

            if (!stripe || !elements)

                return;

            const result = await stripe.confirmCardPayment(
                client_secret,

                // confirmParams: {
                //     // return_url: 'https://example.com/order/123/complete',
                //     return_url: 'http://localhost:3000/success',
                // }




                {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: user.name,
                            email: user.email,
                            address: {
                                line1: shippingInfo.address,
                                city: shippingInfo.city,
                                state: shippingInfo.state,
                                postal_code: shippingInfo.pinCode,
                                country: shippingInfo.country,
                            }
                        }
                    }

                }


            );

            if (result.error) {

                payBtn.current.disabled = false;
                alert.error(result.error.message);
            } else {

                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = { // order is placed here
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));



                    navigate("/success");
                    // window.location.href = 'http://localhost:3000/success'
                } else {
                    alert.error("There's some issue while processing payment")
                }
            }

        }

        catch (error) {

            payBtn.current.disabled = false;
            alert.error(error.response.data.message)

        }


    };

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, error, alert])



    return (
        <>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">

                <form className='paymentForm ' onSubmit={(e) => submitHandler(e)}>
                    <p className='fs-3 fw-bold'>Card Info</p>
                    <div>
                        <i className="fa-regular fa-credit-card me-2"></i>
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <i className="fa-regular fa-credit-card me-2"></i>
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <i className="fa-solid fa-key me-2"></i>
                        <CardCvcElement className='paymentInput' />
                    </div>
                    <input type="submit"
                        value={`Pay - Rs.${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />

                </form>
            </div>

        </>
    )
}

export default Payment
