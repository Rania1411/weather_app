import {
  SunMedium,
  Cloud,
  Thermometer,
  Wind,
  Droplets,
  Gauge,
  Eye,
  Sun,
  CloudRain,
  Sunrise,
  Sunset,
  ArrowUp,
  ArrowDown,
  Star,
} from "lucide-react";
import Panel from "./Panel";
import StatTile from "./StatTile";
import { formatTemp, formatWind } from "../utils/units";
import { describeUv, formatFullDate, formatHour, getWeatherInfo } from "../utils/weather";

const SUN_CLASS =
  "fill-yellow-300 text-yellow-200 drop-shadow-[0_0_25px_rgba(255,220,80,0.5)]";
const ICON_SIZE = "size-32 sm:size-48";

const HeroIcon = ({ code }) => {
  if (code === 0 || code === 1) {
    return <SunMedium strokeWidth={1.2} className={`${ICON_SIZE} ${SUN_CLASS}`} aria-hidden="true" />;
  }

  if (code === 2 || code === 3) {
    return (
      <div className="relative">
        <SunMedium
          strokeWidth={1.2}
          className={`absolute -right-3 -top-5 ${ICON_SIZE} ${SUN_CLASS}`}
          aria-hidden="true"
        />
        <Cloud
          strokeWidth={1.2}
          className={`relative ${ICON_SIZE} fill-white text-white drop-shadow-xl`}
          aria-hidden="true"
        />
      </div>
    );
  }

  const { icon: Icon } = getWeatherInfo(code);
  return (
    <Icon strokeWidth={1.2} className={`${ICON_SIZE} text-white drop-shadow-xl`} aria-hidden="true" />
  );
};

const WeatherCard = ({ weather, units, isFavorite, onToggleFavorite }) => {
  const { city, country, current, daily } = weather;
  const today = daily[0];
  const { label } = getWeatherInfo(current.code);

  const stats = [
    { icon: Droplets, label: "Humidity", value: current.humidity != null && `${current.humidity}%` },
    { icon: Wind, label: "Wind", value: current.windSpeed != null && formatWind(current.windSpeed, units.wind) },
    { icon: Gauge, label: "Pressure", value: current.pressure != null && `${current.pressure} hPa` },
    { icon: Eye, label: "Visibility", value: current.visibility != null && `${current.visibility} km` },
    { icon: Sun, label: "UV index", value: today.uvIndex != null && String(today.uvIndex), hint: describeUv(today.uvIndex) },
    { icon: CloudRain, label: "Rain chance", value: today.rainChance != null && `${today.rainChance}%` },
    { icon: Sunrise, label: "Sunrise", value: formatHour(today.sunrise) },
    { icon: Sunset, label: "Sunset", value: formatHour(today.sunset) },
  ];

  return (
    <>
      <Panel
        id="today"
        aria-labelledby="current-heading"
        className="relative scroll-mt-6 overflow-hidden p-6 shadow-2xl sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-500/20 via-indigo-500/10 to-white/10" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 id="current-heading" className="text-2xl font-semibold tracking-wide sm:text-3xl">
                {city}, {country}
              </h1>
              <p className="mt-2 text-white/70">{formatFullDate(current.time)}</p>
            </div>
            <button
              type="button"
              onClick={onToggleFavorite}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? `Remove ${city} from favorites` : `Add ${city} to favorites`}
              className="shrink-0 cursor-pointer rounded-full border border-white/20 bg-white/10 p-2.5 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
            >
              <Star
                size={22}
                aria-hidden="true"
                className={isFavorite ? "fill-[#FFB7CE] text-[#FFB7CE]" : ""}
              />
            </button>
          </div>

          <div className="mt-4 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row sm:items-start">
            <div className="w-full">
              <div className="flex items-start">
                <span className="text-8xl font-light leading-none tracking-tight sm:text-[125px]">
                  {formatTemp(current.temperature, units.temp)}
                </span>
                <span className="mt-3 text-3xl font-light">°{units.temp.toUpperCase()}</span>
              </div>

              <p className="mt-4 text-2xl font-medium">{label}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80">
                <span className="flex items-center gap-2">
                  <Thermometer size={20} aria-hidden="true" />
                  Feels like {formatTemp(current.feelsLike, units.temp)}°
                </span>
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1" title="Today's high">
                    <ArrowUp size={18} aria-hidden="true" />
                    {formatTemp(today.max, units.temp)}°
                  </span>
                  <span className="flex items-center gap-1" title="Today's low">
                    <ArrowDown size={18} aria-hidden="true" />
                    {formatTemp(today.min, units.temp)}°
                  </span>
                </span>
              </div>
            </div>

            <div className="shrink-0 sm:pr-2">
              <HeroIcon code={current.code} />
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>
    </>
  );
};

export default WeatherCard;