import React, { useState } from "react";

function Eligibility({ nextStep }) {
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [institution, setInstitution] = useState(false);

  const checkEligibility = () => {
    if (age === "21-24" && income === "lt8" && institution) {
      nextStep();
    } else {
      alert("Not eligible");
    }
  };

  return (
    <div className="step-container">
      <h2>Eligibility</h2>

      <div>
        <label>Age:</label>
        <select value={age} onChange={e => setAge(e.target.value)}>
          <option value="">Select</option>
          <option value="below21">Below 21</option>
          <option value="21-24">21–24</option>
          <option value="above24">Above 24</option>
        </select>
      </div>

      <div>
        <label>Family Income:</label>
        <select value={income} onChange={e => setIncome(e.target.value)}>
          <option value="">Select</option>
          <option value="lt8">Less than ₹8 Lakh</option>
          <option value="gt8">More than ₹8 Lakh</option>
        </select>
      </div>

      <div>
        <input
          type="checkbox"
          checked={institution}
          onChange={e => setInstitution(e.target.checked)}
        /> Institution is not IIT/NIT/IIIT
      </div>

      <button onClick={checkEligibility} disabled={!age || !income}>
        Check Eligibility
      </button>
    </div>
  );
}

export default Eligibility;
