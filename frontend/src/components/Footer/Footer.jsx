import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <img src={assets.logo}/>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nemo ipsum dolore porro veniam vel illum, veritatis consequatur aspernatur beatae possimus nisi id architecto dolorem enim maxime? Dolorem, et itaque.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
                
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li> Delivery</li>
                    <li>Privacy Plicy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get IN Touch</h2>
                <ul>
                    <li>+12345678</li>
                    <li>contact@example.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='copyright'> Copyright 2024 @ Reserved </p>
      
    </div>
  )
}

export default Footer
