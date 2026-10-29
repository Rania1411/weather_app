const StatTile = ({ icon: Icon, label, value, hint }) => (
  <div className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-3 py-4 text-white backdrop-blur-md transition hover:bg-white/15">
    <Icon size={26} strokeWidth={1.7} className="mb-2" aria-hidden="true" />
    <p className="text-xs text-white/70">{label}</p>
    <p className="mt-1 text-lg font-semibold">{value || "--"}</p>
    {hint && <p className="text-xs text-white/60">{hint}</p>}
  </div>
);

export default StatTile;