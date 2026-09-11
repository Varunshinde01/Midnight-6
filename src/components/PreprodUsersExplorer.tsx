// src/components/PreprodUsersExplorer.tsx
import React, { useState } from 'react';
import { PREPROD_USERS, PREPROD_USER_ROLE_COUNTS, PREPROD_STATS, PreprodUser } from '../data/preprodUsers';
import { Search, Filter, ShieldCheck, ExternalLink, CheckCircle, Users, Box, MessageSquare } from 'lucide-react';

export const PreprodUsersExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = PREPROD_USERS.filter(user => {
    const matchesSearch = 
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 border border-indigo-500/20 bg-indigo-950/20 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Preprod Users</span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-bold text-white mt-2">{PREPROD_STATS.totalUsers}</p>
          <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> 100% Verifiable On-Chain
          </p>
        </div>

        <div className="glass-card p-5 border border-emerald-500/20 bg-emerald-950/20 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Verified Network Status</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-emerald-400 mt-2">{PREPROD_STATS.verifiedPercentage}%</p>
          <p className="text-xs text-gray-400 mt-1">Midnight Preprod Testnet</p>
        </div>

        <div className="glass-card p-5 border border-cyan-500/20 bg-cyan-950/20 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Avg Indexer Height</span>
            <Box className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-white mt-2">#{PREPROD_STATS.averageBlockHeight.toLocaleString()}</p>
          <p className="text-xs text-cyan-400 mt-1">Synched to Ledger</p>
        </div>

        <div className="glass-card p-5 border border-amber-500/20 bg-amber-950/20 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Feedback Telemetry</span>
            <MessageSquare className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-bold text-white mt-2">{PREPROD_STATS.totalFeedbackSubmitted}</p>
          <p className="text-xs text-amber-400 mt-1">Structured Entries</p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, name, org, or mn_1 address..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {['All', 'Government Officer', 'Defense Contractor', 'Infrastructure Vendor', 'Security Auditor', 'Public Observer'].map((role) => (
            <button
              key={role}
              onClick={() => { setSelectedRole(role); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedRole === role
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 text-gray-400 hover:text-gray-200 hover:bg-slate-700/80'
              }`}
            >
              {role} {role !== 'All' && `(${PREPROD_USER_ROLE_COUNTS[role as keyof typeof PREPROD_USER_ROLE_COUNTS]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Table */}
      <div className="glass-card rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-slate-900/90 text-xs text-gray-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="px-4 py-3">User ID & Name</th>
                <th className="px-4 py-3">Ecosystem Role</th>
                <th className="px-4 py-3">Organization</th>
                <th className="px-4 py-3">Midnight Wallet Address</th>
                <th className="px-4 py-3">Preprod Tx Hash</th>
                <th className="px-4 py-3">Block Height</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-indigo-950/20 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-indigo-300">
                      <div>{user.id}</div>
                      <div className="text-xs text-gray-400 font-sans">{user.name}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                        user.role === 'Government Officer' ? 'bg-purple-950/50 text-purple-300 border-purple-800/40' :
                        user.role === 'Defense Contractor' ? 'bg-blue-950/50 text-blue-300 border-blue-800/40' :
                        user.role === 'Infrastructure Vendor' ? 'bg-amber-950/50 text-amber-300 border-amber-800/40' :
                        user.role === 'Security Auditor' ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/40' :
                        'bg-slate-800 text-gray-300 border-slate-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-xs">{user.organization}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <span>{user.walletAddress.slice(0, 10)}...{user.walletAddress.slice(-8)}</span>
                        <button 
                          onClick={() => copyToClipboard(user.walletAddress)}
                          title="Copy Wallet Address"
                          className="text-gray-500 hover:text-indigo-400"
                        >
                          📋
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-indigo-400">
                      <a 
                        href={`https://indexer.preprod.midnight.network/tx/${user.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        {user.txHash.slice(0, 8)}... <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">#{user.blockHeight}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center w-fit gap-1">
                        <CheckCircle className="w-3 h-3" /> {user.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No preprod users matched your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <div>
            Showing <span className="font-semibold text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-semibold text-white">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of{' '}
            <span className="font-semibold text-white">{filteredUsers.length}</span> Preprod Users
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-3 py-1 bg-slate-800 text-gray-300 rounded disabled:opacity-40 hover:bg-slate-700"
            >
              Previous
            </button>
            <span className="px-3 py-1 bg-indigo-950 text-indigo-300 font-semibold rounded">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-3 py-1 bg-slate-800 text-gray-300 rounded disabled:opacity-40 hover:bg-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
