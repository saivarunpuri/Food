import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "http://localhost:4000";

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.status===200) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      });

      setImage(false);
      toast.success(response.data.message)
    } else {
      console.log("Error In creating")
      toast.error(response.data.message)
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </label>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Naame</p>
          <input
            type="text"
            name="name"
            onChange={onChangeHandler}
            value={data.name}
          />
        </div>
        <div className="add-product-description flex col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            id=""
            placeholder="Write COntent Here"
            required
            onChange={onChangeHandler}
            value={data.description}
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-catogory flex-col">
            <p>Product Category</p>
            <select name="category" onChange={onChangeHandler} id="">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwitch">SandWIch</option>
              <option value="Cake">Cake</option>
              <option value="Veg">Veg</option>
              <option value="Pastha">Pastha</option>
              <option value="Noodels">Noodels</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              onChange={onChangeHandler}
              value={data.price}
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
