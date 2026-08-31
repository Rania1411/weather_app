import { useState,useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
 import LeftBar from"../components/leftBar"
 import Forcaste from "../components/Forcaste"
function  WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [userCountry, setUserCountry] = useState(null);
  

  const GEO_ENDPOINT = "https://geocoding-api.open-meteo.com/v1/search";
  const WEATHER_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
  const FCT_ENDPOINT="https://api.open-meteo.com/v1/forecast"

const getCapitalCity = (countryCode) => {
  const capitals = {
    'DZ': 'Algiers',
    'FR': 'Paris',
    'US': 'Washington, D.C.',
    'GB': 'London',
    'DE': 'Berlin',
    'IT': 'Rome',
    'ES': 'Madrid',
    'CA': 'Ottawa',
    'AU': 'Canberra',
    'JP': 'Tokyo',
    'CN': 'Beijing',
    'IN': 'New Delhi',
    'BR': 'Brasília',
    'RU': 'Moscow',
    'ZA': 'Pretoria',
    'EG': 'Cairo',
    'NG': 'Abuja',
    'KE': 'Nairobi',
    'MA': 'Rabat',
    'TN': 'Tunis',
  };
  return capitals[countryCode] || 'Algiers';
};
  const getWeather = async (cityName = city) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const geoResponse = await fetch(
        `${GEO_ENDPOINT}?name=${encodeURIComponent(cityName)}&count=1`
      );

      if (!geoResponse.ok) {
        throw new Error("Failed to fetch city data");
      }

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      
     const forecastResponse = await fetch(
  `${FCT_ENDPOINT}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&timezone=auto`
);

      if(!forecastResponse.ok){
        throw new Error(" failed to fetch  hourly forcast data")
      }
       const forecastData = await forecastResponse.json();
        if(!forecastData.hourly){
           throw new Error("foecast not found")
        }
console.log(forecastData)
     const weatherResponse = await fetch(
  `${WEATHER_ENDPOINT}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,visibility,wind_speed_10m,weather_code&timezone=auto`
);

      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const weatherData = await weatherResponse.json();

     
     setWeatherData({
  cityName: name,
  country: country,
  latitude,
  longitude,

 
  temperature: weatherData.current.temperature_2m,
  feelsLike: weatherData.current.apparent_temperature,
  humidity: weatherData.current.relative_humidity_2m,
  pressure: weatherData.current.pressure_msl,
  visibility: weatherData.current.visibility,
  windspeed: weatherData.current.wind_speed_10m,
  weathercode: weatherData.current.weather_code,
  time: weatherData.current.time,

 
  hourly_temperature: forecastData.hourly.temperature_2m,
  hourly_weather_code: forecastData.hourly.weather_code,
  precipitation_probability:
    forecastData.hourly.precipitation_probability,
  wind_speed_10m: forecastData.hourly.wind_speed_10m,
  forecast_time: forecastData.hourly.time,
});
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };
  const detectUserLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.country_name) {
      setUserCountry(data.country_name);
      const defaultCity = getCapitalCity(data.country_code);
      if (defaultCity) {
        setCity(defaultCity);
        getWeather(defaultCity);
      }
    }
  } catch (error) {
    console.error("Failed to detect location:", error);
    setCity("Algiers");
    getWeather("Algiers");
  }
}; 
useEffect(() => {
  detectUserLocation();
}, []);
  return (
  <div
    className="min-h-screen bg-cover bg-center bg-no-repeat overflow-x-hidden"
    style={{ backgroundImage: "url('/bg.jpg')" }}
  >
    <LeftBar />

    <div className="flex flex-col items-center pl-[260px]">
      
      <SearchBar
        city={city}
        setCity={setCity}
        getCity={getWeather}
      />

      {loading && (
        <p className="mt-4 text-white">
          Loading...
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-500">
          {error}
        </p>
      )}

      {weatherData && (
        <>
          <WeatherCard
            city={weatherData.cityName}
            country={weatherData.country}
            temperature={weatherData.temperature}
            feelsLike={weatherData.feelsLike}
            windspeed={weatherData.windspeed}
            weathercode={weatherData.weathercode}
            humidity={weatherData.humidity}
            pressure={weatherData.pressure}
            visibility={weatherData.visibility}
            date={date}
          />

          <Forcaste
            time={weatherData.forecast_time}
            temperature={weatherData.hourly_temperature}
            hourly_weather_code={weatherData.hourly_weather_code}
            precipitation_probability={
              weatherData.precipitation_probability
            }
            wind_speed_10m={weatherData.wind_speed_10m}
          />
        </>
      )}

    </div>
  </div>
);
}

export default WeatherApp;