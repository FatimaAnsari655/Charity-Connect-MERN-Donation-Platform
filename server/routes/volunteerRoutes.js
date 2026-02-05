import express from "express";
import Donation from "../models/Donation.js";

const router = express.Router();

function getVolunteer(req) {
  return (req.query.volunteer || req.header("x-volunteer") || "").trim();
}

// Stats for volunteer dashboard (based on donation status)
router.get("/stats", async (req, res) => {
  const volunteer = getVolunteer(req);
  // For now we don't filter by volunteer because we don't have assignment
  // fields. In the future, filter by assigned volunteer id.
  try {
    const [pending, accepted, delivered] = await Promise.all([
      Donation.countDocuments({ status: "pending" }),
      Donation.countDocuments({ status: "accepted" }),
      Donation.countDocuments({ status: "delivered" }),
    ]);
    res.json({
      newRequests: pending,
      totalReceived: accepted + delivered,
      totalNotReceived: pending,
      totalDelivered: delivered,
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to load volunteer stats" });
  }
});

// List donations by status for volunteers' workflow
router.get("/collections", async (req, res) => {
  const { status } = req.query; // pending|accepted|delivered
  const filter = {};
  if (status) filter.status = status;
  try {
    const items = await Donation.find(filter).sort({ date: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Failed to load collections" });
  }
});

export default router;



