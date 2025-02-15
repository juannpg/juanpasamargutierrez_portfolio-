import { useEffect, useState } from "react";
import { languages } from "../i18n/ui";

/**
 * Obtiene el valor de una cookie por su nombre (solo en el cliente).
 */
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null; // Evita error en el servidor

  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1] || null;
};

/**
 * Establece una cookie con expiración a largo plazo (10 años).
 */
const setCookie = (name: string, value: string, days: number = 3650): void => {
  if (typeof document === "undefined") return; // Evita error en el servidor

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
};

export default function LanguagePicker() {
  const [preferredLanguage, setPreferredLanguage] = useState<string | null>(null);

  // Cargar el idioma desde la cookie cuando el componente se monte en el cliente
  useEffect(() => {
    const storedLang = getCookie("preferredLanguage") || navigator.language.split("-")[0];
    setPreferredLanguage(storedLang);
  }, []);

  useEffect(() => {
    if (preferredLanguage) {
      setCookie("preferredLanguage", preferredLanguage);
    }
  }, [preferredLanguage]);

  if (!preferredLanguage) return null; // Evita renderizar antes de cargar el idioma

  return (
    <ul className="text-[var(--white)] text-sm flex flex-row gap-2 items-center">
      {Object.entries(languages).map(([lang, label]) => (
        <li key={lang}>
          <a href={`/${lang}/`} onClick={() => setPreferredLanguage(lang)}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
