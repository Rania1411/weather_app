import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

const isSame = (a, b) => a.city === b.city && a.country === b.country;

const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage("weather:favorites", []);

  const isFavorite = useCallback(
    (place) => favorites.some((fav) => isSame(fav, place)),
    [favorites]
  );

  const toggle = useCallback(
    (place) =>
      setFavorites((prev) =>
        prev.some((fav) => isSame(fav, place))
          ? prev.filter((fav) => !isSame(fav, place))
          : [...prev, place]
      ),
    [setFavorites]
  );

  const clear = useCallback(() => setFavorites([]), [setFavorites]);

  return { favorites, isFavorite, toggle, clear };
};

export default useFavorites;