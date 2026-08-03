import React, { useState } from 'react';
import { Star, Quote, Send, Mail, MapPin, ShieldCheck, Github, Twitter, Linkedin, Lock } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Chief Information Security Officer (CISO)',
      company: 'Aegis Cyber Tech',
      text: 'Password Shield AI’s 100% offline entropy engine gives our security audit team full confidence that zero credentials leak during testing.',
      stars: 5
    },
    {
      name: 'Alexei Petrov',
      role: 'Lead Penetration Tester',
      company: 'RedTeam Labs',
      text: 'The spatial keyboard pattern detector and NIST SP 800-63B audit metrics are spot on. A must-have tool for modern security professionals.',
      stars: 5
    },
    {
      name: 'Elena Rostova',
      role: 'DevSecOps Architect',
      company: 'FinTech Vault',
      text: 'ShieldBot AI provides instant, clear explanations to non-technical staff about why complex credentials matter.',
      stars: 5
    }
  ];

  return (
    <section className="space-y-6 py-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold font-orbitron text-white">
          TESTIMONIALS & <span className="cyber-gradient-text">TRUST</span>
        </h2>
        <p className="text-xs font-mono text-slate-400">WHAT CYBERSECURITY PROFESSIONALS SAY ABOUT OUR ENGINE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl space-y-4 relative">
            <Quote className="w-8 h-8 text-cyan-500/20 absolute top-4 right-4" />
            <div className="flex gap-1">
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs font-mono text-slate-300 italic leading-relaxed">"{t.text}"</p>
            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs font-bold text-white">{t.name}</div>
              <div className="text-[10px] font-mono text-cyan-400">{t.role} • {t.company}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="glass-panel p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-orbitron text-white">
          GET IN TOUCH WITH OUR <span className="cyber-gradient-text">SECURITY TEAM</span>
        </h2>
        <p className="text-xs font-mono text-slate-400">HAVE QUESTIONS ABOUT ENTERPRISE AUDITING OR API INTEGRATION?</p>
      </div>

      {submitted ? (
        <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-center text-xs font-mono text-emerald-300">
          ✓ Message received! Our security engineers will respond within 24 hours.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="Agent Name"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Corporate Email</label>
              <input
                type="email"
                required
                placeholder="agent@security.org"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Inquiry Details</label>
            <textarea
              rows={4}
              required
              placeholder="Tell us about your security requirements..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-400 text-slate-950 font-orbitron font-extrabold rounded-xl hover:bg-cyan-300 cyber-button-glow flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <Send className="w-4 h-4" /> Transmit Inquiry
          </button>
        </form>
      )}
    </section>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 py-8 px-4 text-xs font-mono text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span className="font-orbitron font-bold text-white">PASSWORD SHIELD AI</span>
          <span className="text-[10px] text-slate-500">© 2026 Password Shield AI. All Rights Reserved.</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <Lock className="w-3.5 h-3.5" /> Zero-Knowledge Browser Local Analysis
          </span>
          <span>•</span>
          <a href="#" className="hover:text-cyan-400">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-cyan-400">NIST SP 800-63B</a>
        </div>

      </div>
    </footer>
  );
};
