import React from 'react';

export const Card = ({ children, className = '', title }) => {
  return (
    <div className={`bg-card border border-border rounded-[2rem] overflow-hidden shadow-2xl ${className}`}>
      {title && (
        <div className="px-8 py-5 border-b border-border bg-white/[0.02]">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{title}</h3>
        </div>
      )}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
};

export const PlanBadge = ({ plan }) => {
  const styles = {
    FREE: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    PRO: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
    ENTERPRISE: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };

  return (
    <span className={`px-4 py-1 text-[10px] font-black rounded-lg border uppercase tracking-widest ${styles[plan] || styles.FREE}`}>
      {plan}
    </span>
  );
};
