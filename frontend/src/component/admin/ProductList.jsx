import React, { useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"

import { Button } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux"
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import {
  clearErrors,
  getAdminProduct,
  deleteProduct
} from "../../actions/productAction"
import { Link, useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData"
import Sidebar from './Sidebar'
import "./productList.css"
import Offcanvas from './Offcanvas'

const ProductList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector((state) => state.product)

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
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
      alert.success("Product deleted successfully");
      // navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET })
    }

    dispatch(getAdminProduct())

  }, [dispatch, alert, error, deleteError, navigate, isDeleted])




  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.5
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.3
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 200,
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`} ><i className="fa-solid fa-pen-to-square"></i></Link>
            <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))} >
              <i className="fa-solid fa-trash"></i>
            </Button>
          </>
        )
      }
    },
  ];

  const rows = [];

  products && products.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.Stock,
      price: item.price,
      name: item.name,
    })

  })




  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      <Offcanvas />
      <div className="">
        <div className="row">
          <Sidebar />

          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4 productListContainer'>

            <h1 id='productListHeading'>ALL PRODUCTS</h1>

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

export default ProductList
