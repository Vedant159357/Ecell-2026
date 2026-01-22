import { Link } from "react-router-dom";

export function NavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 transition ${
        active ? "text-[#00eaff]" : "text-gray-300 hover:text-[#00eaff]"
      }`}
    >
      {label}
    </Link>
  );
}
