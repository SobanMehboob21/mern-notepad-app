import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Blog = () => {
  const [isData, setIsData] = useState({
    title: "",
    content: "",
  });
 const navigate = useNavigate();
  const handleChange = (e) => {
    setIsData({
      ...isData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/Blog/api/myblog",
        isData,
        { withCredentials: true }
      );
       navigate("/BlogPage"); 
      const data = res.data; 
      console.log(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <>
      <section className="blog">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            value={isData.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter content"
            name="content"
            value={isData.content}
            onChange={handleChange}
          />
          <button type="submit">Create</button>
        </form>
      </section>
    </>
  );
};
