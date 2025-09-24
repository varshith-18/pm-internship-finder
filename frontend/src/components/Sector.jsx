import React, { useState } from "react";

const sectorsData = [
  { 
    name: "IT & Software", 
    description: "Internships related to software development, testing, and IT support.",
    opportunities: 15420,
    skills: ["Programming", "Database Management", "Testing", "System Administration"],
    avgStipend: "₹15,000-25,000"
  },
  { 
    name: "Marketing", 
    description: "Internships related to digital marketing, social media, and branding.",
    opportunities: 12380,
    skills: ["Digital Marketing", "Content Creation", "Analytics", "SEO"],
    avgStipend: "₹8,000-15,000"
  },
  { 
    name: "Finance", 
    description: "Internships in banking, accounting, and financial analysis.",
    opportunities: 9850,
    skills: ["Financial Analysis", "Accounting", "Excel", "Risk Management"],
    avgStipend: "₹12,000-20,000"
  },
  { 
    name: "Design", 
    description: "Graphic design, UI/UX, and creative design internships.",
    opportunities: 7620,
    skills: ["Graphic Design", "UI/UX Design", "Adobe Creative Suite", "Prototyping"],
    avgStipend: "₹10,000-18,000"
  },
  { 
    name: "Human Resources", 
    description: "Human resources and recruitment related internships.",
    opportunities: 5940,
    skills: ["Recruitment", "Employee Relations", "Training", "HR Policies"],
    avgStipend: "₹8,000-14,000"
  },
  { 
    name: "Sales", 
    description: "Sales and business development internships.",
    opportunities: 11250,
    skills: ["Sales Strategy", "CRM", "Communication", "Lead Generation"],
    avgStipend: "₹10,000-16,000"
  },
  { 
    name: "Content Writing", 
    description: "Content creation, copywriting, and editorial internships.",
    opportunities: 6780,
    skills: ["Creative Writing", "SEO Writing", "Editing", "Research"],
    avgStipend: "₹6,000-12,000"
  },
  { 
    name: "Data Science", 
    description: "Data analysis, machine learning, and analytics internships.",
    opportunities: 4320,
    skills: ["Python", "Data Analysis", "Machine Learning", "Statistics"],
    avgStipend: "₹18,000-30,000"
  }
];

const chatbotResponses = {
  "IT & Software": "This is one of the fastest-growing sectors with high demand for programmers, web developers, and software testers. Great career prospects with continuous learning opportunities.",
  "Marketing": "Perfect for creative minds who want to understand consumer behavior and build brand strategies. Digital marketing is especially in high demand.",
  "Finance": "Ideal for analytical minds interested in numbers, investments, and financial planning. Offers stable career paths with good growth potential.",
  "Design": "Great for creative individuals who want to shape user experiences and visual communications. UI/UX design is particularly valuable in the tech industry.",
  "Human Resources": "Perfect for people-oriented individuals who enjoy working with teams and organizational development. HR professionals are essential in every industry.",
  "Sales": "Excellent for goal-oriented individuals who enjoy building relationships and driving business growth. Sales skills are transferable across industries.",
  "Content Writing": "Ideal for creative writers who want to craft compelling narratives and communications. Content is king in the digital age.",
  "Data Science": "Perfect for analytical minds who love working with data to derive insights. One of the highest-paying and most in-demand fields."
};

