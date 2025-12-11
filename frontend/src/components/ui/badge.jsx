export function Badge({ children, variant = "default" }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium";

  const variants = {
    default: "bg-blue-100 text-blue-700",
    secondary: "bg-gray-100 text-gray-700",
    danger: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
  };

  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}
