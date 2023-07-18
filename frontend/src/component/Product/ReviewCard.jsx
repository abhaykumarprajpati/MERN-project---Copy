import React from 'react'
import { Rating } from "@material-ui/lab"
// import ReactStars from 'react-rating-stars-component'
import profilePng from "../../images/Prof.png";




const ReviewCard = ({ review }) => {


  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  }

  return (
    <div className="card reviewCard m-2" style={{ "width": "18rem" }}>
      <img src={profilePng} className="card-img-top" alt="User" style={{ "width": "80px" }} />
      <div className="card-body text-center p-0">

        <p className="card-text fw-bold fs-">{review.name}</p>
        <Rating   {...options} />
        <p>{review.comment}</p>
      </div>
    </div>

  )
}

export default ReviewCard