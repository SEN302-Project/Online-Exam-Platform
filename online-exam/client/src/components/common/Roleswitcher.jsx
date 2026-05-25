import { GraduationCap, Eye, ShieldCheck, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ROLES, ROLE_HOMES } from "../../utils/roleGuard";

const ROLE_TABS = [
  { role: ROLES.STUDENT, label: "Student", icon: GraduationCap },
  { role: ROLES.INSTRUCTOR, label: "Instructor", icon: Users },
  { role: ROLES.PROCTOR, label: "Proctor", icon: Eye },
  { role: ROLES.SYSTEM_ADMIN, label: "Admin", icon: ShieldCheck },
];

/**
 * DEV-ONLY: Lets you swap between role dashboards instantly.
 * Remove or hide this before production.
 */
export default function RoleSwitcher() {
  const { user } = useAuth();

  if (!user) return null;

  const handleSwitch = (role) => {
    const fakeUser = {
      id: `dev-${role}`,
      name:
        role === ROLES.STUDENT
          ? "John Student"
          : role === ROLES.INSTRUCTOR
            ? "Dr. Sarah Williams"
            : role === ROLES.PROCTOR
              ? "Tom Anderson"
              : "Admin User",
      email: `${role}@dev.local`,
      role,
    };
    localStorage.setItem("oep_user", JSON.stringify(fakeUser));
    localStorage.setItem("oep_token", "dev-token");
    window.location.href = ROLE_HOMES[role] || "/";
  };

  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg border border-ink-200 bg-ink-50 p-0.5">
      {ROLE_TABS.map((tab) => {
        const active = user.role === tab.role;
        return (
          <button
            key={tab.role}
            onClick={() => handleSwitch(tab.role)}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
              active
                ? "bg-white text-ink-900 shadow-sm"
                : "text-ink-500 hover:text-ink-900"
            }`}
            title={`Switch to ${tab.label}`}
          >
            <tab.icon size={12} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}