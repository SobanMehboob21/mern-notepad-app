import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isForm, setIsForm] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [isMessage, setIsMessage] = useState("");

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
        "http://localhost:5000/user/api/Login",
        isForm
      );
      const data = res.data;

      setIsError(false);
      setIsMessage(data.message || "Login successful!");
    } catch (error) {
      setIsError(true);
      setIsMessage(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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

export default Login;
