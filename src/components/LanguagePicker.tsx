import { languages } from "../i18n/ui";

const setCookie = (name: string, value: string): void => {
  const expira = new Date();
  expira.setTime(expira.getTime() + 3650 * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; path=/; expires=${expira.toUTCString()}`;
};

export default function LanguagePicker() {

  return (
    <ul className="text-[var(--white)] text-sm flex flex-row gap-2 items-center">
      {Object.entries(languages).map(([lang, label]) => (
        <li key={lang}>
          <a href={`/${lang}/`} onClick={() => setCookie("preferredLanguage", lang)}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
