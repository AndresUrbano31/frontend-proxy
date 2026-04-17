import React, { useState } from 'react';
import { Check, X, CreditCard, ShieldCheck } from 'lucide-react';

export const UpgradeModal = ({ isOpen, onClose, onUpgrade }) => {
  const [step, setStep] = useState('selection'); 

  if (!isOpen) return null;

  const plans = [
    { 
      name: 'PRO', 
      price: '29', 
      tokens: '10,000', 
      color: 'primary',
      features: ['Prioridad de Proxy', '10k Tokens / mes', 'Soporte Estándar']
    },
    { 
      name: 'ENTERPRISE', 
      price: '99', 
      tokens: '50,000', 
      color: 'indigo',
      features: ['Latencia Zero', '50k Tokens / mes', 'Soporte 24/7 Dedicado']
    },
  ];

  const handlePay = () => {
    setStep('success');
    setTimeout(() => {
      onUpgrade();
      onClose();
      setStep('selection');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-card border border-border rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300">
        
        <div className="flex justify-between items-center px-10 py-8 border-b border-border">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight font-display">
              {step === 'success' ? '¡Actualización Exitosa!' : 'Mejora tu Cuenta'}
            </h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Planes de Consumo Académico</p>
          </div>
          <button onClick={onClose} className="p-2 bg-background hover:bg-border rounded-full text-slate-500 transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-10">
          {step === 'selection' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {plans.map((plan) => (
                <div 
                  key={plan.name}
                  className="bg-background border border-border rounded-3xl p-8 flex flex-col hover:border-primary-500/50 transition-all cursor-pointer group shadow-inner"
                  onClick={() => setStep('payment')}
                >
                  <p className="text-primary-500 font-black text-[10px] tracking-[0.2em] mb-2">PLAN {plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-white font-display">${plan.price}</span>
                    <span className="text-slate-600 text-xs font-bold uppercase tracking-widest">/mes</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                        <Check size={14} className="text-primary-500" strokeWidth={3} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full py-4 bg-card border border-border group-hover:bg-primary-500 group-hover:text-white rounded-2xl text-slate-400 font-black text-[10px] transition-all uppercase tracking-[0.2em]">
                    Seleccionar
                  </button>
                </div>
              ))}
            </div>
          )}

          {step === 'payment' && (
            <div className="max-w-md mx-auto space-y-8">
              <div className="p-6 bg-primary-500/5 border border-primary-500/20 rounded-2xl flex items-center gap-4">
                <CreditCard className="text-primary-500" size={32} />
                <div>
                  <p className="text-primary-500 font-black text-xs uppercase tracking-widest leading-none mb-1">Pago Encriptado</p>
                  <p className="text-slate-500 text-[10px] font-bold">Simulación de pasarela de pago institucional</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 tracking-widest uppercase ml-1">Número de Tarjeta</label>
                  <div className="bg-background border border-border rounded-2xl p-5 text-white font-mono tracking-widest shadow-inner">•••• •••• •••• 4242</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 tracking-widest uppercase ml-1">Fecha</label>
                    <div className="bg-background border border-border rounded-2xl p-5 text-white font-mono text-center shadow-inner">12 / 28</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 tracking-widest uppercase ml-1">CVC</label>
                    <div className="bg-background border border-border rounded-2xl p-5 text-white font-mono text-center shadow-inner">•••</div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePay}
                className="w-full py-5 bg-primary-500 hover:bg-primary-600 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/20 transition-all uppercase tracking-[0.2em]"
              >
                Confirmar Suscripción
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-12 space-y-8">
              <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto text-emerald-500 shadow-2xl shadow-emerald-500/10 animate-bounce">
                <ShieldCheck size={56} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight font-display">¡Actualización Completa!</h3>
                <p className="text-slate-500 max-w-sm mx-auto text-sm font-medium leading-relaxed">
                  Tu cuota ha sido actualizada satisfactoriamente. El proxy ha habilitado tus nuevos límites de acceso.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
