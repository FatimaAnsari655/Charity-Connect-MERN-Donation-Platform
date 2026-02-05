import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donor: {
    type: String, // Donor name
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["clothes", "food", "books", "money", "toys", "others"], // Optional: restrict to allowed categories
  },
  amount: {
    type: Number,
    min: 1,
    required: function () {
      return this.category === "money"; // Only required if donation type is money
    },
  },
  message: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // in models/Donation.js fields:
status: { type: String, enum: ["pending","accepted","rejected","delivered"], default: "pending" },
area: { type: String, trim: true }, // optional
assignedVolunteer: { type: String, trim: true },

});

export default mongoose.model("Donation", donationSchema);

