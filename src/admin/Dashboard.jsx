import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch((e) => console.error("Stats error:", e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading…</div>;
  if (!stats) return <div>Could not load stats.</div>;

  const cards = [
    { title: "Total Donations", value: stats.totalDonations, link: "/admin/donations" },
    { title: "Total Donors", value: stats.totalDonors, link: "/admin/donors" },
    { title: "Total Volunteers", value: stats.totalVolunteers, link: "/admin/volunteers" },
    { title: "New Donation Requests", value: stats.newDonationReq, link: "/admin/manage-donations?status=pending" },
    { title: "Accepted Donations", value: stats.totalAcceptedDonation, link: "/admin/manage-donations?status=accepted" },
    { title: "Delivered Donations", value: stats.totalDonationDelivered, link: "/admin/manage-donations?status=delivered" },
    { title: "Donation Areas", value: stats.totalDonationArea, link: "/admin/areas" },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">📊 Admin Dashboard</h1>
      <div className="card-grid">
        {cards.map((c) => (
          <div className="card" key={c.title}>
            <div className="card-header">{c.title}</div>
            <div className="card-value">{c.value}</div>
            <Link className="card-link" to={c.link}>
              View Details →
            </Link>
          </div>
        ))}
      </div>

      {/* ✅ Inline CSS */}
      <style>{`
        .dashboard {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .dashboard-title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #2c3e50;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .card {
          background: #ffffff;
          padding: 18px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .card-header {
          font-size: 18px;
          font-weight: 600;
          color: #34495e;
          margin-bottom: 10px;
        }

        .card-value {
          font-size: 24px;
          font-weight: bold;
          color: #16a085;
          margin-bottom: 12px;
        }

        .card-link {
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: #2980b9;
          transition: color 0.2s;
        }

        .card-link:hover {
          color: #1abc9c;
        }
      `}</style>
    </div>
  );
}