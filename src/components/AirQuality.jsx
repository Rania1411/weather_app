import { Wind, Sun, Factory, Flame, Cloud, CloudOff } from "lucide-react";
import Panel from "./Panel";
import StatTile from "./StatTile";
import StateMessage from "./StateMessage";

const LEVELS = [
  { max: 50, label: "Good", advice: "Air quality is satisfactory. Enjoy outdoor activities." },
  { max: 100, label: "Moderate", advice: "Acceptable for most people. Very sensitive people may want to limit long outdoor exertion." },
  { max: 150, label: "Unhealthy for sensitive groups", advice: "People with asthma, heart or lung conditions, children and older adults should reduce heavy outdoor activity." },
  { max: 200, label: "Unhealthy", advice: "Everyone may start to feel effects. Limit prolonged outdoor exertion." },
  { max: 300, label: "Very unhealthy", advice: "Health alert: avoid outdoor exertion and keep windows closed if you can." },
  { max: Infinity, label: "Hazardous", advice: "Emergency conditions. Stay indoors and avoid outdoor activity." },
];

const SCALE_GRADIENT =
  "linear-gradient(to right, #4ade80, #facc15, #fb923c, #ef4444, #a855f7, #7f1d1d)";

const AirQuality = ({ data, loading, error, city }) => {
  if (loading) {
    return (
      <div role="status" className="h-96 animate-pulse rounded-3xl bg-white/15">
        <span className="sr-only">Loading air quality</span>
      </div>
    );
  }

  if (error || !data || data.aqi == null) {
    return (
      <StateMessage
        isError
        icon={CloudOff}
        title="Air quality unavailable"
        message={error ?? "No air quality data is available for this location."}
      />
    );
  }

  const level = LEVELS.find((l) => data.aqi <= l.max);
  const marker = Math.min(data.aqi / 300, 1) * 100;
  const unit = "µg/m³";

  const pollutants = [
    { icon: Wind, label: "PM2.5", value: data.pm25 != null && `${data.pm25} ${unit}` },
    { icon: Wind, label: "PM10", value: data.pm10 != null && `${data.pm10} ${unit}` },
    { icon: Sun, label: "Ozone", value: data.ozone != null && `${data.ozone} ${unit}` },
    { icon: Factory, label: "Nitrogen dioxide", value: data.no2 != null && `${data.no2} ${unit}` },
    { icon: Flame, label: "Sulphur dioxide", value: data.so2 != null && `${data.so2} ${unit}` },
    { icon: Cloud, label: "Carbon monoxide", value: data.co != null && `${data.co} ${unit}` },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Panel aria-labelledby="air-heading" className="p-6 shadow-2xl sm:p-8">
        <h2 id="air-heading" className="text-2xl font-semibold sm:text-3xl">
          Air quality in {city}
        </h2>

        <div className="mt-4 flex items-end gap-4">
          <span className="text-8xl font-light leading-none sm:text-[110px]">{data.aqi}</span>
          <div className="pb-2">
            <p className="text-sm text-white/70">US AQI</p>
            <p className="text-2xl font-medium">{level.label}</p>
          </div>
        </div>

        <div className="relative mt-6 h-2 rounded-full" style={{ background: SCALE_GRADIENT }}>
          <div
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#3E8EDE] shadow-md"
            style={{ left: `${marker}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-white/60">
          <span>0</span>
          <span>300+</span>
        </div>

        <p className="mt-5 max-w-2xl text-white/80">{level.advice}</p>
      </Panel>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {pollutants.map((item) => (
          <StatTile key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AirQuality;