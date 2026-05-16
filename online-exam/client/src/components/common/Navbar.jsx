import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Bell, GraduationCap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { roleLabel } from "../../utils/roleGuard";

export default function Navbar({ minimal = false }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-900 text-white transition group-hover:rotate-6">
            <GraduationCap size={20} strokeWidth={2.25} />
          </div>
          <div className="leading-none">
            <div className="font-display text-lg font-bold tracking-tight text-ink-900">Proctera</div>
            <div className="text-[10px] uppercase tracking-widest text-ink-400">Examination Platform</div>
          </div>
        </Link>

        {!minimal && user && (
          <div className="flex items-center gap-2">
            <button className="btn-ghost relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
            </button>
            <div className="mx-1 h-8 w-px bg-ink-100" />
            <div className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-ink-50">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-100 text-accent-700 font-semibold">
                {user.name?.charAt(0).toUpperCase() || <User size={16} />}
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-semibold text-ink-900">{user.name}</div>
                <div className="text-xs text-ink-500">{roleLabel(user.role)}</div>
              </div>
            </div>
            <button onClick={handleLogout} className="btn-ghost" title="Sign out">
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}