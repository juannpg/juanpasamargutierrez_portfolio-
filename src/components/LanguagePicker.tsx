import type React from "react"
import { useState, useEffect, useRef } from "react"
import { languages, images } from "../i18n/ui"

const setCookie = (name: string, value: string): void => {
  const expira = new Date()
  expira.setTime(expira.getTime() + 3650 * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; path=/; expires=${expira.toUTCString()}`
}

const LanguagePicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState<string>("")
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const getCookie = (name: string): string | null => {
    const match: RegExpMatchArray | null = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

  useEffect(() => {
    const langCookie = getCookie("preferredLanguage");
    if (langCookie && langCookie in languages) {
      setSelectedLang(langCookie);
    }

    const langUrl = window.location.pathname.split("/")[1];
    if (langUrl && langUrl in languages) {
      setSelectedLang(langUrl);
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang)
    setCookie("preferredLanguage", lang)
    setIsOpen(false)
    window.location.href = `/${lang}/`
  }

  const defaultLang = Object.keys(languages)[0]

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-[var(--white)] bg-[var(--item-bg)] rounded-md hover:bg-[var(--icon-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[ar(--white)] focus-visible:ring-opacity-75 gap-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={selectedLang ? images[selectedLang] : images[defaultLang]} alt="Flag of country" className="w-5"/>
          {selectedLang ? languages[selectedLang] : languages[defaultLang]}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="z-10 origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-[var(--white)] ring-1 ring-[var(--black)] ring-opacity-5 focus:outline-none">
          <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {(Object.entries(languages)).map(([lang, label]) => (
              <a
                key={lang}
                href={`/${lang}/`}
                className="block px-4 py-2 text-sm text-[var(--black)] hover:bg-[var(--subtitle-1)] rounded-md"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault()
                  handleLanguageSelect(lang)
                }}
              >
                <div className="flex flex-row items-center gap-1">
                  <img src={images[lang]} alt="Flag of country" className="w-5"/>
                  {label}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguagePicker