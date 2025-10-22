import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isForm, setIsForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [isMessage, setIsMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setIsForm({
      ...isForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/user/api/signup",
        isForm
      );
      const data = res.data;

      setIsError(false);
      setIsMessage(data.message || "Signup successful!");
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    } catch (error) {
      setIsError(true);
      setIsMessage(error.response?.data?.message || "Signup failed");
    }
  };
  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter your username"
          name="username"
          value={isForm.username}
          onChange={handleChange}
        />
        <input
          placeholder="Enter your email"
          name="email"
          value={isForm.email}
          onChange={handleChange}
        />
        <input
          placeholder="Enter your password"
          name="password"
          type="password"
          value={isForm.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>

        {isMessage && (
          <p style={{ color: isError ? "red" : "green" }}>{isMessage}</p>
        )}
      </form>
    </>
  );
};

export default Signup;
