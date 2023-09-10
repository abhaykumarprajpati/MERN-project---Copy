import React, { useEffect, useState } from 'react';
import "./ProductDetails.css"

import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';

import ReviewCard from './ReviewCard';
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core"
import { Rating } from "@material-ui/lab"
import { NEW_REVIEW_RESET } from '../../constants/productConstants';







const ProductDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const params = useParams();
    const { id } = params;
    const { product, loading, error } = useSelector(state => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    console.log(product)

    const options = {
        size: "large",
        value: product?.ratings,
        readOnly: true,
        precision: 0.5,
    }

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("");




    const increaseQuantity = () => {
        if (product.Stock <= quantity) {
            return;
        }
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        if (1 >= quantity) {
            return;
        }
        const qty = quantity - 1;
        setQuantity(qty);

    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity))
        alert.success("Items Added to cart")

    }


    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);// basicallly for swap
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false)
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);

            dispatch(clearErrors());

        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET })

        }

        dispatch(getProductDetails(id))
        // in backend like for access id req.params.id , In frontend it is match.params.id

    }, [dispatch, id, error, alert, reviewError, success])





    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={`${product?.name} -- ECOMMERCE`} />
                    <div className='ProductDetails'>


                        <div className="row mt-5">
                            <div className="col-lg-7 col-12 p-1">
                                {
                                    product.images &&
                                    product.images.map((item, i) => (
                                        <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" key={i}>
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img className="d-block w-100" src={item.url}
                                                        alt={`${i} Slide`} />
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block w-100" src={item.url}
                                                        alt={`${i} Slide`} />
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block w-100" src={item.url}
                                                        alt={`${i} Slide`} />
                                                </div>
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        /* <img
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        /> */
                                    ))
                                }

                            </div>

                            <div className='col-lg-5 p-5'>
                                <div className='detailsBlock-1'>
                                    <h2>{product.name}</h2>
                                    <p>Product # {product._id}</p>
                                </div>
                                <div className='detailsBlock-2'>
                                    <Rating {...options} />
                                    <span>({product.numOfReviews} Reviews)</span>
                                </div>
                                <div className="detailsBlock-3">
                                    <h1>{`₹ ${product.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1">
                                            <button onClick={decreaseQuantity}>-</button><br />
                                            <input readOnly value={quantity} type="number" /><br />
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>
                                        <button disabled={product.Stock < 1 ? true : false} className='btn  add_to_cart_button' onClick={addToCartHandler}>Add to Cart</button>
                                    </div>
                                    <p>
                                        Status:
                                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                            {product.Stock < 1 ? "OutofStock" : "Instock"}
                                        </b>
                                    </p>
                                </div>
                                <div className="detailsBlock-4">
                                    Description : <p>{product.description}</p>
                                </div>
                                <button onClick={submitReviewToggle} className="submitReview btn submit_review_btn">Submit Review</button>

                            </div>
                        </div>

                    </div>
                    <h3 className='reviewsHeading'>Reviews</h3>
                    <Dialog
                        aria-labelledby='simple-dialog-title'
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating onChange={(e) => setRating(e.target.value)}
                                value={rating} size="large"
                            />
                            <textarea
                                className='submitDialogTextArea'
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <DialogActions>

                                <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                                <Button onClick={reviewSubmitHandler} color='primary '>Submit</Button>
                            </DialogActions>


                        </DialogContent>

                    </Dialog>

                    {
                        product?.reviews && product?.reviews[0] ? (
                            <div className="reviews d-flex flex-wrap">
                                {
                                    product?.reviews &&
                                    product.reviews.map((review, i) => < ReviewCard review={review} key={i} />)
                                }
                            </div>
                        ) : (
                            <p className='noReviews'>No reviews yet</p>
                        )
                    }
                </>)}
        </>
    )
}

export default ProductDetails