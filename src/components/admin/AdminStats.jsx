import { StatCard } from '../dashboard/StatCard';
import { ProgressBar } from '../dashboard/ProgressBar';
import { BookOpen, Users, CheckCircle2, Clock, Award } from 'lucide-react';

export const AdminStats = ({ assignments }) => {
  const totalAssignments = assignments.length;

  let totalAllocations = 0;
  let totalSubmitted = 0;
  let totalPending = 0;

  assignments.forEach((asg) => {
    const assignedCount = asg.assignedTo?.length || 0;
    totalAllocations += assignedCount;

    const subs = asg.submissions || {};
    let subCount = 0;
    (asg.assignedTo || []).forEach((email) => {
      if (subs[email]?.status === 'Submitted') {
        subCount++;
      }
    });

    totalSubmitted += subCount;
    totalPending += assignedCount - subCount;
  });

  const completionRate =
    totalAllocations > 0 ? Math.round((totalSubmitted / totalAllocations) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assignments Created"
          value={totalAssignments}
          subtitle="Your created coursework"
          icon={BookOpen}
          variant="indigo"
        />
        <StatCard
          title="Total Student Allocations"
          value={totalAllocations}
          subtitle="Across all coursework"
          icon={Users}
          variant="slate"
        />
        <StatCard
          title="Submissions Received"
          value={totalSubmitted}
          subtitle="Submitted student works"
          icon={CheckCircle2}
          variant="emerald"
        />
        <StatCard
          title="Pending Submissions"
          value={totalPending}
          subtitle="Awaiting submission"
          icon={Clock}
          variant="amber"
        />
      </div>

      {/* Class Completion Rate Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-500" />
              Overall Class Completion Rate
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40">
              {completionRate}% Completed
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {totalAllocations === 0
              ? 'No student allocations yet.'
              : `${totalSubmitted} out of ${totalAllocations} student submissions completed across your assignments.`}
          </p>
        </div>

        <div className="w-full sm:w-72">
          <ProgressBar
            value={totalSubmitted}
            max={totalAllocations}
            color={completionRate >= 70 ? 'emerald' : completionRate >= 40 ? 'indigo' : 'amber'}
            size="md"
            showPercentage={true}
          />
        </div>
      </div>
    </div>
  );
};
