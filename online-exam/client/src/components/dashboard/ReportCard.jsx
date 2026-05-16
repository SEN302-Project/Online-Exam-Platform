import { Calendar, Clock, TrendingUp } from "lucide-react";
import { formatDate, formatTime } from "../../utils/formatTime";

export default function ReportCard({ result }) {
  const passed = result.percentage >= (result.passingThreshold || 60);

  return (
    <article className="card p-5 hover:shadow-lg transition group cursor-pointer">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`badge ${
                passed ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
              }`}
            >
              {passed ? "Passed" : "Failed"}
            </span>
            <span className="badge bg-ink-100 text-ink-600">{result.subject}</span>
          </div>
          <h3 className="font-display text-lg font-semibold text-ink-900 truncate group-hover:text-accent-600 transition">
            {result.examTitle}
          </h3>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-3xl font-bold text-ink-900 tabular-nums">
            {result.percentage}
            <span className="text-base text-ink-400">%</span>
          </div>
          <div className="text-xs text-ink-500">
            {result.score} / {result.totalPoints} pts
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 text-xs text-ink-500 pt-3 border-t border-ink-100">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} />
          {formatDate(result.completedAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={13} />
          {formatTime(result.timeTaken)}
        </span>
        {result.rank && (
          <span className="flex items-center gap-1.5 ml-auto">
            <TrendingUp size={13} />
            Rank {result.rank}
          </span>
        )}
      </div>
    </article>
  );
}