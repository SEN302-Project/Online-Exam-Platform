import { useNavigate } from "react-router-dom";
import { Plus, FileText, Users, AlertTriangle, BookOpen, ScrollText, ChevronRight } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import ScoreChart from "../../components/dashboard/ScoreChart";

const sidebarItems = [
  { to: "/instructor", label: "Overview", icon: FileText, end: true },
  { to: "/instructor/create-exam", label: "Create Exam", icon: Plus },
  { to: "/instructor/question-bank", label: "Question Bank", icon: BookOpen },
  { to: "/instructor/grading/1", label: "Grading Queue", icon: ScrollText, badge: "12" },
];

const mockExams = [
  { id: "1", title: "Software Construction Final", course: "SEN 306", students: 87, submitted: 71, pending: 16, avgScore: 76 },
  { id: "2", title: "Algorithms Mid-term", course: "CSC 204", students: 52, submitted: 52, pending: 0, avgScore: 81 },
  { id: "3", title: "Data Structures Quiz", course: "CSC 203", students: 94, submitted: 23, pending: 71, avgScore: null },
];

const scoreDistribution = [
  { label: "0-20", value: 1 },
  { label: "21-40", value: 4 },
  { label: "41-60", value: 12 },
  { label: "61-80", value: 34 },
  { label: "81-100", value: 20 },
];

export default function InstructorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />

      <div className="flex">
        <Sidebar items={sidebarItems} />

        <main className="flex-1 px-6 lg:px-10 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display text-3xl font-semibold text-ink-900">Instructor Overview</h1>
                <p className="mt-1 text-ink-500">Monitor your exams and student performance.</p>
              </div>
              <button onClick={() => navigate("/instructor/create-exam")} className="btn-primary">
                <Plus size={16} /> New Exam
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={FileText} label="Active Exams" value="3" />
              <StatCard icon={Users} label="Total Students" value="233" />
              <StatCard icon={ScrollText} label="Pending Grading" value="12" highlight />
              <StatCard icon={AlertTriangle} label="Integrity Flags" value="4" warning />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2">
                <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Your Exams</h2>
                <div className="card divide-y divide-ink-100 overflow-hidden">
                  {mockExams.map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => navigate(`/instructor/grading/${exam.id}`)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-ink-50 transition text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="badge bg-ink-100 text-ink-600 mb-1">{exam.course}</div>
                        <h3 className="font-semibold text-ink-900 truncate">{exam.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-xs text-ink-500">
                          <span>{exam.submitted}/{exam.students} submitted</span>
                          {exam.pending > 0 && (
                            <span className="text-warning">• {exam.pending} pending</span>
                          )}
                        </div>
                      </div>
                      {exam.avgScore && (
                        <div className="text-right">
                          <div className="font-mono font-bold text-lg text-ink-900">{exam.avgScore}%</div>
                          <div className="text-[10px] uppercase tracking-wider text-ink-400">avg</div>
                        </div>
                      )}
                      <ChevronRight size={18} className="text-ink-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Distribution</h2>
                <ScoreChart data={scoreDistribution} title="Latest Exam" />
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, highlight, warning }) {
  return (
    <div className={`card p-5 ${highlight ? "ring-2 ring-accent-600" : ""}`}>
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
        warning ? "bg-warning/10 text-warning" : highlight ? "bg-accent-50 text-accent-600" : "bg-ink-100 text-ink-700"
      }`}>
        <Icon size={17} />
      </div>
      <div className="mt-4 text-xs font-medium uppercase tracking-wider text-ink-400">{label}</div>
      <div className="mt-1 font-display text-3xl font-bold text-ink-900">{value}</div>
    </div>
  );
}