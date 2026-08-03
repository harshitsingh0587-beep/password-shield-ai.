import React, { useState } from 'react';
import { Key, Copy, Check, RefreshCw, Sparkles, Sliders, ShieldCheck } from 'lucide-react';
import { calculateEntropy } from '../lib/analyzer/entropy';

interface PasswordGeneratorProps {
  onAnalyzeGenerated: (password: string) => void;
}

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ onAnalyzeGenerated }) => {
  const [mode, setMode] = useState<'random' | 'passphrase'>('random');

  // Random Password Options
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  // Passphrase Options
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState('-');
  const [includeNumber, setIncludeNumber] = useState(true);
  const [capitalize, setCapitalize] = useState(true);

  const [generatedPassword, setGeneratedPassword] = useState('K9#mX$8vL2!pQ5zW');
  const [copied, setCopied] = useState(false);

  const wordsList = [
    'cyber', 'shield', 'quantum', 'matrix', 'vector', 'falcon', 'shadow', 'vortex',
    'orbit', 'crypto', 'hyper', 'nexus', 'prism', 'titan', 'stellar', 'phoenix',
    'beacon', 'summit', 'horizon', 'zenith', 'pulse', 'spark', 'signal', 'cipher'
  ];

  const generate = () => {
    let result = '';

    if (mode === 'random') {
      let charset = '';
      if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (useDigits) charset += '0123456789';
      if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

      if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';

      for (let i = 0; i < length; i++) {
        const randIndex = Math.floor(Math.random() * charset.length);
        result += charset[randIndex];
      }
    } else {
      const selectedWords: string[] = [];
      for (let i = 0; i < wordCount; i++) {
        let word = wordsList[Math.floor(Math.random() * wordsList.length)];
        if (capitalize) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        selectedWords.push(word);
      }
      result = selectedWords.join(separator);
      if (includeNumber) {
        result += separator + Math.floor(Math.random() * 900 + 100);
      }
    }

    setGeneratedPassword(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const entropy = calculateEntropy(generatedPassword);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold font-orbitron text-white flex items-center justify-center gap-2">
          AI <span className="cyber-gradient-text">PASSWORD GENERATOR</span>
        </h2>
        <p className="text-xs font-mono text-slate-400">
          GENERATE MILITARY-GRADE HIGH-ENTROPY PASSWORDS & MEMORABLE PASSPHRASES
        </p>
      </div>

      {/* Main Generator Card */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl space-y-6">
        
        {/* Mode Switcher */}
        <div className="flex justify-center gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
          <button
            onClick={() => setMode('random')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
              mode === 'random' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Random Character Mode
          </button>
          <button
            onClick={() => setMode('passphrase')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
              mode === 'passphrase' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Memorable Passphrase Mode
          </button>
        </div>

        {/* Display Output Field */}
        <div className="relative bg-slate-950 p-6 rounded-2xl border-2 border-cyan-500/30 flex items-center justify-between gap-4">
          <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 break-all select-all tracking-wider">
            {generatedPassword}
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={generate}
              className="p-3 bg-slate-900 hover:bg-slate-800 text-cyan-400 rounded-xl border border-slate-700 transition-colors"
              title="Regenerate"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-3 bg-cyan-500 text-slate-950 font-mono font-bold text-xs rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,255,157,0.4)]"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'COPIED!' : 'COPY'}
            </button>
          </div>
        </div>

        {/* Live Entropy Badge */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400">Calculated Entropy: <strong className="text-emerald-400">{entropy.bits} Bits</strong></span>
          <span className="text-slate-400">Length: <strong className="text-cyan-400">{generatedPassword.length} Chars</strong></span>
          <button
            onClick={() => onAnalyzeGenerated(generatedPassword)}
            className="text-purple-300 hover:text-purple-200 underline flex items-center gap-1 font-bold"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Send to Deep Analyzer
          </button>
        </div>

        {/* Customization Controls */}
        {mode === 'random' ? (
          <div className="space-y-6 pt-4 border-t border-slate-800">
            
            {/* Length Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Password Length:</span>
                <span className="text-cyan-400 font-bold">{length} Characters</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Checkbox Toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={useUpper}
                  onChange={(e) => setUseUpper(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-400 focus:ring-cyan-400 bg-slate-950"
                />
                Uppercase (A-Z)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={useLower}
                  onChange={(e) => setUseLower(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-400 focus:ring-cyan-400 bg-slate-950"
                />
                Lowercase (a-z)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={useDigits}
                  onChange={(e) => setUseDigits(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-400 focus:ring-cyan-400 bg-slate-950"
                />
                Numbers (0-9)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-400 focus:ring-cyan-400 bg-slate-950"
                />
                Symbols (!@#$)
              </label>
            </div>

          </div>
        ) : (
          <div className="space-y-6 pt-4 border-t border-slate-800">
            
            {/* Word Count Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Word Count:</span>
                <span className="text-purple-400 font-bold">{wordCount} Words</span>
              </div>
              <input
                type="range"
                min="3"
                max="8"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            {/* Separator selector & options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Word Separator:</label>
                <select
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="-">Hyphen (-)</option>
                  <option value="_">Underscore (_)</option>
                  <option value=".">Period (.)</option>
                  <option value=" ">Space ( )</option>
                  <option value="#">Hash (#)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={capitalize}
                  onChange={(e) => setCapitalize(e.target.checked)}
                  className="rounded border-slate-700 text-purple-400 bg-slate-950"
                />
                <span className="text-slate-300">Capitalize Words</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeNumber}
                  onChange={(e) => setIncludeNumber(e.target.checked)}
                  className="rounded border-slate-700 text-purple-400 bg-slate-950"
                />
                <span className="text-slate-300">Append Number suffix</span>
              </div>
            </div>

          </div>
        )}

        <button
          onClick={generate}
          className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-emerald-400 to-purple-500 text-slate-950 font-orbitron font-extrabold text-sm rounded-2xl cyber-button-glow uppercase tracking-wider"
        >
          Generate New Secure Credential
        </button>

      </div>

    </div>
  );
};
