import { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { ExternalLink, CheckCircle2, AlertCircle, ArrowLeft, Send } from 'lucide-react';

export const StudentSubmissionModal = ({
  isOpen,
  onClose,
  assignment,
  onConfirmSubmit,
}) => {
  // Step 1: Initial drive confirmation
  // Step 2: Final submit confirmation
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset step whenever modal opens or assignment changes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitting(false);
    }
  }, [isOpen, assignment]);

  if (!assignment) return null;

  const handleFirstStepNext = () => {
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onConfirmSubmit(assignment.id);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === 1 ? 'Step 1 of 2: Drive Submission Check' : 'Step 2 of 2: Confirm Submission'}
      subtitle={assignment.title}
      maxWidth="max-w-lg"
    >
      <div className="space-y-5">
        {step === 1 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900 dark:text-amber-200 space-y-1">
                <p className="font-semibold">
                  Important notice regarding file uploads:
                </p>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  Actual assignment files are not uploaded directly to this portal. All project work must be uploaded to the instructor's designated Google Drive folder.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Instructor Drive Link
              </p>
              <a
                href={assignment.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors group break-all"
              >
                <span>Open Google Drive Submission Folder</span>
                <ExternalLink className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="pt-2">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Have you completed and submitted this assignment through the provided Drive link?
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFirstStepNext}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span>Yes, I have submitted</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-sm text-indigo-950 dark:text-indigo-200">
                <p className="font-semibold">Final Confirmation Required</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-300 mt-1 leading-relaxed">
                  Are you sure you want to mark this assignment as submitted? This will record your submission timestamp and notify your professor.
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
              <p>Assignment: <strong className="text-slate-700 dark:text-slate-200">{assignment.title}</strong></p>
              <p className="mt-1">Assigned by: <strong className="text-slate-700 dark:text-slate-200">{assignment.creatorName}</strong></p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back</span>
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Recording...' : 'Confirm Submission'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
