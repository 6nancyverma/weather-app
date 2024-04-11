"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

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

const CitiesTable: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof City>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20"
        );
        setCities(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const sortedCities = cities.slice().sort((a, b) => {
    const aValue =
      typeof a[sortColumn] === "string" ? a[sortColumn] : String(a[sortColumn]);
    const bValue =
      typeof b[sortColumn] === "string" ? b[sortColumn] : String(b[sortColumn]);
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
  });

  const handleSort = (column: keyof City) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredCities = sortedCities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {sortColumns.map((column) => (
              <th key={column.name} onClick={() => handleSort(column.name)}>
                {column.label}
                {sortColumn === column.name && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
            ))}
            <th>Timezone</th>
            <th>Coordinates</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map((city) => (
            <tr key={city.geoname_id}>
              <td>
                <Link
                  href={`/weatherPage/${city.name}`}
                  target="_blank"
                  onContextMenu={(
                    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                  ) => {
                    e.preventDefault();
                    window.open(`/weatherPage/${city.name}`, "_blank");
                  }}
                >
                  {city.name}
                </Link>
              </td>
              <td>{city.cou_name_en}</td>
              <td>{city.population}</td>
              <td>{city.timezone}</td>
              <td>
                Lat: {city.coordinates.lat}, Lon: {city.coordinates.lon}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitiesTable;
