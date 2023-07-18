import React from 'react'
import MetaData from '../layout/MetaData'

const About = () => {
    return (
        <>
            <MetaData title="ABOUT-US" />
            <main className="container my-5">
                <h1 className="text-center mb-4">About Us</h1>
                <div className="row">
                    <div className="col-md-6">
                        <img src="https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg" className="img-fluid" alt="About Us Image" />
                    </div>
                    <div className="col-md-6">
                        <h2>Our Story</h2>
                        <p>At Your Ecommerce Website, we believe that shopping should be easy and convenient. That's why we started our online store, where you can browse and purchase products from the comfort of your own home.</p>
                        <p>Our team is dedicated to providing you with the best possible shopping experience. From our user-friendly website to our fast and reliable shipping, we strive to make your experience with us as smooth as possible.</p>
                        <p>Thank you for choosing Your Ecommerce Website. We appreciate your business and look forward to serving you!</p>
                        <h2>Our Mission</h2>
                        <p>Our mission is to provide our customers with the best possible online shopping experience. We aim to do this by offering a wide selection of high-quality products at competitive prices, and by providing exceptional customer service.</p>
                        <p>We believe that shopping should be easy and convenient, and that everyone should have access to the products they need. That's why we work hard to ensure that our online store is accessible to everyone, no matter where they are or what their budget is.</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default About
