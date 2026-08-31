import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  Droplets,
  Wind,
} from "lucide-react";

const Forcaste = ({
  time,
  temperature,
  hourly_weather_code,
  precipitation_probability,
  wind_speed_10m,
}) => {
  const getWeatherIcon = (code) => {
    if (code === 0) return <Sun size={32} />;
    if (code === 1 || code === 2) return <CloudSun size={32} />;
    if (code === 3) return <Cloud size={32} />;
    if (code === 45 || code === 48) return <CloudFog size={32} />;
    if (code >= 51 && code <= 67) return <CloudRain size={32} />;
    if (code >= 71 && code <= 77) return <Snowflake size={32} />;
    if (code >= 80 && code <= 82) return <CloudRain size={32} />;
    if (code >= 95) return <CloudLightning size={32} />;

    return <Cloud size={32} />;
  };

  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Foggy",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Slight snow",
      73: "Moderate snow",
      75: "Heavy snow",
      80: "Slight showers",
      81: "Moderate showers",
      82: "Heavy showers",
      95: "Thunderstorm",
      96: "Thunderstorm",
      99: "Thunderstorm",
    };

    return weatherCodes[code] || "Unknown";
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };


  const hoursToShow = time?.slice(0, 12) || [];

 return (
  <section className="mt-3 w-[950px] rounded-3xl bg-white/10 p-6 shadow-xl">
    
  
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900">
        Hourly Forecast
      </h2>

      <button className="text-sm font-medium text-[#3E8EDE] transition hover:text-[#2875c2]">
        View All
      </button>
    </div>

    <hr className="mb-5 border-gray-200" />

  
    <div className=" forcast_scroll flex gap-4 overflow-x-auto pb-3 ">
      {hoursToShow.map((hour, index) => {
        
        const code = hourly_weather_code?.[index];
        const temp = temperature?.[index];
        const rain = precipitation_probability?.[index];
        const wind = wind_speed_10m?.[index];

        return (
          <div
            key={hour}
            className="
              min-w-[125px]
              rounded-2xl
              border border-gray-200
              bg-gray-50
              p-4
              text-center
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-md
              hover:bg-white
            "
          >

            <p className="text-sm font-medium text-gray-500">
              {formatTime(hour)}
            </p>

        
            <div className="my-5 flex justify-center text-[#3E8EDE]">
              {getWeatherIcon(code)}
            </div>

        
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(temp)}°
            </p>

        
            <p className="mt-1 min-h-[32px] text-xs text-gray-500">
              {getWeatherDescription(code)}
            </p>

        
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-600">
              <Droplets
                size={14}
                className="text-[#3E8EDE]"
              />
              <span>
                {rain ?? "--"}%
              </span>
            </div>

            <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <Wind size={14} />
              <span>
                {wind !== undefined
                  ? Math.round(wind)
                  : "--"}{" "}
                km/h
              </span>
            </div>

          </div>
        );
      })}
    </div>
  </section>
);
};

export default Forcaste;