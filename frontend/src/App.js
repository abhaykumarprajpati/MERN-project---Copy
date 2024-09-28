import "./App.css";
import { useEffect } from 'react';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader"
import React from "react";
import Footer from "./component/layout/Footer/Footer.jsx"
import Home from "./component/Home/Home";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails.jsx"
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import { Button } from 'react-bootstrap';
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction"
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/admin/Dashboard";
import axios from "axios";
import Stripe from "stripe";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReview from "./component/admin/ProductReview";
import NotFound from "./component/layout/NotFound";
import Contact from "./component/Contact/Contact";
import About from "./component/AboutUs/About";
import ReturnForm from "./component/Order/ReturnForm";
import CategoriesManagement from "./component/Categories/category";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'




function App() {


    const { isAuthenticated, user } = useSelector((state) => state.user)
    console.log('testisAuthenticated', isAuthenticated);
    const [stripeApikey, setStripeApikey] = useState("");

    async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeapikey");

        setStripeApikey(data.stripeApikey);

    }
    // const key = Stripe(stripeApikey).toString()

    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });

        store.dispatch(loadUser())

        getStripeApiKey();

    }, [])




    return (
        <Router>
            <Header />

            {/* {isAuthenticated && <UserOptions user={user} />} */}
            <ToastContainer />

            <Routes>

                <Route exact path="/" element={<Home />} />
                {/* <Route exact path="/sad" element={<Loader/>}/> */}
                <Route exact path="/product/:id" element={<ProductDetails />} />
                {/* for all products */}
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/category" element={<CategoriesManagement />} />
                {/* display search product */}
                <Route path="/products/:keyword" element={<Products />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/about" element={<About />} />

                <Route exact path="/search" element={<Search />} />

                <Route exact path="/cart" element={<Cart />} />

                {/* <Route exact path="/account" element={< Profile/>}  /> */}
                <Route exact path="/account" element={< Profile />} />

                <Route exact path="/me/update" element={<UpdateProfile />} />
                <Route exact path="/password/update" element={<UpdatePassword />} />
                <Route exact path="/password/forgot" element={<ForgotPassword />} />

                <Route exact path="/password/reset/:token" element={<ResetPassword />} />

                <Route exact path="/login" element={<LoginSignUp />} />
                <Route exact path="/return:id" element={<ReturnForm />} />
                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                    <Route exact path="/shipping" element={<Shipping />} />
                    <Route exact path="/success" element={<OrderSuccess />} />
                    <Route exact path="/orders" element={<MyOrders />} />
                    <Route exact path="/order/confirm" element={< ConfirmOrder />} />
                    <Route exact path="/order/:id" element={<OrderDetails />} />
                    <Route exact path="/admin/products" element={<ProductList />} />

                    <Route exact path="/admin/product" element={<NewProduct />} />

                    <Route exact path="/admin/product/:id" element={<UpdateProduct />} />


                    <Route exact path="/admin/orders" element={<OrderList />} />
                    <Route exact path="/admin/order/:id" element={< ProcessOrder />} />
                    <Route exact path="/admin/users" element={<UsersList />} />

                    <Route exact path="/admin/user/:id" element={< UpdateUser />} />

                    <Route exact path="/admin/reviews" element={<ProductReview />} />


                </Route>







                <Route exact path="/process/payment" element={
                    <Elements stripe={loadStripe(stripeApikey)}><Payment /></Elements>
                } />







                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />








                <Route path="" element={<NotFound />} />



            </Routes>

            <Footer />

        </Router>


    );

}


export default App;











