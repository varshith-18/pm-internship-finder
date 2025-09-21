import React from "react";

function Welcome({ nextStep }) {
  return (
    <div className="step-container">
      <h1>PM Internship Finder</h1>
      <p>आपके लिए सही इंटर्नशिप खोजें</p>
      <button onClick={nextStep}>Start / शुरू करें</button>
    </div>
  );
}

export default Welcome;
