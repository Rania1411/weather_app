import { Droplets, Wind } from "lucide-react";
import Panel from "./Panel";
import { formatTemp, formatWind } from "../utils/units";
import { formatHour, getWeatherInfo } from "../utils/weather";

const Forcaste = ({ hours, units }) => (
  <Panel aria-labelledby="hourly-heading" className="p-4 sm:p-6">
    <div className="mb-4 flex items-baseline justify-between gap-3">
      <h2 id="hourly-heading" className="text-2xl font-bold text-gray-100">
        Hourly Forecast
      </h2>
      <span className="text-sm text-white/70">Next 24 hours</span>
    </div>

    <hr className="mb-5 border-white/20" />

    <ul
      tabIndex={0}
      aria-label="Hourly forecast, scroll horizontally"
      className="forecast_scroll flex gap-3 overflow-x-auto pb-3 focus-visible:outline-2 focus-visible:outline-white/60"
    >
      {hours.map((hour, index) => {
        const { icon: Icon, label } = getWeatherInfo(hour.code);

        return (
          <li
            key={hour.time}
            className="min-w-[110px] rounded-2xl border border-white/15 bg-white/10 p-4 text-center transition duration-200 hover:-translate-y-1 hover:bg-white/20"
          >
            <p className="text-sm font-medium text-white/70">
              {index === 0 ? "Now" : formatHour(hour.time)}
            </p>

            <div className="my-4 flex justify-center">
              <Icon size={32} aria-hidden="true" />
            </div>

            <p className="text-2xl font-bold">{formatTemp(hour.temperature, units.temp)}°</p>
            <p className="mt-1 min-h-8 text-xs text-white/70">{label}</p>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/80">
              <Droplets size={14} className="text-[#3E8EDE]" aria-hidden="true" />
              <span>{hour.rainChance ?? "--"}%</span>
            </div>

            <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-white/70">
              <Wind size={14} aria-hidden="true" />
              <span>{formatWind(hour.wind, units.wind)}</span>
            </div>
          </li>
        );
      })}
    </ul>
  </Panel>
);

export default Forcaste;