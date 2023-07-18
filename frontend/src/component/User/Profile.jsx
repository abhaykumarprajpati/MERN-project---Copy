import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData';
import { useSelector } from 'react-redux'; // so that we can pull user from redux
import Loader from '../layout/Loader/Loader';
import "./Profile.css"

const Profile = () => {

    const navigate = useNavigate();

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }


    }, [isAuthenticated, navigate])


    return (
        <>
            {loading ? (<Loader />) : (<>
                <MetaData title={`${user?.name} Profile`} />
                <div className='container-fluid'>
                    <div className="profileContainer row mt-4">
                        <div className='col-md-6 text-center'>
                            <h1>My Profile</h1>
                            <img style={{ "width": "200px", "height": "200px", "borderRadius": "50%" }} src={user?.avatar?.url} alt={user?.name} /><br />
                            <Link className='btn btn-custom mt-3' to="/me/update">Edit Profile</Link>
                        </div>
                        <div className='col-md-6 text-center'>

                            <div>
                                <h4>Full Name</h4>
                                <p>{user?.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user?.email}</p>
                            </div>
                            <div>
                                <h4>
                                    Joined On
                                </h4>
                                <p>{String(user?.createdAt).substring(0, 10)}</p>
                            </div>
                            <div className='d-flex flex-column  row gy-2 p-5'>
                                <Link className='btn btn-order mx-auto' to="/orders">My Orders</Link>
                                <Link className='btn btn-order mx-auto' to='/password/update'>Change Password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default Profile
