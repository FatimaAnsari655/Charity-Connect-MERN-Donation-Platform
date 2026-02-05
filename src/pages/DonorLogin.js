import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DonorLogin.css";

const DonorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Popup showing the entered details
    alert(`Donor Login Successful!\nEmail: ${email}\nPassword: ${password}`);

    // Store donor identity and role
    localStorage.setItem("donorName", email);

    // ✅ Navigate after alert closes
    navigate("/donor-dashboard"); // Change this path to your actual dashboard route
  };

  const handleCreateAccount = () => {
    navigate("/donor-signup");
  };

  return (
    <div className="login-container">
      <h2>Donor Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Donor Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Donor Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="button-group">
          <button type="submit" className="login-btn">Login</button>
          <button
            type="button"
            className="create-account-btn"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonorLogin;
