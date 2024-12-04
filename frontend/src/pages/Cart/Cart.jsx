import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount,url } = useContext(StoreContext);

  const navigate=useNavigate()

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]} </p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                  <p>x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="card-boottom">
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
          <button onClick={()=>navigate("/order")} >PROCEED TO CHECKOUT </button>
        </div>
        <div className="card-promocode">
        <div>
          <p>
            If You Have Promo COde ENter It here
          </p>
          <div className="card-promocode-input">
            <input type="text" placeholder="Promo code" />
            <button>SUBMIT</button>
          </div>
        </div>
      </div>
      </div>
     
    </div>
  );
};

export default Cart;
