import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAssignments } from '../context/AssignmentContext';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { AdminStats } from '../components/admin/AdminStats';
import { AdminAssignmentCard } from '../components/admin/AdminAssignmentCard';
import { StudentSubmissionsTable } from '../components/admin/StudentSubmissionsTable';
import { AssignmentFormModal } from '../components/assignments/AssignmentFormModal';
import { ConfirmationDialog } from '../components/common/ConfirmationDialog';
import { getTodayFormatted } from '../utils/dateUtils';
import {
  PlusCircle,
  Search,
  Filter,
  ArrowUpDown,
  BookOpen,
  Calendar,
  Layers,
  Inbox,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard = () => {
  const { currentUser, students } = useAuth();
  const {
    assignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  } = useAssignments();

  const [activeTab, setActiveTab] = useState('overview'); // overview | submissions
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('dueDate'); // dueDate | title
  const [sortAsc, setSortAsc] = useState(true);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deletingAssignment, setDeletingAssignment] = useState(null);

  // Requirement: Admins should only see assignments created by their own account!
  const adminAssignments = useMemo(() => {
    if (!currentUser?.email) return [];
    return assignments.filter(
      (asg) => asg.createdBy?.toLowerCase() === currentUser.email.toLowerCase()
    );
  }, [assignments, currentUser?.email]);

  // Filtered & Sorted for overview list
  const filteredAssignments = useMemo(() => {
    return adminAssignments
      .filter((asg) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          asg.title.toLowerCase().includes(q) ||
          asg.description.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'dueDate') {
          const dateA = new Date(a.dueDate).getTime() || 0;
          const dateB = new Date(b.dueDate).getTime() || 0;
          return sortAsc ? dateA - dateB : dateB - dateA;
        }
        if (sortBy === 'title') {
          return sortAsc
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        return 0;
      });
  }, [adminAssignments, search, sortBy, sortAsc]);

  const handleCreateSubmit = (data) => {
    createAssignment(data, currentUser);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (data) => {
    if (editingAssignment) {
      updateAssignment(editingAssignment.id, data);
      setEditingAssignment(null);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingAssignment) {
      deleteAssignment(deletingAssignment.id);
      setDeletingAssignment(null);
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onCreateClick={() => setIsCreateModalOpen(true)}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-indigo-900/40">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-semibold text-indigo-300 border border-white/10">
              <Calendar className="w-3.5 h-3.5" />
              <span>{getTodayFormatted()}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Instructor Portal — {currentUser?.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Manage coursework assignments, review student submissions across Google Drive, and monitor live class completion rates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:shadow-xl self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Assignment</span>
            </button>
          </div>
        </div>

        {/* Dynamic Admin Statistics */}
        <AdminStats assignments={adminAssignments} />

        {/* Tab Controls: Overview vs Student Submissions */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Coursework Management ({adminAssignments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'submissions'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Student-wise Tracking Table</span>
          </button>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            {/* Search & Sort bar */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search assignments by title or description..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
                <span className="text-slate-400">Sort by:</span>
                <button
                  onClick={() => setSortAsc(!sortAsc)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
                >
                  <span>{sortAsc ? 'Earliest Due' : 'Latest Due'}</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Assignments Grid */}
            {filteredAssignments.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Inbox className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No assignments created yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the "Create New Assignment" button to publish your first coursework task.
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Assignment</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredAssignments.map((assignment) => (
                  <AdminAssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onEdit={(asg) => setEditingAssignment(asg)}
                    onDelete={(asg) => setDeletingAssignment(asg)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Student Submissions Tab Content */}
        {activeTab === 'submissions' && (
          <StudentSubmissionsTable
            assignments={adminAssignments}
            students={students}
          />
        )}
      </div>

      {/* Create Assignment Modal */}
      <AssignmentFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        assignmentToEdit={null}
      />

      {/* Edit Assignment Modal */}
      <AssignmentFormModal
        isOpen={Boolean(editingAssignment)}
        onClose={() => setEditingAssignment(null)}
        onSubmit={handleEditSubmit}
        assignmentToEdit={editingAssignment}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={Boolean(deletingAssignment)}
        onClose={() => setDeletingAssignment(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Assignment"
        message={`Are you sure you want to permanently delete "${deletingAssignment?.title}"? All associated submission logs will be removed.`}
        confirmText="Delete Assignment"
        cancelText="Cancel"
        confirmVariant="danger"
      />
    </DashboardLayout>
  );
};
