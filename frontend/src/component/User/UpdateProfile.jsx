
import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";


import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    // const { error, isUpdated, loading } = useSelector((state) => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Prof.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
        // dispatch(register(myForm));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);

    };

    useEffect(() => {
        if (user) {
            setName(user?.name);
            setEmail(user?.email);
            setAvatarPreview(user.avatar?.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());// so that fresh data will load

            navigate("/account");// user back to profile

            dispatch({                        // so that isUpdate become false
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, alert, navigate, user, isUpdated]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Update Profile" />
                    <div className="row gy-5">
                        <div className="col-md-5 mx-auto d-flex justify-content-center align-items-center">
                            <div >
                                <h2 className=" text-center">Update Profile</h2>

                                <form
                                    className=""
                                    encType="multipart/form-data"
                                    onSubmit={updateProfileSubmit}
                                >
                                    <div className="my-3">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text bg-white">
                                                        <i class="fa-regular fa-face-smile"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Name"
                                                    required
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>


                                    </div>
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

                                    <div id="updateProfileImage">
                                        <img src={avatarPreview} alt="Avatar Preview" style={{ "width": "50px", "height": "50px", "borderRadius": "50%" }} />
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={updateProfileDataChange}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Update"
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
    );
};

export default UpdateProfile;