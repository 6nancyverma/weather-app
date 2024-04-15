"use client";
import React from "react";
import ThemeDropdown from "../ThemeDropdown";
import { useTheme } from "next-themes";
import { github } from "@/app/utils/icons";
import Link from "next/link";

function Navbar() {
  const { theme } = useTheme();

  const buttonStyles = {
    backgroundColor: theme === "light" ? "black" : "white",
    color: theme === "light" ? "white" : "black",
  };

  return (
    <div className=" py-4 flex items-center justify-end pr-4 gap-2">
      <ThemeDropdown />
      <Link
        href="https://github.com/6nancyverma/weather-app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        style={buttonStyles}
      >
        {github} Source Code
      </Link>
    </div>
  );
}

export default Navbar;
