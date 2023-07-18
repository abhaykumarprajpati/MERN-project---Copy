
import React, { useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";


import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    // const { user } = useSelector((state) => state.user); //No need

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    // const { error, isUpdated, loading } = useSelector((state) => state.user);
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [avatar, setAvatar] = useState();
    // const [avatarPreview, setAvatarPreview] = useState("/Prof.png"); //No need

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        // myForm.set("name", name);
        // myForm.set("email", email);
        // myForm.set("avatar", avatar);
        myForm.set("oldPassword", oldPassword)// this all exisst in backend usercontroller.jsx that why we are using here
        myForm.set("newPassword", newPassword)//and also in backend logic already set , we just have to accept user data here and what happens to this datas is depend on logic written in backend
        myForm.set("confirmPassword", confirmPassword)
        dispatch(updatePassword(myForm));
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

        if (isUpdated) {
            alert.success("Password Updated Successfully");
            // dispatch(loadUser());// so that fresh data will load //no need

            navigate("/account");// user back to profile

            dispatch({                        // so that isUpdate become false
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, alert, navigate, isUpdated]);
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

                                    onSubmit={updatePasswordSubmit}
                                >

                                    <div className="loginPassword">
                                        <i class="fa-solid fa-lock"></i>
                                        <input type="password"
                                            placeholder='Old Password'
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />

                                    </div>
                                    <div className="loginPassword mt-2">
                                        <i class="fa-solid fa-lock"></i>
                                        <input type="password"
                                            placeholder='New Password'
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
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
                                        value="Change"
                                        className=" outline-none btn my-3  updatePasswordBtn"
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

export default UpdatePassword
