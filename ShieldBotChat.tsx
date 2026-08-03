import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, User, ShieldCheck } from 'lucide-react';
import { getShieldBotResponse } from '../lib/analyzer/aiEngine';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

interface ShieldBotChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShieldBotChat: React.FC<ShieldBotChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Greetings Agent! I am ShieldBot AI, your cybersecurity assistant. Ask me anything about NIST guidelines, entropy, passphrases, or password managers.'
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: query };
    const botReply: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: getShieldBotResponse(query) };

    setMessages((prev) => [...prev, userMsg, botReply]);
    if (!textToSend) setInput('');
  };

  const quickPrompts = [
    'What is NIST SP 800-63B?',
    'Why are passphrases better than passwords?',
    'How is password entropy calculated?',
    'Should I use a password manager?'
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 glass-panel-glow rounded-3xl overflow-hidden shadow-2xl border border-purple-500/40 flex flex-col h-[480px]">
      
      {/* Header */}
      <div className="bg-purple-950/80 px-4 py-3 border-b border-purple-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-400 animate-pulse" />
          <span className="font-orbitron font-bold text-xs text-white">ShieldBot AI Assistant</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`p-1.5 rounded-lg shrink-0 ${m.sender === 'user' ? 'bg-cyan-950 text-cyan-400' : 'bg-purple-950 text-purple-400'}`}>
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
              m.sender === 'user' ? 'bg-cyan-950/60 border border-cyan-800 text-cyan-200' : 'bg-slate-900 border border-slate-800 text-slate-200'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-1.5 bg-slate-950/80 overflow-x-auto flex gap-1.5 text-[10px] font-mono border-t border-slate-800">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp)}
            className="whitespace-nowrap px-2 py-1 bg-slate-900 hover:bg-slate-800 text-purple-300 rounded-lg border border-purple-900/50"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask ShieldBot AI..."
          className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-purple-400"
        />
        <button
          type="submit"
          className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
