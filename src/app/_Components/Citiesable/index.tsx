"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/app/context/globalContext";
import SearchBar from "../SearchBar";
import Navbar from "../Navbar";

interface City {
  geoname_id: string;
  name: string;
  cou_name_en: string;
  population: number;
  timezone: string;
  coordinates: {
    lon: number;
    lat: number;
  };
}

interface SortColumn {
  name: keyof City;
  label: string;
}

const sortColumns: SortColumn[] = [
  { name: "name", label: "City Name" },
  { name: "cou_name_en", label: "Country" },
  { name: "population", label: "Population" },
];

function CitiesTable() {
  const { cities } = useGlobalContext();
  const [sortColumn, setSortColumn] = useState<keyof City>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (cities >= 0) {
    return (
      <div className="w-full text-center text-[2rem] animate-pulse">
        {" "}
        Loading...
      </div>
    );
  }
  const sortedCities = Array.isArray(cities)
    ? cities.slice().sort((a, b) => {
        const aValue =
          typeof a[sortColumn] === "string"
            ? a[sortColumn]
            : String(a[sortColumn]);
        const bValue =
          typeof b[sortColumn] === "string"
            ? b[sortColumn]
            : String(b[sortColumn]);
        if (sortDirection === "asc") {
          if (typeof aValue === "string" && typeof bValue === "string") {
            return aValue.localeCompare(bValue);
          }
          return 0;
        } else {
          if (typeof aValue === "string" && typeof bValue === "string") {
            return bValue.localeCompare(aValue);
          }
          return 0;
        }
      })
    : [];

  const handleSort = (column: keyof City) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredCities = sortedCities.filter((city: { name: string }) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto w-full  px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center gap-2">
        <SearchBar onSearch={handleSearch} />
        <Navbar />
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-screen overflow-y-auto ">
          <table className="w-full border-collapse table-auto dark:bg-gray-800 my-5">
            <thead className="my-4 ">
              <tr className="text-left">
                {sortColumns.map((column) => (
                  <th
                    className="py-3 px-4 cursor-pointer"
                    key={column.name}
                    onClick={() => handleSort(column.name)}
                  >
                    {column.label}
                    {sortColumn === column.name && (
                      <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                ))}
                <th className="py-3 px-4">Timezone</th>
                <th className="py-3 px-4">Coordinates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto">
              {filteredCities.map((city: City, index: number) => (
                <tr
                  key={city.geoname_id}
                  className={
                    index % 2 === 0 ? " dark:bg-gray-900" : " dark:bg-gray-800"
                  }
                >
                  <td className="py-3 px-4">
                    <Link
                      href={{
                        pathname: `weatherForecast/`,
                        query: {
                          lat: city.coordinates.lat,
                          lon: city.coordinates.lon,
                        },
                      }}
                      target="_blank"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text hover:underline"
                    >
                      {city.name}
                    </Link>
                  </td>
                  <td className="py-2 px-2">{city.cou_name_en}</td>
                  <td className="py-2 px-2">{city.population}</td>
                  <td className="py-2 px-2">{city.timezone}</td>
                  <td className="py-2 px-2">
                    Lat: {city.coordinates.lat}, Lon: {city.coordinates.lon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CitiesTable;
