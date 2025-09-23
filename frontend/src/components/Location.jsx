import React, { useState } from "react";

function Location({ nextStep, prevStep, setProfile, profile }) {
  const [locations, setLocations] = useState(profile.locations || ["", "", ""]);

  const handleChange = (index, value) => {
    const newLocs = [...locations];
    newLocs[index] = value;
    setLocations(newLocs);
  };

  const handleContinue = () => {
    if (locations.some((l) => !l)) {
      alert("Please fill all location fields");
      return;
    }
    setProfile({ ...profile, locations });
    nextStep();
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Select Preferred Locations</h2>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {locations.map((loc, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Priority ${idx + 1} location`}
            value={loc}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="border rounded px-3 py-2 focus:outline-indigo-500"
          />
        ))}
      </div>

      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          ⬅ Back
        </button>
        <button
          disabled={locations.some((l) => !l)}
          onClick={handleContinue}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          Finish ✅
        </button>
      </div>
    </div>
  );
}

export default Location;
