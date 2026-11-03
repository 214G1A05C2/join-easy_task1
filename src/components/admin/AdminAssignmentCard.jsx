import { formatDate, isOverdue } from '../../utils/dateUtils';
import { ProgressBar } from '../dashboard/ProgressBar';
import { Calendar, Users, ExternalLink, Edit2, Trash2, CheckCircle2, Clock } from 'lucide-react';

export const AdminAssignmentCard = ({
  assignment,
  onEdit,
  onDelete,
}) => {
  const assignedCount = assignment.assignedTo?.length || 0;
  const submissions = assignment.submissions || {};

  let submittedCount = 0;
  (assignment.assignedTo || []).forEach((email) => {
    if (submissions[email]?.status === 'Submitted') {
      submittedCount++;
    }
  });

  const pendingCount = assignedCount - submittedCount;
  const completionPercentage =
    assignedCount > 0 ? Math.round((submittedCount / assignedCount) * 100) : 0;
  const isPastDue = isOverdue(assignment.dueDate);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Top bar: Due Date & Actions */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${
              isPastDue
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Due {formatDate(assignment.dueDate)}</span>
            {isPastDue && <span className="font-bold">(Past Deadline)</span>}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(assignment)}
              title="Edit Assignment"
              className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(assignment)}
              title="Delete Assignment"
              className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {assignment.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {assignment.description}
          </p>
        </div>

        {/* Drive Link */}
        <div className="pt-2">
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline group"
          >
            <span>Drive Folder Repository</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Progress & Metrics */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
        {/* Metric counts */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center justify-center gap-1 text-slate-500 dark:text-slate-400 mb-0.5">
              <Users className="w-3 h-3" />
              <span>Assigned</span>
            </div>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {assignedCount}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30">
            <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 mb-0.5">
              <CheckCircle2 className="w-3 h-3" />
              <span>Submitted</span>
            </div>
            <span className="font-extrabold text-emerald-700 dark:text-emerald-400">
              {submittedCount}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/30">
            <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 mb-0.5">
              <Clock className="w-3 h-3" />
              <span>Pending</span>
            </div>
            <span className="font-extrabold text-amber-700 dark:text-amber-400">
              {pendingCount}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-1">
          <ProgressBar
            value={submittedCount}
            max={assignedCount}
            label="Completion"
            color={completionPercentage === 100 ? 'emerald' : 'indigo'}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};
