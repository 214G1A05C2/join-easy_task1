import { StatCard } from '../dashboard/StatCard';
import { ProgressBar } from '../dashboard/ProgressBar';
import { BookOpen, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export const StudentStats = ({ assignments, studentEmail }) => {
  const total = assignments.length;
  let submitted = 0;
  let pending = 0;
  let overdue = 0;

  assignments.forEach((asg) => {
    const isSub = asg.submissions?.[studentEmail]?.status === 'Submitted';
    if (isSub) {
      submitted++;
    } else {
      const isPastDue = asg.dueDate ? new Date(asg.dueDate) < new Date() : false;
      if (isPastDue) {
        overdue++;
      } else {
        pending++;
      }
    }
  });

  const completionPercentage = total > 0 ? Math.round((submitted / total) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Assigned"
          value={total}
          subtitle="Coursework tasks"
          icon={BookOpen}
          variant="indigo"
        />
        <StatCard
          title="Submitted"
          value={submitted}
          subtitle="Completed assignments"
          icon={CheckCircle2}
          variant="emerald"
        />
        <StatCard
          title="Pending"
          value={pending}
          subtitle="Awaiting submission"
          icon={Clock}
          variant="amber"
        />
        <StatCard
          title="Overdue"
          value={overdue}
          subtitle="Past due date"
          icon={AlertTriangle}
          variant="rose"
        />
      </div>

      {/* Overall Progress Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Overall Academic Progress
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
              {submitted} of {total} submitted
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {total === 0
              ? 'No assignments assigned yet.'
              : completionPercentage === 100
              ? '🎉 Outstanding work! You have completed all assignments.'
              : `You have completed ${completionPercentage}% of your coursework. Keep going!`}
          </p>
        </div>

        <div className="w-full sm:w-72">
          <ProgressBar
            value={submitted}
            max={total}
            color={completionPercentage === 100 ? 'emerald' : 'indigo'}
            size="md"
            showPercentage={true}
          />
        </div>
      </div>
    </div>
  );
};
