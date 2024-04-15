"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Temperature from "@/app/_Components/Temperature";
import Sunset from "@/app/_Components/Sunset";
import Wind from "@/app/_Components/Wind";
import FeelsLike from "@/app/_Components/FeelsLike";
import Humidity from "@/app/_Components/Humidity";
import Visibility from "@/app/_Components/Visibility";
import AirPollution from "@/app/_Components/AirPollution";
import Pressure from "@/app/_Components/Pressure";

import { useGlobalContextUpdate } from "@/app/context/globalContext";
import { phone } from "../utils/icons";

const DynamicMap = dynamic(() => import("@/app/_Components/Map"), {
  ssr: false,
});

function WeatherForecast({
  searchParams,
}: {
  searchParams: { lat: number; lon: number };
}) {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  useEffect(() => {
    setActiveCityCoords(searchParams.lat, searchParams.lon);
  }, [searchParams, setActiveCityCoords]);

  return (
    <>
      <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto py-5">
        <div className="pb-4 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
            <Temperature />
            <div className="flex flex-col gap-4">
              <Visibility />
              <Pressure />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 ">
              <AirPollution />
              <Sunset />
              <Wind />
              <FeelsLike />
              <Humidity />
            </div>
            <div className="mt-4 w-full h-full flex justify-center">
              <DynamicMap />
            </div>
          </div>
        </div>

        <footer className="py-4 flex justify-center items-center flex-col gap-2 pb-8">
          <p className="footer-text text-sm flex items-center gap-1">
            Made by
            <Image src={"/logo-white.svg"} alt="logo" width={20} height={20} />
            <Link
              href="https://nancyverma-reactportfolio1.netlify.app"
              target="_blank"
              className=" text-green-300 font-bold"
            >
              Nancy verma
            </Link>
          </p>
          <p className="flex items-center gap-1">
            {phone}
            <span>7985192890</span>
          </p>
        </footer>
      </main>
    </>
  );
}

export default WeatherForecast;
