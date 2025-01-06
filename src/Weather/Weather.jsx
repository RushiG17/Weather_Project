import React, { useEffect, useState } from "react";
import thunderImage from "../Images/thunder.png";
import TornadoImage from "../Images/Tornado.png";
import sunImage from "../Images/sun.png";
import rainWithCloudImage from "../Images/rain_with_cloud.png";

const Weather = () => {
  const [city, setCity] = useState("Nagpur");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const Api_key =import.meta.env.VITE_API_KEY;


  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`;

  const API_KEY = Api_key ;

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Thunderstorm":
        return thunderImage;
      case "Tornado":
        return TornadoImage;
      case "Clear":
        return sunImage;
      case "Rain":
      case "Drizzle":
      case "Clouds":
        return rainWithCloudImage;
      default:
        return sunImage; // Default icon
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 flex flex-col items-center py-8">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white shadow-lg">Weather App</h1>

      {/* Weather Card */}
      <div className="mt-10 w-96 bg-white rounded-lg shadow-xl flex flex-col items-center px-6 py-8 relative">
        {isLoading ? (
          <h2 className="text-gray-600 text-lg font-medium">Loading...</h2>
        ) : weatherData ? (
          <>
            {/* Current Date */}
            <div className="absolute top-4 left-4 bg-blue-100 text-blue-700 text-xl ml-20 font-medium px-3 py-1 rounded-full shadow-sm">
              {formattedDate}
            </div>

            {/* City */}
            <h3 className="mt-8 text-2xl font-bold text-gray-800">{weatherData.name}</h3>

            {/* Weather Icon */}
            <img
              src={getWeatherIcon(weatherData.weather[0].main)}
              alt={weatherData.weather[0].main}
              className="w-24 h-24 mt-4"
            />

            {/* Temperature */}
            <h3 className="mt-4 text-3xl font-semibold text-blue-600">
              {(weatherData.main.temp - 273.15).toFixed(2)}°C
            </h3>

            {/* Weather Description */}
            <p className="mt-2 text-gray-600 capitalize text-lg">
              {weatherData.weather[0].description}
            </p>

            {/* Search Form */}
            <form
              className="flex items-center space-x-3 w-full mt-6"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 placeholder-gray-400"
                placeholder="Enter city name"
                value={city}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
              >
                Get
              </button>
            </form>
          </>
        ) : (
          <h2 className="text-red-600 text-lg font-semibold">Failed to fetch weather data</h2>
        )}
      </div>
    </div>
  );
};

export default Weather;
