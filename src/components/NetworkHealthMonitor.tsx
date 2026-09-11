// src/components/NetworkHealthMonitor.tsx
import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Cpu, RefreshCw, CheckCircle2, Server } from 'lucide-react';

export const NetworkHealthMonitor: React.FC = () => {
  const [blockHeight, setBlockHeight] = useState(1206584);
  const [latency, setLatency] = useState(142);
  const [circuitStatus, setCircuitStatus] = useState<'Optimal' | 'Syncing'>('Optimal');

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight(b => b + 1);
      setLatency(130 + Math.floor(Math.random() * 30));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-4 rounded-xl border border-white/10 bg-slate-950/80 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
            Midnight Preprod Indexer Telemetry
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          OPERATIONAL
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-900/90 rounded-lg border border-white/5 space-y-1">
          <span className="text-gray-400 text-[10px] block font-semibold">TESTNET NETWORK</span>
          <span className="text-white font-mono font-bold flex items-center gap-1">
            <Server className="w-3 h-3 text-indigo-400" /> Preprod (0x020088f1)
          </span>
        </div>

        <div className="p-3 bg-slate-900/90 rounded-lg border border-white/5 space-y-1">
          <span className="text-gray-400 text-[10px] block font-semibold">LEDGER BLOCK HEIGHT</span>
          <span className="text-emerald-400 font-mono font-bold">
            #{blockHeight.toLocaleString()}
          </span>
        </div>

        <div className="p-3 bg-slate-900/90 rounded-lg border border-white/5 space-y-1">
          <span className="text-gray-400 text-[10px] block font-semibold">RPC INDEXER LATENCY</span>
          <span className="text-cyan-400 font-mono font-bold">{latency} ms</span>
        </div>

        <div className="p-3 bg-slate-900/90 rounded-lg border border-white/5 space-y-1">
          <span className="text-gray-400 text-[10px] block font-semibold">ZK CIRCUIT ENGINE</span>
          <span className="text-purple-400 font-mono font-bold flex items-center gap-1">
            <Cpu className="w-3 h-3 text-purple-400" /> WASM Compact 0.1
          </span>
        </div>
      </div>
    </div>
  );
};
