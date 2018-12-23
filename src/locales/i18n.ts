import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import translations from "./translations";
i18n.use(reactI18nextModule).init({
  resources: translations,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});
export default i18n;
