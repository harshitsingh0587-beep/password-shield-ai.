import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Copy, Check, ShieldAlert, Zap, Cpu, Sparkles, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { calculateEntropy, EntropyResult } from '../lib/analyzer/entropy';
import { detectPatterns, PatternCheckResult } from '../lib/analyzer/patterns';
import { checkDictionaryWord } from '../lib/analyzer/dictionary';
import { calculateCrackTimes, CrackTimeScenario } from '../lib/analyzer/crackTime';
import { evaluateNISTGuidelines } from '../lib/analyzer/nistRules';
import { generateAIDiagnosis, AIDiagnosis } from '../lib/analyzer/aiEngine';
import { CircularScoreMeter } from './CircularScoreMeter';
import confetti from 'canvas-confetti';

interface PasswordAnalyzerInputProps {
  onScanRecorded?: (password: string, score: number) => void;
}

export const PasswordAnalyzerInput: React.FC<PasswordAnalyzerInputProps> = ({ onScanRecorded }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Analysis State
  const [entropy, setEntropy] = useState<EntropyResult>(calculateEntropy(''));
  const [patterns, setPatterns] = useState<PatternCheckResult>(detectPatterns(''));
  const [dictionaryMatch, setDictionaryMatch] = useState<{ found: boolean; word?: string }>({ found: false });
  const [crackTimes, setCrackTimes] = useState<CrackTimeScenario[]>([]);
  const [nistResult, setNistResult] = useState(evaluateNISTGuidelines(''));
  const [aiDiagnosis, setAiDiagnosis] = useState<AIDiagnosis>(generateAIDiagnosis('', entropy, patterns, dictionaryMatch));

  // Run analysis when password changes
  useEffect(() => {
    const ent = calculateEntropy(password);
    const pat = detectPatterns(password);
    const dict = checkDictionaryWord(password);
    const crack = calculateCrackTimes(ent.bits, ent.poolSize, password.length);
    const nist = evaluateNISTGuidelines(password);
    const ai = generateAIDiagnosis(password, ent, pat, dict);

    setEntropy(ent);
    setPatterns(pat);
    setDictionaryMatch(dict);
    setCrackTimes(crack);
    setNistResult(nist);
    setAiDiagnosis(ai);

    if (password && onScanRecorded) {
      onScanRecorded(password, ai.securityScore);
    }

    if (ai.securityScore >= 90 && password.length >= 14) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [password]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Input Box Card */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Zap className="w-48 h-48 text-cyan-400" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-mono tracking-widest text-emerald-400 font-semibold uppercase">
              100% Client-Side Privacy Shield
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">Zero Server Data Transfer</span>
        </div>

        {/* Password Input Field */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type or paste a password to analyze offline..."
            className="w-full px-5 py-4 text-lg sm:text-xl font-mono bg-slate-950/80 border-2 border-cyan-500/30 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all pr-28 shadow-inner"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2.5 text-slate-400 hover:text-cyan-300 rounded-xl hover:bg-slate-800/60 transition-colors"
              title={showPassword ? 'Hide Password' : 'Show Password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <button
              onClick={handleCopy}
              disabled={!password}
              className="p-2.5 text-slate-400 hover:text-emerald-400 rounded-xl hover:bg-slate-800/60 transition-colors disabled:opacity-30"
              title="Copy Password"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Diversity & Quick Specs Pill Row */}
        {password && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
              Length: <strong className="text-cyan-400">{entropy.length}</strong>
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
              Entropy: <strong className="text-emerald-400">{entropy.bits} bits</strong>
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
              Pool Size: <strong className="text-purple-400">{entropy.poolSize} chars</strong>
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
              Uniqueness: <strong className="text-amber-400">{entropy.uniquenessScore}%</strong>
            </span>
          </div>
        )}
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Circular Meter Card */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-mono text-slate-400 mb-4 tracking-wider uppercase flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" /> Security Score Meter
          </h3>
          <CircularScoreMeter score={aiDiagnosis.securityScore} threatTier={aiDiagnosis.threatTier} />
          
          <div className="mt-6 w-full pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400 flex justify-between">
            <span>NIST Compliance:</span>
            <span className={`font-bold ${nistResult.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {nistResult.score}% Compliant
            </span>
          </div>
        </div>

        {/* AI Threat Diagnosis */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-purple-300 tracking-wider uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 animate-spin" /> AI Intelligence Diagnosis
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              NEURAL HEURISTIC ENGINE
            </span>
          </div>

          <p className="text-sm text-slate-200 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 leading-relaxed font-mono">
            {aiDiagnosis.overallAssessment}
          </p>

          {/* Vulnerability Warnings */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Vulnerability Indicators:</span>
            {aiDiagnosis.weaknessReasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-mono text-amber-300 bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/20">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>

          {/* Action Recommendations */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">AI Improvement Roadmap:</span>
            {aiDiagnosis.personalizedImprovements.map((imp, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-mono text-emerald-300 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{imp}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Crack Time Estimation Matrix */}
      <div className="glass-panel rounded-3xl p-6">
        <h3 className="text-sm font-mono text-slate-400 mb-4 tracking-wider uppercase flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" /> Estimated Attacker Crack Times
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {crackTimes.map((sc, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl border transition-all ${
                sc.riskLevel === 'invulnerable' || sc.riskLevel === 'safe'
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                  : sc.riskLevel === 'warning'
                  ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                  : 'bg-red-950/20 border-red-500/30 text-red-300'
              }`}
            >
              <div className="text-[11px] font-mono uppercase tracking-wider opacity-80 mb-1">{sc.label}</div>
              <div className="text-lg font-bold font-mono tracking-tight my-1">{sc.formattedTime}</div>
              <div className="text-[10px] font-mono opacity-70">Speed: {sc.speed}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
