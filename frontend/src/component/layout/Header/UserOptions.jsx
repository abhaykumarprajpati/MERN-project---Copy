import React from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/userAction';


import "./Header.css"
const UserOptions = ({ user }) => {
    const { cartItems } = useSelector((state) => state.cart)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert();

    const options = [
        { icon: <i className="fa-sharp fa-solid fa-clipboard-list" style={{ "width": "40px" }}></i>, name: "Orders", func: orders },
        { icon: <i className="fa-regular fa-user" style={{ "width": "40px" }}></i>, name: "Profile", func: account },
        { icon: <i className="fa-solid fa-cart-plus" style={{ "width": "40px" }}></i>, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <i className="fa-solid fa-right-from-bracket" style={{ "width": "40px" }}></i>, name: "Logout", func: logoutUser },
    ];


    if (user.role === "admin") {
        options.unshift({
            icon: <i class="fa-solid fa-table-columns" style={{ "width": "40px" }}></i>,
            name: "Dashboard",
            func: dashboard,
        })

    }



    function dashboard() {
        navigate("/admin/dashboard")
    }
    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function cart() {
        navigate("/cart");
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully")

    }







    return (
        <>
            <div className='d-flex justify-content-end'>
                <div className="">

                    <img className='' style={{ "width": "40px", "height": "40px", "borderRadius": "50%" }}
                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                        src={user.avatar.url ? user.avatar.url : "/Prof.png"}
                        alt="" />

                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasRightLabel">{user.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul className='useroptions_list' >
                                {options.map((item) => (
                                    <li key={item.name} icon={item.icon} title={item.name} onClick={item.func}><span className='icons'>{item.icon}</span><span className='item_name'>{item.name}</span></li>
                                ))}

                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default UserOptions