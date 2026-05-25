import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Bell,
  GraduationCap,
  Search,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Sun,
  Moon,
  Menu,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { roleLabel } from "../../utils/roleGuard";
import RoleSwitcher from "./RoleSwitcher";

const mockNotifications = [
  { id: "1", type: "exam", title: "Upcoming exam tomorrow", body: "SEN 306 Final at 10:00 AM", time: "1h ago", unread: true, icon: FileText, color: "accent" },
  { id: "2", type: "result", title: "Your result is ready", body: "CSC 203 Quiz: 88%", time: "2h ago", unread: true, icon: CheckCircle2, color: "success" },
  { id: "3", type: "alert", title: "System check reminder", body: "Run a check before the exam", time: "3h ago", unread: false, icon: AlertTriangle, color: "warning" },
];

export default function Navbar({ minimal = false, showSearch = false, fullWidth = false, onMenuClick }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    if (notifOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [notifOpen]);

  const handleLogout = () => { logout(); navigate("/login"); };
  const markAllRead = () => setNotifications((p) => p.map((n) => ({ ...n, unread: false })));

  const containerClass = fullWidth
    ? "flex h-16 items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6"
    : "mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6";

  const NOTIF_COLORS = {
    accent: "bg-accent-50 text-accent-600",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
    ink: "bg-ink-100 text-ink-700",
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/80 backdrop-blur-md">
      <div className={containerClass}>
        {/* Mobile menu button */}
        {onMenuClick && (
          <button onClick={onMenuClick} className="btn-ghost lg:hidden !p-2" title="Menu">
            <Menu size={20} />
          </button>
        )}

        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-900 text-white transition group-hover:rotate-6">
            <GraduationCap size={20} strokeWidth={2.25} />
          </div>
          <div className="leading-none hidden sm:block">
            <div className="font-display text-lg font-bold tracking-tight text-ink-900">Proctera</div>
            <div className="text-[10px] uppercase tracking-widest text-ink-400">Examination Platform</div>
          </div>
        </Link>

        {showSearch && (
          <div className="hidden md:block flex-1 max-w-sm">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                placeholder="Search exams, results, courses..."
                className="w-full rounded-lg border border-ink-100 bg-ink-50 pl-10 pr-4 py-2 text-sm placeholder-ink-400 focus:bg-white focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-50 transition"
              />
            </div>
          </div>
        )}

        {!minimal && user && (
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <div className="hidden lg:block">
              <RoleSwitcher />
            </div>

            <button onClick={toggleTheme} className="btn-ghost !p-2" title={theme === "light" ? "Dark mode" : "Light mode"}>
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen(!notifOpen)} className="btn-ghost relative !p-2" title="Notifications">
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 card overflow-hidden animate-slide-up z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-ink-100">
                    <h3 className="font-semibold text-ink-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs font-medium text-accent-600 hover:text-accent-700">Mark all read</button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-ink-100">
                    {notifications.map((n) => {
                      const Icon = n.icon;
                      return (
                        <button key={n.id} className={`w-full p-4 hover:bg-ink-50 transition text-left flex gap-3 ${n.unread ? "bg-ink-50/30" : ""}`}>
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${NOTIF_COLORS[n.color]}`}>
                            <Icon size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-ink-900">{n.title}</span>
                              {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-accent-600 shrink-0" />}
                            </div>
                            <div className="text-xs text-ink-500 truncate">{n.body}</div>
                            <div className="text-[10px] text-ink-400 mt-0.5">{n.time}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="mx-1 h-8 w-px bg-ink-100 hidden sm:block" />

            <Link to="/profile" className="flex items-center gap-3 rounded-lg p-1 sm:px-2 sm:py-1.5 hover:bg-ink-50 transition">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-accent-100 text-accent-700 font-semibold">
                {user.name?.charAt(0).toUpperCase() || <User size={16} />}
              </div>
              <div className="hidden xl:block leading-tight">
                <div className="text-sm font-semibold text-ink-900">{user.name}</div>
                <div className="text-xs text-ink-500">{roleLabel(user.role)}</div>
              </div>
            </Link>

            <button onClick={handleLogout} className="btn-ghost !p-2 hidden sm:inline-flex" title="Sign out">
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}