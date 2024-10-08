"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "../Navbar";
import SearchBar from "../SearchBar";

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
  const [cities, setCities] = useState<City[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof City>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=99"
        );

        // Log the entire API response
        console.log("API Response:", response.data);

        // Check if response.data.results exists
        if (response.data && response.data.results) {
          // Log the results for debugging
          console.log("Results:", response.data.results);

          // Check if results are available
          if (response.data.results.length > 0) {
            const formattedCities = response.data.results.map((record: any) => {
              // Log each record to understand its structure
              console.log("Record:", record);

              // Ensure the record has the expected properties
              return {
                // geoname_id: record.fields?.geoname_id || "N/A",
                geoname_id: record.fields?.geoname,
                name: record?.name || "Unknown",
                // name:record.cou_name_en
                cou_name_en: record?.cou_name_en || "Unknown",
                population: record?.population || 0,
                timezone: record?.timezone || "Unknown",
                coordinates: {
                  lon: record.coordinates?.lon || 0,
                  lat: record.coordinates?.lat || 0,
                },
              };
            });

            setCities(formattedCities);
          } else {
            console.error("No results found in response data.");
          }
        } else {
          console.error("No results found in response data.");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=99"
  //     );

  //     // Check if records exist in the response
  //     if (response.data && response.data.records) {
  //       // Map the records to your City structure
  //       const cityData = response.data.records.map((record: any) => {
  //         const fields = record.fields;
  //         return {
  //           geoname_id: fields.geoname_id || "N/A", // Ensure fallback if geoname_id is undefined
  //           name: fields.name || "Unknown",
  //           cou_name_en: fields.cou_name_en || "Unknown",
  //           population: fields.population || 0,
  //           timezone: fields.timezone || "Unknown",
  //           coordinates: {
  //             lon: fields.coordinates ? fields.coordinates.lon : 0,
  //             lat: fields.coordinates ? fields.coordinates.lat : 0,
  //           },
  //         };
  //       });

  //       setCities(cityData);
  //     } else {
  //       console.log("No records found in response data.");
  //     }
  //   } catch (error) {
  //     console.log("Error fetching cities:", error);
  //   }
  // };

  const sortedCities = Array.isArray(cities)
    ? cities.slice().sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (sortDirection === "asc") {
          return typeof aValue === "string"
            ? aValue.localeCompare(bValue as string)
            : aValue > bValue
            ? 1
            : -1;
        } else {
          return typeof bValue === "string"
            ? bValue.localeCompare(aValue as string)
            : bValue > aValue
            ? 1
            : -1;
        }
      })
    : [];

  // Handle sorting
  const handleSort = (column: keyof City) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Filter cities based on search term
  const filteredCities = sortedCities.filter((city: City) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto w-full  px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center gap-2">
        <SearchBar onSearch={handleSearch} />
        <Navbar />
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-screen overflow-y-auto">
          <table className="w-full border-collapse table-auto dark:bg-gray-800 my-5">
            <thead>
              <tr className="text-left">
                {sortColumns.map((column) => (
                  <th
                    key={column.name}
                    onClick={() => handleSort(column.name)}
                    className="py-3 px-4 cursor-pointer"
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
                  key={`${city.geoname_id}-${city.name}`} // Unique key by combining geoname_id and name
                  className={
                    index % 2 === 0 ? "dark:bg-gray-900" : "dark:bg-gray-800"
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
