import React from 'react';
import { Award, Terminal, Code, Cpu, ShieldCheck } from 'lucide-react';

export const AnalyticsLeaderboard: React.FC = () => {
  const leaderboard = [
    { rank: 1, org: 'CyberOps Defense Corp', score: 98, level: 'Military Grade', passphrasesRatio: '94%' },
    { rank: 2, org: 'Quantum Finance Systems', score: 94, level: 'Military Grade', passphrasesRatio: '89%' },
    { rank: 3, org: 'Stellar Tech Labs', score: 88, level: 'Strong Defense', passphrasesRatio: '82%' },
    { rank: 4, org: 'Nexus Global Logistics', score: 82, level: 'Strong Defense', passphrasesRatio: '76%' },
    { rank: 5, org: 'Aegis Security Group', score: 79, level: 'Moderate', passphrasesRatio: '71%' },
  ];

  const sampleApiCode = `// REST API Mock Sandbox - Offline Password Shield Engine
fetch('https://api.passwordshield.ai/v1/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shield-Key': 'ps_live_demo_key_998877'
  },
  body: JSON.stringify({
    password: "K9#mX$8vL2!pQ5zW",
    check_dictionary: true,
    calculate_entropy: true
  })
})
.then(res => res.json())
.then(data => {
  console.log("Entropy Bits:", data.entropy_bits); // 96.4
  console.log("NIST Score:", data.nist_score);     // 100%
  console.log("Crack Time:", data.crack_time_gpu); // 4.2 Billion Years
});`;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold font-orbitron text-white flex items-center justify-center gap-2">
          ORGANIZATION <span className="cyber-gradient-text">LEADERBOARD & API</span>
        </h2>
        <p className="text-xs font-mono text-slate-400">SECURITY AWARENESS RATING & DEVELOPER REST API INTEGRATION</p>
      </div>

      {/* Leaderboard */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" /> Security Awareness Leaderboard (Demo)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="text-slate-400 border-b border-slate-800 uppercase">
              <tr>
                <th className="py-2 px-3">Rank</th>
                <th className="py-2 px-3">Organization</th>
                <th className="py-2 px-3">Avg Shield Score</th>
                <th className="py-2 px-3">Tier</th>
                <th className="py-2 px-3">Passphrase Adoption</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leaderboard.map((row) => (
                <tr key={row.rank} className="hover:bg-slate-900/50">
                  <td className="py-3 px-3 text-cyan-400 font-bold">#{row.rank}</td>
                  <td className="py-3 px-3 text-white font-bold">{row.org}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">{row.score}/100</td>
                  <td className="py-3 px-3 text-purple-300">{row.level}</td>
                  <td className="py-3 px-3 text-slate-300">{row.passphrasesRatio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REST API Placeholder Code Block */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono text-purple-400 uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" /> REST API Developer Playground
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
            OFFLINE CLIENT DEMO
          </span>
        </div>

        <p className="text-xs text-slate-400 font-mono">
          Integrate Password Shield AI's real-time entropy calculation engine directly into your enterprise registration forms or IAM pipelines.
        </p>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
          <pre>{sampleApiCode}</pre>
        </div>
      </div>

    </div>
  );
};
