import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  EN: {
    translation: {
      title: "Internship Recommender",
      guidelines: "Guidelines",
      selectSkills: "Select Your Skills",
      next: "Next",
      back: "Back",
      // Add more keys as needed
    },
  },
  HI: {
    translation: {
      title: "इंटर्नशिप अनुशंसा",
      guidelines: "दिशानिर्देश",
      selectSkills: "अपनी कौशल चुनें",
      next: "आगे",
      back: "पीछे",
      // Add more keys as needed
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "EN",
  fallbackLng: "EN",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
