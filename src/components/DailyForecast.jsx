import { Droplets } from "lucide-react";
import Panel from "./Panel";
import { formatTemp } from "../utils/units";
import { formatDay, getWeatherInfo } from "../utils/weather";

const DailyForecast = ({ days, units }) => {
  const weekMin = Math.min(...days.map((d) => d.min));
  const weekMax = Math.max(...days.map((d) => d.max));
  const span = Math.max(weekMax - weekMin, 1);

  return (
    <Panel id="forecast" aria-labelledby="daily-heading" className="scroll-mt-6 p-4 sm:p-6">
      <h2 id="daily-heading" className="mb-4 text-2xl font-bold text-gray-100">
        7-Day Forecast
      </h2>

      <hr className="mb-2 border-white/20" />

      <ul className="divide-y divide-white/10">
        {days.map((day, index) => {
          const { icon: Icon, label } = getWeatherInfo(day.code);
          const width = Math.max(((day.max - day.min) / span) * 100, 6);
          const left = Math.min(((day.min - weekMin) / span) * 100, 100 - width);

          return (
            <li
              key={day.date}
              className="flex items-center gap-3 rounded-lg px-2 py-3 transition hover:bg-white/10"
            >
              <span className="w-12 shrink-0 font-medium">{formatDay(day.date, index)}</span>
              <Icon size={26} className="shrink-0" aria-hidden="true" />
              <span className="hidden min-w-0 flex-1 truncate text-sm text-white/70 md:block">
                {label}
              </span>
              <span className="flex w-12 shrink-0 items-center gap-1 text-xs text-white/80">
                <Droplets size={14} className="text-[#3E8EDE]" aria-hidden="true" />
                {day.rainChance ?? "--"}%
              </span>
              <div className="flex flex-1 items-center gap-2 md:max-w-xs">
                <span className="w-9 text-right text-sm text-white/70">{formatTemp(day.min, units.temp)}°</span>
                <div className="relative h-1.5 flex-1 rounded-full bg-white/20">
                  <div
                    className="absolute h-full rounded-full bg-[#FFB7CE]"
                    style={{ left: `${left}%`, width: `${width}%` }}
                  />
                </div>
                <span className="w-9 text-sm font-semibold">{formatTemp(day.max, units.temp)}°</span>
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
};

export default DailyForecast;