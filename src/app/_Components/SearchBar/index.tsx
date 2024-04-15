import { useTheme } from "next-themes";
import React, { useState } from "react";

interface CitySearchProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<CitySearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const buttonBorderStyle =
    theme === "light"
      ? "border-black placeholder:text-black"
      : "border-white placehonder:text-white";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex justify-end ">
      <input
        type="text"
        placeholder="Search by city name..."
        className={`px-4 py-2 rounded-md border border-black bg-transparent  w-64 ${buttonBorderStyle}`}
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
