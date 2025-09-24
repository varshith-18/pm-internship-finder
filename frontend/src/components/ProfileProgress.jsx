import React from "react";

function ProfileProgress({ progress }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Ring Progress */}
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 40 40">
          {/* Background Circle */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-gray-200"
          />
          {/* Progress Circle */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-indigo-600 transition-all duration-300 ease-in-out"
            strokeLinecap="round"
          />
        </svg>
        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-indigo-700">
            {progress}%
          </span>
        </div>
      </div>
      
      {/* Profile Label (hidden on mobile) */}
      <span className="hidden md:block text-xs text-indigo-600 mt-1 font-medium">
        Profile
      </span>
    </div>
  );
}

export default ProfileProgress;
