/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useState} from "react";
import {HelpCircle, ChevronDown, Sparkles} from "lucide-react";
import {FAQItem} from "../types";

interface ReviewFAQProps {
  faq: FAQItem[];
  produto: string;
}

export default function ReviewFAQ({ faq, produto }: ReviewFAQProps) {
  // Store expanded state per question
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First item expanded by default

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div id="review-faq-accordion" className="border border-brand-border bg-brand-card rounded-lg p-5 sm:p-6 space-y-6">
      
      {/* FAQ Header */}
      <div className="border-b border-brand-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-brand-neon" />
          <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-wider">
            Perguntas Frequentes (FAQ) — Otimizado para IAs
          </h3>
        </div>
        <span className="font-mono text-[9px] text-zinc-500 uppercase flex items-center gap-1">
          <Sparkles className="h-2.5 w-2.5 text-brand-neon" />
          GEO_FORMAT: ENABLED
        </span>
      </div>

      <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
        Respostas diretas e honestas estruturadas no padrão preferido pelos buscadores de Inteligência Artificial. Sem enrolação de marketing.
      </p>

      {/* Accordion List */}
      <div className="space-y-3">
        {faq.map((item, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              id={`faq-accordion-item-${idx}`}
              className={`border rounded-lg transition-all duration-300 overflow-hidden ${
                isExpanded ? "border-zinc-700 bg-black/40" : "border-zinc-800/60 bg-black/20 hover:border-zinc-800"
              }`}
            >
              {/* Question Trigger Header */}
              <button
                onClick={() => toggleExpand(idx)}
                aria-expanded={isExpanded}
                className="w-full text-left p-4 flex items-center justify-between gap-4 font-sans font-extrabold text-zinc-100 text-sm sm:text-base focus:outline-none"
              >
                <span>{item.pergunta}</span>
                <ChevronDown
                  className={`h-4 w-4 text-brand-neon shrink-0 transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Answer Box */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-96 opacity-100 border-t border-zinc-800/80 p-4" : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed">
                  {item.resposta}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
