export const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  showPercentage = true,
  size = 'md', // sm | md | lg
  color = 'indigo', // indigo | emerald | amber | rose
}) => {
  const percentage = max > 0 ? Math.min(100, Math.max(0, Math.round((value / max) * 100))) : 0;

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const colors = {
    indigo: 'bg-indigo-600 dark:bg-indigo-500',
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    amber: 'bg-amber-500 dark:bg-amber-400',
    rose: 'bg-rose-500 dark:bg-rose-400',
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
          <span>{label}</span>
          {showPercentage && <span className="text-slate-900 dark:text-white font-bold">{percentage}%</span>}
        </div>
      )}
      <div
        className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${
          heights[size] || heights.md
        }`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            colors[color] || colors.indigo
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
