import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProfileProgress from "../components/ProfileProgress";
import StepProgress from "../components/StepProgress";
import Education from "../components/Education";
import Sector from "../components/Sector";
import Skills from "../components/Skills";
import Location from "../components/Location";
import Results from "../components/Results";

function Home() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({});

  // Calculate progress percentage based on completed steps
  const totalSteps = 4;
  let completed = 0;
  if (profile.education) completed++;
  if (profile.sector) completed++;
  if (profile.skills && profile.skills.length > 0) completed++;
  if (profile.locations && profile.locations.length > 0) completed++;
  const progress = Math.round((completed / totalSteps) * 100);

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-end px-6 pt-2">
        <ProfileProgress progress={progress} />
      </div>
      <StepProgress currentStep={step > 4 ? 4 : step} />

      <div className="flex-1">
        {step === 1 && (
          <Education
            nextStep={nextStep}
            prevStep={prevStep}
            setProfile={setProfile}
            profile={profile}
          />
        )}
        {step === 2 && (
          <Sector
            nextStep={nextStep}
            prevStep={prevStep}
            setProfile={setProfile}
            profile={profile}
          />
        )}
        {step === 3 && (
          <Skills
            nextStep={nextStep}
            prevStep={prevStep}
            setProfile={setProfile}
            profile={profile}
          />
        )}
        {step === 4 && (
          <Location
            nextStep={nextStep}
            prevStep={prevStep}
            setProfile={setProfile}
            profile={profile}
          />
        )}
        {step === 5 && <Results profile={profile} />}
      </div>
    </div>
  );
}

export default Home;
