import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";

export default function Footer() {
  const { switchLanguage, locale, translateText } = useContext(LanguageContext);

  const [clientLocale, setClientLocale] = useState("");

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  const footerText = translateText("footer_text").replace("{year}", new Date().getFullYear());

  return (
    <footer className="bg-gray-300 text-black py-2 px-4 text-center text-sm md:text-base lg:text-md">
      <p>{footerText}</p>
    </footer>
  );
}
