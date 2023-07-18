import React from 'react';
import "./CartItemCard.css"


const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className='CartItemCard d-flex '>
      <img src={item.image} alt="image" />
      <div className='d-flex flex-column'>
        {/* <Link to={`/product/${item.product}`} >{item.name}</Link> */}
        <a href={`/product/${item.product}`} className="text-decoration-none ">{item.name}</a>
        <span>{`Price:Rs. ${item.price}`}</span>
        
        <p className='text-danger' onClick={() => deleteCartItems(item.product)}>Remove</p> 
      </div>

    </div>
  )
}

export default CartItemCard
