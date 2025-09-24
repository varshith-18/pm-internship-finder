import React, { useState } from "react";
import Skills from "./Skills";
import Sector from "./Sector";
import Education from "./Education";
import Location from "./Location";
import Results from "./Results";
import StepProgress from "./StepProgress";
import Navbar from "./Navbar";

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    skills: [],
    sectors: [],
    education: "",
    locations: ["", "", ""],
  });

  const totalSteps = 4; // Education, Skills, Sector, Location

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps + 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Get current step title for mobile navbar
  const getStepTitle = () => {
    switch(step) {
      case 1: return "Education";
      case 2: return "Skills"; 
      case 3: return "Sector";
      case 4: return "Location";
      case 5: return "Results";
      default: return "Internship Recommender";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar with profile progress */}
      <Navbar 
        profile={profile} 
        currentStep={step} 
        currentStepTitle={getStepTitle()}
      />
      
      {/* Step Progress Bar */}
      <StepProgress currentStep={step} profile={profile} />

      {/* Main Content */}
      <div className="py-8">
        {/* Multi-step forms */}
        {step === 1 && (
          <Education
            profile={profile}
            setProfile={setProfile}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 2 && (
          <Skills
            profile={profile}
            setProfile={setProfile}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 3 && (
          <Sector
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

        {step === 5 && <Results profile={profile} setStep={setStep} />}
      </div>
    </div>
  );
}

export default MultiStepForm;
