import React, { useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"
// import "./productList.css"
import { Button } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux"

import { DELETE_ORDERS_RESET } from '../../constants/orderConstants'

import { Link, useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData"
import Sidebar from './Sidebar'
import "./productList.css"
import Offcanvas from './Offcanvas'
import { deleteOrder, getAllOrders, clearErrors } from '../../actions/orderAction'

const OrderList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order)

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
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
      alert.success("Order deleted successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDERS_RESET })
    }

    dispatch(getAllOrders())

  }, [dispatch, alert, error, deleteError, navigate, isDeleted])




  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? " greenColor" : "redColor";
      }
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 0.3
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 100,
      flex: 0.5,
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
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`} ><i className="fa-solid fa-pen-to-square"></i></Link>
            <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))} >
              <i className="fa-solid fa-trash"></i>
            </Button>
          </>
        )
      }
    },
  ];

  const rows = [];

  orders && orders.forEach((item) => {
    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus,
    })

  })




  return (
    <>
      <MetaData title={`ALL ORDERS - Admin`} />
      <Offcanvas />
      <div className="">
        <div className="row">
          <Sidebar />

          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4 productListContainer'>

            <h1 id='productListHeading'>ALL ORDERS</h1>

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

export default OrderList

