export default function ProgressBar({ value, max = 100, color, height = "h-2", showLabel = true }) {
  const pct = Math.min((value / max) * 100, 100);
  const barColor =
    color ||
    (pct >= 80 ? "bg-success" : pct >= 60 ? "bg-accent-600" : pct >= 40 ? "bg-warning" : "bg-danger");

  return (
    <div className="flex items-center gap-3 w-full">
      <div className={`flex-1 ${height} rounded-full bg-ink-100 overflow-hidden`}>
        <div
          className={`h-full ${barColor} transition-all duration-700 ease-out rounded-full`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="font-mono text-xs font-semibold text-ink-700 tabular-nums shrink-0">
          {value}%
        </span>
      )}
    </div>
  );
}
