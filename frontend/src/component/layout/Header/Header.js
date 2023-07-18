import React, { useState } from 'react'
import Logo from "../../../images/log.png"
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import "./Header.css"
import { Outlet, Link } from "react-router-dom";
import { logout } from '../../../actions/userAction';
import { useAlert } from 'react-alert';




const Header = () => {
  const location = useLocation()
  const { isAuthenticated, user } = useSelector((state) => state.user)

  const { cartItems } = useSelector((state) => state.cart)
  // const {loading , isAuthenticated , user} = useSelector((state)=> state.user);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <i className="fa-sharp fa-solid fa-clipboard-list" style={{ "width": "40px" }}></i>, name: "Orders", func: orders },
    { icon: <i className="fa-regular fa-user" style={{ "width": "40px" }}></i>, name: "Profile", func: account },
    { icon: <i className="fa-solid fa-cart-plus" style={{ "width": "40px" }}></i>, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <i className="fa-solid fa-right-from-bracket" style={{ "width": "40px" }}></i>, name: "Logout", func: logoutUser },
  ];

  if (user?.role === "admin") {
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


  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {  // .trim means you  have to enter something in input 
      navigate(`/products/${keyword}`); // we can access keyword data from params , and from Product.jsx page

    } else {
      navigate("/products");


    }

  }




  return (
    <>


      <div className='sticky-top'>

        <nav className="navbar navbar-expand-lg navbar_custom  " >
          <a className="navbar-brand header_logo" to="#">
            <img src="" alt="EOMMERCE" style={{ "color": "whitesmoke" }} />
          </a>
          <div style={{ "width": "124px" }}></div>



          <button className="navbar-toggler toggler_icon me-2" style={{ "outline": "none" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">

                {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                <form className=' d-flex' onSubmit={searchSubmitHandler}>
                  <input className='form-control' type="text" style={{ "width": "400px" }}
                    placeholder='Search a Product...'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />

                </form>


              </li>


              <li className="">
                <div className="dropdown">

                  <span className='dropdown-toggle fs-4 ms-2' style={{ "color": "whitesmoke", "cursor": "pointer" }} id='dropdownMenuButton' data-bs-toggle="dropdown" aria-expanded="false">{user?.name}</span>

                  <ul className="dropdown-menu useroptions_list border-0" aria-labelledby="dropdownMenuButton">
                    {/* <li><a className="dropdown-item" href="#">Link 1</a></li> */}
                    {options.map((item) => (
                      <li key={item.name} icon={item.icon} title={item.name} onClick={item.func}><span className='item_name'>{item.name}</span></li>
                    ))}


                  </ul>
                </div>

              </li>


              <li className="">
                <Link className="nav-link" to="/login">
                  <i className="fa-solid fa-user"></i>
                </Link>

              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/Cart">
                  <i className="fa-solid fa-cart-plus position-relative fs-5">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartItems.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>

                  </i>
                </Link>

              </li>



            </ul>
          </div>

        </nav>
      </div>


      <Outlet />



    </>
  )
}

export default Header











