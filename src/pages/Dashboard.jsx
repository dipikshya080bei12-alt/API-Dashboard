import { useState } from "react";
import Weathercard from "../components/Weathercard";


function Dashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return setError("Enter a city name");

    try {
      setError("");
      // 1. Geocoding
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
      const geoData = await geoRes.json();
      if (!geoData.results) return setError("City not found");

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Weather
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherData = await weatherRes.json();

      setWeather({
        name,
        country,
        temperature: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed
      });
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="main">
      <h1>Weather Dashboard</h1>
      <p className="subtitle">Check current weather of any city</p>

      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p>{error}</p>}

      {weather && (
        <div className="output">
          <Weathercard title={`${weather.name}, ${weather.country}`} value="" />
          <Weathercard title="Temperature" value={`${weather.temperature} °C`} />
          <Weathercard title="Wind Speed" value={`${weather.wind} km/h`} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;