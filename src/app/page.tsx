import { useState } from "react";
import CitiesTable from "../app/_Components/Citiesable";
import Navbar from "./_Components/Navbar";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  return (
    <main className="mx-4 lg:mx-8 xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar onSearch={handleSearch} />
      <CitiesTable searchTerm={searchTerm} />
    </main>
  );
}
