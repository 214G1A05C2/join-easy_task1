import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useAssignments } from '../../context/AssignmentContext';

export const Toast = () => {
  const { toast, closeToast } = useAssignments();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900',
    error: 'border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-900',
    info: 'border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-200"
    >
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border shadow-xl ${
          borders[toast.type] || borders.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 flex-1">
          {toast.message}
        </p>
        <button
          onClick={closeToast}
          aria-label="Close notification"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
