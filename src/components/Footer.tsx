/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Link} from "react-router-dom";
import {Compass, Shield, HeartHandshake, EyeOff} from "lucide-react";

export default function Footer() {
  return (
    <footer id="app-footer" className="w-full border-t border-brand-border bg-black/90 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Brand & Description - 6 cols */}
          <div className="md:col-span-6 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-neon bg-brand-neon/10 font-mono text-base font-bold text-brand-neon">
                VH
              </div>
              <span className="font-display text-2xl tracking-wider text-white">
                VIRAL <span className="text-brand-neon">HACK</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
              O laboratório fiscal de achados da internet. Nossa missão é testar, catalogar e classificar com independência absoluta tudo o que é vendido sob a promessa de facilidade ou inovação viral nas redes sociais.
            </p>
          </div>

          {/* Column 2: Navigation - 3 cols */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase text-brand-neon tracking-wider font-bold">Menu Principal</span>
            <ul className="space-y-2 font-mono text-xs text-zinc-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">→ Achados Virais</Link>
              </li>
              <li>
                <Link to="/metodologia" className="hover:text-white transition-colors">→ Metodologia de Nota</Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-white transition-colors">→ Manifesto de Honestidade</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Admin - 3 cols */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase text-zinc-300 tracking-wider font-bold">Termos e Notas</span>
            <ul className="space-y-2 font-mono text-xs text-zinc-400">
              <li>
                <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">→ Privacidade e Cookies</Link>
              </li>
              <li className="flex items-center gap-1 text-zinc-500 text-[10px]">
                <Shield className="h-3 w-3 text-brand-neon" />
                <span>SSL Criptografado</span>
              </li>
              <li className="flex items-center gap-1 text-zinc-500 text-[10px]">
                <HeartHandshake className="h-3 w-3 text-brand-neon" />
                <span>Afiliado Responsável</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Micro integrity footer note */}
        <div className="border-t border-brand-border/60 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="font-mono text-[9px] text-zinc-500 max-w-2xl leading-relaxed">
            <span className="text-zinc-400 font-bold uppercase block mb-1">DIVULGAÇÃO DE AFILIAÇÃO E TRANSPARÊNCIA:</span>
            O Viral Hack é um portal de análises independente suportado pelo leitor. Ao efetuar uma compra através dos nossos botões estruturados, poderemos receber uma pequena comissão das plataformas licenciadoras afiliadas. Não possuímos vínculo empregatício direto com as marcas testadas nem recebemos investimentos promocionais para forçar avaliações positivas.
          </div>
          
          <div className="font-mono text-[10px] text-zinc-600 shrink-0">
            <span>© 2026 VIRAL HACK. DESIGN INTEGRAL.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
