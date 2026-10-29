import { MapPin, Star, X } from "lucide-react";
import Panel from "./Panel";
import StateMessage from "./StateMessage";

const Favorites = ({ favorites, onSelect, onRemove }) => {
  if (favorites.length === 0) {
    return (
      <StateMessage
        icon={Star}
        title="No favorite cities yet"
        message="Search for a city and press the star on its weather card to save it here."
      />
    );
  }

  return (
    <Panel aria-labelledby="favorites-heading" className="p-4 sm:p-6">
      <h2 id="favorites-heading" className="mb-4 text-2xl font-bold text-gray-100">
        Favorite cities
      </h2>

      <hr className="mb-2 border-white/20" />

      <ul className="divide-y divide-white/10">
        {favorites.map((place) => (
          <li key={`${place.city}-${place.country}`} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(place)}
              className="flex flex-1 items-center gap-3 rounded-lg px-2 py-3 text-left transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
            >
              <MapPin size={20} aria-hidden="true" />
              <span className="font-medium">{place.city}</span>
              <span className="text-sm text-white/70">{place.country}</span>
            </button>
            <button
              type="button"
              onClick={() => onRemove(place)}
              aria-label={`Remove ${place.city} from favorites`}
              className="rounded-full p-2 text-white/70 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              <X size={18} />
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
};

export default Favorites;