import React from 'react'
import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component";

import "./ProductCard.css"



const ProductCard = ({ product }) => {



    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        size: window.innerWidth < 600 ? 20 : 20,
        isHalf: true,
    }


    return (

        <Link className="card card_res ms-3 me-3 mt-2 p-0 text-decoration-none" style={{ "width": "17rem" }} to={`/product/${product._id}`}>
            <div className='image_cardbody'>
                <img src={product.images[0]?.url} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <p className='  fs-5 product_name' style={{ "marginBottom": "0px" }}>{product.name}</p>
                    <ReactStars  {...options} />
                    <p className='card-text'>({product.numofReviews}Reviews)</p>
                    <span className=' fs-3 text-dark'>{`₹${product.price}`}</span>
                </div>
            </div>
        </Link>


    )

}

export default ProductCard
