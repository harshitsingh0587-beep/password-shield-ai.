import React, { useState } from 'react';
import { GitCompare, ShieldAlert, CheckCircle2, Zap } from 'lucide-react';
import { calculateEntropy } from '../lib/analyzer/entropy';
import { calculateCrackTimes } from '../lib/analyzer/crackTime';
import { generateAIDiagnosis } from '../lib/analyzer/aiEngine';
import { detectPatterns } from '../lib/analyzer/patterns';
import { checkDictionaryWord } from '../lib/analyzer/dictionary';

export const PasswordComparator: React.FC = () => {
  const [pass1, setPass1] = useState('Password123');
  const [pass2, setPass2] = useState('Vortex#99!ShieldX7');

  const ent1 = calculateEntropy(pass1);
  const ent2 = calculateEntropy(pass2);

  const crack1 = calculateCrackTimes(ent1.bits, ent1.poolSize, pass1.length);
  const crack2 = calculateCrackTimes(ent2.bits, ent2.poolSize, pass2.length);

  const ai1 = generateAIDiagnosis(pass1, ent1, detectPatterns(pass1), checkDictionaryWord(pass1));
  const ai2 = generateAIDiagnosis(pass2, ent2, detectPatterns(pass2), checkDictionaryWord(pass2));

  const winner = ai1.securityScore > ai2.securityScore ? 1 : ai1.securityScore < ai2.securityScore ? 2 : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold font-orbitron text-white flex items-center justify-center gap-2">
          PASSWORD <span className="cyber-gradient-text">COMPARISON TOOL</span>
        </h2>
        <p className="text-xs font-mono text-slate-400">SIDE-BY-SIDE ENTROPY & VULNERABILITY AUDIT</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Password 1 Card */}
        <div className={`glass-panel p-6 rounded-3xl space-y-4 border-2 transition-all ${
          winner === 1 ? 'border-emerald-400 shadow-[0_0_20px_rgba(0,255,157,0.2)]' : 'border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Credential A</span>
            {winner === 1 && (
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-600">
                WINNER (STRONGER)
              </span>
            )}
          </div>

          <input
            type="text"
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
            className="w-full px-4 py-3 bg-slate-950 font-mono text-lg text-white rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
            placeholder="First password..."
          />

          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400">Security Score:</span>
              <span className={`font-bold ${ai1.securityScore >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>{ai1.securityScore}/100</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400">Entropy Bits:</span>
              <span className="text-cyan-400 font-bold">{ent1.bits} bits</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400">Offline GPU Crack Time:</span>
              <span className="text-amber-400 font-bold">{crack1[2]?.formattedTime || 'Instant'}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400">Threat Tier:</span>
              <span className="text-purple-300 font-bold">{ai1.threatTier}</span>
            </div>
          </div>
        </div>

        {/* Password 2 Card */}
        <div className={`glass-panel p-6 rounded-3xl space-y-4 border-2 transition-all ${
          winner === 2 ? 'border-emerald-400 shadow-[0_0_20px_rgba(0,255,157,0.2)]' : 'border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase">Credential B</span>
            {winner === 2 && (
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-600">
                WINNER (STRONGER)
              </span>
            )}
          </div>

          <input
            type="text"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            className="w-full px-4 py-3 bg-slate-950 font-mono text-lg text-white rounded-xl border border-slate-700 focus:outline-none focus:border-purple-400"
            placeholder="Second password..."
          />

          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400">Security Score:</span>
              <span className={`font-bold ${ai2.securityScore >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>{ai2.securityScore}/100</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400">Entropy Bits:</span>
              <span className="text-cyan-400 font-bold">{ent2.bits} bits</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400">Offline GPU Crack Time:</span>
              <span className="text-amber-400 font-bold">{crack2[2]?.formattedTime || 'Instant'}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400">Threat Tier:</span>
              <span className="text-purple-300 font-bold">{ai2.threatTier}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
