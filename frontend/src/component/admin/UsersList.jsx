import React, { useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"
// import "./productList.css"
import { Button } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux"
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import { DELETE_USER_RESET } from '../../constants/userConstants'
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction"
import { Link, useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData"
import Sidebar from './Sidebar'
// import "./productList.css  "
import Offcanvas from './Offcanvas'

const UsersList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);



  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }
  const navigate = useNavigate()
  //we have to dispatch for getting products in useeffect ,why
  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET })
    }

    dispatch(getAllUsers());

  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message])




  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 0.5
    },
    {
      field: "name",
      headerName: "Name",
      // type: "number",
      minWidth: 80,
      flex: 0.3
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 200,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";

      }
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`} ><i className="fa-solid fa-pen-to-square"></i></Link>
            <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))} >
              <i className="fa-solid fa-trash"></i>
            </Button>
          </>
        )
      }
    },
  ];

  const rows = [];

  users && users.forEach((item) => {
    rows.push({
      id: item._id,
      role: item.role,
      email: item.email,
      name: item.name,
    })

  })




  return (
    <>
      <MetaData title={`ALL USERS - Admin`} />
      <Offcanvas />
      <div className="">
        <div className="row">
          <Sidebar />

          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4 productListContainer'>

            <h1 id='productListHeading'>ALL USERS</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className='productListTable'
              autoHeight
            />




          </main>



        </div>



      </div>
    </>
  )
}

export default UsersList

