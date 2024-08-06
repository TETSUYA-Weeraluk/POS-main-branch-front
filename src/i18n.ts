import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translateTh from "./locales/TH.json";
import translateEn from "./locales/EN.json";

const resources = {
  TH: {
    translation: translateTh,
  },
  EN: {
    translation: translateEn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "EN",
});

export default i18n;
