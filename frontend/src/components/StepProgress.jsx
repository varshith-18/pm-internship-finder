import React from "react";
import { GraduationCap, Briefcase, Wrench, MapPin } from "lucide-react";

const steps = [
  { id: 1, title: "Education", icon: GraduationCap },
  { id: 2, title: "Sector", icon: Briefcase },
  { id: 3, title: "Skills", icon: Wrench },
  { id: 4, title: "Location", icon: MapPin },
];

function StepProgress({ currentStep }) {
  return (
    <div className="w-full bg-white py-3 px-2 border-b flex flex-col">
      {/* Desktop */}
      <div className="hidden md:flex w-full justify-around">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <step.icon
              className={`w-7 h-7 mb-1 ${currentStep >= step.id ? "text-indigo-600" : "text-gray-300"}`}
            />
            <span className={`text-base font-semibold ${currentStep === step.id ? "text-indigo-700" : "text-gray-500"}`}>{step.title}</span>
          </div>
        ))}
      </div>
      {/* Mobile: only show current */}
      <div className="md:hidden text-base font-bold text-indigo-700 w-full text-center">
        {steps[currentStep - 1]?.title || ""}
      </div>
    </div>
  );
}

export default StepProgress;
