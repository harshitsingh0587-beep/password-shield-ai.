import React, { useState } from 'react';
import { BackgroundMatrix } from './components/BackgroundMatrix';
import { Navbar, ThemePreset } from './components/Navbar';
import { PasswordAnalyzerInput } from './components/PasswordAnalyzerInput';
import { DashboardView } from './components/DashboardView';
import { PasswordGenerator } from './components/PasswordGenerator';
import { PasswordComparator } from './components/PasswordComparator';
import { NistGuideView } from './components/NistGuideView';
import { ShieldBotChat } from './components/ShieldBotChat';
import { AnalyticsLeaderboard } from './components/AnalyticsLeaderboard';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection, ContactSection, Footer } from './components/Footer';
import { ShieldCheck, Zap, Lock, Sparkles, Cpu, Award } from 'lucide-react';

interface ScanHistoryItem {
  id: string;
  masked: string;
  score: number;
  length: number;
  timestamp: string;
}

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [language, setLanguage] = useState('EN');
  const [highContrast, setHighContrast] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemePreset>('emerald');

  // Session Scan History state
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([
    { id: '1', masked: 'P@s******2026', score: 68, length: 14, timestamp: '14:10:02' },
    { id: '2', masked: '123*****', score: 12, length: 8, timestamp: '14:05:30' },
    { id: '3', masked: 'Kor***#99!Sh', score: 96, length: 18, timestamp: '13:58:12' },
  ]);

  const handleRecordScan = (password: string, score: number) => {
    if (!password) return;
    const masked = password.length > 4 
      ? `${password.substring(0, 3)}***${password.substring(password.length - 2)}`
      : '***';

    const timestamp = new Date().toLocaleTimeString();
    setScanHistory((prev) => {
      if (prev.length > 0 && prev[0].masked === masked) return prev;
      return [
        { id: Date.now().toString(), masked, score, length: password.length, timestamp },
        ...prev.slice(0, 49)
      ];
    });
  };

  const handleClearHistory = () => {
    setScanHistory([]);
  };

  const handleAnalyzeGenerated = (genPassword: string) => {
    setCurrentTab('home');
  };

  // Theme Class Resolver
  const getThemeClass = (theme: ThemePreset) => {
    switch (theme) {
      case 'synthwave':
        return 'theme-synthwave hue-rotate-[290deg] saturate-150';
      case 'cobalt':
        return 'theme-cobalt hue-rotate-[190deg] saturate-125';
      case 'solar':
        return 'theme-solar hue-rotate-[330deg] saturate-150';
      case 'matrix':
        return 'theme-matrix hue-rotate-[90deg] saturate-150';
      default:
        return 'theme-emerald';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-all duration-500 ${highContrast ? 'high-contrast' : ''} ${getThemeClass(activeTheme)}`}>
      {/* Animated Matrix Particle Grid Canvas */}
      <BackgroundMatrix />

      {/* Main Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        toggleBotChat={() => setIsBotOpen(!isBotOpen)}
        notificationCount={scanHistory.filter(s => s.score < 50).length}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
      />

      {/* Theme Status Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex justify-end">
        <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 flex items-center gap-1.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Active Display Color: <strong className="text-white uppercase">{activeTheme}</strong>
        </span>
      </div>

      {/* Main Content Body */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* HOMEPAGE VIEW */}
        {currentTab === 'home' && (
          <div className="space-y-16">
            
            {/* Hero Section */}
            <div className="text-center space-y-6 pt-4 sm:pt-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>AI-POWERED OFFLINE CYBERSECURITY ENGINE v2.5</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-orbitron text-white tracking-tight leading-tight">
                WEAK PASSWORD <br />
                <span className="cyber-gradient-text">INTELLIGENCE SHIELD</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-mono max-w-2xl mx-auto leading-relaxed">
                Detect weak credentials, calculate offline entropy, analyze attack vectors, and enforce NIST SP 800-63B standards with zero network latency and 100% browser privacy.
              </p>

              {/* Quick Feature Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-emerald-400">
                  <Lock className="w-4 h-4" /> 100% Client-Side Privacy
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-cyan-400">
                  <Cpu className="w-4 h-4" /> Instant GPU Crack Timing
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-purple-400">
                  <Award className="w-4 h-4" /> NIST Guidelines Compliance
                </div>
              </div>
            </div>

            {/* Real-time Analyzer Box Component */}
            <PasswordAnalyzerInput onScanRecorded={handleRecordScan} />

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="glass-panel p-6 rounded-3xl space-y-3">
                <div className="p-3 w-fit rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white font-orbitron">Mathematical Entropy</h3>
                <p className="text-xs font-mono text-slate-400 leading-relaxed">
                  Precision logarithmic entropy scoring: $E = L \times \log_2(R)$. Evaluates pool sizes from 26 to 95 character sets.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-3xl space-y-3">
                <div className="p-3 w-fit rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white font-orbitron">Spatial Pattern Detection</h3>
                <p className="text-xs font-mono text-slate-400 leading-relaxed">
                  Identifies physical QWERTY keyboard walks, sequential runs (1234, abcd), duplicate character clusters, and birth years.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-3xl space-y-3">
                <div className="p-3 w-fit rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white font-orbitron">ShieldBot AI Diagnosis</h3>
                <p className="text-xs font-mono text-slate-400 leading-relaxed">
                  Natural language explanation of why credentials fail, personalized improvement roadmaps, and memorable passphrase options.
                </p>
              </div>
            </div>

            {/* Pricing Section */}
            <PricingSection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Contact Form */}
            <ContactSection />
          </div>
        )}

        {/* DASHBOARD VIEW */}
        {currentTab === 'dashboard' && (
          <DashboardView scanHistory={scanHistory} clearHistory={handleClearHistory} />
        )}

        {/* GENERATOR VIEW */}
        {currentTab === 'generator' && (
          <PasswordGenerator onAnalyzeGenerated={handleAnalyzeGenerated} />
        )}

        {/* COMPARATOR VIEW */}
        {currentTab === 'compare' && (
          <PasswordComparator />
        )}

        {/* NIST STANDARDS VIEW */}
        {currentTab === 'nist' && (
          <NistGuideView />
        )}

        {/* ANALYTICS & API VIEW */}
        {currentTab === 'analytics' && (
          <AnalyticsLeaderboard />
        )}

      </main>

      {/* Floating AI Chatbot Drawer Widget */}
      <ShieldBotChat isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
