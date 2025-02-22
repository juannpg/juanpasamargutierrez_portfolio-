import { useState, useEffect } from 'react';

const setCookie = (name: string, value: string): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
};

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = getCookie("preferredTheme");
    setIsDark(storedTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    updateVisibility(isDark);
    setCookie("preferredTheme", isDark ? "dark" : "light");
  }, [isDark]);

  const updateVisibility = (isDark: boolean) => {
    const classPrefix = isDark ? 'White' : 'Black';
    const oppositePrefix = isDark ? 'Black' : 'White';

    document.querySelectorAll(`.linkedinHero${classPrefix}`).forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll(`.linkedinHero${oppositePrefix}`).forEach(el => el.classList.add('hidden'));

    document.querySelectorAll(`.mailHero${classPrefix}`).forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll(`.mailHero${oppositePrefix}`).forEach(el => el.classList.add('hidden'));

    document.querySelectorAll(`.githubHero${classPrefix}`).forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll(`.githubHero${oppositePrefix}`).forEach(el => el.classList.add('hidden'));
  };

  const toggleTheme = () => setIsDark(prev => !prev);

  return { isDark, toggleTheme };
};
