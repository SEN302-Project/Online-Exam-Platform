import { useNavigate } from "react-router-dom";
import { Clock, Calendar, FileText, History, TrendingUp, Award, ChevronRight } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import ReportCard from "../../components/dashboard/ReportCard";
import { formatDateTime } from "../../utils/formatTime";
import { useAuth } from "../../context/AuthContext";

// Mock data - replace with API calls
const mockUpcoming = [
  { id: "1", title: "Software Construction Final", course: "SEN 306", startsAt: "2026-05-20T10:00:00", duration: 90, questionCount: 40 },
  { id: "2", title: "Business Enterprise Mid-term", course: "ENT 312", startsAt: "2026-05-22T14:00:00", duration: 60, questionCount: 25 },
];

const mockRecent = [
  { id: "r1", examTitle: "Data Structures Quiz 3", subject: "CSC 203", percentage: 88, score: 44, totalPoints: 50, completedAt: "2026-05-10", timeTaken: 2340, passingThreshold: 60, rank: 7 },
  { id: "r2", examTitle: "Discrete Math Test", subject: "MTH 211", percentage: 72, score: 36, totalPoints: 50, completedAt: "2026-05-08", timeTaken: 1980, passingThreshold: 60 },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Greeting */}
        <div className="mb-10">
          <div className="text-sm text-ink-500">Hello,</div>
          <h1 className="font-display text-4xl font-semibold text-ink-900 mt-0.5">
            {user?.name?.split(" ")[0] || "Student"} 👋
          </h1>
          <p className="mt-1 text-ink-500">Here's a summary of your exam activity.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard icon={FileText} label="Upcoming" value={mockUpcoming.length} color="accent" />
          <StatCard icon={History} label="Completed" value="12" color="ink" />
          <StatCard icon={TrendingUp} label="Average" value="84%" color="success" />
          <StatCard icon={Award} label="Best Score" value="98%" color="warning" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming exams */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-semibold text-ink-900">Upcoming Exams</h2>
            </div>
            <div className="space-y-3">
              {mockUpcoming.map((exam) => (
                <article key={exam.id} className="card p-5 flex items-center gap-5 hover:shadow-lg transition group">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-ink-900 text-white">
                    <div className="font-mono text-xs text-ink-400">
                      {new Date(exam.startsAt).toLocaleDateString("en", { month: "short" }).toUpperCase()}
                    </div>
                    <div className="font-display text-xl font-bold leading-none">
                      {new Date(exam.startsAt).getDate()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="badge bg-ink-100 text-ink-600 mb-1">{exam.course}</div>
                    <h3 className="font-semibold text-ink-900 truncate">{exam.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-xs text-ink-500">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {formatDateTime(exam.startsAt)}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {exam.duration} min</span>
                      <span>{exam.questionCount} questions</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/student/exam/${exam.id}`)}
                    className="btn-primary"
                  >
                    Start
                    <ChevronRight size={16} />
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* Recent results */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-semibold text-ink-900">Recent Results</h2>
              <button
                onClick={() => navigate("/student/history")}
                className="text-sm font-medium text-accent-600 hover:text-accent-700"
              >
                View all →
              </button>
            </div>
            <div className="space-y-3">
              {mockRecent.map((result) => (
                <ReportCard key={result.id} result={result} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    accent: "bg-accent-50 text-accent-600",
    ink: "bg-ink-100 text-ink-700",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
  };
  return (
    <div className="card p-5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors[color]}`}>
        <Icon size={18} />
      </div>
      <div className="mt-4 text-xs font-medium uppercase tracking-wider text-ink-400">{label}</div>
      <div className="mt-1 font-display text-3xl font-bold text-ink-900">{value}</div>
    </div>
  );
}