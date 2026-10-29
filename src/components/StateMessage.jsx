const StateMessage = ({ icon: Icon, title, message, action, isError = false }) => (
  <div
    role={isError ? "alert" : "status"}
    className={`flex flex-col items-center rounded-3xl border px-6 py-10 text-center text-white backdrop-blur-md ${
      isError ? "border-red-300/40 bg-red-500/20" : "border-white/20 bg-white/10"
    }`}
  >
    <Icon size={40} strokeWidth={1.5} className="mb-3" aria-hidden="true" />
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="mt-1 max-w-md text-sm text-white/80">{message}</p>
    {action && (
      <button
        type="button"
        onClick={action.onClick}
        className="mt-5 rounded-lg bg-[#3E8EDE] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2875c2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {action.label}
      </button>
    )}
  </div>
);

export default StateMessage;