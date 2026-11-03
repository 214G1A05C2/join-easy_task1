import { useState, useMemo } from 'react';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate, formatDateTime, isOverdue } from '../../utils/dateUtils';
import { Search, Filter, ArrowUpDown, Calendar, ExternalLink } from 'lucide-react';

export const StudentSubmissionsTable = ({ assignments, students }) => {
  const [search, setSearch] = useState('');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState('studentName');
  const [sortAsc, setSortAsc] = useState(true);

  // Flatten submissions across all assigned students for the admin's assignments
  const studentRows = useMemo(() => {
    const rows = [];
    const studentMap = new Map(students.map((s) => [s.email.toLowerCase(), s]));

    assignments.forEach((asg) => {
      const assignedList = asg.assignedTo || [];
      const subs = asg.submissions || {};

      assignedList.forEach((email) => {
        const student = studentMap.get(email.toLowerCase()) || {
          name: email.split('@')[0],
          email,
          avatar: null,
        };

        const sub = subs[email];
        let status = 'Pending';
        if (sub && sub.status === 'Submitted') {
          status = 'Submitted';
        } else if (isOverdue(asg.dueDate)) {
          status = 'Overdue';
        }

        rows.push({
          id: `${asg.id}-${email}`,
          assignmentId: asg.id,
          assignmentTitle: asg.title,
          driveLink: asg.driveLink,
          dueDate: asg.dueDate,
          studentName: student.name,
          studentEmail: email,
          studentAvatar: student.avatar,
          status,
          submittedAt: sub?.submittedAt || null,
        });
      });
    });

    return rows;
  }, [assignments, students]);

  // Filter & Sort
  const filteredRows = useMemo(() => {
    return studentRows
      .filter((row) => {
        // Assignment filter
        if (selectedAssignmentId !== 'ALL' && row.assignmentId !== selectedAssignmentId) {
          return false;
        }

        // Status filter
        if (statusFilter !== 'ALL' && row.status.toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }

        // Search text filter
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = row.studentName.toLowerCase().includes(q);
          const matchEmail = row.studentEmail.toLowerCase().includes(q);
          const matchTitle = row.assignmentTitle.toLowerCase().includes(q);
          if (!matchName && !matchEmail && !matchTitle) return false;
        }

        return true;
      })
      .sort((a, b) => {
        let valA = a[sortField] || '';
        let valB = b[sortField] || '';
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [studentRows, selectedAssignmentId, statusFilter, search, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Student-wise Submission Records
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live submission logs and timestamps for all assigned students
            </p>
          </div>
          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-auto">
            Showing {filteredRows.length} of {studentRows.length} entries
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student or assignment..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Assignment dropdown filter */}
          <div>
            <select
              value={selectedAssignmentId}
              onChange={(e) => setSelectedAssignmentId(e.target.value)}
              aria-label="Filter submissions by assignment"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Assignments ({assignments.length})</option>
              {assignments.map((asg) => (
                <option key={asg.id} value={asg.id}>
                  {asg.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status dropdown filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter submissions by status"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">
              <th
                onClick={() => handleSort('studentName')}
                className="py-3 px-4 cursor-pointer hover:text-indigo-600 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Student</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th
                onClick={() => handleSort('assignmentTitle')}
                className="py-3 px-4 cursor-pointer hover:text-indigo-600 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Assignment</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th
                onClick={() => handleSort('dueDate')}
                className="py-3 px-4 cursor-pointer hover:text-indigo-600 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Due Date</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th
                onClick={() => handleSort('status')}
                className="py-3 px-4 cursor-pointer hover:text-indigo-600 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Status</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th
                onClick={() => handleSort('submittedAt')}
                className="py-3 px-4 cursor-pointer hover:text-indigo-600 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Submission Timestamp</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-slate-400">
                  <p className="text-sm font-medium">No matching student submissions found.</p>
                  <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {/* Student Name & Email */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      {row.studentAvatar ? (
                        <img
                          src={row.studentAvatar}
                          alt={row.studentName}
                          className="w-7 h-7 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {row.studentName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {row.studentName}
                        </p>
                        <p className="text-slate-400 text-[11px]">{row.studentEmail}</p>
                      </div>
                    </div>
                  </td>

                  {/* Assignment Title */}
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {row.assignmentTitle}
                      </p>
                      {row.driveLink && (
                        <a
                          href={row.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <span>Drive Folder</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{formatDate(row.dueDate)}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <StatusBadge status={row.status} />
                  </td>

                  {/* Submitted Timestamp */}
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-slate-600 dark:text-slate-300">
                    {row.submittedAt ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-sans font-medium">
                        {formatDateTime(row.submittedAt)}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-sans">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
