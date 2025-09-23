import React from "react";

function ProfileProgress({ progress }) {
  const radius = 18; // slightly smaller to fit within SVG
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-12 h-12">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={normalizedRadius}
          stroke="white"
          strokeWidth={stroke}
          fill="none"
          className="opacity-30"
        />
        <circle
          cx="24"
          cy="24"
          r={normalizedRadius}
          stroke="lime"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
        {progress}%
      </div>
    </div>
  );
}

export default ProfileProgress;
