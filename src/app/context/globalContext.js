"use client";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

// export const GlobalContextProvider = ({ children }) => {
//   const [activeCityCoords, setActiveCityCoords] = useState([]);
//   const [forecast, setForecast] = useState({});
//   const [airQuality, setAirQuality] = useState({});

//   // const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;
//   const apikey = "4b2c5863df1eea7015fdc51d41756899";

//   const fetchForecast = async (lat, lon) => {
//     try {
//       const res = await axios.get(
//         `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
//       );

//       setForecast(res.data);
//     } catch (error) {
//       console.log("Error fetching forecast data: ", error.message);
//     }
//   };

//   const fetchAirQuality = async (lat, lon) => {
//     try {
//       const res = await axios.get(
//         `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
//       );
//       setAirQuality(res.data);
//     } catch (error) {
//       console.log("Error fetching air quality data: ", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchForecast(activeCityCoords[0], activeCityCoords[1]);
//     fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
//   }, [activeCityCoords]);

//   return (
//     <GlobalContext.Provider
//       value={{
//         forecast,
//         activeCityCoords,
//         airQuality,
//       }}
//     >
//       <GlobalContextUpdate.Provider
//         value={{
//           setActiveCityCoords,
//         }}
//       >
//         {children}
//       </GlobalContextUpdate.Provider>
//     </GlobalContext.Provider>
//   );
// };

// export const useGlobalContext = () => useContext(GlobalContext);
// export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);

export const GlobalContextProvider = ({ children }) => {
  const [activeCityCoords, setActiveCityCoords] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  // const apiKey = "4b2c5863df1eea7015fdc51d41756899";
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;

  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };

  useEffect(() => {
    if (activeCityCoords.length > 0) {
      fetchForecast(activeCityCoords[0], activeCityCoords[1]);
      fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    }
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        activeCityCoords,
        airQuality,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
