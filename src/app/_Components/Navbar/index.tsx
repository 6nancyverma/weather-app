// Navbar.tsx
"use client";
import React, { useState } from "react";
import ThemeDropdown from "../ThemeDropdown";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

interface NavbarProps {
  onSearch: (term: string) => void;
}

function Navbar({ onSearch }: NavbarProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  const buttonStyles = {
    backgroundColor: theme === "light" ? "black" : "white",
    color: theme === "light" ? "white" : "black",
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full items-center gap-5 sm:w-fit">
        <ThemeDropdown />
        <input
          type="text"
          placeholder="Search city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          onClick={handleSearch}
          className="source-code flex items-center gap-2 px-4 py-2 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
          style={buttonStyles}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Navbar;
