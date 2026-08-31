import { Search } from "lucide-react";

const SearchBar = ({ city, setCity, getCity }) => {
  return (
    <div className="relative mx-auto w-[600px] pt-5">
      <Search
        size={24}
        className="absolute left-3 top-11 z-10 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        placeholder="Search for a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getCity();
          }
        }}
        className="w-full rounded-lg bg-white/80 px-4 py-3 pl-12 text-black outline-none focus:ring-2 focus:ring-blue-300 backdrop-blur-sm"
      />
    </div>
  );
};

export default SearchBar;