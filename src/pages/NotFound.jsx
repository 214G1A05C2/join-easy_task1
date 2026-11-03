import { GraduationCap, ArrowLeft } from 'lucide-react';

export const NotFound = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
        <GraduationCap className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        404
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-sm">
        The requested page could not be found or you may not have sufficient access permissions.
      </p>
      <button
        onClick={onGoHome}
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </button>
    </div>
  );
};
