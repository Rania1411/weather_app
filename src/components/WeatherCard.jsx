import {
  SunMedium,
  Cloud,
  Thermometer,
  Wind,
  Droplets,
  Gauge,
  Eye,
} from "lucide-react";

const WeatherCard = ({
  city,
  country,
  temperature,
  feelsLike,
  windspeed,
  weathercode,
  date,
  humidity,
  pressure,
  visibility,
}) => {
  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: "Clear Sky",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing Rime Fog",
      51: "Drizzle: Light",
      53: "Drizzle: Moderate",
      55: "Drizzle: Dense",
      61: "Rain: Slight",
      63: "Rain: Moderate",
      65: "Rain: Heavy",
      71: "Snow Fall: Slight",
      73: "Snow Fall: Moderate",
      75: "Snow Fall: Heavy",
      80: "Rain Showers: Slight",
      81: "Rain Showers: Moderate",
      82: "Rain Showers: Violent",
      95: "Thunderstorm",
      96: "Thunderstorm with Hail",
      99: "Thunderstorm with Heavy Hail",
    };

    return weatherCodes[code] || "Unknown Weather";
  };

  const weatherDesc = getWeatherDescription(weathercode);

  const isSunny = weathercode === 0 || weathercode === 1;
  const isCloudy = weathercode === 2 || weathercode === 3;

  return (
    <>
    <div className="relative mx-auto mt-4 w-[960px]
    overflow-hidden mr-3 h-[350px] rounded-[28px] border border-white/20 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xxl">

    
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-white/10" />

      <div className="relative z-10 gap-2">

     
        <div className="flex items-center justify-between ">

          <div>
            <h2 className="text-3xl font-semibold tracking-wide">
              {city}, {country}
            </h2>

            <p className="mt-2 text-md text-white/70">
              {date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              {" • "}
              {date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>

        </div>


      
        <div className="relative mt-[-6px] min-h-[270px]">

    
          <div className="pt-3">

            <div className="flex items-start">
              <span className="text-[125px] font-light leading-none tracking-tight">
                {temperature !== undefined
                  ? Math.round(temperature)
                  : "--"}
              </span>

              <span className="mt-4 text-3xl font-light">
                °C
              </span>
            </div>

            <p className="mt-4 text-2xl font-medium">
              {weatherDesc}
            </p>

            <div className="mt-4 flex items-center gap-2 text-md text-white/80">
              <Thermometer size={20} />
              <span>
                Feels like{" "}
                {temperature !== undefined
                  ? Math.round(temperature)
                  : "--"}
                °
              </span>
            </div>

          </div>


          <div className="absolute right-5 top-[-12px]">

            {isSunny && (
              <SunMedium
                size={200}
                strokeWidth={1.2}
                className="fill-yellow-300 text-yellow-200 drop-shadow-[0_0_25px_rgba(255,220,80,0.5)]"
              />
            )}

            {isCloudy && (
              <div className="relative">

                <SunMedium
                size={200}
                  strokeWidth={1.2}
                  className="absolute -right-3 -top-5 fill-yellow-300 text-yellow-200 drop-shadow-[0_0_25px_rgba(255,220,80,0.5)]"
                />

                <Cloud
                size={200}
                  strokeWidth={1.2}
                  className="relative fill-white text-white drop-shadow-xl"
                />

              </div>
            )}

            {!isSunny && !isCloudy && (
              <Cloud
                size={200}
                strokeWidth={1.2}
                className="fill-white/80 text-white drop-shadow-xl"
              />
            )}

          </div>

        </div>

      </div>
       </div>
     <div className=" grid grid-cols-4 gap-3 relative mx-auto mt-2 w-[960px] mr-3 text-white ">

          <div className="flex flex-col items-center rounded-2xl border border-white/15  px-3 py-4  transition hover:bg-white/15 shadow-2xl backdrop-blur-xxl ">

            <Droplets
              size={27}
              strokeWidth={1.7}
              className="mb-2 text-white"
            />

            <p className="text-xs text-white/70">
              Humidity
            </p>

            <p className="mt-1 text-lg font-semibold">
              {humidity !== undefined ? `${humidity}%` : "--"}
            </p>

          </div>


      
          <div className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur-md transition hover:bg-white/15">

            <Wind
              size={27}
              strokeWidth={1.7}
              className="mb-2 text-white"
            />

            <p className="text-xs text-white/70">
              Wind
            </p>

            <p className="mt-1 text-lg font-semibold">
              {windspeed !== undefined
                ? `${Math.round(windspeed)} km/h`
                : "--"}
            </p>

          </div>


          <div className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur-md">

            <Gauge
              size={27}
              strokeWidth={1.7}
              className="mb-2 text-white"
            />

            <p className="text-xs text-white/70">
              Pressure
            </p>

            <p className="mt-1 text-lg font-semibold">
              {pressure !== undefined
                ? `${pressure} hPa`
                : "--"}
            </p>

          </div>


     
          <div className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur-md">

            <Eye
              size={27}
              strokeWidth={1.7}
              className="mb-2 text-white"
            />

            <p className="text-xs text-white/70">
              Visibility
            </p>

            <p className="mt-1 text-lg font-semibold">
              {visibility !== undefined
                ? `${visibility} km`
                : "--"}
            </p>

          </div>

        </div></>
   
  );
};

export default WeatherCard;