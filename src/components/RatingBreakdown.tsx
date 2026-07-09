/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {ReviewNotes} from "../types";
import {Activity, Star, Sparkles, TrendingUp, HelpCircle} from "lucide-react";

interface RatingBreakdownProps {
  notas: ReviewNotes;
}

export default function RatingBreakdown({ notas }: RatingBreakdownProps) {
  // Calculate average score
  const media = (
    (notas.funcionalidade + notas.custoBeneficio + notas.durabilidade + notas.valeOHype) / 4
  ).toFixed(1);

  const criteria = [
    {
      key: "funcionalidade",
      label: "Funcionalidade",
      value: notas.funcionalidade,
      desc: "Entrega o que promete na prática?",
      icon: Activity,
    },
    {
      key: "custoBeneficio",
      label: "Custo-Benefício",
      value: notas.custoBeneficio,
      desc: "O preço cobrado é proporcional à entrega?",
      icon: Star,
    },
    {
      key: "durabilidade",
      label: "Durabilidade",
      value: notas.durabilidade,
      desc: "Qualidade de construção física do produto",
      icon: HelpCircle,
    },
    {
      key: "valeOHype",
      label: "Vale o Hype?",
      value: notas.valeOHype,
      desc: "A febre viral é justificada?",
      icon: TrendingUp,
    },
  ];

  // Determinar rótulo do score geral
  const getVereditoLabel = (score: number) => {
    if (score >= 9.0) return "CUPOM DE APROVADO [ELITE]";
    if (score >= 8.0) return "RECOMENDADO [SÓLIDO]";
    if (score >= 7.0) return "DÁ PRO GASTO [MEDIANO]";
    if (score >= 5.0) return "RECOMENDADO APENAS EM PROMOÇÃO";
    return "PRODUTO FLOP / FURADA";
  };

  const getVereditoColor = (score: number) => {
    if (score >= 8.0) return "text-brand-neon bg-brand-neon/10 border-brand-neon/30";
    if (score >= 6.5) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    return "text-red-500 bg-red-500/10 border-red-500/30";
  };

  return (
    <div id="rating-breakdown-panel" className="grid grid-cols-1 md:grid-cols-12 gap-6 border border-brand-border bg-brand-card p-5 sm:p-6 rounded-lg relative overflow-hidden">
      {/* Background wire grid decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Main Big Score Card - Takes 4 cols */}
      <div className="relative z-10 md:col-span-4 flex flex-col items-center justify-center text-center p-5 rounded-lg bg-black/40 border border-zinc-800/80">
        <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1">SCORE DE ENGENHARIA</span>
        
        <div className="flex items-baseline gap-1 mt-2 mb-2">
          <span className="font-display text-7xl text-brand-neon tracking-tighter leading-none">{media}</span>
          <span className="font-mono text-zinc-500 text-lg">/10</span>
        </div>

        <div className={`mt-2 px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded-full border ${getVereditoColor(parseFloat(media))}`}>
          {getVereditoLabel(parseFloat(media))}
        </div>

        <div className="mt-6 text-zinc-500 font-mono text-[8px] text-center max-w-[150px]">
          Fórmula ponderada calculada com rigor pelo laboratório Viral Hack.
        </div>
      </div>

      {/* Breakdown sliders - Takes 8 cols */}
      <div className="relative z-10 md:col-span-8 flex flex-col justify-between gap-4">
        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest border-b border-brand-border pb-2 block">
          Breakdown de Parâmetros Analíticos
        </span>
        
        <div className="grid grid-cols-1 gap-4">
          {criteria.map((item) => {
            const Icon = item.icon;
            const percentage = (item.value / 10) * 100;

            return (
              <div key={item.key} id={`criterion-${item.key}`} className="space-y-1">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-200">
                    <Icon className="h-3.5 w-3.5 text-brand-neon" />
                    <span className="font-bold uppercase tracking-wider">{item.label}</span>
                    <span className="text-zinc-500 text-[10px] hidden sm:inline">— {item.desc}</span>
                  </div>
                  <span className="font-display text-sm text-brand-neon tracking-wider">{item.value.toFixed(1)}/10</span>
                </div>

                {/* Styled Technical Bar Meter */}
                <div className="h-3 w-full bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden p-[2px] flex items-center">
                  <div 
                    className="h-full bg-brand-neon rounded-xs relative group"
                    style={{ width: `${percentage}%` }}
                  >
                    {/* Visual pulse line at the end of the bar */}
                    <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white opacity-80 shadow-[0_0_8px_#ccff00]"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
