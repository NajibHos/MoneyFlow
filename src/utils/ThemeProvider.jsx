import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  // get current theme or set light theme by default
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add("dark");
      document.body.style.backgroundColor = '#08080a';
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = '#f7f7f7';
    }

    localStorage.setItem('theme', theme);

  }, [theme])

  // toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      { children }
    </ThemeContext.Provider>
  )

}

// custom hook for consuming theme context
export const useTheme = () => useContext(ThemeContext);