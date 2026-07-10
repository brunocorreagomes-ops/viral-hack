/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {AffiliateLink} from "../types";
import {ExternalLink, ShoppingBag, Clock, ShieldCheck} from "lucide-react";
import Disclosure from "./Disclosure";

interface CascadingCTAProps {
  links: AffiliateLink[];
  produto: string;
  hideDisclosure?: boolean;
}

export default function CascadingCTA({ links, produto, hideDisclosure = false }: CascadingCTAProps) {
  // Sort links by priority (ascending, i.e., priority 1 goes first)
  const sortedLinks = [...links].sort((a, b) => a.prioridade - b.prioridade);

  // Helper to format platform names nicely
  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case "amazon":
        return "Comprar na Amazon";
      case "mercadolivre":
        return "Comprar no Mercado Livre";
      case "tiktokshop":
        return "Comprar na TikTok Shop";
      case "shopee":
        return "Comprar na Shopee";
      case "aliexpress":
        return "Comprar no AliExpress";
      case "temu":
        return "Comprar na Temu";
      case "shein":
        return "Comprar na Shein";
      default:
        return `Comprar em ${platform}`;
    }
  };

  // Helper to get platform design themes
  const getPlatformColors = (platform: string, isPrimary: boolean) => {
    if (isPrimary) {
      switch (platform) {
        case "mercadolivre":
          return {
            bg: "bg-[#FFF159] hover:bg-[#ffe100]",
            text: "text-zinc-950 font-black",
            border: "border-[#FFF159]"
          };
        case "amazon":
          return {
            bg: "bg-[#FF9900] hover:bg-[#e68a00]",
            text: "text-white font-black",
            border: "border-[#FF9900]"
          };
        default:
          return {
            bg: "bg-brand-neon hover:bg-brand-neon-hover",
            text: "text-brand-dark font-black",
            border: "border-brand-neon"
          };
      }
    } else {
      // Secondary button designs
      switch (platform) {
        case "shopee":
          return {
            bg: "bg-transparent hover:bg-[#EE4D2D]/10",
            text: "text-[#EE4D2D] font-medium",
            border: "border-[#EE4D2D]/40 hover:border-[#EE4D2D]"
          };
        case "aliexpress":
          return {
            bg: "bg-transparent hover:bg-[#E62E04]/10",
            text: "text-[#E62E04] font-medium",
            border: "border-[#E62E04]/40 hover:border-[#E62E04]"
          };
        case "tiktokshop":
          return {
            bg: "bg-transparent hover:bg-[#000000]/40",
            text: "text-white font-medium",
            border: "border-zinc-700 hover:border-white"
          };
        default:
          return {
            bg: "bg-transparent hover:bg-zinc-800",
            text: "text-zinc-300 hover:text-white",
            border: "border-zinc-800 hover:border-zinc-700"
          };
      }
    }
  };

  return (
    <div className="space-y-6">
      <div id="cta-cascade-container" className="flex flex-col gap-4 border border-brand-border bg-brand-card p-5 sm:p-6 rounded-lg">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-neon" />
            <span className="font-display text-lg tracking-wider text-white uppercase sm:text-xl">Onde Encontrar</span>
          </div>
          <span className="font-mono text-[9px] text-zinc-500 uppercase">Preços Atualizados</span>
        </div>

        <div className="flex flex-col gap-3">
          {sortedLinks.map((link, idx) => {
            const isPrimary = idx === 0; // The first one has maximum priority
            const colorTheme = getPlatformColors(link.plataforma, isPrimary);
            
            return (
              <div 
                key={`${link.plataforma}-${idx}`} 
                id={`affiliate-cta-${link.plataforma}`}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-md bg-black/30 border border-zinc-800/60 hover:border-zinc-800 transition-all duration-200"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    {isPrimary ? "★ OPÇÃO RECOMENDADA" : "PLATAFORMA PARCEIRA"}
                  </span>
                  <span className="font-sans font-bold text-sm text-zinc-200">
                    {link.plataforma === "mercadolivre" ? "Mercado Livre" : link.plataforma === "amazon" ? "Amazon Brasil" : link.plataforma.toUpperCase()}
                  </span>
                  {link.prazoEntrega && (
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 mt-1 bg-zinc-900/60 w-fit px-2 py-0.5 rounded border border-zinc-800/40">
                      <Clock className="h-3 w-3 text-brand-neon" />
                      <span>{link.prazoEntrega}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end md:self-center w-full md:w-auto">
                  <a
                    href={link.url}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded text-xs uppercase tracking-wider font-mono border transition-all duration-200 w-full md:w-56 text-center ${colorTheme.bg} ${colorTheme.text} ${colorTheme.border}`}
                  >
                    <span>{getPlatformLabel(link.plataforma)}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Micro-note reinforcing our affiliate commission transparency */}
        <div className="flex items-start gap-1.5 font-mono text-[9px] text-zinc-500 mt-2 leading-relaxed bg-black/20 p-2.5 rounded border border-zinc-950">
          <ShieldCheck className="h-4 w-4 text-brand-neon shrink-0 mt-0.5" />
          <p>
            Comprando pelos links acima, ajudas a manter o laboratório de testes sem pagar nada a mais. Nós rastreamos preços diariamente para garantir que o link aponte para um vendedor confiável.
          </p>
        </div>
      </div>

      {!hideDisclosure && (
        <div id="cta-disclosure-wrapper" className="pt-2">
          <Disclosure />
        </div>
      )}
    </div>
  );
}
