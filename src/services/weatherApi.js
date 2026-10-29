const GEO_ENDPOINT = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const AIR_ENDPOINT = "https://air-quality-api.open-meteo.com/v1/air-quality";
const IP_ENDPOINT = "https://ipapi.co/json/";
const DEFAULT_CITY = "Algiers";

const CAPITALS = {
  DZ: "Algiers",
  FR: "Paris",
  US: "Washington, D.C.",
  GB: "London",
  DE: "Berlin",
  IT: "Rome",
  ES: "Madrid",
  CA: "Ottawa",
  AU: "Canberra",
  JP: "Tokyo",
  CN: "Beijing",
  IN: "New Delhi",
  BR: "Brasília",
  RU: "Moscow",
  ZA: "Pretoria",
  EG: "Cairo",
  NG: "Abuja",
  KE: "Nairobi",
  MA: "Rabat",
  TN: "Tunis",
};

const round = (value) => (value == null ? null : Math.round(value));

const request = async (url, signal, errorMessage) => {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(errorMessage);
  return response.json();
};

export const detectDefaultCity = async (signal) => {
  try {
    const data = await request(IP_ENDPOINT, signal, "Failed to detect location");
    return CAPITALS[data.country_code] ?? DEFAULT_CITY;
  } catch (err) {
    if (err.name === "AbortError") throw err;
    return DEFAULT_CITY;
  }
};

export const fetchWeather = async (cityName, signal) => {
  const geo = await request(
    `${GEO_ENDPOINT}?name=${encodeURIComponent(cityName)}&count=1`,
    signal,
    "Failed to fetch city data"
  );

  if (!geo.results?.length) throw new Error("City not found");

  const { latitude, longitude, name, country } = geo.results[0];

  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone: "auto",
    forecast_days: "7",
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,visibility,wind_speed_10m,weather_code",
    hourly: "temperature_2m,precipitation_probability,weather_code,wind_speed_10m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,sunrise,sunset",
  });

  const data = await request(
    `${WEATHER_ENDPOINT}?${params}`,
    signal,
    "Failed to fetch weather data"
  );

  const { current: c, hourly: h, daily: d } = data;
  if (!c || !h || !d) throw new Error("Weather data not available");

  const currentHour = `${c.time.slice(0, 13)}:00`;
  const start = Math.max(0, h.time.findIndex((t) => t >= currentHour));

  return {
    city: name,
    country,
    latitude,
    longitude,
    current: {
      time: c.time,
      temperature: c.temperature_2m,
      feelsLike: c.apparent_temperature,
      humidity: c.relative_humidity_2m,
      pressure: round(c.pressure_msl),
      visibility: c.visibility == null ? null : Math.round(c.visibility / 100) / 10,
      windSpeed: c.wind_speed_10m,
      code: c.weather_code,
    },
    hourly: h.time.slice(start, start + 24).map((time, i) => ({
      time,
      temperature: h.temperature_2m[start + i],
      code: h.weather_code[start + i],
      rainChance: h.precipitation_probability[start + i],
      wind: h.wind_speed_10m[start + i],
    })),
    daily: d.time.map((date, i) => ({
      date,
      code: d.weather_code[i],
      max: d.temperature_2m_max[i],
      min: d.temperature_2m_min[i],
      rainChance: d.precipitation_probability_max[i],
      uvIndex: round(d.uv_index_max[i]),
      sunrise: d.sunrise[i],
      sunset: d.sunset[i],
    })),
  };
};

export const fetchAirQuality = async (latitude, longitude, signal) => {
  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone: "auto",
    current: "us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide,sulphur_dioxide,carbon_monoxide",
  });

  const data = await request(
    `${AIR_ENDPOINT}?${params}`,
    signal,
    "Failed to fetch air quality data"
  );

  if (!data.current) throw new Error("Air quality data not available");

  const c = data.current;
  return {
    aqi: round(c.us_aqi),
    pm25: round(c.pm2_5),
    pm10: round(c.pm10),
    ozone: round(c.ozone),
    no2: round(c.nitrogen_dioxide),
    so2: round(c.sulphur_dioxide),
    co: round(c.carbon_monoxide),
  };
};