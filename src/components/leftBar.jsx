import { CloudSun, House, CalendarDays, Wind, Star, Settings } from "lucide-react";

const NAV_ITEMS = [
  { id: "today", label: "Today", icon: House },
  { id: "forecast", label: "Forecast", icon: CalendarDays },
  { id: "air", label: "Air Quality", icon: Wind },
  { id: "favorites", label: "Favorites", icon: Star },
  { id: "settings", label: "Settings", icon: Settings },
];

const LeftBar = ({ view, onChange }) => (
  <nav
    aria-label="Main navigation"
    className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-[#3E8EDE]/70 text-white shadow-[0_-10px_40px_rgba(30,27,75,0.15)] backdrop-blur-lg lg:inset-y-0 lg:right-auto lg:w-64 lg:rounded-r-xl lg:border-r lg:border-t-0 lg:bg-[#3E8EDE]/60 lg:shadow-[10px_0_40px_rgba(30,27,75,0.15)]"
  >
    <div className="hidden items-center gap-3 px-6 pb-8 pt-8 lg:flex">
      <CloudSun size={30} aria-hidden="true" />
      <span className="text-xl font-bold">Weather</span>
    </div>

    <ul className="flex gap-1 px-2 py-1 lg:flex-col lg:gap-4 lg:px-3 lg:py-0">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <li key={id} className="flex flex-1 lg:flex-none">
          <button
            type="button"
            aria-current={view === id ? "page" : undefined}
            onClick={() => onChange(id)}
            className={`flex w-full cursor-pointer flex-col items-center gap-1 rounded-md px-2 py-2 text-xs text-white transition-all duration-200 hover:bg-[#FFB7CE]/80 hover:shadow-md focus-visible:outline-2 focus-visible:outline-white lg:flex-row lg:gap-4 lg:px-6 lg:py-3 lg:text-base lg:hover:translate-x-1 ${
              view === id ? "bg-[#FFB7CE]/80" : ""
            }`}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
          </button>
        </li>
      ))}
    </ul>
  </nav>
);

export default LeftBar;