import { NavLink } from "react-router-dom";

export default function Sidebar({ items }) {
  return (
    <aside className="hidden lg:block w-60 shrink-0 border-r border-ink-100 bg-white">
      <nav className="sticky top-16 p-4 space-y-0.5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-ink-900 text-white shadow-soft"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              }`
            }
          >
            {item.icon && <item.icon size={18} />}
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto badge bg-danger/10 text-danger">{item.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}