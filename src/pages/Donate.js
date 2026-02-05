import React, { useState } from "react";
import "../styles/Donate.css";

const Donate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    donationType: "",
    amount: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data object
    const donationData = {
      donor: formData.name,
      category: formData.donationType,
      message: formData.message,
    };

    // Add amount only if donation type is money
    if (formData.donationType === "money") {
      donationData.amount = Number(formData.amount);
    }

    try {
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      if (!res.ok) throw new Error("Failed to submit donation");

      alert("Thank you for your donation!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        donationType: "",
        amount: "",
        message: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="donate-container">
      <h2>Make a Donation</h2>
      <form onSubmit={handleSubmit} className="donate-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          name="donationType"
          value={formData.donationType}
          onChange={handleChange}
          required
        >
          <option value="">Select Donation Type</option>
          <option value="clothes">Clothes</option>
          <option value="food">Food</option>
          <option value="books">Books</option>
          <option value="money">Money</option>
          <option value="toys">Toys</option>
          <option value="others">Others</option>
        </select>

        {formData.donationType === "money" && (
          <input
            type="number"
            name="amount"
            placeholder="Amount (in USD)"
            value={formData.amount}
            onChange={handleChange}
            min="1"
            required
          />
        )}

        <textarea
          name="message"
          placeholder="Additional Information (optional)"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">Donate Now</button>
      </form>
    </div>
  );
};

export default Donate;
