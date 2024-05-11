import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/v1/login", {
        email,
        password,
      });

      // Store the token in cookies
      document.cookie = `token=${response.data.token}; path=/`;

      // Redirect to profile page
      window.location.href = "/profile";
    } catch (error) {
      console.error("error logging in:", error);
    }
  };

  const mobileStyles = {
    marginBottom: "20px",
  };

  return (
    <div className="login-container">
      <form className="form-container">
        <h2>Login</h2>
        <div className="input-box">
          <input
            className="form-input"
            type="email"
            placeholder="User E-Mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <FaEnvelope className="icon" />
        </div>
        <div
          className="input-box"
          style={window.innerWidth < 768 ? mobileStyles : null}
        >
          <input
            className="form-input"
            type="password"
            placeholder="User Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <span className="checkbox-span">
            <input type="checkbox" className="checkbox-remember" />
            Remember me
          </span>
          <Link>Forgot Password?</Link>
        </div>
        <div className="btn-box">
          <button className="form-submit" type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div className="link-btn">
          <Link to="/signup">Do not have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
