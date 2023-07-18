import React, { useEffect } from 'react'
import "./Home.css"
import Product from './ProductCard'
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux"
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert"
import ProductCard from './ProductCard';
import shopvector from "../../images/shopvector.png"
import shopbackg from "../../images/shopbackg.jpg"
import { Link } from 'react-router-dom';



//only for testing purpose
// const product = {
//     name: "tshirt",
//     images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//     price: "3999",
//     _id: "abhay",
// };


const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products)
    console.log(products);
    useEffect(() => {
        // if (error) {
        //     return alert.error(error)
        // }
        dispatch(getProduct());

        if (error) {
            alert.error(error)
            dispatch(clearErrors());

        }

    }, [dispatch, error, alert]);







    return (
        <>
            {
                loading ? (<Loader />) :
                    (
                        <>
                            <MetaData title="Ecommerce" />

                            <div className='container-fluid'>
                                <div id="carouselExampleFade" className="carousel slide carousel-slide maindiv" data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        <div class="carousel-item active main" >
                                            <div className=' row' >
                                                <img src={shopvector} alt="shop" className='col-md-6' />
                                                <div className='col-md-5 banner_text '>
                                                    <p className='mytext fw-bold fs-4'>#style2023</p>
                                                    <h2 >new arrivals</h2>
                                                    <p className='text-dark fw-bold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, laborum.</p>
                                                    <Link type='button' to={"/products"} className="btn btn-dark btn-lg">EXPLORE NOW</Link>

                                                </div>



                                            </div>
                                        </div>
                                        <div class="carousel-item  main" >
                                            <div className=' row' >
                                                <img src={shopvector} alt="shop" className='col-md-6' />
                                                <div className='col-md-5 banner_text '>
                                                    <p className='mytext fw-bold fs-4'>#style2023</p>
                                                    <h2 >new arrivals</h2>
                                                    <p className='text-dark fw-bold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, laborum.</p>
                                                    <Link type='button' to={"/products"} className="btn btn-dark btn-lg">EXPLORE NOW</Link>
                                                </div>



                                            </div>
                                        </div>
                                        <div class="carousel-item  main" >
                                            <div className=' row' >
                                                <img src={shopvector} alt="shop" className='col-md-6' />
                                                <div className='col-md-5 banner_text '>
                                                    <p className='mytext fw-bold fs-4'>#style2024</p>
                                                    <h2 >new arrivals</h2>
                                                    <p className='text-dark fw-bold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, laborum.</p>
                                                    <Link type='button' to={"/products"} className="btn btn-dark btn-lg">EXPLORE NOW</Link>

                                                </div>



                                            </div>
                                        </div>

                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>



                                <h2 className='homeHeading'>Featured Products</h2>
                                <div className='row'>


                                    <div className='col-md-10 mx-auto'>
                                        <div className="d-flex flex-wrap">
                                            {products?.map(product => (


                                                <ProductCard product={product} key={product._id} />




                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    )
            }
        </>

    )
}

export default Home