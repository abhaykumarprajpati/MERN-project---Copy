import React, { useEffect, useState } from 'react'
import CheckoutSteps from '../Cart/CheckoutSteps'
import { useDispatch, useSelector } from "react-redux"
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import "./ConfirmOrder.css";
import Sidebar from './Sidebar'
import { Button } from '@material-ui/core'
import Offcanvas from './Offcanvas'
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderAction'
import { useAlert } from 'react-alert'
import { UPDATE_ORDERS_RESET } from '../../constants/orderConstants'
import "./processOrder.css"

const ProcessOrder = () => {

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);


    const params = useParams()
    const { id } = params





    const navigate = useNavigate();
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData()

        myForm.set("status", status);



        dispatch(updateOrder(id, myForm))
    };

    const dispatch = useDispatch()
    const alert = useAlert()

    const [status, setStatus] = useState("")

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Order Updated Successfully")
            dispatch({ type: UPDATE_ORDERS_RESET })
        }

        dispatch(getOrderDetails(id))

    }, [dispatch, alert, error, id, isUpdated, updateError])






    return (
        <>
            <MetaData title={`Process Order`} />
            <Offcanvas />
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />

                    <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4 productListContainer'>

                        {loading ? <Loader /> : <div className="confirmOrderPage row ">
                            <div className='col-md-8 confirm' style={{ "borderRight": "1px solid " }}>
                                <div className='confirmshippingArea'>
                                    <h4>Shipping Info</h4>
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
                                            <p
                                                className={order?.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}
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
                                <div className="confirmCartItems">
                                    <h4>Your Cart Items:</h4>
                                    <div className="confirmCartItemsContainer">
                                        {
                                            order?.orderItems.map((item) => (
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
                            <div className='col-md-4 d-flex justify-content-center'
                                style={{

                                    display: order?.orderStatus === "Delivered" ? "none" : "block"

                                }}

                            >

                                <form className='updateOrderForm'

                                    onSubmit={updateOrderSubmitHandler}

                                >
                                    <h1>Process Order</h1>





                                    <div className='mb-5'>
                                        <i className="fa-solid fa-hashtag"></i>
                                        <select

                                            onChange={(e) => setStatus(e.target.value)}>

                                            <option value="">Choose Category</option>
                                            {order?.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}
                                            {
                                                order?.orderStatus === "Shipped" && (
                                                    <option value="Delivered">Delivered</option>
                                                )
                                            }

                                        </select>
                                    </div>






                                    <Button id='createProductBtn'
                                        type='submit'
                                        disabled={loading ? true : false || status === "" ? true : false}

                                    >Process</Button>


                                </form>
                            </div>



                        </div>
                        }





                    </main>



                </div>



            </div>
        </>




    )
}

export default ProcessOrder

