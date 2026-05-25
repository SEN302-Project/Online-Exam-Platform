import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

export default function Sidebar({ items, mobileOpen = false, onClose }) {
  const isSectioned = items.length > 0 && items[0].section;

  const navContent = (
    <nav className="p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
      {isSectioned ? (
        items.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-6" : ""}>
            <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-ink-400">
              {group.section}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem key={item.to} item={item} onClick={onClose} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="space-y-0.5">
          {items.map((item) => (
            <NavItem key={item.to} item={item} onClick={onClose} />
          ))}
        </div>
      )}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-ink-100 bg-white">
        <div className="sticky top-16">{navContent}</div>
      </aside>

      {/* Mobile slide-out */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
          <aside className="absolute top-0 left-0 h-full w-72 bg-white border-r border-ink-100 animate-slide-up overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-ink-100">
              <h2 className="font-display font-bold text-ink-900">Menu</h2>
              <button onClick={onClose} className="btn-ghost !p-1.5">
                <X size={18} />
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}

function NavItem({ item, onClick }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
          isActive
            ? "bg-ink-900 text-white shadow-soft"
            : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
        }`
      }
    >
      {item.icon && <item.icon size={17} />}
      <span>{item.label}</span>
      {item.badge && (
        <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-100 px-1.5 text-[10px] font-bold text-accent-700">
          {item.badge}
        </span>
      )}
    </NavLink>
  );
}0