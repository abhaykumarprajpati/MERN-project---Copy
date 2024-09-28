import React, { useEffect, useState } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { useNavigate } from "react-router-dom"
import axios from 'axios';





const categories = [

    {
        laptop: ["Hp", "Lenovo", "Asus"]
    },
    {
        Footwear: ["adidas", "Puma", "Nike"]
    }



]


const Products = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);

    const [price, setPrice] = useState([0, 25000]);


    const [selectedItem, setSelectedItem] = useState([]);



    const [ratings, setRatings] = useState(0);
    const [word, setword] = useState("");


    const { products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount } = useSelector((state) => state.products);




    const handleexchange = (item) => {
        if (selectedItem.includes(item)) {

            setSelectedItem(selectedItem.filter((i) => i !== item));

        } else {


            setSelectedItem([...selectedItem, item]);

        }
    }








    const params = useParams();
    const { keyword } = params


    const setCurrentPageNo = (e) => {

        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)

    }

    let count = filteredProductsCount;



    
    
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (selectedItem.length === 0) {

            dispatch(getProduct(keyword, currentPage, price, null, ratings));

        } else {
            dispatch(getProduct(keyword, currentPage, price, selectedItem, ratings));

        }

    }, [dispatch, keyword, currentPage, price, selectedItem, ratings, alert, error]);


    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        // Fetch categories data from the categories API
        axios.get('/api/v1/getAllCategories')
            .then(response => {
                console.log('getallcategory_1', response?.data);
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories data:', error);
            });

        // Fetch subcategories data from the subcategories API
        axios.get('/api/v1/getAllsubCategories')
            .then(response => {
                console.log('getallcategory_2', response?.data);
                setSubcategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching subcategories data:', error);
            });
    }, []);

    const onselectCategory = (categoryId) => {
        console.log('getallcategory_idcheck', categoryId);
        setSelectedCategoryId(categoryId);

        // Filter subcategories based on the selected category
        const filteredSubcategories = subcategories.filter(item => item.parentCategoryId === categoryId);
        setFilteredSubcategories(filteredSubcategories);

        console.log('getallcategory_new', filteredSubcategories);
    };




    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (word.trim()) {  // .trim means you  have to enter something in input 
            navigate(`/products/${word}`); // we can access keyword data from params , and from Product.jsx page

        } else {
            navigate("/products");


        }

    }

    return (
        <>
            {loading ? (<Loader />) : (
                <>

                    <MetaData title="PRODUCTS -- ECOMMERCE" />
                    <div className='container-fluid all_products_filter position-relative'>
                        <div className='product_heading'>
                            <h4 >Products</h4>
                        </div>

                        <div className="row">
                            <div className="col-md-2  filter_section" style={{ "backgroundColor": "white" }}>
                                <h4>Filters</h4>
                                <Typography>Price</Typography>
                                <Slider
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={25000}
                                />

                                <Typography>Categories</Typography>

                                {/* <div class="flex-shrink-0 p-3 bg-white" style={{ width: "280px" }}> */}
                                    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                                        <svg class="bi pe-none me-2" width="30" height="24"></svg>
                                        <span class="fs-5 fw-semibold">Collapsible</span>
                                    </a>

                                    <ul className="list-unstyled ps-0">
                                        {categories?.map((category, index) => (
                                            <li className="mb-1" key={category._id}>
                                                <button
                                                    className={`btn btn-toggle d-inline-flex align-items-center rounded border-0 ${expandedCategories.includes(category._id) ? '' : 'collapsed'}`}
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#${category?.name}-collapse`}
                                                    aria-expanded={expandedCategories.includes(category._id)}
                                                    onClick={() => onselectCategory(category._id)}
                                                >
                                                    {category.name}
                                                </button>
                                                <div className={`collapse ${expandedCategories.includes(category._id) ? 'show' : ''}`} id={`${category?.name}-collapse`}>
                                                    {selectedCategoryId === category._id && (
                                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                            {filteredSubcategories?.map((item, index) => (
                                                                <li key={item._id}>{item.name}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>




                                {/* </div> */}



                                <Typography component="legend">Ratings Above</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />

                            </div>

                            <div className='input_resp'>
                                <form className=' d-flex' onSubmit={searchSubmitHandler}>
                                    <input className='form-control mb-2 input_mobile' type="text" style={{ "width": "400px" }}
                                        placeholder='Search a Product...'
                                        value={word}
                                        onChange={(e) => setword(e.target.value)}
                                    />

                                </form>

                            </div>


                            <div className='col-md-10'>
                                <div className="products  all_products " style={{ "backgroundColor": "white", "paddingBottom": "50px" }} >
                                    {



                                        products?.map((product) => (

                                            <ProductCard key={product._id} product={product} />


                                        ))

                                    }


                                </div>

                            </div>
                            <div className="paginationBox ">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}

                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"

                                />

                            </div>


                        </div>

                    </div>











                </>
            )};

        </>
    );



};

export default Products
























