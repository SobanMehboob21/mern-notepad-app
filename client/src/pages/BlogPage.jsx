import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/Blog/api/allblogs", {
          withCredentials: true,
        });
        setBlogs(res.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="Blog-page">
      <h1>All Blogs</h1>
      <Link to="/Blog">Create Blog</Link>

      <div className="blogs-container">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              {blog.author && <small>By {blog.author.username}</small>}
            </div>
          ))
        ) : (
          <p>No blogs found</p>
        )}
      </div>
    </section>
  );
};
