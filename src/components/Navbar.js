"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Analysis", href: "/analysis" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Mobile", href: "/mobile" },
  ];

  return (
    <div className="relative z-50">
      {/* Hamburger Button – always visible on mobile (portrait & landscape) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 w-12 h-12 bg-green-700 rounded-full flex items-center justify-center shadow-lg"
        aria-label="Toggle Menu"
      >
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Dropdown Menu – always visible on mobile when toggled */}
      <div
        className={`fixed top-20 right-4 bg-green-700 text-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col py-2 px-4 space-y-2">
          {navItems.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="hover:text-green-200 transition duration-300"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
