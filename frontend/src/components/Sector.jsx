import React, { useState } from "react";

const sectorsData = [
  { name: "IT & Software", description: "Internships related to software development, testing, and IT support." },
  { name: "Marketing", description: "Internships related to digital marketing, social media, and branding." },
  { name: "Finance", description: "Internships in banking, accounting, and financial analysis." },
  { name: "Design", description: "Graphic design, UI/UX, and creative design internships." },
  { name: "HR", description: "Human resources and recruitment related internships." },
];

function Sector({ nextStep, prevStep, setProfile, profile }) {
  const [selectedSectors, setSelectedSectors] = useState(profile.sectors || []);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSector = (name) => {
    if (selectedSectors.includes(name)) {
      setSelectedSectors(selectedSectors.filter((s) => s !== name));
    } else {
      setSelectedSectors([...selectedSectors, name]);
    }
  };

  const handleContinue = () => {
    if (selectedSectors.length === 0) return;
    setProfile({ ...profile, sectors: selectedSectors });
    nextStep();
  };

  const filteredSectors = sectorsData.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Select Sectors</h2>
      <input
        type="text"
        placeholder="Search sectors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-lg px-3 py-2 mb-4 w-full max-w-md focus:outline-indigo-500"
      />
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredSectors.map((s) => (
          <div key={s.name} className="relative group">
            <button
              aria-pressed={selectedSectors.includes(s.name)}
              onClick={() => toggleSector(s.name)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleSector(s.name); }}
              tabIndex={0}
              className={`px-5 py-3 rounded-full border-2 transition ${
                selectedSectors.includes(s.name)
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300"
              }`}
            >
              {s.name}
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 bg-white border shadow-lg rounded p-2 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              {s.description}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          ⬅ Back
        </button>
        <button
          disabled={selectedSectors.length === 0}
          onClick={handleContinue}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default Sector;
