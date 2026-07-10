/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Helmet} from "react-helmet-async";
import {Activity, CheckCircle, Search, Layers, ShieldCheck, HeartHandshake, Eye} from "lucide-react";

export default function Metodologia() {
  const criteriaList = [
    {
      title: "Funcionalidade (Peso 35%)",
      desc: "O produto realmente desempenha o papel prometido nos vídeos de demonstração? Nós repetimos a operação principal pelo menos 20 vezes consecutivas para avaliar constância e identificar falhas ocultas.",
      metrics: ["Desempenho sob estresse", "Curva de aprendizado do usuário", "Ergonomia prática"]
    },
    {
      title: "Custo-Benefício (Peso 25%)",
      desc: "O preço médio praticado é compatível com o valor que o produto traz à sua rotina? Comparamos com soluções caseiras tradicionais ou marcas consolidadas.",
      metrics: ["Análise de valor absoluto", "Disponibilidade em lojas concorrentes", "Custo de consumíveis/pilhas"]
    },
    {
      title: "Durabilidade (Peso 20%)",
      desc: "A construção física resiste ao uso regular ou o produto quebra na terceira semana? Analisamos plásticos, junções, componentes térmicos e eletrônicos, além de investigar o índice de queixas de compradores em fóruns pós-venda.",
      metrics: ["Resistência de materiais", "Qualidade das soldas/encaixes", "Índice de reclamações reais no Reclame Aqui"]
    },
    {
      title: "Vale o Hype? (Peso 20%)",
      desc: "A febre viral que gerou milhões de visualizações é justificada pela utilidade ou é apenas publicidade inteligente? Descontamos truques de câmera das redes sociais.",
      metrics: ["Fidelidade ao vídeo viral", "Nível de utilidade de longo prazo", "Risco de arrependimento imediato"]
    }
  ];

  return (
    <div id="metodologia-page" className="mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-12">
      <Helmet>
        <title>Nossa Metodologia de Teste — Como Avaliamos | Viral Hack</title>
        <meta name="description" content="Saiba como calculamos notas de 0 a 10 para achados virais. Transparência total sobre testes de laboratório e curadoria." />
      </Helmet>

      {/* Page Title */}
      <div className="space-y-4 text-center sm:text-left border-b border-brand-border pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-brand-neon/10 border border-brand-neon/20 font-mono text-[10px] text-brand-neon font-bold uppercase tracking-wider mb-2">
          <Activity className="h-3.5 w-3.5 text-brand-neon" />
          <span>SISTEMA DE MÉTRICAS v2.4</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
          COMO <span className="text-brand-neon">TESTAMOS</span>
        </h1>
        <p className="text-zinc-400 font-sans text-base sm:text-lg">
          Para acabar com o amadorismo e os reviews comprados, desenvolvemos uma metodologia rigorosa de avaliação de produtos virais de baixo ticket.
        </p>
      </div>

      {/* Methodology Split Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="border border-brand-border bg-brand-card p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 text-brand-neon font-display text-xl uppercase border-b border-brand-border pb-2">
            <CheckCircle className="h-5 w-5" />
            <span>01. Testado por Nós</span>
          </div>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
            Quando o selo <strong>"Testado por Nós"</strong> está ativo, significa que compramos o item, ele entrou em nossa cozinha, quarto ou bancada de gadgets, e passou pelo nosso ciclo completo de estresse por pelo menos 15 dias. As fotos técnicas e o esquema em blueprint refletem o modelo físico real que tivemos em mãos.
          </p>
        </div>

        <div className="border border-brand-border bg-brand-card p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 text-zinc-300 font-display text-xl uppercase border-b border-brand-border pb-2">
            <Search className="h-5 w-5 text-brand-neon" />
            <span>02. Curadoria de Dados</span>
          </div>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
            Em alguns casos, a demanda por vereditos é instantânea ou o lote nacional está temporariamente indisponível. Para proteger o leitor no mesmo dia, aplicamos nossa <strong>"Curadoria Analítica"</strong>: cruzamos dezenas de vídeos de testes sem cortes internacionais, analisamos o banco de dados de mais de 300 avaliações de compradores e checamos o índice de devolução nas maiores plataformas.
          </p>
        </div>
      </div>

      {/* Weight formula section */}
      <div className="border border-brand-border bg-brand-card p-6 sm:p-8 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="space-y-4 relative z-10">
          <h3 className="font-display text-2xl text-white uppercase tracking-wider border-b border-brand-border pb-3">
            O Breakdown da Nota (Média Ponderada)
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Não jogamos uma nota arbitrária no vento. A nossa nota geral (de 0 a 10) é o resultado matemático ponderado de quatro pilares complementares. Isso impede que um produto inútil mas barato consiga recomendação de elite.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {criteriaList.map((crit, index) => (
              <div key={index} className="space-y-2 bg-black/30 p-4 rounded border border-zinc-850">
                <span className="font-display text-lg text-white uppercase tracking-wide block">{crit.title}</span>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{crit.desc}</p>
                <div className="pt-2 border-t border-zinc-900 flex flex-wrap gap-1">
                  {crit.metrics.map((met, i) => (
                    <span key={i} className="font-mono text-[9px] bg-zinc-900 px-2 py-0.5 rounded text-zinc-400 uppercase">
                      • {met}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final integrity callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="p-5 rounded-lg bg-brand-neon/5 border-2 border-dashed border-brand-neon/30 text-center space-y-2">
          <ShieldCheck className="h-8 w-8 text-brand-neon mx-auto" />
          <span className="font-display text-lg text-white uppercase tracking-wider block">Independência Editorial</span>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
            Se uma marca nos enviar um produto gratuitamente de forma unilateral para teste, nós o faremos, mas o produto receberá exatamente a nota que merece. Nós não fazemos assessoria de marketing. Fazemos assessoria de compra para o consumidor final.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-center space-y-2 flex flex-col justify-center">
          <div className="text-brand-neon font-mono text-[10px] font-black uppercase tracking-wider block mb-1">
            💻 CÓDIGO DE AUTO-AUDITORIA INTEGRAL
          </div>
          <span className="font-display text-lg text-white uppercase tracking-wider block">Nossos Sistemas se Auditam</span>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
            Para garantir que a teoria vire prática, nossos componentes de código possuem regras estritas: reviews com selo "Testado" exigem fotos reais ou caem em fallback vetorial imediato, e as declarações legais de afiliação são injetadas em nível de sistema, impedindo remoção humana de disclosures.
          </p>
        </div>
      </div>

    </div>
  );
}
