
import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();
    const { token } = params;

    // const { user } = useSelector((state) => state.user); //No need

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    // const { error, isUpdated, loading } = useSelector((state) => state.user);

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();


        myForm.set("password", password)//and also in backend logic already set , we just have to accept user data here and what happens to this datas is depend on logic written in backend
        myForm.set("confirmPassword", confirmPassword)
        dispatch(resetPassword(token, myForm));
        // dispatch(register(myForm));
    };



    useEffect(() => {
        // if (user) {
        //     setName(user.name);
        //     setEmail(user.email);
        //     setAvatarPreview(user.avatar?.url);
        // } //no need

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");
            // dispatch(loadUser());// so that fresh data will load //no need

            navigate("/login");// user back to profile


        }
    }, [dispatch, error, alert, navigate, success]);



    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="change Password" />
                    <div className="row">
                        <div className="col-md-5 mx-auto d-flex justify-content-center align-items-center ">
                            <div >
                                <h2 className=" text-center">Update Profile</h2>

                                <form
                                    className=""

                                    onSubmit={resetPasswordSubmit}
                                >


                                    <div className="loginPassword mt-2">
                                        <i class="fa-solid fa-lock"></i>
                                        <input type="password"
                                            placeholder='New Password'
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                    </div>
                                    <div className="loginPassword mt-2">
                                        <i class="fa-solid fa-lock"></i>
                                        <input type="password"
                                            placeholder='Confirm Password'
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />

                                    </div>


                                    <input
                                        type="submit"
                                        value="Update"
                                        className=" outline-none btn my-3  resetPasswordBtn"
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

export default ResetPassword
