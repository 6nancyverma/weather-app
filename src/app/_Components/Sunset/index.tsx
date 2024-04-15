"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { sunset } from "@/app/utils/icons";
import { unixToTime } from "@/app/utils/misc";
import React from "react";

function Sunset() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
    return (
      <div className="animate-pulse h-[12rem] p-5 w-full col-span-2 md:col-span-full border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2" />
    );
  }

  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;

  const sunsetTime = unixToTime(times, timezone);
  const sunrise = unixToTime(forecast?.sys?.sunrise, timezone);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{sunset}Sunset</h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>

      <p className="text-sm">Sunrise: {sunrise}</p>
    </div>
  );
}

export default Sunset;
