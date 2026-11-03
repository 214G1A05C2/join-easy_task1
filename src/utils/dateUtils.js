/**
 * Date utility functions for Joineazy Assignment & Review Dashboard
 */

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const due = new Date(dueDate);
  // Compare by end of the due date day if no specific time is provided
  if (dueDate.length === 10) {
    due.setHours(23, 59, 59, 999);
  }
  return new Date() > due;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
};

export const getStudentAssignmentStatus = (assignment, studentEmail) => {
  if (!assignment) return 'Pending';
  const sub = assignment.submissions?.[studentEmail];
  if (sub && sub.status === 'Submitted') {
    return 'Submitted';
  }
  if (isOverdue(assignment.dueDate)) {
    return 'Overdue';
  }
  return 'Pending';
};

export const getTodayFormatted = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
