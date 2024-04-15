import CitiesTable from "../app/_Components/Citiesable";

export default function Home() {
  return (
    <main className="mx-4 lg:mx-8 xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <h1 className="text-[2rem] font-bold text-center mt-8 mb-4">
        Weather Forecast{" "}
      </h1>
      <CitiesTable />
    </main>
  );
}
