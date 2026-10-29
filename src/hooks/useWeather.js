import { useCallback, useEffect, useRef, useState } from "react";
import { detectDefaultCity, fetchWeather } from "../services/weatherApi";

const useWeather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const search = useCallback(async (cityName) => {
    const name = cityName.trim();
    if (!name) return;

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      setWeather(await fetchWeather(name, controller.signal));
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message);
    } finally {
      if (controllerRef.current === controller) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    detectDefaultCity(controller.signal)
      .then((city) => {
        setQuery(city);
        search(city);
      })
      .catch(() => {});

    return () => controller.abort();
  }, [search]);

  return { query, setQuery, weather, loading, error, search };
};

export default useWeather;