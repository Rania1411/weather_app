import React from "react";
import {
  CloudSun,
  House,
  CalendarDays,
  Wind,
  Star,
  Settings,
} from "lucide-react";

const LeftBar = () => {
  const style =
    "flex items-center pl-10 ml-2 gap-4 px-4 py-3 w-[250px] text-white rounded-md transition-all duration-200 hover:bg-[#FFB7CE]/80 hover:shadow-md hover:cursor-pointer  hover:mr-4 hover:ml-4 ";

  return (
    <div
      className="
        fixed left-0 top-0 bottom-0
        w-70 h-screen
        bg-[#3E8EDE]/60
        backdrop-blur-lg
        border-r border-white/15
        rounded-r-xl
        shadow-[10px_0_40px_rgba(30,27,75,0.15)]
        text-white
        z-100
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 pt-8 pb-8">
        <CloudSun size={30} />
        <h2 className="text-xl font-bold">Weather</h2>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-4">

        {/* Today */}
        <div className={`${style} bg-[#FFB7CE]/80`}>
          <House size={20} />
          <p>Today</p>
        </div>

        {/* Forecast */}
        <div className={style}>
          <CalendarDays size={20} />
          <p>Forecast</p>
        </div>

        {/* Air Quality */}
        <div className={style}>
          <Wind size={20} />
          <p>Air Quality</p>
        </div>

        {/* Favorites */}
        <div className={style}>
          <Star size={20} />
          <p>Favorites</p>
        </div>

      
        <div className={style}>
          <Settings size={20} />
          <p>Settings</p>
        </div>

      </div>
    </div>
  );
};

export default LeftBar;