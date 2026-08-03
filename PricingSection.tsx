import React from 'react';
import { Check, Zap, Shield, Crown } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const tiers = [
    {
      name: 'Free Shield',
      price: '$0',
      period: 'forever',
      description: 'Essential offline password analysis for individuals and privacy advocates.',
      icon: Shield,
      features: [
        '100% Client-side local analysis',
        'Real-time entropy & score meter',
        'Dictionary & pattern detection',
        'Password & Passphrase generator',
        'ShieldBot AI Assistant'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro Sentinel',
      price: '$9',
      period: 'per month',
      description: 'Advanced threat modeling, PDF export reports, and breach monitoring for security pros.',
      icon: Zap,
      features: [
        'Everything in Free Plan',
        'Unlimited PDF & CSV audit reports',
        'Data Breach lookup simulator',
        'Password Comparator tool',
        'NIST SP 800-63B audit engine',
        'Priority ShieldBot AI responses'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise Shield',
      price: '$29',
      period: 'per user / mo',
      description: 'Custom REST API keys, team leaderboard, and identity integration.',
      icon: Crown,
      features: [
        'Everything in Pro Plan',
        'REST API Developer Playground access',
        'Organization Leaderboard & Analytics',
        'Custom password policy enforcement',
        'SLA & 24/7 Cybersecurity Support'
      ],
      cta: 'Contact Enterprise',
      popular: false
    }
  ];

  return (
    <section className="space-y-8 py-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold font-orbitron text-white">
          TRANSPARENT <span className="cyber-gradient-text">PRICING TIERS</span>
        </h2>
        <p className="text-xs font-mono text-slate-400">CHOOSE THE RIGHT CYBER SECURITY SHIELD FOR YOUR NEEDS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t, idx) => {
          const Icon = t.icon;
          return (
            <div
              key={idx}
              className={`glass-panel p-6 rounded-3xl flex flex-col justify-between relative transition-all ${
                t.popular ? 'border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)]' : ''
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-400 text-slate-950 font-mono font-bold text-[10px] uppercase rounded-full tracking-wider">
                  MOST POPULAR
                </span>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{t.name}</h3>
                    <p className="text-[10px] font-mono text-slate-400">{t.description}</p>
                  </div>
                </div>

                <div className="py-2">
                  <span className="text-4xl font-extrabold font-orbitron text-white">{t.price}</span>
                  <span className="text-xs font-mono text-slate-400 ml-1">/ {t.period}</span>
                </div>

                <ul className="space-y-2 text-xs font-mono text-slate-300">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`mt-6 w-full py-3 rounded-2xl font-mono text-xs font-bold transition-all ${
                  t.popular
                    ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 cyber-button-glow'
                    : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {t.cta}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
