import React, { useState } from "react";
import "../App.css"; // make sure App.css is at src/App.css

function SkillsSelection({ profile, setProfile, nextStep, allSkills }) {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [location, setLocation] = useState("");

  const toggleSkill = (skillName) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  const submitSkills = () => {
    setProfile({ ...profile, skills: selectedSkills, location });
    nextStep();
  };

  return (
    <div className="step-container">
      <h2>Select Your Skills</h2>

      {/* Skills */}
      <div className="skills-box">
        {allSkills.map((skill, idx) => {
          const skillName = typeof skill === "string" ? skill : skill.name;
          const isSelected = selectedSkills.includes(skillName);

          return (
            <button
              key={idx}
              type="button"
              className={`skill-button ${isSelected ? "selected" : ""}`}
              onClick={() => toggleSkill(skillName)}
            >
              {skillName}
            </button>
          );
        })}
      </div>

      {/* Location */}
      <div style={{ marginTop: "1.5rem" }}>
        <label htmlFor="location">Your Location</label>
        <input
          id="location"
          type="text"
          placeholder="Enter your city/location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Continue Button */}
      <button onClick={submitSkills} style={{ marginTop: "1rem" }}>
        Continue
      </button>
    </div>
  );
}

export default SkillsSelection;
