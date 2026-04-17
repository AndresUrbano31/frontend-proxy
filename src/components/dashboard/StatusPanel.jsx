import React from 'react';
import { ShieldCheck, Clock } from 'lucide-react';

export const QuotaProgress = ({ used, total }) => {
  const percentage = Math.min((used / total) * 100, 100);
  const isExhausted = used >= total;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5">Tokens Utilizados</p>
          <p className={`text-2xl font-black ${isExhausted ? 'text-red-400' : 'text-slate-100'} font-display leading-none`}>
            {used.toLocaleString()}<span className="text-slate-600 text-sm font-bold"> / {total.toLocaleString()}</span>
          </p>
        </div>
        <div className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-tighter ${percentage > 90 ? 'bg-red-400/20 text-red-100' : 'bg-primary-500/20 text-primary-400'}`}>
          {Math.round(percentage)}%
        </div>
      </div>
      <div className="h-4 w-full bg-background rounded-full overflow-hidden border border-border p-1 shadow-inner">
        <div 
          className={`h-full transition-all duration-1000 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.2)] ${
            percentage > 90 ? 'bg-red-500' : 
            percentage > 70 ? 'bg-amber-500' : 'bg-primary-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {isExhausted && (
        <div className="flex items-center gap-2 text-[10px] text-red-400 font-black bg-red-400/10 p-2.5 rounded-xl border border-red-400/20">
          <ShieldCheck size={14} />
          <span>ALERTA: CUOTA MENSUAL AGOTADA</span>
        </div>
      )}
    </div>
  );
};

export const RateLimitCounter = ({ remaining, countdown }) => {
  return (
    <div className="bg-background border border-border rounded-2xl p-6 space-y-5 shadow-inner">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Solicitudes Rpm</p>
          <div className="flex items-baseline gap-2 leading-none">
            <span className={`text-3xl font-black ${remaining === 0 ? 'text-red-400' : 'text-slate-100'} font-display`}>
              {remaining}
            </span>
            <span className="text-[10px] font-bold text-slate-600">REQ/M</span>
          </div>
        </div>
        <div className={`p-2.5 rounded-xl border ${remaining === 0 ? 'bg-red-400/10 border-red-400/20 text-red-400' : 'bg-primary-500/10 border-border text-primary-500'}`}>
          <Clock size={20} />
        </div>
      </div>

      {countdown > 0 ? (
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black tracking-widest">
            <span className="text-red-400 uppercase">Rate Limit Activo</span>
            <span className="text-slate-400">{countdown}s</span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 transition-all duration-1000 linear"
              style={{ width: `${(countdown / 60) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-[9px] text-emerald-400 font-black tracking-widest bg-emerald-400/5 px-2.5 py-1 rounded-lg border border-emerald-400/20 w-fit">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          ESTADO: NOMINAL
        </div>
      )}
    </div>
  );
};
