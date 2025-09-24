import React, { useState } from "react";

// Major cities grouped by states with internship opportunities
const locationData = {
  "Delhi": {
    state: "Delhi",
    cities: ["New Delhi", "Delhi NCR", "Gurgaon", "Noida", "Greater Noida", "Faridabad"],
    opportunities: 25420
  },
  "Maharashtra": {
    state: "Maharashtra", 
    cities: ["Mumbai", "Pune", "Nashik", "Nagpur", "Aurangabad", "Thane"],
    opportunities: 22150
  },
  "Karnataka": {
    state: "Karnataka",
    cities: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    opportunities: 18930
  },
  "Tamil Nadu": {
    state: "Tamil Nadu",
    cities: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tirupur"],
    opportunities: 14680
  },
  "Uttar Pradesh": {
    state: "Uttar Pradesh",
    cities: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad"],
    opportunities: 12340
  },
  "West Bengal": {
    state: "West Bengal",
    cities: ["Kolkata", "Durgapur", "Asansol", "Siliguri", "Howrah"],
    opportunities: 9870
  },
  "Gujarat": {
    state: "Gujarat",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    opportunities: 11250
  },
  "Rajasthan": {
    state: "Rajasthan",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    opportunities: 7890
  },
  "Telangana": {
    state: "Telangana",
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    opportunities: 13420
  },
  "Haryana": {
    state: "Haryana",
    cities: ["Chandigarh", "Faridabad", "Gurgaon", "Panipat", "Ambala"],
    opportunities: 8760
  }
};

