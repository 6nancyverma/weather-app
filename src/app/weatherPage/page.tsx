"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Temperature from "@/app/_Components/Temperature";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import Sunset from "@/app/_Components/Sunset";
import Wind from "@/app/_Components/Wind";
import FeelsLike from "@/app/_Components/FeelsLike";
import Humidity from "@/app/_Components/Humidity";
import Visibility from "@/app/_Components/Visibility";
import Map from "@/app/_Components/Map";
import { Phone } from "lucide-react";
import AirPollution from "../_Components/AirPollution";
import Pressure from "../_Components/Pressure";

export default function WeatherPage({
  searchParams,
}: {
  searchParams: { lat: number; lon: number };
}) {
  const { activeCityCoords } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  useEffect(() => {
    // Update activeCityCoords when searchParams change
    setActiveCityCoords([searchParams.lat, searchParams.lon]);
  }, [searchParams, setActiveCityCoords]);
  console.log("activeCords--------", activeCityCoords);

  console.log("params", searchParams.lat, " ", searchParams.lon);

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
            <div className="mapbox-con mt-4 h-full flex gap-4">
              <Map />
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
            <Phone size={15} />
            <span>7985192890</span>
          </p>
        </footer>
      </main>
    </>
  );
}
