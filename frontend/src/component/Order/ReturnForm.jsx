import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MetaData from '../layout/MetaData';
import "./returnForm.css"
import { useDispatch, useSelector } from 'react-redux';
import { returnproduct } from '../../actions/returnaction';
import { useParams } from 'react-router-dom';



const ReturnForm = () => {
    const params = useParams();
    const { id } = params;

    const [productId, setProductId] = useState('');
    const [reason, setReason] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.productDetails)
    const { loading, returndata, error } = useSelector((state) => state.returnproduct)

    // const loginSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Login Form Submitted")
    //     dispatch(login(loginEmail, loginPassword))
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('working')
        console.log({ productId, reason, returnDate })
        dispatch(returnproduct(productId, reason, returnDate))



    };
    useEffect(() => {
        if (error) {
            alert.error(error)
        }
        if (returndata) {
            alert.success("product return successfully");
        }

    }, [error, returndata, dispatch])


    return (
        <>
            <MetaData title={"RETURN"} />
            <h1>Hello</h1>


            <form onSubmit={handleSubmit} className="mt-5 ms-5 return_form" style={{ "width": "500px", "maxWidth": "100%" }}>
                <div className='row mb-3'>
                    <label className=''>
                        Product ID:
                        <div className=''>
                            <input
                                className='form-control'
                                type="text"
                                value={productId}
                                onChange={(event) => setProductId(event.target.value)}
                            />
                        </div>
                    </label>
                </div>
                <div className='row  mb-3'>
                    <label className=''>
                        Reason for return:
                        <div className=''>
                            <input
                                className='form-control'
                                type="text"
                                value={reason}
                                onChange={(event) => setReason(event.target.value)}
                            />
                        </div>
                    </label>
                </div>
                <div className='row mb-3'>
                    <label className=''>
                        Return date:
                        <div className=''>
                            <input
                                className='form-control'
                                type="date"
                                value={returnDate}
                                onChange={(event) => setReturnDate(event.target.value)}
                            />
                        </div>
                    </label>
                </div>
                <button type="submit" className='btn btn-secondary'>Submit</button>
            </form>

        </>
    );
}

export default ReturnForm
