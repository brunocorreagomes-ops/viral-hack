/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {GitCompare, ChevronRight} from "lucide-react";
import {ComparacaoItem} from "../types";

interface ReviewComparacaoRapidaProps {
  comparacoes: ComparacaoItem[];
  produtoPrincipal: string;
}

export default function ReviewComparacaoRapida({
  comparacoes,
  produtoPrincipal,
}: ReviewComparacaoRapidaProps) {
  return (
    <div
      id="quick-comparisons-block"
      className="border border-brand-border bg-brand-card rounded-lg p-5 sm:p-6 space-y-4"
    >
      <div className="border-b border-brand-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-brand-neon" />
          <span className="font-display text-lg tracking-wider text-white uppercase sm:text-xl">
            Comparativo Direto de Prateleira
          </span>
        </div>
        <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
          Lado a Lado Rápido
        </span>
      </div>

      <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
        Como o <strong className="text-zinc-200">{produtoPrincipal}</strong> se sai comparado às alternativas de destaque no mercado? Veja a diferença crucial:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparacoes.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-black/40 border border-zinc-800/80 rounded-lg space-y-2.5 hover:border-zinc-700/60 transition-colors duration-200"
          >
            <div className="flex items-center gap-2 text-zinc-100 font-display text-sm uppercase tracking-wide border-b border-zinc-900 pb-1.5">
              <span className="font-mono text-[10px] text-brand-neon font-black bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                VS
              </span>
              <span className="font-bold">{item.produto}</span>
            </div>
            <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed">
              {item.diferenca}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
