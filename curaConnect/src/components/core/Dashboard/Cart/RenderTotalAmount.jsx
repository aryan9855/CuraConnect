import React from 'react'
import { useSelector } from 'react-redux'


function RenderTotalAmount() {
  const {total,cart} = useSelector((state)=> state.cart)
  const handleBuyHealthProgram =()=>{
    const healthPrograms = cart.map((healthProgram)=> healthProgram._id)
    console.log("Bought these health Programs: ",healthPrograms)
  }
  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>
      <IconBtn
      text="Buy Now"
      onClick={handleBuyHealthProgram}
      customClasses={"w-full justify-center"}
      
      />
    </div>
  )
}

export default RenderTotalAmount
