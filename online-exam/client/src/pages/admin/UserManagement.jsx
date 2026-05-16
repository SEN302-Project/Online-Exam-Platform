import { useState } from "react";
import { Plus, Search, MoreVertical } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import { roleLabel } from "../../utils/roleGuard";

const mockUsers = [
  { id: "1", name: "Dr. Sarah Williams", email: "s.williams@uni.edu", role: "instructor", status: "active", lastLogin: "2h ago" },
  { id: "2", name: "Alex Martinez", email: "a.martinez@uni.edu", role: "student", status: "active", lastLogin: "5m ago" },
  { id: "3", name: "Prof. James Chen", email: "j.chen@uni.edu", role: "instructor", status: "active", lastLogin: "1d ago" },
  { id: "4", name: "Maya Patel", email: "m.patel@uni.edu", role: "student", status: "suspended", lastLogin: "3d ago" },
  { id: "5", name: "Tom Anderson", email: "t.anderson@uni.edu", role: "proctor", status: "active", lastLogin: "30m ago" },
];

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const filtered = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-900">User Management</h1>
            <p className="mt-1 text-ink-500">Manage accounts, roles, and access permissions.</p>
          </div>
          <button className="btn-primary">
            <Plus size={15} /> Invite User
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users…"
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

        <div className="card overflow-hidden">
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
                    <span
                      className={`badge ${
                        u.status === "active"
                          ? "bg-success/10 text-success"
                          : "bg-danger/10 text-danger"
                      }`}
                    >
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
      </main>
    </div>
  );
}