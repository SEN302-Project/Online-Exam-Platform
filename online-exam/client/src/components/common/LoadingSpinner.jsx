export default function LoadingSpinner({ size = "md", label }) {
  const sizes = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-10 w-10" };
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-2 border-ink-200 border-t-accent-600`}
      />
      {label && <p className="text-sm text-ink-500">{label}</p>}
    </div>
  );
}