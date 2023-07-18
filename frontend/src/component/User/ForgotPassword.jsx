import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";


import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();



    const { error, message, loading } = useSelector((state) => state.forgotPassword);


    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        // myForm.set("name", name);//no need
        myForm.set("email", email);
        // myForm.set("avatar", avatar); // no need
        dispatch(forgotPassword(myForm));
        // dispatch(register(myForm));
    };

    useEffect(() => {


        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);

        }
    }, [dispatch, error, alert, message]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Forgot Password" />
                    <div className="row gy-5">
                        <div className="col-md-5 mx-auto d-flex justify-content-center align-items-center">
                            <div >
                                <h2 className=" text-center">Forgot Password</h2>

                                <form
                                    className=""

                                    onSubmit={forgotPasswordSubmit}
                                >

                                    <div className="my-3">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text bg-white">
                                                        <i class="fa-thin fa-envelope"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    placeholder="Email"
                                                    required
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                    </div>


                                    <input
                                        type="submit"
                                        value="send"
                                        className=" outline-none btn my-3 "
                                        style={{ "backgroundColor": "tomato", "width": "80%" }}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ForgotPassword
