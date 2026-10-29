import { useEffect, useState } from "react";
import { fetchAirQuality } from "../services/weatherApi";

const useAirQuality = (latitude, longitude) => {
  const key = latitude == null ? null : `${latitude},${longitude}`;
  const [result, setResult] = useState({ key: null, data: null, error: null });

  useEffect(() => {
    if (!key) return;

    const controller = new AbortController();

    fetchAirQuality(latitude, longitude, controller.signal)
      .then((data) => setResult({ key, data, error: null }))
      .catch((err) => {
        if (err.name !== "AbortError") setResult({ key, data: null, error: err.message });
      });

    return () => controller.abort();
  }, [key, latitude, longitude]);

  const isCurrent = result.key === key;

  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    loading: key !== null && !isCurrent,
  };
};

export default useAirQuality;