import React from 'react';
import { BookOpen, CheckCircle, Shield, AlertTriangle, FileCheck } from 'lucide-react';

export const NistGuideView: React.FC = () => {
  const guidelines = [
    {
      code: 'NIST 800-63B § 5.1.1.2',
      title: 'Prioritize Password Length Over Composition Rules',
      status: 'Mandatory Standard',
      details: 'Length is the single most effective defense against brute force. Verifiers MUST allow passwords of at least 8 characters (preferably 14+) and up to 64+ characters, without forcing complex uppercase/symbol quotas.'
    },
    {
      code: 'NIST 800-63B § 5.1.1.2',
      title: 'Check Against Compromised Credential Lists',
      status: 'Mandatory Standard',
      details: 'When passwords are chosen or changed, verifiers SHALL check candidate passwords against known dictionary lists of leaked, breached, or easily guessed values.'
    },
    {
      code: 'NIST 800-63B § 5.1.1.2',
      title: 'Permit All Printable Characters & Spaces',
      status: 'Recommended Standard',
      details: 'Identity providers MUST permit spaces, emoji, and full unicode character sets to support human-friendly passphrases (e.g. "correct-horse-battery-staple").'
    },
    {
      code: 'NIST 800-63B § 5.1.1.2',
      title: 'Eliminate Periodic Expiration Rotations',
      status: 'Modern Guideline',
      details: 'Verifiers SHOULD NOT require passwords to be changed periodically (e.g., every 90 days) unless an actual breach or compromise is suspected.'
    },
    {
      code: 'NIST 800-63B § 5.1.1.2',
      title: 'Eliminate Knowledge-Based Hints',
      status: 'Modern Guideline',
      details: 'Verifiers SHALL NOT permit users to create security questions/hints (e.g., "Mother\'s maiden name"), as these are vulnerable to OSINT social engineering.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold font-orbitron text-white flex items-center justify-center gap-2">
          NIST SP 800-63B <span className="cyber-gradient-text">COMPLIANCE HUB</span>
        </h2>
        <p className="text-xs font-mono text-slate-400">OFFICIAL US NATIONAL INSTITUTE OF STANDARDS & TECHNOLOGY GUIDELINES</p>
      </div>

      <div className="space-y-4">
        {guidelines.map((item, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl space-y-2 border-l-4 border-l-cyan-400">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyan-400 font-bold">{item.code}</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 text-[10px]">
                {item.status}
              </span>
            </div>
            <h3 className="text-base font-bold text-white">{item.title}</h3>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
