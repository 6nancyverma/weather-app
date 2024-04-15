"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { thermo } from "@/app/utils/icons";
import { airQulaityIndexText } from "@/app/utils/misc";
import React from "react";

function AirPollution() {
  const { airQuality } = useGlobalContext();

  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
      <div className="animate-pulse h-[12rem] p-5 w-full col-span-2 md:col-span-full border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2">
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = airQulaityIndexText.find((item) => {
    return item.rating === airQualityIndex;
  });

  return (
    <div className="air-pollution py-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2">
      <h2 className="flex items-center gap-2 font-medium">
        {thermo} Air Pollution
      </h2>
      <div className="relative h-4 w-full progress rounded-full overflow-hidden">
        <div
          className="absolute h-4 w-4 my-2 bg-white rounded-full transform -translate-y-1/2 -translate-x-1/2"
          style={{ left: `${airQualityIndex}%` }}
        ></div>
      </div>

      <p className="text-sm">Air quality is {filteredIndex?.description}. </p>
    </div>
  );
}

export default AirPollution;
