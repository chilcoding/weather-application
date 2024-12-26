import { useState } from "react";

const App = () => {
  const weatherApi = "84bd327e0160736e41735f45c01c27e9";

  // State variables
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Fetch Weather Data
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
    <div className="w-[20vw] h-[50vh] bg-blue-500 flex justify-center items-center flex-col rounded-md">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded-md focus:outline-none text-black shadow-md"
        />
        <button
          onClick={fetchWeather}
          className="p-2 bg-blue-500 text-white rounded-md border shadow-md"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weather && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-xl font-semibold">{weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default App;
