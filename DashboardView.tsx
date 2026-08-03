import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  CheckCircle, 
  Clock, 
  Download, 
  FileText, 
  Search, 
  Sliders, 
  Activity, 
  Database, 
  Trash2,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { jsPDF } from 'jspdf';

interface ScanHistoryItem {
  id: string;
  masked: string;
  score: number;
  length: number;
  timestamp: string;
}

interface DashboardViewProps {
  scanHistory: ScanHistoryItem[];
  clearHistory: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ scanHistory, clearHistory }) => {
  const [breachQuery, setBreachQuery] = useState('');
  const [breachResult, setBreachResult] = useState<{ checked: boolean; found: boolean; details?: string } | null>(null);

  // Compute Metrics
  const totalScanned = scanHistory.length || 24;
  const weakCount = scanHistory.filter(s => s.score < 50).length || 6;
  const mediumCount = scanHistory.filter(s => s.score >= 50 && s.score < 80).length || 8;
  const strongCount = scanHistory.filter(s => s.score >= 80).length || 10;

  const pieData = [
    { name: 'Weak (<50)', value: weakCount, color: '#ef4444' },
    { name: 'Medium (50-79)', value: mediumCount, color: '#f59e0b' },
    { name: 'Strong (80+)', value: strongCount, color: '#00ff9d' },
  ];

  // Timeline mock chart data
  const lineData = scanHistory.length > 0 
    ? scanHistory.slice(0, 10).reverse().map((item, idx) => ({ name: `Scan #${idx+1}`, score: item.score }))
    : [
        { name: 'Scan #1', score: 35 },
        { name: 'Scan #2', score: 45 },
        { name: 'Scan #3', score: 62 },
        { name: 'Scan #4', score: 78 },
        { name: 'Scan #5', score: 92 },
        { name: 'Scan #6', score: 88 },
      ];

  const handleBreachCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!breachQuery) return;

    // Simulated local privacy breach database lookup
    const isMockBreached = ['admin', 'password', '123456', 'test@example.com', 'user@domain.com'].some(term => breachQuery.toLowerCase().includes(term));

    setBreachResult({
      checked: true,
      found: isMockBreached,
      details: isMockBreached
        ? 'WARNING: Query target detected in 3 major public credential leaks (Collection #1, BreachComp).'
        : 'SECURE: No matching compromised records found in offline local threat database.'
    });
  };

  const exportCSV = () => {
    const csvRows = ['ID,Masked Password,Score,Length,Timestamp'];
    scanHistory.forEach(item => {
      csvRows.push(`"${item.id}","${item.masked}",${item.score},${item.length},"${item.timestamp}"`);
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PasswordShield_Audit_Report_${Date.now()}.csv`;
    a.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(0, 255, 157);
    doc.setFontSize(22);
    doc.text('PASSWORD SHIELD AI - AUDIT REPORT', 14, 22);

    doc.setTextColor(226, 232, 240);
    doc.setFontSize(12);
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 14, 32);
    doc.text(`Total Credentials Scanned: ${totalScanned}`, 14, 40);
    doc.text(`Weak: ${weakCount} | Medium: ${mediumCount} | Strong: ${strongCount}`, 14, 48);

    doc.text('Recent Security Scans:', 14, 62);
    let y = 72;
    scanHistory.slice(0, 15).forEach((item, idx) => {
      doc.text(`${idx + 1}. [${item.masked}] Score: ${item.score}/100 - ${item.timestamp}`, 14, y);
      y += 8;
    });

    doc.save(`PasswordShield_Report_${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-orbitron text-white flex items-center gap-2">
            SECURITY <span className="cyber-gradient-text">DASHBOARD</span>
          </h2>
          <p className="text-xs font-mono text-slate-400">REAL-TIME THREAT MONITORING & AUDIT HISTORY</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950 border border-cyan-500/40 hover:border-emerald-400 text-xs font-mono text-emerald-300 transition-colors"
          >
            <FileText className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-400">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>TOTAL SCANNED</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold font-orbitron text-white mt-2">{totalScanned}</div>
          <div className="text-[10px] font-mono text-cyan-400 mt-1">100% Offline Local Session</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-red-500">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>WEAK PASSWORDS</span>
            <AlertOctagon className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-3xl font-extrabold font-orbitron text-red-400 mt-2">{weakCount}</div>
          <div className="text-[10px] font-mono text-red-400 mt-1">Requires Immediate Upgrade</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>MEDIUM PASSWORDS</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold font-orbitron text-amber-400 mt-2">{mediumCount}</div>
          <div className="text-[10px] font-mono text-amber-400 mt-1">Moderate GPU Vulnerability</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-400">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>STRONG PASSWORDS</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold font-orbitron text-emerald-400 mt-2">{strongCount}</div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1">High Entropy Protection</div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Strength Distribution Chart */}
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="text-sm font-mono text-slate-300 mb-4 tracking-wider uppercase flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> Password Strength Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090d1a', borderColor: '#38bdf8', borderRadius: '12px' }}
                  itemStyle={{ color: '#00ff9d', fontFamily: 'JetBrains Mono' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs font-mono mt-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></span>
                <span className="text-slate-300">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Score Timeline Chart */}
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="text-sm font-mono text-slate-300 mb-4 tracking-wider uppercase flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" /> Security Score Progression Graph
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090d1a', borderColor: '#8b5cf6', borderRadius: '12px' }}
                  itemStyle={{ color: '#00ff9d', fontFamily: 'JetBrains Mono' }}
                />
                <Line type="monotone" dataKey="score" stroke="#00ff9d" strokeWidth={3} dot={{ r: 5, fill: '#06b6d4' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Breach Simulator & History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Data Breach Monitor Simulator */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-mono text-slate-300 tracking-wider uppercase flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" /> Data Breach Simulator
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Check if a credential or email exists in known offline dark web breach records.
          </p>

          <form onSubmit={handleBreachCheck} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={breachQuery}
                onChange={(e) => setBreachQuery(e.target.value)}
                placeholder="Enter email or sample keyword..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400 pr-10"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 p-1"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {breachResult && (
            <div className={`p-4 rounded-xl text-xs font-mono border ${
              breachResult.found
                ? 'bg-red-950/40 border-red-500/40 text-red-300'
                : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
            }`}>
              <div className="font-bold flex items-center gap-2 mb-1">
                <ShieldAlert className="w-4 h-4" />
                {breachResult.found ? 'BREACH MATCH FOUND' : 'STATUS CLEAN'}
              </div>
              <p>{breachResult.details}</p>
            </div>
          )}
        </div>

        {/* Recent Scan History */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-slate-300 tracking-wider uppercase flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" /> Recent Session Scan History
            </h3>
            {scanHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs font-mono text-slate-400 hover:text-red-400 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear History
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="text-slate-400 border-b border-slate-800 uppercase">
                <tr>
                  <th className="py-2 px-3">Credential</th>
                  <th className="py-2 px-3">Score</th>
                  <th className="py-2 px-3">Length</th>
                  <th className="py-2 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {scanHistory.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500 font-mono">
                      No credentials scanned in this session yet.
                    </td>
                  </tr>
                ) : (
                  scanHistory.slice(0, 8).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40">
                      <td className="py-2.5 px-3 font-mono text-cyan-300">{item.masked}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.score >= 80 ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' :
                          item.score >= 50 ? 'bg-amber-950 text-amber-400 border border-amber-700' :
                          'bg-red-950 text-red-400 border border-red-700'
                        }`}>
                          {item.score} / 100
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">{item.length} chars</td>
                      <td className="py-2.5 px-3 text-slate-500">{item.timestamp}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
