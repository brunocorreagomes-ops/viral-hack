/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Link} from "react-router-dom";
import {Review} from "../types";
import ProductBlueprint from "../components/ProductBlueprint";
import {Compass, Flame, ShieldAlert, BadgeCheck, Zap, ArrowUpRight, BarChart3, HelpCircle} from "lucide-react";

export default function Home() {
  // Load all JSON review files dynamically from /src/data/*.json
  const reviewsGlob = import.meta.glob("../data/*.json", { eager: true });
  const reviews = Object.values(reviewsGlob).map((mod: any) => mod.default || mod) as Review[];

  // Find featured review ("review da semana") - we choose the mini-seladora-portatil as featured
  const featuredReview = reviews.find(r => r.slug === "mini-seladora-portatil") || reviews[0];

  // Rest of the reviews for the grid
  const recentReviews = reviews.filter(r => r.slug !== (featuredReview?.slug || ""));

  // Helper to render methodology stamp nicely
  const renderMethodologyBadge = (metodologia: "testado" | "curadoria" | "misto") => {
    switch (metodologia) {
      case "testado":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-neon/10 border border-brand-neon/40 rounded font-mono text-[9px] text-brand-neon font-black uppercase tracking-wider">
            <BadgeCheck className="h-3 w-3 shrink-0" />
            <span>Testado Real</span>
          </div>
        );
      case "misto":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-400/10 border border-yellow-400/40 rounded font-mono text-[9px] text-yellow-400 font-black uppercase tracking-wider">
            <Zap className="h-3 w-3 shrink-0" />
            <span>Misto (Lab + Curação)</span>
          </div>
        );
      case "curadoria":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded font-mono text-[9px] text-zinc-300 font-black uppercase tracking-wider">
            <Compass className="h-3 w-3 shrink-0" />
            <span>Curadoria de Dados</span>
          </div>
        );
    }
  };

  return (
    <div id="home-page-container" className="space-y-12 pb-16">
      
      {/* 1. HERO SECTION - Industrial Lab + Internet Culture */}
      <section className="relative overflow-hidden border-b border-brand-border py-12 sm:py-20 bg-black/60">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-brand-neon text-brand-dark font-mono text-xs font-black uppercase tracking-widest mb-6 border border-brand-neon">
            <Flame className="h-4 w-4 animate-bounce" />
            <span>FISCAL DE ACHADOS DA INTERNET</span>
          </div>
          
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none uppercase max-w-5xl">
            REVIEWS <span className="text-brand-neon underline decoration-wavy decoration-brand-neon">SEM FILTRO</span> DE ACHADOS QUE VIRALIZAM.
          </h1>
          
          <p className="mt-6 text-zinc-400 font-sans text-base sm:text-xl max-w-3xl leading-relaxed">
            De um lado, a energia desenfreada dos vídeos do TikTok. Do outro, o rigor analítico de um relatório laboratorial. Separamos as soluções brilhantes de baixo ticket das fraudes de plástico que vão direto para o seu lixo.
          </p>

          <div className="mt-8 p-4 rounded-lg bg-brand-card/40 border border-brand-border max-w-2xl text-left flex gap-3 items-start">
            <ShieldAlert className="h-5 w-5 text-brand-neon shrink-0 mt-0.5" />
            <div className="font-mono text-xs text-zinc-400">
              <span className="text-white font-bold block uppercase mb-1">DECLARAÇÃO DE TRANSPARÊNCIA EDITORIAL:</span>
              Não aceitamos patrocínio de marcas para inflar notas. Se o produto for frágil ou inútil, a gente fala sem anestesia. Monetizamos apenas quando você clica nos links de afiliado.
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACHADO DA SEMANA (FEATURED REVIEW) */}
      {featuredReview && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="border border-brand-neon/30 bg-brand-neon/[0.02] p-1 rounded-xl">
            <div className="border border-brand-border bg-brand-card rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-8">
              
              {/* Graphic Blueprint Block - 5 cols */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="font-mono text-[10px] text-brand-neon uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-neon animate-pulse"></span>
                  ACHADO DA SEMANA [TESTE INTEGRAL]
                </div>
                <ProductBlueprint 
                  slug={featuredReview.slug} 
                  name={featuredReview.produto} 
                  price={featuredReview.precoMedio}
                  metodologia={featuredReview.metodologia}
                />
              </div>

              {/* Description Block - 7 cols */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {renderMethodologyBadge(featuredReview.metodologia)}
                    <span className="font-mono text-xs text-zinc-500">Publicado em {featuredReview.dataPublicacao.split("-").reverse().join("/")}</span>
                  </div>

                  <h2 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-wider leading-none">
                    {featuredReview.produto}
                  </h2>
                  
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {featuredReview.descricaoCurta}
                  </p>

                  {/* Veredito em uma frase */}
                  <div className="p-4 rounded border-l-4 border-brand-neon bg-brand-dark/60 font-sans">
                    <span className="font-mono text-[9px] text-brand-neon uppercase block tracking-widest font-bold mb-1">VEREDITO DIRETO</span>
                    <p className="text-white font-bold text-base sm:text-lg">
                      {featuredReview.veredito}
                    </p>
                  </div>
                  
                  {/* Rating breakdown brief summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 p-3 rounded border border-zinc-800/60 font-mono text-xs">
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">Funcionalidade</span>
                      <span className="text-white font-bold text-sm">{featuredReview.notas.funcionalidade.toFixed(1)}/10</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">Custo-Benefício</span>
                      <span className="text-white font-bold text-sm">{featuredReview.notas.custoBeneficio.toFixed(1)}/10</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">Durabilidade</span>
                      <span className="text-white font-bold text-sm">{featuredReview.notas.durabilidade.toFixed(1)}/10</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">Vale o Hype</span>
                      <span className="text-brand-neon font-black text-sm">{featuredReview.notas.valeOHype.toFixed(1)}/10</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-zinc-500 font-mono text-[10px] block uppercase">Preço de Referência</span>
                    <span className="text-white font-display text-2xl tracking-wide">{featuredReview.precoMedio}</span>
                  </div>
                  <Link
                    to={`/review/${featuredReview.slug}`}
                    className="flex items-center justify-center gap-2 bg-brand-neon hover:bg-brand-neon-hover text-brand-dark font-mono text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded transition-all duration-200"
                  >
                    <span>Ler Review Detalhada</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </section>
      )}

      {/* 3. RECENT REVIEWS GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
        <div className="flex items-baseline justify-between border-b border-brand-border pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-brand-neon" />
            <h2 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-wider">REVIEWS RECENTES</h2>
          </div>
          <span className="font-mono text-xs text-zinc-500">{recentReviews.length} RELATÓRIOS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentReviews.map((review) => {
            // Calculate direct overall score
            const media = (
              (review.notas.funcionalidade + review.notas.custoBeneficio + review.notas.durabilidade + review.notas.valeOHype) / 4
            ).toFixed(1);

            return (
              <div 
                key={review.slug} 
                id={`review-card-${review.slug}`}
                className="group border border-brand-border bg-brand-card hover:border-brand-neon/30 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
                {/* Visual block Header */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    {renderMethodologyBadge(review.metodologia)}
                    <div className="flex items-baseline gap-1 bg-black/50 border border-zinc-800 px-2 py-0.5 rounded font-mono text-xs font-bold text-brand-neon">
                      <span>Score:</span>
                      <span className="font-display text-sm text-white">{media}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-2xl sm:text-3xl text-zinc-100 group-hover:text-brand-neon transition-colors duration-200 uppercase">
                      {review.produto}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {review.descricaoCurta}
                    </p>
                  </div>

                  {/* Micro list of top pros/cons inside home cards */}
                  <div className="pt-2">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block tracking-widest mb-1">PROS RELEVANTES</span>
                    <ul className="text-zinc-300 text-xs font-mono space-y-1">
                      {review.pros.slice(0, 2).map((pro, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-brand-neon font-bold">•</span>
                          <span className="line-clamp-1">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card footer block */}
                <div className="bg-black/40 border-t border-brand-border p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-zinc-500 font-mono block uppercase">Preço de Referência</span>
                    <span className="text-white font-sans text-xs font-bold">{review.precoMedio}</span>
                  </div>
                  <Link
                    to={`/review/${review.slug}`}
                    className="flex items-center gap-1 text-zinc-400 group-hover:text-brand-neon font-mono text-xs uppercase tracking-wider transition-colors duration-200"
                  >
                    <span>Ver Relatório Completo</span>
                    <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. METHODOLOGY & TRUST CALLOUT BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-xl border border-brand-border bg-gradient-to-r from-zinc-950 to-brand-card p-6 sm:p-10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
          
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-xs text-brand-neon uppercase tracking-widest font-black block">FICHAS COMPROMISSÓRIAS</span>
            <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wider">COMO NÓS AVALIAMOS OS PRODUTOS?</h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              Nossa pontuação é dividida em critérios objetivos. Quando marcamos um produto como <strong>Testado Real</strong>, nós compramos o produto com nossos próprios recursos de comissão, levamos para a cozinha ou bancada de ferramentas e tiramos fotos sem maquiagem técnica. Quando marcamos como <strong>Curadoria</strong>, cruzamos centenas de reviews de compradores reais para compor um veredito fidedigno.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <Link
              to="/metodologia"
              className="w-full sm:w-auto text-center border-2 border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark font-mono text-xs uppercase tracking-wider font-bold py-4 px-8 rounded transition-all duration-200"
            >
              Nossa Metodologia Detalhada
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
