import React, { useState, useEffect } from "react";
import GuidelinesModal from "./GuidelinesModal";
import ProfileProgress from "./ProfileProgress";
import { useTranslation } from 'react-i18next';
import '../i18n';

function Navbar({ profile, currentStep: _currentStep, currentStepTitle }) {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'EN');

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowGuidelines(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  // Calculate profile completion percentage
  const totalSteps = 4;
  const completedSteps = [
    profile?.skills?.length > 0,
    profile?.sectors?.length > 0,
    !!profile?.education,
    profile?.locations?.some(l => l)
  ].filter(Boolean).length;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div>
      <nav className="flex justify-between items-center px-4 md:px-6 py-4 bg-white border-b shadow-sm">
        {/* Left Title - Full on large screens, step title on small screens */}
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-700">
            <span className="hidden md:block">{t('title')}</span>
            <span className="md:hidden">{currentStepTitle || t('title')}</span>
          </h1>
        </div>

        {/* Right Options */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Language Switch */}
          <select
            aria-label="Select Language"
            className="px-2 md:px-3 py-1 text-sm md:text-base rounded border text-indigo-700 bg-indigo-50 font-semibold"
            value={lang}
            onChange={handleLangChange}
          >
            <option value="AS">Assamese</option>
            <option value="BN">Bengali</option>
            <option value="EN">English</option>
            <option value="GU">Gujarati</option>
            <option value="HI">Hindi</option>
            <option value="KN">Kannada</option>
            <option value="ML">Malayalam</option>
            <option value="MR">Marathi</option>
            <option value="OR">Oriya</option>
            <option value="PA">Punjabi</option>
            <option value="TE">Telugu</option>
            <option value="TA">Tamil</option>
          </select>

          {/* Guidelines */}
          <button
            className="px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition-colors"
            onClick={() => setShowGuidelines(true)}
          >
            {t('guidelines')}
          </button>

          {/* Profile Progress Ring */}
          <ProfileProgress progress={progress} />
        </div>
      </nav>

      {/* Guidelines Modal */}
      {showGuidelines && <GuidelinesModal onClose={() => setShowGuidelines(false)} />}
    </div>
  );
}

export default Navbar;
