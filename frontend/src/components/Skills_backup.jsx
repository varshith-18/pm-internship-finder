import React, { useState } from "react";

const allSkillsList = [
  "Communication", "Excel", "JIRA", "Social Media", "Content Writing",
  "SEO", "SQL", "Python", "Teamwork", "Sales", "MS Office",
];

function Skills({ nextStep, prevStep, setProfile, profile }) {
  const [selectedSkills, setSelectedSkills] = useState(profile.skills || []);
  const [currentSkill, setCurrentSkill] = useState("");

  const addSkill = () => {
    if (currentSkill && !selectedSkills.includes(currentSkill)) {
      setSelectedSkills([...selectedSkills, currentSkill]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleNext = () => {
    if (selectedSkills.length === 0) {
      alert("Please select at least one skill");
      return;
    }
    setProfile({ ...profile, skills: selectedSkills });
    nextStep();
  };

  return (
    <div className="step-container">
      <h2 className="text-2xl font-bold text-center mb-6">Select Your Skills</h2>

      {/* Skill dropdown */}
      <select
        onChange={(e) => setCurrentSkill(e.target.value)}
        value={currentSkill}
        className="w-full px-4 py-2 rounded border mb-4"
      >
        <option value="" disabled>Select a skill</option>
        {allSkillsList.sort().map((skill, idx) => (
          <option key={idx} value={skill}>
            {skill}
          </option>
        ))}
      </select>

      {/* Add skill button */}
      <button
        onClick={addSkill}
        disabled={!currentSkill}
        className={`mb-4 px-4 py-2 rounded font-semibold ${
          currentSkill ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Add
      </button>

      {/* Selected skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedSkills.map((skill) => (
          <span
            key={skill}
            className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full cursor-pointer"
            onClick={() => removeSkill(skill)}
            title="Click to remove"
          >
            {skill} ✕
          </span>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          ⬅ Back
        </button>
        <button
          disabled={selectedSkills.length === 0}
          onClick={handleNext}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default Skills;
