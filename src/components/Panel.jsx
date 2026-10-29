const Panel = ({ as: Tag = "section", className = "", children, ...props }) => (
  <Tag
    className={`rounded-3xl border border-white/20 bg-white/10 text-white shadow-xl backdrop-blur-md ${className}`}
    {...props}
  >
    {children}
  </Tag>
);

export default Panel;