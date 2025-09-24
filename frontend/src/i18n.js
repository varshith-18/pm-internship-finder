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
  AS: {
    translation: {
      title: "ইন্টাৰ্নশ্বিপ পৰামৰ্শদাতা",
      guidelines: "নিৰ্দেশিকা",
      selectSkills: "আপোনাৰ দক্ষতা নিৰ্বাচন কৰক",
      next: "পৰবৰ্তী",
      back: "পূৰ্ববৰ্তী",
    },
  },
  BN: {
    translation: {
      title: "ইন্টার্নশিপ সুপারিশকারী",
      guidelines: "নির্দেশিকা",
      selectSkills: "আপনার দক্ষতা নির্বাচন করুন",
      next: "পরবর্তী",
      back: "পূর্ববর্তী",
    },
  },
  GU: {
    translation: {
      title: "ઇન્ટર્નશિપ ભલામણકર્તા",
      guidelines: "માર્ગદર્શિકા",
      selectSkills: "તમારી કૌશલ્યો પસંદ કરો",
      next: "આગળ",
      back: "પાછળ",
    },
  },
  KN: {
    translation: {
      title: "ಇಂಟರ್ನ್‌ಶಿಪ್ ಶಿಫಾರಸುದಾರ",
      guidelines: "ಮಾರ್ಗದರ್ಶನಗಳು",
      selectSkills: "ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
      next: "ಮುಂದೆ",
      back: "ಹಿಂದೆ",
    },
  },
  ML: {
    translation: {
      title: "ഇന്റേൺഷിപ്പ് ശുപാർശക്കാരൻ",
      guidelines: "മാർഗ്ഗനിർദ്ദേശങ്ങൾ",
      selectSkills: "നിങ്ങളുടെ കഴിവുകൾ തിരഞ്ഞെടുക്കുക",
      next: "അടുത്തത്",
      back: "തിരികെ",
    },
  },
  MR: {
    translation: {
      title: "इंटर्नशिप शिफारसकर्ता",
      guidelines: "मार्गदर्शक तत्त्वे",
      selectSkills: "तुमची कौशल्ये निवडा",
      next: "पुढे",
      back: "मागे",
    },
  },
  OR: {
    translation: {
      title: "ଇଣ୍ଟର୍ନସିପ୍ ସୁପାରିଶକାରୀ",
      guidelines: "ନିର୍ଦ୍ଦେଶାବଳୀ",
      selectSkills: "ଆପଣଙ୍କର ଦକ୍ଷତା ଚୟନ କରନ୍ତୁ",
      next: "ପରବର୍ତ୍ତୀ",
      back: "ପୂର୍ବବର୍ତ୍ତୀ",
    },
  },
  PA: {
    translation: {
      title: "ਇੰਟਰਨਸ਼ਿਪ ਸਿਫਾਰਿਸ਼ਕਰਤਾ",
      guidelines: "ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼",
      selectSkills: "ਆਪਣੇ ਹੁਨਰ ਚੁਣੋ",
      next: "ਅਗਲਾ",
      back: "ਪਿਛਲਾ",
    },
  },
  TE: {
    translation: {
      title: "ఇంటర్న్‌షిప్ సిఫార్సుదారు",
      guidelines: "మార్గదర్శకాలు",
      selectSkills: "మీ నైపుణ్యాలను ఎంచుకోండి",
      next: "తర్వాత",
      back: "వెనుకకు",
    },
  },
  TA: {
    translation: {
      title: "பயிற்சி பரிந்துரையாளர்",
      guidelines: "வழிகாட்டுதல்கள்",
      selectSkills: "உங்கள் திறன்களை தேர்ந்தெடுக்கவும்",
      next: "அடுத்து",
      back: "பின்னால்",
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
