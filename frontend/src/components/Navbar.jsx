import React, { useState, useEffect } from "react";
import GuidelinesModal from "./GuidelinesModal";
import { useTranslation } from 'react-i18next';
import '../i18n';

function Navbar() {
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

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
      {/* Left Title */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-indigo-700">{t('title')}</h1>
      </div>

      {/* Right Options */}
      <div className="flex items-center gap-6">
        {/* Language Switch */}
        <select
          aria-label="Select Language"
          className="px-3 py-1 rounded border text-indigo-700 bg-indigo-50 font-semibold"
          value={lang}
          onChange={handleLangChange}
        >
          <option value="EN">English</option>
          <option value="HI">हिंदी</option>
        </select>

        {/* Guidelines */}
        <button
          className="px-4 py-2 rounded bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200"
          onClick={() => setShowGuidelines(true)}
        >
          {t('guidelines')}
        </button>

        {/* Modal */}
        {showGuidelines && <GuidelinesModal onClose={() => setShowGuidelines(false)} />}
      </div>
    </nav>
  );
}

export default Navbar;
