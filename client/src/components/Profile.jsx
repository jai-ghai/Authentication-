import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/v1/logout", {});
      // Delete the token cookie
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect to profile page
      window.location.href = "/";
    } catch (error) {
      console.error("error logging in:", error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if token exists in cookies
        const token = getCookie("token");

        if (!token) {
          // Redirect the user to the login page if token doesn't exist
          window.location.href = "/login";
          return;
        }

        // Token exists, proceed to load user details
        const response = await axios.get("http://localhost:4000/api/v1/load", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    loadUser();
  }, []);

  // Function to get a cookie by name
  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user ? (
        <div className="user-details">
          <p>
            <strong>First Name:</strong> {user.firstname}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <div className="btn-box">
            <button
              className="form-submit"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Profile;
