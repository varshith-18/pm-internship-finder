import React, { useState, useEffect } from 'react';

function Skills({ nextStep, prevStep, profile, setProfile }) {
  const [selectedSkills, setSelectedSkills] = useState(profile.skills || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Predefined skills list (sorted alphabetically)
  const skillsOptions = [
    'Adobe Photoshop', 'AutoCAD', 'AWS', 'Communication', 'Content Writing',
    'Critical Thinking', 'CSS', 'Customer Service', 'Data Analysis', 
    'Digital Marketing', 'Docker', 'Event Planning', 'Excel', 'Figma',
    'Git', 'Graphic Design', 'HTML', 'Java', 'JavaScript', 'Leadership',
    'Machine Learning', 'MATLAB', 'Microsoft Office', 'MongoDB', 'Node.js',
    'Photography', 'PowerPoint', 'Power BI', 'Problem Solving', 'Project Management',
    'Python', 'R Programming', 'React', 'Research', 'Salesforce', 'SEO',
    'Sketch', 'Social Media Marketing', 'SolidWorks', 'SQL', 'Tableau',
    'Teaching', 'Teamwork', 'Time Management', 'Training', 'UI/UX Design',
    'Video Editing', 'WordPress'
  ];

  // Filter skills based on search term and exclude already selected skills
  const filteredSkills = skillsOptions.filter(skill => 
    skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSkills.includes(skill)
  );

  // Update form data when skills change
  useEffect(() => {
    setProfile(prevProfile => ({ ...prevProfile, skills: selectedSkills }));
  }, [selectedSkills, setProfile]);

  const addSkill = (skill) => {
    console.log('Adding skill:', skill); // Debug log
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSearchTerm('');
      setIsDropdownOpen(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleNext = () => {
    if (selectedSkills.length > 0) {
      nextStep();
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing to allow clicking on dropdown items
    setTimeout(() => setIsDropdownOpen(false), 200);
  };

  return (
    <div className="text-center px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Select Your Skills
      </h2>
      <p className="text-gray-600 mb-8">
        Choose skills that best describe your capabilities and interests
      </p>

      {/* Dropdown with search */}
      <div className="relative w-full max-w-md mx-auto mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Search and select skills..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        
        {/* Dropdown menu */}
        {isDropdownOpen && filteredSkills.length > 0 && (
          <div 
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            onMouseDown={(e) => e.preventDefault()} // Prevent input blur when clicking dropdown
          >
            {filteredSkills.map((skill) => (
              <div
                key={skill}
                onClick={() => addSkill(skill)}
                className="px-4 py-2 cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 border-b border-gray-100 last:border-b-0"
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected skills as bubbles */}
      {selectedSkills.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {selectedSkills.map((skill) => (
              <div
                key={skill}
                className="group relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full border-2 border-blue-600 hover:border-blue-700 transition-all duration-200 cursor-pointer text-sm font-medium"
                onClick={() => removeSkill(skill)}
              >
                <span className="font-medium">{skill}</span>
                <span className="ml-2 text-white hover:text-red-200 font-bold text-sm">
                  ✕
                </span>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Click to remove
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alternative: Show all available skills as buttons if dropdown isn't working */}
      {!isDropdownOpen && searchTerm === '' && (
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-600 mb-4">Also select the following to get more opportunities</h3>
          <div className="flex flex-wrap gap-3 justify-center max-w-6xl mx-auto">
            {skillsOptions
              .filter(skill => !selectedSkills.includes(skill))
              .slice(0, 20) // Show first 20 available skills
              .map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className="px-4 py-3 bg-white hover:bg-gray-100 text-gray-700 rounded-full border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all duration-200 text-sm font-medium"
              >
                {skill} +
              </button>
            ))}
          </div>
          
          {/* Popular career interests section */}
          <div className="mt-8">
            <h3 className="text-base font-medium text-gray-600 mb-4">Popular career interests</h3>
            <div className="flex flex-wrap gap-3 justify-center max-w-6xl mx-auto">
              {['Sales', 'Data Entry', 'Digital Marketing', 'Graphic Design', 'Marketing', 'Human Resources (HR)', 'General Management']
                .filter(skill => !selectedSkills.includes(skill))
                .map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="px-4 py-3 bg-white hover:bg-gray-100 text-gray-700 rounded-full border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all duration-200 text-sm font-medium"
                >
                  {skill} +
                </button>
              ))}
            </div>
          </div>
          
          {skillsOptions.filter(skill => !selectedSkills.includes(skill)).length > 20 && (
            <p className="text-gray-500 text-sm text-center mt-4">
              And {skillsOptions.filter(skill => !selectedSkills.includes(skill)).length - 20} more... Use search above to find specific skills.
            </p>
          )}
        </div>
      )}

      {/* Skills counter */}
      <div className="mb-6">
        <p className="text-gray-600">
          {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
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
          disabled={selectedSkills.length === 0}
          onClick={handleNext}
          className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Next <span className="ml-2">➡</span>
        </button>
      </div>
    </div>
  );
}

export default Skills;