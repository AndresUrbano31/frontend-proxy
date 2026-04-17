import React, { useState, useEffect } from 'react';
import { Send, Zap } from 'lucide-react';
import { estimateTokens } from '../../utils/tokenEstimator';

export const PromptInput = ({ onSend, disabled, currentQuota, maxQuota }) => {
  const [prompt, setPrompt] = useState('');
  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    setEstimate(estimateTokens(prompt));
  }, [prompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !disabled) {
      onSend(prompt);
      setPrompt('');
    }
  };

  const isOverQuota = (currentQuota + estimate) > maxQuota;

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex flex-col gap-4">
        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Escribe tu consulta académica aquí..."
            className={`w-full bg-background border ${
              isOverQuota ? 'border-red-500/50 shadow-red-500/5' : 'border-border shadow-black/50'
            } text-white rounded-3xl p-6 pr-16 focus:outline-none focus:ring-2 focus:ring-primary-500/50 min-h-[120px] max-h-[400px] resize-none transition-all placeholder:text-slate-600 shadow-inner`}
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={disabled || !prompt.trim() || isOverQuota}
            className={`absolute right-4 bottom-4 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              disabled || !prompt.trim() || isOverQuota
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-primary-500 text-white shadow-2xl shadow-primary-500/20 hover:scale-105 active:scale-95'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border ${
              isOverQuota ? 'text-red-400 bg-red-400/5 border-red-400/20' : 'text-primary-500 bg-primary-500/5 border-primary-500/20'
            }`}>
              <Zap size={14} fill={isOverQuota ? '#f87171' : 'transparent'} />
              COSTO: {estimate} TOKENS
            </div>
            <div className="hidden sm:block text-[10px] font-black text-slate-700 tracking-widest uppercase italic">
              Auto-limpieza de prompt activa
            </div>
          </div>
          
          {isOverQuota && (
            <div className="text-[10px] font-black text-red-400 uppercase tracking-widest animate-pulse">
              Cuota insuficiente
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
