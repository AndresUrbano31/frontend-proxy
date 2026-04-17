import React from 'react';
import { Bot, User as UserIcon } from 'lucide-react';

export const ChatPanel = ({ messages, loading }) => {
  if (messages.length === 0 && !loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12 animate-fade-in">
        <div className="w-24 h-24 bg-primary-500/10 border border-primary-500/20 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-primary-500/10">
          <Bot size={48} className="text-primary-500" />
        </div>
        <h3 className="text-3xl font-black text-white mb-3">Asistente Virtual</h3>
        <p className="text-slate-500 max-w-sm text-sm leading-relaxed font-medium">
          Envía una solicitud al motor de IA. Tu tráfico será validado y monitoreado por el proxy institucional.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-10 space-y-10 custom-scrollbar scroll-smooth">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`flex gap-6 w-full ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
        >
          <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xl ${
            msg.role === 'user' 
              ? 'bg-primary-500 border-primary-600 text-white' 
              : 'bg-background border-border text-primary-500'
          }`}>
            {msg.role === 'user' ? <UserIcon size={24} /> : <Bot size={24} />}
          </div>
          <div className={`max-w-[75%] space-y-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-1">
              {msg.role === 'user' ? 'Usuario Autorizado' : 'Respuesta del Proxy'}
            </p>
            <div className={`rounded-[1.5rem] px-6 py-4 text-sm leading-relaxed shadow-lg ${
              msg.role === 'user'
                ? 'bg-primary-500 text-white rounded-tr-none'
                : 'bg-card border border-border text-slate-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="flex gap-6 animate-pulse">
          <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-background border border-border text-primary-500">
            <Bot size={24} />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest px-1">Generando respuesta...</p>
            <div className="bg-card border border-border rounded-2xl rounded-tl-none px-8 py-5 flex gap-2 items-center">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
