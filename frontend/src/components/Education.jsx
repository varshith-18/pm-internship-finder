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
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {qualifications.map((q) => (
          <button
            key={q.name}
            onClick={() => setSelected(q.name)}
            className={`transition-colors duration-200 px-6 py-5 rounded-xl shadow-md border-2 text-lg font-semibold flex flex-col items-center w-48
              ${selected === q.name ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-200 bg-white text-gray-700"}`}
          >
            <span className="font-bold mb-1">{q.name}</span>
            <span className="text-sm text-gray-500">{q.opportunities.toLocaleString()} opportunities</span>
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
