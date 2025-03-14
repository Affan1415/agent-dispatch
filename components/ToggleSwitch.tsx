"use client"
import React, { useState } from "react";

const ToggleSwitch: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex items-center space-x-2">
      <span>{enabled ? "Connected" : "Disconnected"}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-10 h-5 flex items-center bg-gray-600 rounded-full p-1 transition duration-300 ${
          enabled ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transform transition duration-300 ${enabled ? "translate-x-5" : "translate-x-0"}`}
        ></div>
      </button>
    </div>
  );
};

export default ToggleSwitch;
