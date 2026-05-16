export default function ScoreChart({ data, title = "Score Distribution" }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-ink-900 mb-1">{title}</h3>
      <p className="text-sm text-ink-500 mb-5">Number of students per score range</p>

      <div className="flex items-end gap-2 h-44">
        {data.map((d, i) => {
          const heightPct = (d.value / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="text-xs font-mono text-ink-400 opacity-0 group-hover:opacity-100 transition">
                {d.value}
              </div>
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-accent-600 to-accent-500 transition-all duration-700 hover:from-accent-700 hover:to-accent-600"
                  style={{ height: `${heightPct}%`, minHeight: d.value > 0 ? "4px" : "0" }}
                />
              </div>
              <div className="text-[10px] font-medium text-ink-500 tracking-wide">{d.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}