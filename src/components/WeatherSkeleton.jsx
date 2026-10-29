const Block = ({ className }) => (
  <div className={`animate-pulse rounded-3xl bg-white/15 ${className}`} />
);

const WeatherSkeleton = () => (
  <div className="flex flex-col gap-4" role="status">
    <span className="sr-only">Loading weather</span>
    <Block className="h-80" />
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <Block key={i} className="h-28 rounded-2xl" />
      ))}
    </div>
    <Block className="h-60" />
    <Block className="h-96" />
  </div>
);

export default WeatherSkeleton;