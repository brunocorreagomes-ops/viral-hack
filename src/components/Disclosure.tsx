/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {ShieldCheck, HelpCircle, HeartHandshake} from "lucide-react";

export default function Disclosure() {
  return (
    <div id="affiliate-disclosure-block" className="w-full rounded-lg border-2 border-dashed border-brand-border bg-brand-card/60 p-4 sm:p-6 my-6 relative overflow-hidden">
      {/* Visual background badge accent */}
      <div className="absolute top-0 right-0 h-16 w-16 bg-brand-neon/5 rounded-bl-full flex items-center justify-center font-mono text-[9px] text-brand-neon/30 font-bold rotate-12 select-none pointer-events-none">
        TRUST_DEED
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand-neon/30 bg-brand-neon/10 text-brand-neon">
          <HeartHandshake className="h-6 w-6" />
        </div>
        
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg tracking-wider text-white uppercase sm:text-xl">
              Nossa Transparência é <span className="text-brand-neon">Inestimável</span>
            </span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-brand-neon/10 border border-brand-neon/20 font-mono text-[9px] text-brand-neon font-bold uppercase">
              <ShieldCheck className="h-3 w-3" />
              100% Livre de Jabá
            </div>
          </div>
          
          <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">
            Este site é monetizado exclusivamente por <strong className="text-white">links de afiliado</strong>. Se você decidir comprar através dos nossos links estruturados, nós recebemos uma pequena comissão das plataformas (Amazon, Mercado Livre, etc.) sem cobrar nenhum centavo a mais de você. 
          </p>
          
          <div className="p-3 rounded bg-black/40 border border-zinc-800/80 text-zinc-400 text-xs font-mono leading-relaxed">
            <span className="text-brand-neon font-bold">★ PRINCÍPIO INEGOCIÁVEL:</span> Nunca aceitamos pagamentos de marcas para falsificar ou adocicar reviews. Se o produto que testamos for de baixa qualidade, nossa análise será impiedosamente honesta. Nosso compromisso é com o seu bolso, não com o faturamento das marcas.
          </div>
        </div>
      </div>
    </div>
  );
}
