import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "../styles/VolunteerLogin.css"; // Using the same CSS as DonorLogin

function VolunteerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      alert(`Volunteer Login Successful!\nEmail: ${email}`);
      localStorage.setItem("volunteerName", email);
      navigate("/volunteer-dashboard"); // Redirect after login
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Volunteer Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter Volunteer Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter Volunteer Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default VolunteerLogin;
