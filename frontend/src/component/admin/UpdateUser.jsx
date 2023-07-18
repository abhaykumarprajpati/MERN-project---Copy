import React, { useState, useEffect } from 'react'



import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'

import Offcanvas from './Offcanvas'
import { UPDATE_USER_RESET } from "../../constants/userConstants"
import Sidebar from './Sidebar'

import { getUserDetails, updateUser, clearErrors } from '../../actions/userAction'
import Loader from "../layout/Loader/Loader"



const UpdateUser = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { loading, error, user } = useSelector((state) => state.userDetails)
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")

    const params = useParams();
    const { id } = params



    useEffect(() => {

        if (user && user._id !== id) {
            dispatch(getUserDetails(id));

        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }



        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("User Updated Successfully")
            navigate("/admin/users")
            dispatch({ type: UPDATE_USER_RESET })

        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, user, id])

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData()

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);





        dispatch(updateUser(id, myForm))


    }








    return (
        <>
            <MetaData title={`Update User`} />
            <Offcanvas />
            <div className="">
                <div className="row">
                    <Sidebar />

                    <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4 productListContainer'>

                        {loading ? <Loader /> : <form className='createProductForm'

                            onSubmit={updateUserSubmitHandler}

                        >
                            <h1>Update User</h1>


                            <div>

                                <i className="fa-solid fa-user"></i>
                                <input type="text"
                                    placeholder='Name'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </div>
                            <div>
                                <i className="fa-solid fa-envelope"></i>
                                <input type="email"
                                    placeholder='Email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                            </div>


                            <div>
                                <i className="fa-solid fa-hashtag"></i>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>

                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>

                                </select>
                            </div>







                            <Button id='createProductBtn'
                                type='submit'
                                disabled={updateLoading ? true : false || role === "" ? true : false}

                            >Update</Button>


                        </form>}






                    </main>



                </div>



            </div>
        </>
    )
}

export default UpdateUser







