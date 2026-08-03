import React, { useState } from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Key, 
  GitCompare, 
  BookOpen, 
  BarChart3, 
  Languages, 
  Sun, 
  Moon, 
  Bot, 
  Palette
} from 'lucide-react';

export type ThemePreset = 'emerald' | 'synthwave' | 'cobalt' | 'solar' | 'matrix';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  toggleBotChat: () => void;
  notificationCount: number;
  activeTheme: ThemePreset;
  setActiveTheme: (theme: ThemePreset) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  highContrast,
  setHighContrast,
  toggleBotChat,
  activeTheme,
  setActiveTheme
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
    { code: 'JP', name: '日本語' }
  ];

  const themeOptions: { id: ThemePreset; name: string; colorDot: string }[] = [
    { id: 'emerald', name: 'Cyber Emerald', colorDot: '#00ff9d' },
    { id: 'synthwave', name: 'Neon Synthwave', colorDot: '#ec4899' },
    { id: 'cobalt', name: 'Cobalt Shield', colorDot: '#3b82f6' },
    { id: 'solar', name: 'Solar Flare', colorDot: '#ef4444' },
    { id: 'matrix', name: 'Matrix Hacker', colorDot: '#10b981' },
  ];

  const navLinks = [
    { id: 'home', label: 'Analyzer', icon: ShieldCheck },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generator', label: 'Generator', icon: Key },
    { id: 'compare', label: 'Compare', icon: GitCompare },
    { id: 'nist', label: 'NIST Standards', icon: BookOpen },
    { id: 'analytics', label: 'Analytics & API', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 group-hover:border-emerald-400 transition-colors">
            <ShieldCheck className="w-6 h-6 text-emerald-400 animate-pulse" />
            <div className="absolute inset-0 rounded-xl bg-emerald-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold font-orbitron tracking-wide text-white flex items-center gap-1.5">
              WEAK PASSWORD <span className="cyber-gradient-text">ANALYSIS</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-purple-950/80 border border-purple-500/50 text-purple-300">AI</span>
            </span>
            <span className="block text-[10px] text-slate-400 font-mono tracking-wider -mt-1">
              OFFLINE INTELLIGENCE SYSTEM
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentTab(link.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono transition-all ${
                  active
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Color Palette Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowThemeMenu(!showThemeMenu);
                setShowLangMenu(false);
              }}
              className="p-2 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-300 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors"
              title="Change Display Color Theme"
            >
              <Palette className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">Theme</span>
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-48 glass-panel rounded-2xl p-2 shadow-2xl z-50 border border-cyan-500/40 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Color Theme Presets
                </div>
                {themeOptions.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTheme(t.id);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-mono rounded-xl flex items-center justify-between transition-colors ${
                      activeTheme === t.id
                        ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/70'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                        style={{ backgroundColor: t.colorDot }}
                      ></span>
                      {t.name}
                    </span>
                    {activeTheme === t.id && <span className="text-[10px] text-emerald-400">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Chatbot Launcher */}
          <button
            onClick={toggleBotChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-300 hover:bg-purple-900/60 text-xs font-mono transition-all"
            title="Ask ShieldBot AI"
          >
            <Bot className="w-4 h-4 text-purple-400 animate-bounce" />
            <span className="hidden sm:inline">AI Chat</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowThemeMenu(false);
              }}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 text-xs font-mono"
            >
              <Languages className="w-4 h-4 text-cyan-400" />
              <span>{language}</span>
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-32 glass-panel rounded-xl py-1 shadow-2xl z-50 border border-slate-700">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between hover:bg-slate-800/80 ${
                      language === l.code ? 'text-cyan-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>{l.name}</span>
                    <span className="text-[10px] text-slate-500">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* High Contrast / Accessibility Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
            title="Toggle High Contrast Mode"
          >
            {highContrast ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-400" />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 bg-slate-950/80 overflow-x-auto px-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = currentTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setCurrentTab(link.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded text-[10px] font-mono ${
                active ? 'text-cyan-300 font-bold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
