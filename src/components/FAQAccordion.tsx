/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useState} from "react";
import {HelpCircle, ChevronDown} from "lucide-react";
import {motion, AnimatePresence} from "motion/react";

export interface FAQAccordionItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQAccordionItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQAccordion({
  items,
  title = "Perguntas Frequentes",
  subtitle = "Respostas diretas estruturadas para fácil leitura e otimizadas para buscadores.",
}: FAQAccordionProps) {
  // Store expanded index; first one expanded by default if items exist
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Generate Schema.org FAQPage JSON-LD
  const schemaJsonLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <div
      id="faq-accordion-container"
      className="border border-brand-border bg-brand-card rounded-lg p-5 sm:p-6 space-y-6"
    >
      {/* Schema.org JSON-LD Script Block for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLD) }}
      />

      {/* Header section of the FAQ */}
      <div className="border-b border-brand-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-brand-neon" />
          <h3 className="font-display text-lg sm:text-xl text-white uppercase tracking-wider">
            {title}
          </h3>
        </div>
        <span className="font-mono text-[9px] text-zinc-500 uppercase">
          FAQ OTIMIZADO
        </span>
      </div>

      {subtitle && (
        <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Accordion container */}
      <div className="space-y-3">
        {items.map((item, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              id={`faq-item-${idx}`}
              className={`border rounded-lg transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "border-zinc-700 bg-black/40"
                  : "border-zinc-800/60 bg-black/20 hover:border-zinc-800"
              }`}
            >
              {/* Question Trigger Header */}
              <button
                onClick={() => toggleExpand(idx)}
                aria-expanded={isExpanded}
                className="w-full text-left p-4 flex items-center justify-between gap-4 font-sans font-extrabold text-zinc-100 text-sm sm:text-base focus:outline-none cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-brand-neon shrink-0 transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Animating the answer section with motion */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-zinc-800/80 p-4">
                      <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
