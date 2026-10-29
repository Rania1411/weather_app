import { useState } from "react";
import { CloudOff, MapPin } from "lucide-react";
import useWeather from "../hooks/useWeather";
import useAirQuality from "../hooks/useAirQuality";
import useFavorites from "../hooks/useFavorites";
import useLocalStorage from "../hooks/useLocalStorage";
import { DEFAULT_UNITS } from "../utils/units";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import LeftBar from "../components/leftBar";
import Forcaste from "../components/Forcaste";
import DailyForecast from "../components/DailyForecast";
import AirQuality from "../components/AirQuality";
import Favorites from "../components/Favorites";
import Settings from "../components/Settings";
import WeatherSkeleton from "../components/WeatherSkeleton";
import StateMessage from "../components/StateMessage";

const WEATHER_VIEWS = ["today", "forecast", "air"];

function WeatherApp() {
  const [view, setView] = useState("today");
  const { query, setQuery, weather, loading, error, search } = useWeather();
  const air = useAirQuality(weather?.latitude, weather?.longitude);
  const { favorites, isFavorite, toggle, clear } = useFavorites();
  const [storedUnits, setUnits] = useLocalStorage("weather:units", DEFAULT_UNITS);
  const units = { ...DEFAULT_UNITS, ...storedUnits };

  const place = weather && { city: weather.city, country: weather.country };

  const openFavorite = (fav) => {
    setQuery(fav.city);
    search(fav.city);
    setView("today");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <LeftBar view={view} onChange={setView} />

      <div className="lg:pl-64">
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 pb-28 pt-5 sm:px-6 lg:pb-10">
          {WEATHER_VIEWS.includes(view) && (
            <>
              <SearchBar city={query} setCity={setQuery} onSearch={search} loading={loading} />

              {error && (
                <StateMessage
                  isError
                  icon={CloudOff}
                  title={error}
                  message={
                    error === "City not found"
                      ? "Check the spelling or try a nearby city."
                      : "Check your connection and try again."
                  }
                  action={{ label: "Try again", onClick: () => search(query) }}
                />
              )}

              {loading && !weather && <WeatherSkeleton />}

              {weather && (
                <div
                  key={view}
                  aria-busy={loading}
                  className={`fade-in flex flex-col gap-4 transition-opacity ${
                    loading ? "opacity-60" : ""
                  }`}
                >
                  {view === "today" && (
                    <>
                      <WeatherCard
                        weather={weather}
                        units={units}
                        isFavorite={isFavorite(place)}
                        onToggleFavorite={() => toggle(place)}
                      />
                      <Forcaste hours={weather.hourly} units={units} />
                    </>
                  )}
                  {view === "forecast" && <DailyForecast days={weather.daily} units={units} />}
                  {view === "air" && (
                    <AirQuality
                      data={air.data}
                      loading={air.loading}
                      error={air.error}
                      city={weather.city}
                    />
                  )}
                </div>
              )}

              {!weather && !loading && !error && (
                <StateMessage
                  icon={MapPin}
                  title="Search for a city"
                  message="Type a city name above to see its current weather and forecast."
                />
              )}
            </>
          )}

          {view === "favorites" && (
            <div className="fade-in">
              <Favorites favorites={favorites} onSelect={openFavorite} onRemove={toggle} />
            </div>
          )}

          {view === "settings" && (
            <div className="fade-in">
              <Settings
                units={units}
                onChange={setUnits}
                favoritesCount={favorites.length}
                onClearFavorites={clear}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default WeatherApp;