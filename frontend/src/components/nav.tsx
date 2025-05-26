import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-slate-600 text-white px-6 py-4 flex justify-between items-center mb-10">
      <div className="text-xl font-bold tracking-wide">
        PUMP
      </div>
      <div>
        <button
          type="button"
          className="bg-slate-700 font-semibold px-4 py-2 rounded hover:bg-slate-800 transition"
        >
          Login
        </button>
      </div>
    </nav>
  );
}
