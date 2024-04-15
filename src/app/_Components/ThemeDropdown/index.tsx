
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ThemeDropdown() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const buttonBorderStyle = theme === "light" ? "border-black" : "border-white";
  return (
    <div className="dropdown">
      <div className="dropdown-content">
        <button
          onClick={toggleTheme}
          className={`border  px-4 py-3 rounded-md shadow-md hover:shadow-lgtransition duration-300 ease-in-out ${buttonBorderStyle}`}
        >
          {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
        </button>
      </div>
    </div>
  );
}

export default ThemeDropdown;
