import React, { useState } from 'react';
import "./Shipping.css"
import { useSelector, useDispatch } from "react-redux"
import { saveShippingInfo } from '../../actions/cartAction';
import MetaData from '../layout/MetaData';
import { Country, State } from "country-state-city"
import { useAlert } from 'react-alert';
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';






const Shipping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {

        e.preventDefault();
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digit");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo }) // we have to pass data in these and this accepted in cartAction.js 

        );
        navigate("/order/confirm");
    };

    return (
        <>
            <MetaData title="Shipping Details" />
            <CheckoutSteps activeStep={0} />
            <div className="shippingContainer  ">
                <div className="row gy-3">
                    <div className="shippingBox col-md-4 mx-auto">
                        <h2 className='shippingHeading mt-5 '>Shipping Details</h2>

                        <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>
                            <div className='d-flex align-items-center my-2'>

                                <i class="fa-solid fa-house"></i>
                                <input type="text"
                                    className='form-control'
                                    placeholder='Address'
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className='d-flex align-items-center  my-2'>
                                <i class="fa-sharp fa-solid fa-building"></i>
                                <input type="text "
                                    className='form-control'
                                    placeholder='City'
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className='d-flex align-items-center  my-2'>
                                <i class="fa-solid fa-location-pin"></i>
                                <input type="number"
                                    className='form-control'
                                    placeholder='Pin Code'
                                    required
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                />
                            </div>
                            <div className='d-flex align-items-center  my-2'>
                                <i class="fa-solid fa-phone"></i>
                                <input type="number"
                                    className='form-control'
                                    placeholder='Phone Number'
                                    required
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                />
                            </div>
                            <div className='d-flex align-items-center  my-2'>
                                <i class="fa-solid fa-globe"></i>
                                <select
                                    className='form-control'
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}

                                >
                                    <option value="">Country</option>

                                    {Country &&
                                        Country.getAllCountries().map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {country && (

                                <div className='d-flex align-items-center  my-2'>
                                    <i class="fa-solid fa-industry"></i>
                                    <select
                                        className='form-control'
                                        required
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    >

                                        <option value="">State</option>
                                        {State &&
                                            State.getStatesOfCountry(country).map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            ))
                                        }
                                    </select>


                                </div>

                            )}
                            <input type="submit"

                                value="Continue"
                                className='shippingBtn btn btn-primary w-100'
                                disabled={state ? false : true}
                            />




                        </form>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Shipping







