import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the Home Page</h2>
      <div className="buttons-container">
        <button>
          <Link to="/signup" className="button">
            Sign Up
          </Link>
        </button>

        <button>
          {" "}
          <Link to="/login" className="button">
            Login
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
