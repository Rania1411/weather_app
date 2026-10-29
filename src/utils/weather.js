import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

const info = (label, icon) => ({ label, icon });

const WEATHER_CODES = {
  0: info("Clear sky", Sun),
  1: info("Mainly clear", CloudSun),
  2: info("Partly cloudy", CloudSun),
  3: info("Overcast", Cloud),
  45: info("Foggy", CloudFog),
  48: info("Rime fog", CloudFog),
  51: info("Light drizzle", CloudDrizzle),
  53: info("Moderate drizzle", CloudDrizzle),
  55: info("Dense drizzle", CloudDrizzle),
  56: info("Freezing drizzle", CloudDrizzle),
  57: info("Freezing drizzle", CloudDrizzle),
  61: info("Slight rain", CloudRain),
  63: info("Moderate rain", CloudRain),
  65: info("Heavy rain", CloudRain),
  66: info("Freezing rain", CloudRain),
  67: info("Freezing rain", CloudRain),
  71: info("Slight snow", CloudSnow),
  73: info("Moderate snow", CloudSnow),
  75: info("Heavy snow", CloudSnow),
  77: info("Snow grains", CloudSnow),
  80: info("Slight showers", CloudRain),
  81: info("Moderate showers", CloudRain),
  82: info("Violent showers", CloudRain),
  85: info("Snow showers", CloudSnow),
  86: info("Heavy snow showers", CloudSnow),
  95: info("Thunderstorm", CloudLightning),
  96: info("Thunderstorm with hail", CloudLightning),
  99: info("Thunderstorm with heavy hail", CloudLightning),
};

export const getWeatherInfo = (code) => WEATHER_CODES[code] ?? info("Unknown", Cloud);

export const formatHour = (dateTime) =>
  new Date(dateTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export const formatDay = (date, index) =>
  index === 0
    ? "Today"
    : new Date(`${date}T12:00`).toLocaleDateString("en-US", { weekday: "short" });

export const formatFullDate = (dateTime) => {
  const day = new Date(dateTime).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return `${day} • ${formatHour(dateTime)}`;
};

export const describeUv = (uv) => {
  if (uv == null) return "";
  if (uv < 3) return "Low";
  if (uv < 6) return "Moderate";
  if (uv < 8) return "High";
  if (uv < 11) return "Very high";
  return "Extreme";
};