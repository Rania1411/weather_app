export const DEFAULT_UNITS = { temp: "c", wind: "kmh" };

export const formatTemp = (celsius, unit) => {
  if (celsius == null) return "--";
  return Math.round(unit === "f" ? (celsius * 9) / 5 + 32 : celsius);
};

export const formatWind = (kmh, unit) => {
  if (kmh == null) return "--";
  return unit === "mph" ? `${Math.round(kmh * 0.621371)} mph` : `${Math.round(kmh)} km/h`;
};