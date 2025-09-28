"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function MobilePage() {
  const tasteProfiles = [
    {
      letter: "A",
      data: {
        taste_sweet: 75,
        taste_salty: 40,
        taste_bitter: 20,
        taste_sour: 55,
        taste_umami: 85,
        quality: 90,
        dilution: 30,
      },
    },
    {
      letter: "B",
      data: {
        taste_sweet: 60,
        taste_salty: 70,
        taste_bitter: 35,
        taste_sour: 45,
        taste_umami: 65,
        quality: 80,
        dilution: 25,
      },
    },
    {
      letter: "C",
      data: {
        taste_sweet: 50,
        taste_salty: 30,
        taste_bitter: 60,
        taste_sour: 40,
        taste_umami: 55,
        quality: 75,
        dilution: 20,
      },
    },
  ];

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [sensorValues, setSensorValues] = useState({
    mq3_ppm: 0,
    as7263_r: 0,
    as7263_s: 0,
    as7263_t: 0,
    as7263_u: 0,
    as7263_v: 0,
    as7263_w: 0,
  });
  const [loadingSensors, setLoadingSensors] = useState(false);
  const [sensorError, setSensorError] = useState("");

  const hasProfileChangedRef = useRef(false); // prevent multiple profile changes for repeated 0s

  useEffect(() => {
    const fetchSensorValues = async () => {
      try {
        const res = await fetch(
          "https://photontroppers.onrender.com/livesensor"
        );
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const json = await res.json();
        const data = json?.data;

        if (json.status === "success" && data) {
          const {
            mq3_ppm,
            as7263_r,
            as7263_s,
            as7263_t,
            as7263_u,
            as7263_v,
            as7263_w,
          } = data;

          const isAllZero =
            mq3_ppm === 0 &&
            as7263_r === 0 &&
            as7263_s === 0 &&
            as7263_t === 0 &&
            as7263_u === 0 &&
            as7263_v === 0 &&
            as7263_w === 0;

          if (isAllZero) {
            // Show loading
            setLoadingSensors(true);

            // Only change profile ONCE per zero-state
            if (!hasProfileChangedRef.current) {
              const newCycle = cycleCounterRef.current % 3;

              if (newCycle === 0 || newCycle === 1) {
                setCurrentProfileIndex(0); // A
              } else {
                setCurrentProfileIndex(1); // B
              }

              cycleCounterRef.current += 1;
              hasProfileChangedRef.current = true;
            }
          } else {
            // Hide loading
            setLoadingSensors(false);

            // Reset ref so next all-zero can trigger profile change
            hasProfileChangedRef.current = false;

            // Update live sensor values
            setSensorValues({
              mq3_ppm,
              as7263_r,
              as7263_s,
              as7263_t,
              as7263_u,
              as7263_v,
              as7263_w,
            });
          }

          setSensorError("");
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (err) {
        console.error(err);
        setSensorError("Failed to fetch sensor data");
      }
    };

    const intervalId = setInterval(fetchSensorValues, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { letter, data: tasteProfile } = tasteProfiles[currentProfileIndex];

  return (
    <div className="relative h-screen w-screen flex bg-white overflow-hidden">
      {/* Left big letter or loading illustration */}
      <div className="w-1/2 bg-green-700 flex items-center justify-center relative">
        {loadingSensors ? (
          <div className="flex flex-col items-center z-10">
            <Image
              src="/favicon.png"
              alt="Loading"
              width={120} // 96px = w-24 in Tailwind
              height={120} // 96px = h-24
              className="animate-pulse mb-4"
            />
            {/* <p className="text-white text-lg font-semibold select-none">
              Please place the next sample...
            </p> */}
          </div>
        ) : (
          <span className="text-white text-[55vw] font-bold select-none z-10">
            A{" "}
          </span>
        )}

        {loadingSensors && (
          <div className="absolute inset-0 bg-green-700 bg-opacity-20 backdrop-blur-sm"></div>
        )}
      </div>

      {/* Right panel with two columns */}
      <div className="w-1/2 flex flex-col p-4 overflow-hidden relative">
        <h1 className="text-2xl font-bold mb-4 text-green-800 select-none mt-4">
          Details About the Sample
        </h1>

        <div className="flex flex-1 space-x-4 mt-3">
          {loadingSensors && (
            <div className="absolute inset-0  flex items-center justify-center bg-white bg-opacity-60 text-green-700 text-xl font-semibold select-none">
              Please place the next sample...
            </div>
          )}
          {/* Taste Profile */}
          <section className="w-2/5 overflow-hidden">
            <h2 className="text-lg font-semibold mb-3 border-b border-green-300 pb-1 text-green-800">
              Taste Profile
            </h2>

            {Object.entries(tasteProfile).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between select-none mb-2 text-sm text-gray-800"
              >
                <span className="capitalize font-semibold">
                  {key.replace(/_/g, " ")}:
                </span>
                <span className="font-mono text-base">
                  {value}
                  {key === "dilution" ? "%" : ""}
                </span>
              </div>
            ))}
          </section>

          {/* Sensor Values */}
          <section className="w-3/5 overflow-auto">
            <h2 className="text-lg font-semibold mb-3 border-b border-green-300 pb-1 text-green-800 flex justify-between items-center">
              Sensor Values
              {sensorError && (
                <span className="text-xs text-red-600 italic ml-2">
                  {sensorError}
                </span>
              )}
            </h2>

            <div className="text-gray-700 text-base space-y-2 max-h-full">
              {Object.entries(sensorValues).map(([key, value]) => (
                <div key={key} className="flex justify-between select-none">
                  <span className="capitalize font-semibold w-28">
                    {key.replace(/_/g, " ")}:
                  </span>
                  <span className="font-mono">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
