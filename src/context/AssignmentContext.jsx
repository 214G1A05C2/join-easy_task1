import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ASSIGNMENTS } from '../data/seedData';
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from '../utils/storage';

const AssignmentContext = createContext(null);

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.ASSIGNMENTS, INITIAL_ASSIGNMENTS);
  });

  const [toast, setToast] = useState(null);

  // Sync assignments to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ASSIGNMENTS, assignments);
  }, [assignments]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  };

  const closeToast = () => {
    setToast(null);
  };

  // Create new assignment
  const createAssignment = (data, adminUser) => {
    const newAssignment = {
      id: `asg-${Date.now()}`,
      title: data.title.trim(),
      description: data.description.trim(),
      dueDate: data.dueDate,
      driveLink: data.driveLink.trim(),
      createdBy: adminUser.email,
      creatorName: adminUser.name,
      assignedTo: data.assignedTo || [],
      submissions: {},
      createdAt: new Date().toISOString(),
    };

    setAssignments((prev) => [newAssignment, ...prev]);
    showToast(`Assignment "${newAssignment.title}" created successfully!`, 'success');
    return newAssignment;
  };

  // Edit assignment: preserve existing submissions for retained students
  const updateAssignment = (id, updatedFields) => {
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id !== id) return asg;

        const updatedAssignedTo = updatedFields.assignedTo ?? asg.assignedTo;
        const currentSubmissions = asg.submissions || {};
        const cleanedSubmissions = {};

        // Only retain submission records for students who remain assigned
        updatedAssignedTo.forEach((email) => {
          if (currentSubmissions[email]) {
            cleanedSubmissions[email] = currentSubmissions[email];
          }
        });

        return {
          ...asg,
          ...updatedFields,
          title: updatedFields.title ? updatedFields.title.trim() : asg.title,
          description: updatedFields.description ? updatedFields.description.trim() : asg.description,
          driveLink: updatedFields.driveLink ? updatedFields.driveLink.trim() : asg.driveLink,
          assignedTo: updatedAssignedTo,
          submissions: cleanedSubmissions,
          updatedAt: new Date().toISOString(),
        };
      })
    );
    showToast('Assignment updated successfully!', 'success');
  };

  // Delete assignment
  const deleteAssignment = (id) => {
    const toDelete = assignments.find((a) => a.id === id);
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    showToast(`Deleted assignment "${toDelete?.title || ''}"`, 'info');
  };

  // Submit assignment by student
  const submitAssignment = (assignmentId, studentEmail) => {
    let success = false;
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id !== assignmentId) return asg;

        // Check if student is assigned
        if (!asg.assignedTo.includes(studentEmail)) {
          return asg;
        }

        const currentSubmissions = asg.submissions || {};
        const updatedSubmissions = {
          ...currentSubmissions,
          [studentEmail]: {
            status: 'Submitted',
            submittedAt: new Date().toISOString(),
          },
        };

        success = true;
        return {
          ...asg,
          submissions: updatedSubmissions,
        };
      })
    );

    if (success) {
      showToast('Assignment marked as submitted successfully!', 'success');
    }
    return success;
  };

  // Reset to initial seed demo data
  const resetToSeedData = () => {
    setAssignments(INITIAL_ASSIGNMENTS);
    saveToStorage(STORAGE_KEYS.ASSIGNMENTS, INITIAL_ASSIGNMENTS);
    showToast('Demo data has been reset to defaults.', 'info');
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        toast,
        showToast,
        closeToast,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        submitAssignment,
        resetToSeedData,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignments = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error('useAssignments must be used within an AssignmentProvider');
  }
  return context;
};
