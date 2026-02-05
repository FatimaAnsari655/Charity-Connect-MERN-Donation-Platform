import express from "express";
import Donation from "../models/Donation.js";
import User from "../models/User.js";

const router = express.Router();

// 📌 Get all donations
router.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donations" });
  }
});

// 📌 Get donation by id
router.get("/donations/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Not found" });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donation" });
  }
});

// 📌 Update donation (general fields)
router.put("/donations/:id", async (req, res) => {
  try {
    const allowed = ["donor","category","amount","message","area","status","assignedVolunteer","date"]; 
    const update = {};
    for (const k of allowed) if (k in req.body) update[k] = req.body[k];
    const donation = await Donation.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!donation) return res.status(404).json({ message: "Not found" });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: "Failed to update donation" });
  }
});

// 📌 Delete donation
router.delete("/donations/:id", async (req, res) => {
  try {
    const deleted = await Donation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete donation" });
  }
});

// 📌 Get all donors (unique donor names)
router.get("/donors", async (req, res) => {
  try {
    const donors = await Donation.distinct("donor");
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donors" });
  }
});

// 📌 Get all volunteers (later when you create Volunteer model)
router.get("/volunteers", async (req, res) => {
  try {
    const volunteers = await User.find({ role: "volunteer" }).select("_id name email");
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch volunteers" });
  }
});

// 📌 Get all donation areas
router.get("/areas", async (req, res) => {
  try {
    const areas = await Donation.distinct("area");
    res.json(areas);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch areas" });
  }
});

export default router;

// Stats endpoint for admin dashboard
router.get("/stats", async (req, res) => {
  try {
    const [
      totalDonations,
      totalDonors,
      totalVolunteers,
      newDonationReq,
      totalAcceptedDonation,
      totalDonationDelivered,
      totalDonationArea,
    ] = await Promise.all([
      Donation.countDocuments({}),
      Donation.distinct("donor").then((arr) => arr.length),
      User.countDocuments({ role: "volunteer" }).catch(() => 0),
      Donation.countDocuments({ status: "pending" }),
      Donation.countDocuments({ status: "accepted" }),
      Donation.countDocuments({ status: "delivered" }),
      Donation.distinct("area").then((arr) => arr.filter(Boolean).length),
    ]);

    res.json({
      totalDonations,
      totalDonors,
      totalVolunteers,
      newDonationReq,
      totalAcceptedDonation,
      totalDonationDelivered,
      totalDonationArea,
    });
  } catch (err) {
    console.error("/api/admin/stats error", err);
    res.status(500).json({ message: "Failed to load stats" });
  }
});

// Update donation status: accept, reject, deliver
router.patch("/donations/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // pending|accepted|rejected|delivered
  if (!status) return res.status(400).json({ message: "status required" });
  try {
    const updated = await Donation.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

// Assign a volunteer for delivery/collection
router.patch("/donations/:id/assign", async (req, res) => {
  const { id } = req.params;
  const { volunteer } = req.body; // volunteer name or id
  if (!volunteer) return res.status(400).json({ message: "volunteer required" });
  try {
    const updated = await Donation.findByIdAndUpdate(
      id,
      { assignedVolunteer: volunteer },
      { new: true }
    );
    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: "Failed to assign volunteer" });
  }
});