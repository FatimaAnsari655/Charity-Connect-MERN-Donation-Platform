import React, { useState } from 'react';
import '../styles/DonationForm.css';

function DonationForm() {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}, for donating ₹${formData.amount}!`);
    setFormData({ name: '', amount: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount (₹)"
        required
        value={formData.amount}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Message (optional)"
        value={formData.message}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Donate</button>
    </form>
  );
}

export default DonationForm;
