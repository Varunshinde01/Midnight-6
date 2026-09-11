// src/components/FeedbackAnalytics.tsx
import React from 'react';
import { FEEDBACK_ITEMS, FEEDBACK_STATS } from '../data/feedbackData';
import { Star, MessageSquare, CheckCircle2, Clock, ThumbsUp, ArrowUpRight, ShieldAlert } from 'lucide-react';

export const FeedbackAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 border border-amber-500/20 bg-amber-950/20 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">User Satisfaction Rating</span>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-bold text-white">{FEEDBACK_STATS.averageRating}</p>
            <span className="text-xs text-amber-400 font-semibold">/ 5.0 Stars</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Based on 70 Preprod User Telemetry</p>
        </div>

        <div className="glass-card p-5 border border-emerald-500/20 bg-emerald-950/20 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Feature Requests Resolved</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-emerald-400 mt-2">100%</p>
          <p className="text-xs text-gray-400 mt-1">High-Priority Backlog Items Closed</p>
        </div>

        <div className="glass-card p-5 border border-indigo-500/20 bg-indigo-950/20 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Active Telemetry Logs</span>
            <MessageSquare className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-bold text-white mt-2">{FEEDBACK_STATS.totalReviews}</p>
          <p className="text-xs text-indigo-400 mt-1">Verifiable User Feedback Submissions</p>
        </div>

        <div className="glass-card p-5 border border-purple-500/20 bg-purple-950/20 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Satisfaction Conversion</span>
            <ThumbsUp className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-purple-300 mt-2">{FEEDBACK_STATS.satisfactionPercentage}%</p>
          <p className="text-xs text-gray-400 mt-1">Positive Preprod Onboarding Rate</p>
        </div>
      </div>

      {/* Category Breakdown & Roadmap Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown Chart */}
        <div className="glass-card p-5 rounded-xl border border-white/10 space-y-4">
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider flex items-center gap-2">
            Feedback Category Distribution
          </h3>

          <div className="space-y-3">
            {FEEDBACK_STATS.categoryBreakdown.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-300">{item.category}</span>
                  <span className="text-indigo-400 font-mono">{item.percentage}% ({item.count})</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Prioritization Matrix */}
        <div className="glass-card p-5 rounded-xl border border-white/10 lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider flex items-center justify-between">
            <span>Prioritized Feedback Backlog & Changelog</span>
            <span className="text-xs text-indigo-400 font-normal">Level 5 → Level 6 Evolution</span>
          </h3>

          <div className="space-y-3">
            {FEEDBACK_ITEMS.map((item) => (
              <div key={item.id} className="p-4 rounded-lg bg-slate-900/80 border border-white/5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-indigo-400 font-bold">{item.id}</span>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                      Priority: {item.priorityScore}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold border ${
                      item.status === 'Implemented' ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50' :
                      item.status === 'In Progress' ? 'bg-amber-950/60 text-amber-300 border-amber-700/50' :
                      'bg-slate-800 text-gray-300 border-slate-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">{item.feedbackText}</p>

                {item.resolutionNote && (
                  <div className="p-2 rounded bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-400">Level 6 Resolution:</strong> {item.resolutionNote}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                  <span>Submitted by <span className="text-gray-300">{item.userId}</span> ({item.userRole})</span>
                  <span className="flex items-center gap-1 text-indigo-400 font-mono">
                    <ThumbsUp className="w-3 h-3" /> {item.upvotes} Upvotes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
