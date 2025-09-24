import React, { useState } from "react";

const qualifications = [
  { name: "10th", opportunities: 35405 },
  { name: "Graduation", opportunities: 34186 },
  { name: "ITI", opportunities: 28261 },
  { name: "Diploma", opportunities: 20380 },
  { name: "12th", opportunities: 8814 },
];

function Education({ profile, setProfile, nextStep, prevStep }) {
  const [selected, setSelected] = useState(profile.education || "");

  const handleNext = () => {
    if (!selected) {
      alert("Please select your qualification");
      return;
    }
    setProfile({ ...profile, education: selected });
    nextStep();
  };

  return (
    <div className="step-container">
      <h2 className="text-2xl font-bold text-center mb-6">Select Your Qualification</h2>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {qualifications.map((q) => (
          <button
            key={q.name}
            onClick={() => setSelected(q.name)}
            className={`transition-all duration-200 px-4 py-3 rounded-full border-2 text-sm font-medium flex flex-col items-center
              ${selected === q.name 
                ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700" 
                : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600"
              }`}
          >
            <span className="font-medium mb-1">{q.name}</span>
            <span className="text-xs opacity-70">{q.opportunities.toLocaleString()} opportunities</span>
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold">Back</button>
        <button
          disabled={!selected}
          onClick={handleNext}
          className={`px-6 py-2 rounded font-semibold ${selected ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Education;
