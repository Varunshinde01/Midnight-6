// src/components/FeedbackModal.tsx
import React, { useState } from 'react';
import { X, Star, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [role, setRole] = useState('Defense Contractor');
  const [category, setCategory] = useState('UX / Interface');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSubmitSuccess) onSubmitSuccess();
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setTitle('');
    setFeedbackText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg p-6 rounded-2xl border border-white/20 relative shadow-2xl bg-slate-950/90">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Preprod User Feedback Loop</h3>
                <p className="text-xs text-gray-400">Direct telemetry channel for 70 Preprod participants</p>
              </div>
            </div>

            {/* Role & Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Ecosystem Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Government Officer">Government Officer</option>
                  <option value="Defense Contractor">Defense Contractor</option>
                  <option value="Infrastructure Vendor">Infrastructure Vendor</option>
                  <option value="Security Auditor">Security Auditor</option>
                  <option value="Public Observer">Public Observer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Feedback Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="UX / Interface">UX / Interface</option>
                  <option value="ZK Privacy & Security">ZK Privacy & Security</option>
                  <option value="Gas & Speed">Gas & Speed</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Feature Request">Feature Request</option>
                </select>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Satisfaction Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 focus:outline-none hover:scale-110 transition-transform"
                  >
                    <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-gray-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Title / Summary
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Fast ZK Bid Submission & Sleek UI"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Detailed Feedback & Feature Request
              </label>
              <textarea
                required
                rows={3}
                placeholder="Share your preprod testing experience, bug reports, or feature suggestions..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Feedback Logged & Verifiable!</h3>
            <p className="text-xs text-gray-300 max-w-md mx-auto">
              Thank you for contributing to the GovBid Midnight Level 6 Preprod Feedback Loop. Your response has been added to our living telemetry matrix.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
