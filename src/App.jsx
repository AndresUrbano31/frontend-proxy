import React, { useState } from 'react';
import { Card, PlanBadge } from './components/common/Card';
import { ChatPanel } from './components/chat/ChatPanel';
import { PromptInput } from './components/chat/PromptInput';
import { QuotaProgress, RateLimitCounter } from './components/dashboard/StatusPanel';
import { UsageChart } from './components/dashboard/UsageChart';
import { UpgradeModal } from './components/modals/UpgradeModal';
import { useQuotaStatus } from './hooks/useQuotaStatus';
import { useRateLimitCountdown } from './hooks/useRateLimitCountdown';
import { aiService } from './services/api';
import { Activity, Shield, Info, ExternalLink } from 'lucide-react';

function App() {
  const { status, history, refresh } = useQuotaStatus();
  const { seconds, isRateLimited, startCountdown } = useRateLimitCountdown();
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  const handleSendMessage = async (prompt) => {
    if (isRateLimited || status.tokensUsed >= status.tokensTotal) {
      if (status.tokensUsed >= status.tokensTotal) setIsUpgradeOpen(true);
      return;
    }

    const newUserMsg = { role: 'user', text: prompt };
    setMessages(prev => [...prev, newUserMsg]);
    setIsGenerating(true);

    try {
      const response = await aiService.generateResponse(prompt);
      const aiMsg = { role: 'assistant', text: response.data.text };
      setMessages(prev => [...prev, aiMsg]);
      
      if (response.headers['x-rate-limit-remaining'] === '0') {
        startCountdown(60);
      }
      
      refresh();
    } catch (err) {
      console.error('API Error:', err);
      if (err.response?.status === 429) {
        startCountdown(60);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          text: 'Error: Rate limit alcanzado. Por favor, espera a que expire el cooldown.' 
        }]);
      } else {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            text: 'Respuesta simulada: El servicio está procesando tu solicitud de forma segura a través del proxy inteligente.' 
          }]);
          refresh();
        }, 8000); // simulate delay if needed
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-200 font-sans selection:bg-primary-500/30">
      {/* Container Principal Centrado */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        
        {/* Header Superior */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/20">
              <Shield className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight font-display">AI Proxy Platform</h1>
              <p className="text-slate-500 text-sm font-medium">Plataforma Académica de Consumo Seguro de IA</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 p-2 bg-card rounded-2xl border border-border shadow-inner">
            <div className="px-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1">Tu Plan Académico</p>
              <PlanBadge plan={status.plan} />
            </div>
            <button 
              onClick={() => setIsUpgradeOpen(true)}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-primary-500/10 active:scale-95 uppercase tracking-widest"
            >
              Mejorar Plan
            </button>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Columna Izquierda: Status & History (Sidebar) */}
          <aside className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-10">
            <Card title="Estado del Sistema">
              <div className="space-y-8">
                <QuotaProgress used={status.tokensUsed} total={status.tokensTotal} />
                <RateLimitCounter 
                  remaining={status.requestsRemaining} 
                  countdown={seconds} 
                />
              </div>
            </Card>

            <Card title="Historial de Consumo">
              <div className="h-48">
                <UsageChart data={history} />
              </div>
              <div className="mt-6 flex items-center gap-3 p-3 bg-background/50 rounded-xl border border-border">
                <Activity size={16} className="text-primary-500" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tráfico monitoreado en tiempo real</span>
              </div>
            </Card>

            <div className="bg-gradient-to-br from-primary-500/10 to-indigo-600/5 border border-primary-500/20 rounded-[2rem] p-8 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col gap-2">
                <h4 className="text-white font-black text-sm uppercase tracking-wider">Proxy de Seguridad AI</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Todas las solicitudes pasan por nuestra capa de abstracción para prevenir abusos y controlar el presupuesto de tokens.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] text-primary-400 font-bold underline cursor-pointer">
                  LEER DOCUMENTACIÓN <ExternalLink size={10} />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-all duration-500" />
            </div>
          </aside>

          {/* Columna Derecha: Panel Principal de Chat */}
          <section className="lg:col-span-8 flex flex-col h-full bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            {/* Chat Messages Area */}
            <div className="flex-1 min-h-[500px] max-h-[650px] overflow-hidden relative">
              <ChatPanel messages={messages} loading={isGenerating} />
            </div>
            
            {/* Input Footer Area */}
            <div className="p-8 border-t border-border bg-card/80 backdrop-blur-sm sticky bottom-0">
              <PromptInput 
                onSend={handleSendMessage} 
                disabled={isGenerating || isRateLimited || status.tokensUsed >= status.tokensTotal}
                currentQuota={status.tokensUsed}
                maxQuota={status.tokensTotal}
              />
              
              {isRateLimited && (
                <div className="mt-4 flex items-center gap-2 text-xs text-red-400 font-bold bg-red-400/5 p-3 rounded-xl border border-red-400/10">
                  <Info size={14} />
                  <span>Rate limit alcanzado. El proxy inteligente ha pausado tus peticiones.</span>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>

      <UpgradeModal 
        isOpen={isUpgradeOpen} 
        onClose={() => setIsUpgradeOpen(false)} 
        onUpgrade={refresh}
      />
    </div>
  );
}

export default App;