function Location({ nextStep, prevStep, setProfile, profile }) {
  const [locations, setLocations] = useState(profile.locations || ["", "", ""]);
  const [dropdownOpen, setDropdownOpen] = useState([false, false, false]);
  const [searchTerms, setSearchTerms] = useState(["", "", ""]);

  const handleLocationSelect = (index, location) => {
    console.log('Selecting location:', location, 'for priority', index + 1); // Debug log
    const newLocs = [...locations];
    newLocs[index] = location;
    setLocations(newLocs);
    
    // Update profile immediately
    const updatedProfile = { ...profile, locations: newLocs };
    setProfile(updatedProfile);
    
    const newSearchTerms = [...searchTerms];
    newSearchTerms[index] = "";
    setSearchTerms(newSearchTerms);
    
    const newDropdownOpen = [...dropdownOpen];
    newDropdownOpen[index] = false;
    setDropdownOpen(newDropdownOpen);
  };

  const handleInputChange = (index, value) => {
    const newSearchTerms = [...searchTerms];
    newSearchTerms[index] = value;
    setSearchTerms(newSearchTerms);
    
    const newDropdownOpen = [...dropdownOpen];
    newDropdownOpen[index] = true;
    setDropdownOpen(newDropdownOpen);
  };

  const handleInputFocus = (index) => {
    const newDropdownOpen = [...dropdownOpen];
    newDropdownOpen[index] = true;
    setDropdownOpen(newDropdownOpen);
  };

  const handleInputBlur = (index) => {
    setTimeout(() => {
      const newDropdownOpen = [...dropdownOpen];
      newDropdownOpen[index] = false;
      setDropdownOpen(newDropdownOpen);
    }, 200);
  };

  const getFilteredLocations = (searchTerm, excludeIndex) => {
    const allCities = [];
    Object.entries(locationData).forEach(([state, data]) => {
      // Add state as option
      if (state.toLowerCase().includes(searchTerm.toLowerCase())) {
        allCities.push({ name: state, type: 'state', opportunities: data.opportunities });
      }
      // Add cities as options
      data.cities.forEach(city => {
        if (city.toLowerCase().includes(searchTerm.toLowerCase())) {
          allCities.push({ name: city, type: 'city', state, opportunities: data.opportunities });
        }
      });
    });
    
    // Exclude already selected locations
    return allCities.filter(loc => !locations.includes(loc.name));
  };

  const handleContinue = () => {
    const filledLocations = locations.filter(l => l.trim() !== "");
    if (filledLocations.length === 0) {
      alert("Please select at least one preferred location");
      return;
    }
    setProfile({ ...profile, locations: filledLocations });
    nextStep();
  };

  const getPriorityColor = (index) => {
    switch(index) {
      case 0: return "from-red-500 to-red-600"; // Highest priority
      case 1: return "from-orange-500 to-orange-600"; // Medium priority  
      case 2: return "from-yellow-500 to-yellow-600"; // Lower priority
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getPriorityText = (index) => {
    switch(index) {
      case 0: return "1st Priority (Most Preferred)";
      case 1: return "2nd Priority (Alternate)";
      case 2: return "3rd Priority (Fallback)";
      default: return `${index + 1}st Priority`;
    }
  };

  return (
    <div className="text-center px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Select Preferred Locations
      </h2>
      <p className="text-gray-600 mb-8">
        Choose your top 3 preferred locations in order of priority. This helps us show you the most relevant internships first.
      </p>

      <div className="space-y-6 w-full max-w-2xl mx-auto">
        {locations.map((loc, idx) => (
          <div key={idx} className="relative">
            {/* Priority Label */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium mb-2 bg-gradient-to-r ${getPriorityColor(idx)}`}>
              <span className="mr-2">
                {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
              </span>
              {getPriorityText(idx)}
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder={`Search for cities or states... (Priority ${idx + 1})`}
                value={locations[idx] || searchTerms[idx]}
                onChange={(e) => {
                  if (locations[idx]) {
                    // If location is already selected, clear it to allow new search
                    const newLocs = [...locations];
                    newLocs[idx] = "";
                    setLocations(newLocs);
                  }
                  handleInputChange(idx, e.target.value);
                }}
                onFocus={() => handleInputFocus(idx)}
                onBlur={() => handleInputBlur(idx)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-center font-medium"
              />
            </div>

            {/* Dropdown suggestions */}
            {dropdownOpen[idx] && (
              <div 
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                onMouseDown={(e) => e.preventDefault()} // Prevent input blur when clicking dropdown
              >
                {getFilteredLocations(searchTerms[idx], idx).slice(0, 10).map((location) => (
                  <div
                    key={location.name}
                    onClick={() => handleLocationSelect(idx, location.name)}
                    className="px-4 py-3 cursor-pointer hover:bg-indigo-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-800">
                          {location.name}
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {location.type === 'state' ? 'State' : 'City'}
                          </span>
                        </div>
                        {location.type === 'city' && (
                          <div className="text-sm text-gray-600">{location.state}</div>
                        )}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        {location.opportunities.toLocaleString()} jobs
                      </div>
                    </div>
                  </div>
                ))}
                {getFilteredLocations(searchTerms[idx], idx).length === 0 && (
                  <div className="px-4 py-3 text-gray-500 text-center">
                    No locations found matching "{searchTerms[idx]}"
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected locations summary */}
      {locations.some(loc => loc) && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-2xl mx-auto">
          <h3 className="font-semibold text-gray-700 mb-3">Your Location Preferences:</h3>
          <div className="space-y-2">
            {locations.map((loc, idx) => loc && (
              <div key={idx} className="flex items-center justify-center">
                <span className="mr-2">
                  {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                </span>
                <span className="font-medium">{loc}</span>
                <span className="ml-2 text-gray-500 text-sm">
                  (Priority {idx + 1})
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">
            💡 Internships will be prioritized based on your location preferences
          </p>
        </div>
      )}

      {/* Location tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
        <div className="flex items-start">
          <div className="text-blue-600 mr-2">💡</div>
          <div className="text-sm text-blue-800">
            <div className="font-semibold mb-1">Pro Tips:</div>
            <ul className="list-disc list-inside space-y-1 text-left">
              <li>Select broader locations (states) for more opportunities</li>
              <li>Metro cities typically have more tech and corporate internships</li>
              <li>Tier-2 cities often offer better learning environments</li>
              <li>You can skip Priority 2 & 3 if you're flexible with just one location</li>
            </ul>
          </div>
        </div>
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
          disabled={!locations.some(l => l.trim())}
          onClick={handleContinue}
          className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Finish <span className="ml-2">✅</span>
        </button>
      </div>
    </div>
  );
}

export default Location;
