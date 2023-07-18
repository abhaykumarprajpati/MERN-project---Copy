import React from 'react'
import "./CartItemCard"
import "./Cart.css"
import CartItemCard from './CartItemCard'
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useLocation } from 'react-router-dom';
const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    console.log(cartItems)


    const increaseQuantity = (id, quantity, stock) => { //id, quantity, stock came from button below
        const newQty = quantity + 1;

        console.log(newQty)
        if (stock <= quantity) {
            return;

        } // otherwise we dispatch
        dispatch(addItemsToCart(id, newQty));// we are sending id and newQty ,so that cart will update

    }
    const decreaseQuantity = (id, quantity, stock) => { //id, quantity, stock came from button below
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;

        } // otherwise we dispatch
        dispatch(addItemsToCart(id, newQty));// we are sending id and newQty ,so that cart will update

    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id))
    }

    // const item = {
    //     product: "productID",
    //     price: 200,
    //     name: "abhay",
    //     quantity: 1
    // } /// Only for testing purpose

    const checkoutHandler = () => {
        // navigate("/login?redirect=shipping")// not working
        navigate("/shipping")
    }


    return (
        <>
            <MetaData title="CART--PAGE" />
            {cartItems.length === 0 ? (

                <div className='row'>
                    <div className='emptyCart d-flex flex-column col-md-4 mx-auto'>
                        <div className='text-center'>
                            <i className="fa-solid fa-xmark fs-1 text-danger"></i>
                            <h5 className='fs-4'>No Product in your cart</h5>

                            <Link className='  btn btn-success' to="/products">View Products</Link>
                        </div>


                    </div>
                </div>
            ) : (
                <>
                    <div className="cartPage container-fluid">
                        <div className="cartHeader row">
                            <p className='col-md-4 col d-flex justify-content-center'>Product</p>
                            <p className='col-md-4 col d-flex justify-content-center'>Quantity</p>
                            <p className='col-md-4 col d-flex justify-content-center'>Subtotal</p>
                        </div>
                        <div className='border_bottom'>

                        </div>
                        {
                            cartItems && cartItems.map((item) => (
                                <div className="row mb-2" key={item.product}>
                                    <div className="col-md-4 col d-flex justify-content-center align-items-center">
                                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                    </div>

                                    <div className="cartInput col-md-4 col d-flex justify-content-center align-items-center">
                                        <button className='btn btn-sm btn-secondary border-0 button_1' onClick={
                                            () => decreaseQuantity(item.product, item.quantity)}>-</button>
                                        <input style={{ "width": "20%" }} type="number" value={item.quantity} readOnly />
                                        {/* item.product, item.quantity, item.Stock = we are sending these values to increaseQuantity function above */}
                                        <button className='btn btn-sm  btn-secondary border-0 button_1' onClick={
                                            () => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                    </div>
                                    <p className='cartSubtotal fw-bold col-md-4 col d-flex justify-content-center align-items-center' style={{ "fontStyle": "oblique" }}>{`Rs ${item.price * item.quantity}`}</p>
                                </div>
                            ))
                        }

                        <div className="cartGrossTotal ">
                            <div></div>
                            <div className="cartGrossTotalBox row">
                                <p className='fs-3 fw-bold col-md-6 col text-end'>Gross Total</p>
                                <p className='fs-3 fw-bold col-md-6 col text-end'>{`Rs ${cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price, 0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className='checkOutBtn'>
                                <button onClick={checkoutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </>)}
        </>
    )
}

export default Cart
