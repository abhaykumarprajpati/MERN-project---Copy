import React from 'react'
import "./contact.css"

const Contact = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div className="contact-form">
            <h2>Contact Us</h2>
            <form action="#" method="post" className='contact_form'>
              <div className="mb-3">
                <label for="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" required />
              </div>
              <div className="mb-3">
                <label for="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" required />
              </div>
              <div className="mb-3">
                <label for="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center mx-auto">
          <div className="social-media">
            <h2>Connect with Us</h2>
            <ul>
              <li><a href="#"><i className="fab fa-facebook"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
              <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
              <li><a href="#"><i className="fab fa-youtube"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>




  )
}

export default Contact
