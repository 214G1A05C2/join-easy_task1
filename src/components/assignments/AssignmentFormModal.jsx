import { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { Users, Link as LinkIcon, Calendar, FileText, Check } from 'lucide-react';

export const AssignmentFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  assignmentToEdit = null, // null for create mode
}) => {
  const { students } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [assignToAll, setAssignToAll] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = Boolean(assignmentToEdit);

  useEffect(() => {
    if (isOpen) {
      if (assignmentToEdit) {
        setTitle(assignmentToEdit.title || '');
        setDescription(assignmentToEdit.description || '');
        setDueDate(assignmentToEdit.dueDate || '');
        setDriveLink(assignmentToEdit.driveLink || '');
        const assigned = assignmentToEdit.assignedTo || [];
        setSelectedStudents(assigned);
        const allAssigned =
          students.length > 0 && students.every((s) => assigned.includes(s.email));
        setAssignToAll(allAssigned);
      } else {
        // Defaults for create
        setTitle('');
        setDescription('');
        // default due date: 7 days from now
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        setDueDate(nextWeek.toISOString().split('T')[0]);
        setDriveLink('');
        setAssignToAll(true);
        setSelectedStudents(students.map((s) => s.email));
      }
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, assignmentToEdit, students]);

  const handleToggleSelectAll = (checked) => {
    setAssignToAll(checked);
    if (checked) {
      setSelectedStudents(students.map((s) => s.email));
    }
  };

  const handleToggleStudent = (studentEmail) => {
    setSelectedStudents((prev) => {
      let next;
      if (prev.includes(studentEmail)) {
        next = prev.filter((e) => e !== studentEmail);
      } else {
        next = [...prev, studentEmail];
      }
      // If all students selected, toggle assignToAll
      setAssignToAll(students.length > 0 && next.length === students.length);
      return next;
    });
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Assignment title is required.';
    }
    if (!description.trim()) {
      errs.description = 'Assignment description is required.';
    }
    if (!dueDate) {
      errs.dueDate = 'Due date is required.';
    }

    if (!driveLink.trim()) {
      errs.driveLink = 'Google Drive submission link is required.';
    } else {
      try {
        const parsed = new URL(driveLink);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          errs.driveLink = 'Link must start with http:// or https://';
        }
      } catch {
        errs.driveLink = 'Please enter a valid URL (e.g., https://drive.google.com/...)';
      }
    }

    const assigned = assignToAll ? students.map((s) => s.email) : selectedStudents;
    if (assigned.length === 0) {
      errs.students = 'At least one student must be selected.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const assigned = assignToAll ? students.map((s) => s.email) : selectedStudents;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      driveLink: driveLink.trim(),
      assignedTo: assigned,
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit Assignment' : 'Create New Assignment'}
      subtitle={
        isEditMode
          ? 'Update assignment details, timeline, and allocated students.'
          : 'Create a new coursework assignment and assign it to your students.'
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Assignment Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
              }}
              placeholder="e.g., React Fundamentals & State Architecture"
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.title
                  ? 'border-rose-400 focus:ring-rose-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Description & Objectives <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
              }}
              placeholder="Detailed guidelines, submission instructions, and deliverables..."
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.description
                  ? 'border-rose-400 focus:ring-rose-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.description && (
            <p className="mt-1 text-xs text-rose-500">{errors.description}</p>
          )}
        </div>

        {/* Grid: Due Date & Drive Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Due Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: null }));
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.dueDate
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.dueDate && <p className="mt-1 text-xs text-rose-500">{errors.dueDate}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Google Drive Submission Link <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={driveLink}
                onChange={(e) => {
                  setDriveLink(e.target.value);
                  if (errors.driveLink) setErrors((prev) => ({ ...prev, driveLink: null }));
                }}
                placeholder="https://drive.google.com/drive/folders/..."
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.driveLink
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.driveLink && <p className="mt-1 text-xs text-rose-500">{errors.driveLink}</p>}
          </div>
        </div>

        {/* Student Assignment Selection */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <span>Assigned Students</span>
              <span className="text-rose-500">*</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">
              <input
                type="checkbox"
                checked={assignToAll}
                onChange={(e) => handleToggleSelectAll(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
              />
              <span>Assign to all students ({students.length})</span>
            </label>
          </div>

          {errors.students && (
            <p className="mb-2 text-xs text-rose-500">{errors.students}</p>
          )}

          {!assignToAll && (
            <div className="border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 bg-slate-50 dark:bg-slate-800/50 max-h-48 overflow-y-auto space-y-1.5">
              {students.map((student) => {
                const isChecked = selectedStudents.includes(student.email);
                return (
                  <label
                    key={student.id}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                      isChecked
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/40 text-slate-900 dark:text-white font-medium'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleStudent(student.email)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-semibold">{student.name}</span>
                        <span className="text-slate-400 ml-1.5 font-normal">
                          ({student.email})
                        </span>
                      </div>
                    </div>
                    {isChecked && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors disabled:opacity-50"
          >
            {isSubmitting
              ? 'Saving...'
              : isEditMode
              ? 'Save Changes'
              : 'Create Assignment'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
