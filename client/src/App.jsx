import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <>
      <h1>working</h1>
      <Link to="/Signup">Signup</Link>
      <Link to="/Login">Login</Link>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
