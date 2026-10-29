import { Search, X } from "lucide-react";

const SearchBar = ({ city, setCity, onSearch, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center gap-2"
    >
      <div className="relative flex-1">
        <label htmlFor="city-search" className="sr-only">
          Search for a city
        </label>
        <Search
          size={22}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          id="city-search"
          type="text"
          autoComplete="off"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-lg bg-white/80 py-3 pl-12 pr-10 text-black outline-none backdrop-blur-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300"
        />
        {city && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setCity("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-500 transition hover:text-gray-800 focus-visible:outline-2 focus-visible:outline-[#3E8EDE]"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !city.trim()}
        className="rounded-lg bg-[#3E8EDE] px-5 py-3 font-medium text-white shadow-md transition hover:bg-[#2875c2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;