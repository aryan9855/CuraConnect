import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from 'react-icons/gi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {removeFromCart} from '../../../../slices/cartSlice'
import  ReactStars from 'react-rating-stars-component'

function RenderCartHealthProgram() {
    const {cart} = useSelector((state)=> state.cart)
    const dispatch = useDispatch()
  return (
    <div>
      {
        cart.map((healthProgram , index)=>(
            <div>
                <img src={healthProgram?.thumbnail}  />
                <div>
                    <p>
                        {healthProgram?.healthProgramName}
                    </p>
                    <p>
                        {healthProgram?.categoty?.name}
                    </p>
                    <div>
                        <span>4.8</span>
                        <ReactStars
                        count={5}
                        size={20}
                        edit={false}
                        emptyIcon={<GiNinjaStar/>}
                        fullIcon={<GiNinjaStar/>}
                        />

                        <span>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                </div>

                <div>
                    <button onClick={()=> dispatch(removeFromCart(healthProgram._id))}><RiDeleteBin6Line/>
                    <span>Remove</span></button>
                    <p>Rs {healthProgram?.price}</p>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default RenderCartHealthProgram
