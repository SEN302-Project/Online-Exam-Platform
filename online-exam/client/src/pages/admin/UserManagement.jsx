import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, MoreVertical, LayoutDashboard, Users, ScrollText, ArrowLeft , HelpCircle, X} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { roleLabel } from "../../utils/roleGuard";

const sidebarItems = [
  {
    section: "SYSTEM",
    items: [
      { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
      { to: "/admin/users", label: "User management", icon: Users },
      { to: "/admin/audit-logs", label: "Audit logs", icon: ScrollText },
    ],
  },
  {
    section: "REFERENCE",
    items: [{ to: "/admin/support", label: "Support", icon: HelpCircle }],
  },
];

const mockUsers = [
  { id: "1", name: "Dr. Sarah Williams", email: "s.williams@uni.edu", role: "instructor", status: "active", lastLogin: "2h ago" },
  { id: "2", name: "Alex Martinez", email: "a.martinez@uni.edu", role: "student", status: "active", lastLogin: "5m ago" },
  { id: "3", name: "Prof. James Chen", email: "j.chen@uni.edu", role: "instructor", status: "active", lastLogin: "1d ago" },
  { id: "4", name: "Maya Patel", email: "m.patel@uni.edu", role: "student", status: "suspended", lastLogin: "3d ago" },
  { id: "5", name: "Tom Anderson", email: "t.anderson@uni.edu", role: "proctor", status: "active", lastLogin: "30m ago" },
];

export default function UserManagement() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [inviteData, setInviteData] = useState({ name: "", email: "", role: "student", institution: "" });

  const handleInvite = (e) => {
    e.preventDefault();
    // TODO: wire to backend POST /api/admin/users or similar
    setShowInvite(false);
    setInviteData({ name: "", email: "", role: "student", institution: "" });
  };

  const filtered = mockUsers.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <button
            onClick={() => navigate("/admin")}
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6"
          >
            <ArrowLeft size={15} /> Back to overview
          </button>

          <div className="flex items-start justify-between mb-6 sm:mb-8 gap-4 flex-wrap">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Administrator</div>
              <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">User Management</h1>
              <p className="mt-1.5 text-ink-500 text-sm sm:text-base">Manage accounts, roles, and access permissions.</p>
            </div>
            <button onClick={() => setShowInvite(true)} className="btn-primary">
              <Plus size={15} /> Invite user
            </button>
          </div>

          <div className="flex gap-3 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="input pl-10"
              />
            </div>
            <select className="input max-w-[180px]">
              <option>All Roles</option>
              <option>Students</option>
              <option>Instructors</option>
              <option>Proctors</option>
              <option>Admins</option>
            </select>
          </div>

          {/* Desktop table */}
          <div className="card overflow-hidden hidden md:block">
            <table className="w-full">
              <thead className="bg-ink-50 border-b border-ink-100">
                <tr className="text-left text-xs uppercase tracking-wider text-ink-500">
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Last Login</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-ink-50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-100 text-accent-700 font-semibold text-sm">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-ink-900 text-sm">{u.name}</div>
                          <div className="text-xs text-ink-500">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink-700">{roleLabel(u.role)}</td>
                    <td className="px-5 py-4">
                      <span className={`badge ${u.status === "active" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink-500">{u.lastLogin}</td>
                    <td className="px-5 py-4 text-right">
                      <button className="btn-ghost !p-1.5">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((u) => (
              <div key={u.id} className="card p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100 text-accent-700 font-semibold text-sm shrink-0">
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-ink-900 truncate">{u.name}</div>
                    <div className="text-xs text-ink-500 truncate">{u.email}</div>
                  </div>
                  <button className="btn-ghost !p-1.5 shrink-0">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                  <span className="badge bg-ink-100 text-ink-700">{roleLabel(u.role)}</span>
                  <span className={`badge ${u.status === "active" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                    {u.status}
                  </span>
                  <span className="text-ink-500">{u.lastLogin}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Invite User Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={() => setShowInvite(false)} />
          <div className="relative w-full max-w-md card animate-slide-up">
            <div className="px-6 py-4 border-b border-ink-100 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-ink-900">Invite User</h3>
              <button onClick={() => setShowInvite(false)} className="btn-ghost !p-1.5">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleInvite} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-ink-700 block mb-1.5">Full name</label>
                <input
                  type="text"
                  required
                  value={inviteData.name}
                  onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                  className="input"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink-700 block mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  className="input"
                  placeholder="user@university.edu"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink-700 block mb-1.5">Institution</label>
                <input
                  type="text"
                  required
                  value={inviteData.institution}
                  onChange={(e) => setInviteData({ ...inviteData, institution: e.target.value })}
                  className="input"
                  placeholder="University Name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink-700 block mb-1.5">Role</label>
                <select
                  value={inviteData.role}
                  onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                  className="input"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="proctor">Proctor</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <p className="text-xs text-ink-500">
                An invitation email will be sent to this address with instructions to set up their account.
              </p>
              <div className="flex justify-end gap-2 pt-4 border-t border-ink-100">
                <button type="button" onClick={() => setShowInvite(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}