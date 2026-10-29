import Panel from "./Panel";

const Segmented = ({ label, value, options, onChange }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 py-4">
    <span id={`${label}-label`} className="font-medium">
      {label}
    </span>
    <div
      role="radiogroup"
      aria-labelledby={`${label}-label`}
      className="inline-flex rounded-lg bg-white/10 p-1"
    >
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-white ${
              active ? "bg-[#FFB7CE]/80 text-white" : "text-white/80 hover:bg-white/15"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  </div>
);

const Settings = ({ units, onChange, favoritesCount, onClearFavorites }) => (
  <Panel aria-labelledby="settings-heading" className="p-4 sm:p-6">
    <h2 id="settings-heading" className="mb-4 text-2xl font-bold text-gray-100">
      Settings
    </h2>

    <hr className="mb-2 border-white/20" />

    <div className="divide-y divide-white/10">
      <Segmented
        label="Temperature"
        value={units.temp}
        onChange={(temp) => onChange({ ...units, temp })}
        options={[
          { value: "c", label: "°C" },
          { value: "f", label: "°F" },
        ]}
      />
      <Segmented
        label="Wind speed"
        value={units.wind}
        onChange={(wind) => onChange({ ...units, wind })}
        options={[
          { value: "kmh", label: "km/h" },
          { value: "mph", label: "mph" },
        ]}
      />
      <div className="flex flex-wrap items-center justify-between gap-3 py-4">
        <span className="font-medium">
          Favorite cities
          <span className="ml-2 text-sm text-white/70">{favoritesCount} saved</span>
        </span>
        <button
          type="button"
          onClick={onClearFavorites}
          disabled={favoritesCount === 0}
          className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear all
        </button>
      </div>
    </div>
  </Panel>
);

export default Settings;