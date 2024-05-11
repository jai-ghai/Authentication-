import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/register",
        {
          firstname,
          lastname,
          email,
          password,
        }
      );

      // Store the token in cookies
      document.cookie = `token=${response.data.token}; path=/`;

      // Redirect to profile page
      window.location.href = "/profile";
    } catch (error) {
      console.error("Registration failed", error.response.data);
    }
  };

  return (
    <div className="signup-container">
      <form className="form-container">
        <h2>Signup</h2>
        <div className="name-input">
          <div className="input-box">
            <input
              className="form-input"
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              style={{ marginRight: "5px" }}
              required
            />
            <FaUser className="icon" />{" "}
          </div>
          <div className="input-box">
            <input
              className="form-input"
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />{" "}
          </div>
        </div>
        <div className="input-box">
          <input
            className="form-input"
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <FaEnvelope className="icon" />{" "}
        </div>
        <div className="input-box">
          <input
            className="form-input"
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <FaLock className="icon" />{" "}
        </div>
        <div className="btn-box">
          <button className="form-submit" type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
        <div className="link-btn">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
