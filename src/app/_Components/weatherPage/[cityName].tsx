import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherPage: React.FC<{ cityName: string }> = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=YOUR_API_KEY`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather Information for {cityName}</h1>
      <p>Temperature: {weatherData.main.temp}</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}</p>
      <p>Wind Speed: {weatherData.wind.speed}</p>
      <p>Pressure: {weatherData.main.pressure}</p>
      {/* Add more weather information as needed */}
    </div>
  );
};

export default WeatherPage;
