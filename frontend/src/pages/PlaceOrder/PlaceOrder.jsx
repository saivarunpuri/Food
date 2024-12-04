import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
const PlaceOrder = () => {


const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)

const [data,setData]=useState({
  firstName:"",
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""
})

const placeOrder=async(event)=>{
  event.preventDefault()
  let orderItems=[];
  food_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo=item
      itemInfo["quantity"]=cartItems[item._id]
      orderItems.push(itemInfo)
    }
  })

  console.log(orderItems )
  let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2,

  }
  let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}} )

  if(response.data.sucess){
    
    const {session_url}=response.data;
    console.log(session_url)
    window.location.replace(session_url)
  }
  else{
    console.log(response.data)
    alert("Error")
  }


}

const onChangeHandler=(event)=>{
  const name=event.target.name
  const value=event.target.value
  setData(data=>({...data,[name]:value}))
}

useEffect(()=>{
  console.log(data)
},[data])

  return (
    <form  onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input  required  type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name'/>
          <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
        </div>
        <input required type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email Adress'/>
        <input required type="text"  name='street'onChange={onChangeHandler} value={data.street} placeholder='Street' />

        <div className="multi-fields">
          <input required  type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City'/>
          <input  required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>

        <div className="multi-fields">
          <input   required type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='ZipCOde'/>
          <input required type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='COuntry' />
        </div>

        <input required type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />

      </div>
      <div className="place-order-right">

      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-details">
              <p>Sub Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-details">
              <p>Deliver Fee</p>
              <p>$ {getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-details">
              <b>Total</b> <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit' >PROCEED TO Payment </button>
        </div>

      </div>

      
    </form>
  )
}

export default PlaceOrder
