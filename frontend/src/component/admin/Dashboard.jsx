import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import "./dashboard.css"
import { Doughnut, Line } from "react-chartjs-2"
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getAdminProduct } from '../../actions/productAction'
import Offcanvas from './Offcanvas'
import { getAllOrders } from '../../actions/orderAction'
import { getAllUsers } from '../../actions/userAction'

Chart.register(CategoryScale);

const Dashboard = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders)
  const { users } = useSelector((state) => state.allUsers)


  let outOfStock = 0;

  products && products.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock = outOfStock + 1;

    }
  });

  useEffect(() => {

    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers())
  }, [dispatch])

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, totalAmount]
      }
    ]
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],

    datasets: [
      {
        backgroundColor: ["#00A684", "#680084"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products?.length - outOfStock]
      }
    ]
  }

  return (

    <div className="container-fluid">
      <Offcanvas />
      <div className="row">

        <Sidebar />


        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>


          <div className='dashboardContainer'>

            <h2 className='text-center'>Dashboard</h2>
            <div className="dashboardSummary">
              <div>
                <p>Total Amount <br />{`Rs. ${totalAmount}`}</p>
              </div>
              <div className="dashboardSummaryBox2">
                <Link to="/admin/products">
                  <p>Product</p>
                  <p>{products?.length}</p>
                </Link>
                <Link to="/admin/orders">
                  <p>Orders</p>
                  <p>{orders?.length}</p>
                </Link>

                <Link to="/admin/users">
                  <p>Users</p>
                  <p>{users?.length}</p>
                </Link>
              </div>
            </div>



            <div className='lineChart'>


              <Line data={lineState} />
            </div>
            <div className='doughnutChart'>
              <Doughnut data={doughnutState} />
            </div>

          </div>

        </main>
      </div>
    </div>
  )
}

export default Dashboard
