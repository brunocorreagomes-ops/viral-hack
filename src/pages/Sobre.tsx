/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Helmet} from "react-helmet-async";
import {FileText, ShieldCheck, HeartHandshake, Eye, AlertCircle} from "lucide-react";

export default function Sobre() {
  return (
    <div id="sobre-page" className="mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-12">
      <Helmet>
        <title>Manifesto de Honestidade — Por que Confiar em Nós? | Viral Hack</title>
        <meta name="description" content="Nosso compromisso inegociável com reviews sinceros e transparentes de achados virais na internet." />
      </Helmet>

      {/* Page Title */}
      <div className="space-y-4 text-center sm:text-left border-b border-brand-border pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-brand-neon/10 border border-brand-neon/20 font-mono text-[10px] text-brand-neon font-bold uppercase tracking-wider mb-2">
          <FileText className="h-3.5 w-3.5" />
          <span>DECLARAÇÃO DE PRINCÍPIOS v1.0</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
          MANIFESTO DE <span className="text-brand-neon">HONESTIDADE</span>
        </h1>
        <p className="text-zinc-400 font-sans text-base sm:text-lg">
          O mercado de "achados virais" está corrompido por perfis de fofoca e canais de spam que elogiam lixo eletrônico para ganhar comissão. Nós viemos reescrever essa regra.
        </p>
      </div>

      {/* Main Core Values - Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-brand-border bg-brand-card p-5 rounded-lg space-y-3">
          <div className="h-10 w-10 flex items-center justify-center rounded bg-brand-neon/10 border border-brand-neon/20 text-brand-neon">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-display text-xl text-white uppercase">Independência Editorial</h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Nenhuma marca ou vendedor tem o direito de revisar, aprovar ou censurar nossas opiniões antes da publicação. Nós compramos nossos próprios produtos de teste com dinheiro real. Se o produto falhar em nossa bancada de testes, as frestas, a fragilidade ou o fracasso geral serão expostos.
          </p>
        </div>

        <div className="border border-brand-border bg-brand-card p-5 rounded-lg space-y-3">
          <div className="h-10 w-10 flex items-center justify-center rounded bg-brand-neon/10 border border-brand-neon/20 text-brand-neon">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <h3 className="font-display text-xl text-white uppercase">Monetização Limpa</h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Não cobramos por matérias pagas (os famosos "publis"). Nossa única fonte de receita são as comissões pagas pelas lojas oficiais como Amazon e Mercado Livre quando você decide realizar uma compra utilizando nossos links. Isso nos força a ser úteis: se mentirmos, você devolverá o produto e nós perderemos a comissão.
          </p>
        </div>
      </div>

      {/* Deep-dive text blocks styled like a print document */}
      <div className="border border-brand-border bg-brand-card p-6 sm:p-10 rounded-lg space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

        <h3 className="font-display text-2xl text-white uppercase tracking-wider border-b border-brand-border pb-3">
          Por que nascemos?
        </h3>

        <div className="space-y-4 font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
          <p>
            Hoje em dia, basta abrir qualquer rede social para ser bombardeado por vídeos hiper-estimulantes mostrando maravilhas da engenharia doméstica de R$ 30: seladoras ultra-sônicas, mini aspiradores capazes de levantar tijolos, ou removedores de marca de dedo de alta frequência.
          </p>
          <p>
            O problema? 99% desses vídeos contêm truques de câmera, cortes cirúrgicos que escondem problemas de uso, ou iluminação enganosa. Pior: as contas que compartilham esses links automatizados estão rodando scripts de spam para acumular comissão de cliques, sem nunca terem encostado as mãos na embalagem real do produto.
          </p>
          <p className="border-l-2 border-brand-neon pl-4 italic text-white font-medium">
            "Viral Hack nasceu do ódio ao lixo de plástico de baixo ticket. Nós acreditamos que gadgets baratos de conveniência podem sim ser fantásticos e resolver dores reais, mas o consumidor merece saber a verdade crua antes de preencher o formulário do cartão de crédito."
          </p>
        </div>
      </div>

      {/* Visual Rule of Conduct Card */}
      <div className="border border-zinc-800 bg-black/40 p-5 rounded-lg space-y-3">
        <div className="flex items-center gap-2 text-brand-neon font-mono text-xs font-bold uppercase tracking-wider">
          <AlertCircle className="h-4 w-4" />
          <span>Nosso Código de Conduta Antitruque</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs sm:text-sm text-zinc-400">
          <li className="flex gap-2">
            <span className="text-brand-neon font-bold">01.</span>
            <span><strong>Fotos sem maquiagem:</strong> Nunca alteramos a fidelidade de nossas fotos com softwares de edição para esconder trincos ou rebarbas de fabricação.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-brand-neon font-bold">02.</span>
            <span><strong>Fórmula de Ponderação Visível:</strong> Nossas notas são detalhadas por categoria. Um produto esteticamente bonito nunca compensará uma nota de durabilidade pífia ou funcionalidade instável.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-brand-neon font-bold">03.</span>
            <span><strong>Alternativas explícitas:</strong> Se houver uma solução caseira tradicional que funcione melhor que o gadget viral de R$ 20, nós indicaremos sem rodeios.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-brand-neon font-bold">04.</span>
            <span><strong>Reclamações Ativas:</strong> Monitoramos pós-venda em grandes portais como Reclame Aqui para alimentar nosso score de durabilidade.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
