import React, { useEffect, useState } from "react";
import axios from "axios";

interface WeatherData {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

const WeatherPage: React.FC<{ cityName: string }> = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div>
      <h2>Weather for {cityName}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <p>Pressure: {weatherData.main.pressure} hPa</p>
    </div>
  );
};

export default WeatherPage;
