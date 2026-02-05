import React, { useEffect, useState } from "react";

export default function Areas() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetch("/api/admin/areas")
      .then((res) => res.json())
      .then(setAreas)
      .catch((err) => console.error("Error fetching areas:", err));
  }, []);

  return (
    <div>
      <h2>Donation Areas</h2>
      <ul>
        {areas.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}