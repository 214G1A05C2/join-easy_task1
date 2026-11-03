import { StatusBadge } from '../common/StatusBadge';
import { formatDate, formatDateTime, getStudentAssignmentStatus } from '../../utils/dateUtils';
import { Calendar, UserCheck, ExternalLink, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const StudentAssignmentCard = ({
  assignment,
  studentEmail,
  onSubmitClick,
}) => {
  const status = getStudentAssignmentStatus(assignment, studentEmail);
  const isSubmitted = status === 'Submitted';
  const isOverdueStatus = status === 'Overdue';
  const submissionRecord = assignment.submissions?.[studentEmail];

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between hover:shadow-md ${
        isOverdueStatus
          ? 'border-rose-200 dark:border-rose-900/60 ring-1 ring-rose-100 dark:ring-rose-950/40'
          : 'border-slate-200/80 dark:border-slate-800'
      }`}
    >
      <div className="p-5 sm:p-6 space-y-4">
        {/* Top bar: Status & Due date */}
        <div className="flex items-start justify-between gap-2">
          <StatusBadge status={status} />
          <div
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${
              isOverdueStatus
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 font-bold'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Due {formatDate(assignment.dueDate)}</span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {assignment.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {assignment.description}
          </p>
        </div>

        {/* Instructor & Drive Link */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <UserCheck className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>
              Instructor: <strong className="text-slate-700 dark:text-slate-200">{assignment.creatorName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold hover:underline group"
            >
              <span>Assignment Folder on Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Card Footer: Submission status / button */}
      <div className="px-5 py-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
        {isSubmitted ? (
          <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>
              Submitted on{' '}
              <strong>{formatDateTime(submissionRecord?.submittedAt)}</strong>
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {isOverdueStatus ? (
                <span className="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Past deadline
                </span>
              ) : (
                'Pending submission'
              )}
            </span>
            <button
              onClick={() => onSubmitClick(assignment)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm transition-all hover:shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Assignment</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
