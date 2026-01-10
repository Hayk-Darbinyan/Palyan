import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { useCategoryStore } from "@/stores/useCategoryStore";
import type { Language } from "@/types/catalog";

interface LanguageSelectorProps {
  variant?: "desktop" | "mobile";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = "desktop",
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => {
    const savedLang = localStorage.getItem("selectedLanguage");
    return savedLang || "hy";
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "hy", name: variant === "mobile" ? "ՀԱՅ" : "Հայ", icon: "https://flagcdn.com/am.svg" },
    { code: "ru", name: variant === "mobile" ? "РУС" : "Ру", icon: "https://flagcdn.com/ru.svg" },
    { code: "en", name: variant === "mobile" ? "ENG" : "En", icon: "https://flagcdn.com/gb.svg" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === selectedLang) || languages[0];

  const changeLanguage = (langCode: Language) => {
    setSelectedLang(langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem("selectedLanguage", langCode);
    useCategoryStore.getState().setLanguage(langCode);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage") || "hy";
    i18n.changeLanguage(savedLang);
    document.documentElement.lang = savedLang;
  }, [i18n]);

  // Mobile variant - Simple buttons row
  if (variant === "mobile") {
    return (
      <div className="border-t border-gray-100 pt-4 mt-4">
        <div className="flex gap-2 px-4">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code as Language)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors flex-1 justify-center cursor-pointer ${
                selectedLang === language.code
                  ? "bg-[#0E99A2] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="w-5 h-3.75">
                <img
                  src={language.icon}
                  alt={language.code.toUpperCase()}
                  className="w-full h-full"
                />
              </div>
              <span className="text-sm font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop variant - Dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <img
            src={currentLanguage.icon}
            alt={currentLanguage.code.toUpperCase()}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="hidden md:inline text-sm font-medium text-white">
          {currentLanguage.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-white transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-26 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code as Language)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 cursor-pointer ${
                  selectedLang === language.code ? "bg-[#F8F7F0]" : ""
                }`}
                role="menuitem"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <img
                    src={language.icon}
                    alt={language.code.toUpperCase()}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <span
                    className={`font-medium ${
                      selectedLang === language.code
                        ? "text-[#404A3D]"
                        : "text-gray-700"
                    }`}
                  >
                    {language.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
