import React from "react";

function StepProgress({ currentStep, profile }) {
  const steps = [
    { 
      id: 1, 
      name: "Education", 
      icon: "🎓",
      completed: !!profile?.education 
    },
    { 
      id: 2, 
      name: "Skills", 
      icon: "⚡",
      completed: profile?.skills?.length > 0 
    },
    { 
      id: 3, 
      name: "Sector", 
      icon: "🏢",
      completed: profile?.sectors?.length > 0 
    },
    { 
      id: 4, 
      name: "Location", 
      icon: "📍",
      completed: profile?.locations?.some(l => l) 
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              {/* Step Icon */}
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 bg-white transition-all duration-300
                ${currentStep === step.id 
                  ? 'border-indigo-600 text-indigo-600 shadow-lg' 
                  : step.completed
                    ? 'border-green-500 text-green-500'
                    : currentStep > step.id
                      ? 'border-indigo-400 text-indigo-400'
                      : 'border-gray-300 text-gray-400'
                }
              `}>
                {step.completed ? '✅' : step.icon}
              </div>
              
              {/* Step Name */}
              <span className={`
                text-xs mt-2 font-medium text-center
                ${currentStep === step.id 
                  ? 'text-indigo-600' 
                  : step.completed
                    ? 'text-green-600'
                    : 'text-gray-500'
                }
              `}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StepProgress;
