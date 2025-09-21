import React, { useState } from "react";
import Welcome from "../components/Welcome";
import Eligibility from "../components/Eligibility";
import SkillsSelection from "../components/SkillsSelection";
import Results from "../components/Results";

const Home = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({});

  const allSkills = [
    "Communication",
    "Excel",
    "JIRA",
    "Social Media",
    "Content Writing",
    "SEO",
    "SQL",
    "Python",
    "Teamwork",
    "Sales",
    "MS Office",
  ];

  const nextStep = () => setStep(step + 1);

  return (
    <div>
      {step === 1 && <Welcome nextStep={nextStep} />}
      {step === 2 && <Eligibility nextStep={nextStep} />}
      {step === 3 && (
        <SkillsSelection
          profile={profile}
          setProfile={setProfile}
          nextStep={nextStep}
          allSkills={allSkills}
        />
      )}
      {step === 4 && <Results profile={profile} />}
    </div>
  );
};

export default Home;
