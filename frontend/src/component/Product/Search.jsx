import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import MetaData from '../layout/MetaData';
// import { useHistory } from 'react-router-dom'

import "./Search.css";

const Search = () => {
    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();




    const searchSubmitHandler = (e) => {
        e.preventDefault();//means loading will not happen which happen on submitting a form
        if (keyword.trim()) {  // .trim means you  have to enter something in input 
            navigate(`/products/${keyword}`); // we can access keyword data from params , and from Product.jsx page

        } else {
            navigate("/products");


        }

    }







    return (
        <>
            <MetaData title="Search A product -- Ecommerce" />
            <div className='searchBox'>
                <form className=' d-flex' onSubmit={searchSubmitHandler}>
                    <input className='form-control' type="text"
                        placeholder='Search a Product...'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    {/* <input  type="submit" value="Search" /> */}
                    <button className="btn btn-outline-success" type="submit" value="Search">Search</button>

                </form>
            </div>

        </>
    )
}

export default Search  