import React, { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {

  const [city, setCity] = useState("");

  const [weather, setWeather] = useState({
    city: "City Name",
    temp: "--",
    condition: "--",
    humidity: "--"
  });

  const getWeather = () => {

    if(city.trim() === "") {
      alert("Enter city name");
      return;
    }

    // Demo data (replace with API later)
    setWeather({
      city: city,
      temp: "25",
      condition: "Cloudy",
      humidity: "60"
    });

  };

  return (

    <div className="layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main">

        {/* Navbar */}
        <Navbar />

        {/* Dashboard */}
        <Dashboard
          city={city}
          setCity={setCity}
          getWeather={getWeather}
          weather={weather}
        />

      </div>

    </div>

  );

}

export default App;
