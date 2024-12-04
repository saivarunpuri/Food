import React from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add">
          <div className="sidebar-option">
            <img src={assets.add_icon} alt="" /> <p>Add Items</p>
          </div>
        </NavLink>
        <div className="sidebar-option">
          <NavLink to="/list">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
          </NavLink>
        </div>
        <NavLink to="/orders">
          <div className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
