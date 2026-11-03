import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const StatusBadge = ({ status, className = '' }) => {
  const norm = (status || '').toLowerCase();

  if (norm === 'submitted') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800 ${className}`}
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        Submitted
      </span>
    );
  }

  if (norm === 'overdue') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800 ${className}`}
      >
        <AlertCircle className="w-3.5 h-3.5" />
        Overdue
      </span>
    );
  }

  // Pending (default)
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800 ${className}`}
    >
      <Clock className="w-3.5 h-3.5" />
      Pending
    </span>
  );
};
