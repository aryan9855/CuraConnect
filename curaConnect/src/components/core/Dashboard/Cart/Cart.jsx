import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartHealthProgram from './RenderCartHealthProgram'
import RenderTotalAmount from './RenderTotalAmount'

function Cart() {
  const {total , totalItems} = useSelector((state)=>state.auth)

  return (
    <div className='text-white'>
      <h1>Your Cart</h1>
      <p>{totalItems} Health Programs in Cart</p>

      {total>0
      ?(
        <div>
          <RenderCartHealthProgram/>
          <RenderTotalAmount/>
        </div>
      ):(
        <div><p>Your Cart is Empty</p></div>
      )
    }
    </div>
  )
}

export default Cart
