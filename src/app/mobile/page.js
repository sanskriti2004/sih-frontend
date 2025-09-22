// app/mobile/page.js
"use client";

import { useEffect, useState } from "react";

export default function MobilePage() {
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Read factory_medicine_id from localStorage
  const [factoryMedicineId, setFactoryMedicineId] = useState("");

  useEffect(() => {
    const f = localStorage.getItem("factoryName") || "";
    const m = localStorage.getItem("medicineName") || "";
    if (f && m) {
      setFactoryMedicineId(`${f}_${m}`);
    }
  }, []);

  // Fetch raw data
  const fetchData = async () => {
    if (!factoryMedicineId) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://photontroppers.onrender.com/getdata/${factoryMedicineId}`
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`${res.status} ${text}`);
      }
      const json = await res.json();
      setRawData(json);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (factoryMedicineId) {
      fetchData();
    }
  }, [factoryMedicineId]);

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Left big letter */}
      <div className="w-1/2 bg-green-700 flex items-center justify-center">
        <span className="text-white text-[20vw] font-bold">A</span>
      </div>

      {/* Right raw data */}
      <div className="w-2/3 bg-white p-4 overflow-hidden">
        <h1 className="text-xl font-semibold mb-4">
          Raw Data for {factoryMedicineId || "Not set"}
        </h1>
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {rawData ? (
          <pre className="bg-gray-100 p-3 rounded h-[80vh] overflow-auto text-sm">
            {JSON.stringify(rawData, null, 2)}
          </pre>
        ) : (
          !loading && <p className="text-gray-500">No data fetched yet.</p>
        )}
      </div>
    </div>
  );
}
