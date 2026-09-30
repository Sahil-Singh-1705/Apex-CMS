'use client'
import React, { createContext, useState } from "react";
import {LanguageContext} from '@/context/context';

export const LanguageProvider = ({ children }) => {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState("en"); // Default language

  const changeLanguage = (languageCode) => {
    setSelectedLanguageCode(languageCode);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguageCode, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
