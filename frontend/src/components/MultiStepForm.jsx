import React, { useState } from "react";
import Skills from "./Skills";
import Sector from "./Sector";
import Education from "./Education";
import Location from "./Location";
import Results from "./Results";
import ProfileProgress from "./ProfileProgress";
import StepProgress from "./StepProgress";

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    skills: [],
    sectors: [],
    education: "",
    locations: ["", "", ""],
  });

  const totalSteps = 4; // Skills, Sector, Education, Location

  // Count completed steps dynamically
  const completedSteps = [
    profile.skills.length > 0,
    profile.sectors.length > 0,
    !!profile.education,
    profile.locations.every((l) => l),
  ].filter(Boolean).length;

  const progress = Math.round((completedSteps / totalSteps) * 100);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps + 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Step indicator */}
      <StepProgress currentStep={step} />

      {/* Profile progress circle */}
      <div className="flex justify-end">
        <ProfileProgress progress={progress} />
      </div>

      {/* Multi-step forms */}
      {step === 1 && (
        <Skills
          profile={profile}
          setProfile={setProfile}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 2 && (
        <Sector
          profile={profile}
          setProfile={setProfile}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Education
          profile={profile}
          setProfile={setProfile}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <Location
          profile={profile}
          setProfile={setProfile}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && <Results profile={profile} />}
    </div>
  );
}

export default MultiStepForm;
