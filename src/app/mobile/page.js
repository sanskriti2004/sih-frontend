"use client";

import { useEffect, useState } from "react";

export default function MobilePage() {
  // Hardcoded taste profile stays the same
  const tasteProfile = {
    id: "12345",
    user: "TestUser",
    taste_sweet: 75,
    taste_salty: 40,
    taste_bitter: 20,
    taste_sour: 55,
    taste_umami: 85,
    quality: 90,
    dilution: 30, // in %
  };

  const defaultSensorValues = {
    mq3_ppm: 0.368,
    as7263_r: 3.09,
    as7263_s: 1.79,
    as7263_t: 1.63,
    as7263_u: 0.85,
    as7263_v: 0.88,
    as7263_w: 1.12,
  };

  const [sensorValues, setSensorValues] = useState(defaultSensorValues);
  const [loadingSensors, setLoadingSensors] = useState(false);
  const [sensorError, setSensorError] = useState("");

  useEffect(() => {
    const fetchSensorValues = async () => {
      setLoadingSensors(true);
      setSensorError("");
      try {
        const res = await fetch(
          "https://photontroppers.onrender.com/livesensor"
        );
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const json = await res.json();
        if (json.status === "success" && json.data) {
          const {
            mq3_ppm,
            as7263_r,
            as7263_s,
            as7263_t,
            as7263_u,
            as7263_v,
            as7263_w,
          } = json.data;

          setSensorValues({
            mq3_ppm,
            as7263_r,
            as7263_s,
            as7263_t,
            as7263_u,
            as7263_v,
            as7263_w,
          });
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (err) {
        setSensorError("Failed to fetch sensor data");
        console.error(err);
      } finally {
        setLoadingSensors(false);
      }
    };

    fetchSensorValues();
  }, []);

  // Hardcoded letter for now
  const letter = "A";

  return (
    <div className="relative h-screen w-screen flex bg-white overflow-hidden">
      {/* Loading overlay */}
      {loadingSensors && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40 text-green-700 text-6xl font-semibold select-none">
          Loading sensor data...
        </div>
      )}

      {/* Left big letter */}
      <div className="w-1/2 bg-green-700 flex items-center justify-center">
        <span className="text-white text-[55vw] font-bold select-none">
          {letter}
        </span>
      </div>

      {/* Right panel with two columns */}
      <div className="w-1/2 flex flex-col p-4 overflow-hidden">
        <h1 className="text-2xl font-bold mb-4 text-green-800 select-none mt-4">
          Details About the Sample
        </h1>

        <div className="flex flex-1 space-x-4 mt-5">
          {/* Taste Profile */}
          <section className="w-1/2 overflow-hidden">
            <h2 className="text-lg font-semibold mb-3 border-b border-green-300 pb-1 text-green-800">
              Taste Profile
            </h2>

            {Object.entries(tasteProfile)
              .filter(([key]) => !["id", "user"].includes(key))
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between select-none mb-2 text-sm text-gray-800"
                >
                  <span className="capitalize font-semibold">
                    {key.replace(/_/g, " ")}:
                  </span>
                  <span className="font-mono">
                    {value}
                    {key === "dilution" ? "%" : ""}
                  </span>
                </div>
              ))}
          </section>

          {/* Sensor Values */}
          <section className="w-1/2 overflow-auto">
            <h2 className="text-lg font-semibold mb-3 border-b border-green-300 pb-1 text-green-800 flex justify-between items-center">
              Sensor Values
              {sensorError && (
                <span className="text-xs text-red-600 italic ml-2">
                  {sensorError}
                </span>
              )}
            </h2>

            <div className="text-gray-700 text-sm space-y-2 max-h-full">
              {Object.entries(sensorValues).map(([key, value]) => (
                <div key={key} className="flex justify-between select-none">
                  <span className="capitalize font-semibold w-28">
                    {key.replace(/_/g, " ")}:
                  </span>
                  <span className="font-mono text-sm">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
