import express from "express";
import Donation from "../models/Donation.js";

const router = express.Router();

// Helper to read donor identity from query or header for now
function getDonor(req) {
  return (req.query.donor || req.header("x-donor") || "").trim();
}

// GET /api/donor/stats?donor=Name
router.get("/stats", async (req, res) => {
  const donor = getDonor(req);
  if (!donor) return res.status(400).json({ message: "donor is required" });
  try {
    const [
      total,
      pending,
      accepted,
      delivered,
    ] = await Promise.all([
      Donation.countDocuments({ donor }),
      Donation.countDocuments({ donor, status: "pending" }),
      Donation.countDocuments({ donor, status: "accepted" }),
      Donation.countDocuments({ donor, status: "delivered" }),
    ]);
    res.json({ total, pending, accepted, delivered });
  } catch (e) {
    res.status(500).json({ message: "Failed to load donor stats" });
  }
});

// GET /api/donor/donations?donor=Name&status=pending|accepted|delivered
router.get("/donations", async (req, res) => {
  const donor = getDonor(req);
  if (!donor) return res.status(400).json({ message: "donor is required" });
  const { status } = req.query;
  const filter = { donor };
  if (status) filter.status = status;
  try {
    const items = await Donation.find(filter).sort({ date: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Failed to load donations" });
  }
});

export default router;