function Sector({ nextStep, prevStep, setProfile, profile }) {
  const [selectedSectors, setSelectedSectors] = useState(profile.sectors || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatbotMessage, setChatbotMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredSectors = sectorsData.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSector = (sector) => {
    if (selectedSectors.includes(sector.name)) {
      setSelectedSectors(selectedSectors.filter((s) => s !== sector.name));
    } else {
      setSelectedSectors([...selectedSectors, sector.name]);
    }
  };

  const removeSector = (sectorName) => {
    setSelectedSectors(selectedSectors.filter((s) => s !== sectorName));
  };

  const handleContinue = () => {
    if (selectedSectors.length === 0) return;
    setProfile({ ...profile, sectors: selectedSectors });
    nextStep();
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 150);
  };

  const selectFromDropdown = (sector) => {
    if (!selectedSectors.includes(sector.name)) {
      setSelectedSectors([...selectedSectors, sector.name]);
    }
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const showChatbotAdvice = (sectorName) => {
    setChatbotMessage(chatbotResponses[sectorName] || "This sector offers great opportunities for growth and learning.");
    setShowChatbot(true);
    setTimeout(() => setShowChatbot(false), 5000);
  };

  return (
    <div className="text-center px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Select Your Preferred Sectors
      </h2>
      <p className="text-gray-600 mb-8">
        Choose sectors that align with your interests and career goals
      </p>

      {/* Search bar with dropdown */}
      <div className="relative w-full max-w-md mx-auto mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Search sectors..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        
        {/* Dropdown menu */}
        {isDropdownOpen && filteredSectors.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredSectors.map((sector) => (
              <div
                key={sector.name}
                onClick={() => selectFromDropdown(sector)}
                className="px-4 py-3 cursor-pointer hover:bg-indigo-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium text-gray-800">{sector.name}</div>
                <div className="text-sm text-gray-600">{sector.opportunities.toLocaleString()} opportunities</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected sectors as bubbles */}
      {selectedSectors.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {selectedSectors.map((sectorName) => {
              return (
                <div
                  key={sectorName}
                  className="group relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full border-2 border-blue-600 hover:border-blue-700 transition-all duration-200 cursor-pointer text-sm font-medium"
                  onClick={() => removeSector(sectorName)}
                >
                  <span className="font-medium">{sectorName}</span>
                  <span className="ml-2 text-white hover:text-red-200 font-bold text-sm">
                    ✕
                  </span>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Click to remove
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All sectors as clickable bubbles */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-600 mb-4">Available Sectors:</h3>
        <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
          {sectorsData.map((sector) => (
            <div key={sector.name} className="relative group">
              <button
                onClick={() => toggleSector(sector)}
                className={`px-4 py-3 rounded-full border-2 transition-all duration-200 text-sm font-medium ${
                  selectedSectors.includes(sector.name)
                    ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
                    : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                <div>{sector.name}</div>
                <div className="text-xs opacity-70">
                  {sector.opportunities.toLocaleString()} jobs
                </div>
                
                {/* Professional info button */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    showChatbotAdvice(sector.name);
                  }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 hover:bg-blue-600 text-white rounded-full text-xs transition-all duration-200 cursor-pointer flex items-center justify-center font-bold shadow-sm hover:shadow-md"
                  title="Get sector advice"
                >
                  i
                </div>
              </button>

              {/* Detailed hover tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-72 bg-white border shadow-lg rounded-lg p-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                <div className="font-semibold text-gray-800 mb-2">{sector.name}</div>
                <div className="text-gray-600 mb-2">{sector.description}</div>
                <div className="text-indigo-600 font-medium mb-1">
                  💰 {sector.avgStipend}/month
                </div>
                <div className="text-green-600 font-medium mb-2">
                  📊 {sector.opportunities.toLocaleString()} opportunities
                </div>
                <div className="text-gray-500 text-xs">
                  <strong>Key Skills:</strong> {sector.skills.join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rule-based Chatbot */}
      {showChatbot && (
        <div className="fixed bottom-20 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm z-30 animate-slide-up">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              🤖
            </div>
            <div>
              <div className="font-semibold mb-1">Career Assistant</div>
              <div className="text-sm">{chatbotMessage}</div>
            </div>
          </div>
          <button
            onClick={() => setShowChatbot(false)}
            className="absolute top-2 right-2 text-blue-200 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Sectors counter */}
      <div className="mb-6">
        <p className="text-gray-600">
          {selectedSectors.length} sector{selectedSectors.length !== 1 ? 's' : ''} selected
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between w-full max-w-md mx-auto mt-8">
        <button
          onClick={prevStep}
          className="flex items-center px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium"
        >
          <span className="mr-2">⬅</span> Back
        </button>
        <button
          disabled={selectedSectors.length === 0}
          onClick={handleContinue}
          className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Next <span className="ml-2">➡</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Sector;
