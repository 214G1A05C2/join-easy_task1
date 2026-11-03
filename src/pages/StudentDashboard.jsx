import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAssignments } from '../context/AssignmentContext';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StudentStats } from '../components/student/StudentStats';
import { StudentAssignmentCard } from '../components/student/StudentAssignmentCard';
import { StudentSubmissionModal } from '../components/assignments/StudentSubmissionModal';
import { getStudentAssignmentStatus, getTodayFormatted } from '../utils/dateUtils';
import {
  Search,
  Filter,
  ArrowUpDown,
  BookOpen,
  Calendar,
  Sparkles,
  Inbox,
} from 'lucide-react';

export const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { assignments, submitAssignment } = useAssignments();

  const [activeTab, setActiveTab] = useState('all'); // all | pending | submitted
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | Pending | Submitted | Overdue
  const [sortBy, setSortBy] = useState('dueDate'); // dueDate | title
  const [sortAsc, setSortAsc] = useState(true);

  // Modal state
  const [selectedAssignmentForSubmission, setSelectedAssignmentForSubmission] = useState(null);

  // Filter only assignments assigned to this student
  const studentAssignments = useMemo(() => {
    if (!currentUser?.email) return [];
    return assignments.filter((asg) =>
      (asg.assignedTo || []).includes(currentUser.email)
    );
  }, [assignments, currentUser?.email]);

  // Apply search, filters & sort
  const processedAssignments = useMemo(() => {
    return studentAssignments
      .filter((asg) => {
        const status = getStudentAssignmentStatus(asg, currentUser.email);

        // Sidebar tab filter
        if (activeTab === 'pending' && status === 'Submitted') return false;
        if (activeTab === 'submitted' && status !== 'Submitted') return false;

        // Dropdown status filter
        if (statusFilter !== 'ALL' && status.toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }

        // Search by title or description
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = asg.title.toLowerCase().includes(q);
          const matchDesc = asg.description.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDate') {
          const dateA = new Date(a.dueDate).getTime() || 0;
          const dateB = new Date(b.dueDate).getTime() || 0;
          return sortAsc ? dateA - dateB : dateB - dateA;
        }
        if (sortBy === 'title') {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          return sortAsc ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
        }
        return 0;
      });
  }, [studentAssignments, currentUser?.email, activeTab, statusFilter, search, sortBy, sortAsc]);

  const handleOpenSubmission = (asg) => {
    setSelectedAssignmentForSubmission(asg);
  };

  const handleConfirmSubmission = async (assignmentId) => {
    submitAssignment(assignmentId, currentUser.email);
  };

  return (
    <DashboardLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-600/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold text-indigo-100">
              <Calendar className="w-3.5 h-3.5" />
              <span>{getTodayFormatted()}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {currentUser?.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
              Track your coursework deadlines, access assignment Google Drive repositories, and confirm your completed submissions.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur p-3.5 rounded-2xl border border-white/10 shrink-0 self-start sm:self-auto">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-white/30"
            />
            <div>
              <p className="text-xs font-bold leading-tight">{currentUser?.name}</p>
              <p className="text-[11px] text-indigo-200">ID: {currentUser?.studentId || 'JE-STUDENT'}</p>
              <span className="inline-block mt-0.5 text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-white/20 text-white">
                Student Account
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <StudentStats
          assignments={studentAssignments}
          studentEmail={currentUser?.email}
        />

        {/* Search & Filter Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Assigned Coursework
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {processedAssignments.length}
              </span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <span className="text-slate-400">Sort:</span>
              <button
                onClick={() => setSortAsc(!sortAsc)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
              >
                <span>{sortAsc ? 'Earliest Due' : 'Latest Due'}</span>
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assignments by title or topics..."
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status Dropdown */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter assignments by status"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Submitted">Submitted</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assignment Cards Grid */}
        {processedAssignments.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No assignments found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No coursework matches your current search criteria or status filter. Try clearing filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {processedAssignments.map((assignment) => (
              <StudentAssignmentCard
                key={assignment.id}
                assignment={assignment}
                studentEmail={currentUser?.email}
                onSubmitClick={handleOpenSubmission}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2-Step Submission Modal */}
      <StudentSubmissionModal
        isOpen={Boolean(selectedAssignmentForSubmission)}
        onClose={() => setSelectedAssignmentForSubmission(null)}
        assignment={selectedAssignmentForSubmission}
        onConfirmSubmit={handleConfirmSubmission}
      />
    </DashboardLayout>
  );
};
