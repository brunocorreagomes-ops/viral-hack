/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useState} from "react";
import {useParams, Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {Review} from "../types";
import {
  Compass,
  BadgeCheck,
  Zap,
  ArrowUpRight,
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown,
  FolderOpen
} from "lucide-react";

// Categorias Metadata
const CATEGORIAS_INFO: { [key: string]: { nome: string; descricao: string } } = {
  cozinha: {
    nome: "Cozinha",
    descricao: "Os achados de cozinha que realmente resolvem a sua vida, e os que só servem para ocupar espaço em gavetas."
  },
  organizacao: {
    nome: "Organização",
    descricao: "Gadgets e organizadores que de fato colocam ordem no caos do dia a dia, sem complicar a sua rotina."
  },
  tech: {
    nome: "Tecnologia",
    descricao: "Dispositivos, luminárias e utilitários eletrônicos que parecem ficção científica, mas cabem no seu orçamento."
  }
};

export default function CategoriaPage() {
  const { slug } = useParams<{ slug: string }>();
  const categoryKey = slug?.toLowerCase() || "";

  // Load reviews
  const reviewsGlob = import.meta.glob("../data/*.json", { eager: true });
  const reviews = Object.values(reviewsGlob).map((mod: any) => mod.default || mod) as Review[];

  // Filter reviews
  const filteredReviews = reviews.filter((r) => r.categoria.toLowerCase() === categoryKey);

  // Sorting state: 'recentes' | 'nota'
  const [sortBy, setSortBy] = useState<"recentes" | "nota">("recentes");

  // Category Info
  const catInfo = CATEGORIAS_INFO[categoryKey] || {
    nome: categoryKey.toUpperCase(),
    descricao: `Análise técnica de produtos virais e gadgets úteis catalogados sob a categoria de ${categoryKey}.`
  };

  // Helper to calculate overall rating
  const getAverageRating = (review: Review) => {
    return (
      (review.notas.funcionalidade +
        review.notas.custoBeneficio +
        review.notas.durabilidade +
        review.notas.valeOHype) /
      4
    );
  };

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "nota") {
      return getAverageRating(b) - getAverageRating(a);
    } else {
      // Default: recent (date descending)
      return new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime();
    }
  });

  // Render methodology badge
  const renderMethodologyBadge = (metodologia: "testado" | "curadoria" | "misto") => {
    switch (metodologia) {
      case "testado":
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-brand-neon/10 border border-brand-neon/30 rounded font-mono text-[9px] text-brand-neon font-black uppercase tracking-wider">
            <BadgeCheck className="h-3 w-3 shrink-0" />
            <span>Testado Real</span>
          </div>
        );
      case "misto":
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-400/10 border border-yellow-400/30 rounded font-mono text-[9px] text-yellow-400 font-black uppercase tracking-wider">
            <Zap className="h-3 w-3 shrink-0" />
            <span>Misto (Lab + Curadoria)</span>
          </div>
        );
      case "curadoria":
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded font-mono text-[9px] text-zinc-300 font-black uppercase tracking-wider">
            <Compass className="h-3 w-3 shrink-0" />
            <span>Curadoria</span>
          </div>
        );
    }
  };

  return (
    <div id="categoria-page-container" className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      <Helmet>
        <title>{`Produtos Virais de ${catInfo.nome} Testados e Sinceros | Viral Hack`}</title>
        <meta name="description" content={catInfo.descricao} />
      </Helmet>

      {/* 1. HEADER SECTION */}
      <div className="space-y-4 border-b border-brand-border pb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-zinc-500 hover:text-brand-neon transition-colors duration-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Voltar à Central</span>
        </Link>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
            <FolderOpen className="h-3 w-3 text-brand-neon" />
            <span>Filtro de Categoria</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
            {catInfo.nome}
          </h1>
          <p className="text-zinc-400 font-sans text-sm sm:text-base max-w-3xl leading-relaxed">
            {catInfo.descricao}
          </p>
        </div>
      </div>

      {/* Empty State check */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-20 bg-brand-card/20 border border-brand-border rounded-lg space-y-4">
          <FolderOpen className="h-12 w-12 text-zinc-600 mx-auto" />
          <h2 className="font-display text-2xl text-white uppercase">Nenhuma Análise Disponível</h2>
          <p className="text-zinc-400 text-sm font-sans max-w-md mx-auto">
            Nosso laboratório ainda está catalogando novos lotes de <strong className="text-white">{catInfo.nome}</strong>. Cadastre sua sugestão em nossas redes para priorizarmos o teste físico.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark font-mono text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded transition-all duration-200"
          >
            Ver Outras Categorias
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 2. CONTROLS BAR (Sorting toggle) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-brand-card/40 border border-brand-border p-4 rounded-lg">
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
              <SlidersHorizontal className="h-4 w-4 text-brand-neon" />
              <span>ORDENAR CATÁLOGO:</span>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setSortBy("recentes")}
                className={`flex-1 sm:flex-initial px-4 py-2 font-mono text-[11px] uppercase tracking-wider font-bold rounded border transition-all duration-200 ${
                  sortBy === "recentes"
                    ? "bg-brand-neon text-brand-dark border-brand-neon"
                    : "bg-black/30 text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                Mais Recentes
              </button>
              <button
                onClick={() => setSortBy("nota")}
                className={`flex-1 sm:flex-initial px-4 py-2 font-mono text-[11px] uppercase tracking-wider font-bold rounded border transition-all duration-200 ${
                  sortBy === "nota"
                    ? "bg-brand-neon text-brand-dark border-brand-neon"
                    : "bg-black/30 text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                Melhores Notas
              </button>
            </div>
          </div>

          {/* 3. RESPONSIVE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedReviews.map((review) => {
              const mediaValue = getAverageRating(review).toFixed(1);

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
                        <span className="font-display text-sm text-white">{mediaValue}</span>
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

                    {/* Veredito flash tag */}
                    <div className="p-3 bg-brand-dark/50 border-l-2 border-brand-neon rounded-r font-sans text-xs">
                      <span className="font-mono text-[8px] text-brand-neon uppercase font-bold block mb-0.5">Veredito Flash:</span>
                      <p className="text-zinc-200 font-medium line-clamp-2">{review.veredito}</p>
                    </div>

                    {/* Micro list of top pros inside cards */}
                    <div className="pt-2 border-t border-zinc-900">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase block tracking-widest mb-1.5">PROS PRINCIPAIS</span>
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
                      <span>Ver Relatório</span>
                      <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
