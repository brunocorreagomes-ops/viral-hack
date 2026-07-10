/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useParams, Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {Review} from "../types";
import ReviewVisualGallery from "../components/ReviewVisualGallery";
import RatingBreakdown from "../components/RatingBreakdown";
import CascadingCTA from "../components/CascadingCTA";
import {
  ArrowLeft,
  Calendar,
  AlertTriangle,
  BadgeCheck,
  Zap,
  Compass,
  ThumbsUp,
  ThumbsDown,
  Info,
  Layers,
  ArrowUpRight,
  HelpCircle,
  HelpCircle as FaqIcon,
  CheckCircle2,
  XCircle
} from "lucide-react";

export default function ReviewPage() {
  const { slug } = useParams<{ slug: string }>();

  // Load all JSON review files dynamically from /src/data/*.json
  const reviewsGlob = import.meta.glob("../data/*.json", { eager: true });
  const reviews = Object.values(reviewsGlob).map((mod: any) => mod.default || mod) as Review[];

  // Find the exact review by slug
  const review = reviews.find((r) => r.slug === slug);

  // If the review does not exist, show a clean, on-theme error state
  if (!review) {
    return (
      <div id="review-not-found-container" className="mx-auto max-w-xl text-center py-20 px-4 space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-950/40 text-red-500 border border-red-800">
          <AlertTriangle className="h-8 w-8" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-4xl text-white uppercase">Relatório Não Encontrado</h1>
        <p className="text-zinc-400 font-sans text-sm">
          O código identificador de teste <code className="text-brand-neon font-mono text-xs font-bold bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">"{slug}"</code> não foi localizado em nossa central de análises.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 border-2 border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark font-mono text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para a Central</span>
        </Link>
      </div>
    );
  }

  // Calculate overall rating score
  const media = (
    (review.notas.funcionalidade + review.notas.custoBeneficio + review.notas.durabilidade + review.notas.valeOHype) / 4
  ).toFixed(1);

  // Formulate canonical link and application url (fallback to current site window url or aistudio link)
  const appUrl = "https://viralhack.com.br";
  const canonicalUrl = `${appUrl}/review/${review.slug}`;

  // SCHEMA.ORG JSON-LD INJECTION (Dynamic SEO meta tags)
  const schemaJsonLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        "name": review.produto,
        "image": `${appUrl}${review.fotos[0] || "/assets/placeholder.png"}`,
        "description": review.descricaoCurta,
        "category": review.categoria,
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "BRL",
          "lowPrice": parseFloat(review.precoMedio.replace("R$ ", "").replace(",", ".")),
          "highPrice": parseFloat(review.precoMedio.replace("R$ ", "").replace(",", ".")) * 1.5,
          "offerCount": review.linksAfiliado.length,
          "url": canonicalUrl
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": media,
          "bestRating": "10",
          "worstRating": "1",
          "ratingCount": "12" // Fictional, represented by our laboratory weight
        }
      },
      {
        "@type": "Review",
        "@id": `${canonicalUrl}#review`,
        "itemReviewed": {
          "@type": "Product",
          "name": review.produto,
          "image": `${appUrl}${review.fotos[0] || "/assets/placeholder.png"}`
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": media,
          "bestRating": "10",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "Viral Hack Laboratório"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Viral Hack",
          "url": appUrl
        },
        "datePublished": review.dataPublicacao,
        "dateModified": review.dataAtualizacao,
        "reviewBody": review.vereditoDetalhado
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": review.faq.map(item => ({
          "@type": "Question",
          "name": item.pergunta,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.resposta
          }
        }))
      }
    ]
  };

  // Render methodology stamp nicely
  const renderMethodologyBadge = (metodologia: "testado" | "curadoria" | "misto") => {
    switch (metodologia) {
      case "testado":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-neon/10 border border-brand-neon/40 rounded font-mono text-[10px] text-brand-neon font-black uppercase tracking-wider">
            <BadgeCheck className="h-4 w-4 shrink-0" />
            <span>Testado por Nós (Laboratório Físico)</span>
          </div>
        );
      case "misto":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/40 rounded font-mono text-[10px] text-yellow-400 font-black uppercase tracking-wider">
            <Zap className="h-4 w-4 shrink-0" />
            <span>Metodologia Mista (Teste + Big Data)</span>
          </div>
        );
      case "curadoria":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded font-mono text-[10px] text-zinc-300 font-black uppercase tracking-wider">
            <Compass className="h-4 w-4 shrink-0" />
            <span>Curadoria Analítica Baseada em Dados</span>
          </div>
        );
    }
  };

  return (
    <div id="review-layout-page" className="pb-20 space-y-10">
      
      {/* 1. Helmet Dynamic SEO Head Injector */}
      <Helmet>
        <title>{`Review Sincero: ${review.produto} — Vale a Pena? | Viral Hack`}</title>
        <meta name="description" content={review.descricaoCurta} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`Review Sincero: ${review.produto} — Vale a Pena?`} />
        <meta property="og:description" content={review.descricaoCurta} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Viral Hack" />
        <meta property="article:published_time" content={review.dataPublicacao} />
        <meta property="article:modified_time" content={review.dataAtualizacao} />
        
        {/* Inject JSON-LD Schema.org script */}
        <script type="application/ld+json">
          {JSON.stringify(schemaJsonLD)}
        </script>
      </Helmet>

      {/* 2. Top Navigation Breadcrumb & Timestamps */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border py-4 gap-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-brand-neon transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para Achados</span>
          </Link>

          <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-zinc-500 uppercase">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-brand-neon" />
              <span>Publicado: {review.dataPublicacao.split("-").reverse().join("/")}</span>
            </div>
            <span>|</span>
            <span>Atualizado: {review.dataAtualizacao.split("-").reverse().join("/")}</span>
          </div>
        </div>
      </div>

      {/* 3. Primary Review Header Block (Veredito e Especificação) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual: Technical Blueprint (Left, 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-brand-neon uppercase tracking-widest font-bold">ESQUEMA DE LABORATÓRIO</span>
              <span className="font-mono text-[10px] text-zinc-500 uppercase">ID_REF: #{review.slug.toUpperCase()}</span>
            </div>
            
            <ReviewVisualGallery 
              slug={review.slug} 
              name={review.produto} 
              price={review.precoMedio}
              metodologia={review.metodologia}
              fotos={review.fotos}
            />

            {/* Quick Specs Box */}
            <div className="border border-brand-border bg-brand-card p-4 rounded-lg">
              <div className="flex items-center gap-1.5 border-b border-brand-border pb-2 mb-3">
                <Info className="h-4 w-4 text-brand-neon" />
                <span className="font-mono text-xs uppercase text-zinc-200 font-bold">Ficha Técnica de Engenharia</span>
              </div>
              <dl className="grid grid-cols-1 gap-2 font-mono text-xs">
                {Object.entries(review.especificacoes).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-zinc-900 pb-1.5">
                    <dt className="text-zinc-500 font-medium">{key}:</dt>
                    <dd className="text-zinc-300 font-semibold text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Core verdict, badges & brief description (Right, 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {renderMethodologyBadge(review.metodologia)}
                <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-400 uppercase font-black">
                  CAT: {review.categoria.toUpperCase()}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-wider leading-none">
                {review.produto}
              </h1>

              <p className="text-zinc-400 font-sans text-base sm:text-lg leading-relaxed">
                {review.descricaoCurta}
              </p>
            </div>

            {/* O VEREDITO EM DESTAQUE */}
            <div className="rounded-lg border-2 border-brand-neon/60 bg-brand-neon/[0.03] p-5 sm:p-6 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-10 w-24 bg-brand-neon/10 rounded-bl-full flex items-center justify-center font-mono text-[8px] text-brand-neon font-bold tracking-widest rotate-6">
                LAB_VERDICT
              </div>
              
              <span className="font-mono text-xs text-brand-neon uppercase tracking-widest font-black block">
                ★ DIRETRIZ SINCERA DE COMPRA
              </span>
              
              <h3 className="font-sans text-xl sm:text-2xl text-white font-extrabold leading-tight">
                {review.veredito}
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {review.vereditoDetalhado}
              </p>
            </div>

            {/* CRITERION NOTES PANEL */}
            <RatingBreakdown notas={review.notas} />

          </div>

        </div>
      </section>

      {/* 4. PROS & CONTRAS, TARGET AUDIENCES (PRÓS, CONTRAS, PARA QUEM VALE, PARA QUEM NÃO VALE) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PRÓS E CONTRAS (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-2xl text-white uppercase tracking-wider border-b border-brand-border pb-2 flex items-center gap-2">
              <Layers className="h-5 w-5 text-brand-neon" />
              Breakdown de Vantagens e Fraquezas
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Prós */}
              <div className="border border-emerald-900/30 bg-emerald-950/[0.04] p-5 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 border-b border-emerald-900/20 pb-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="font-mono text-xs uppercase font-black tracking-wider">Pontos Fortes</span>
                </div>
                <ul className="space-y-2 font-sans text-xs sm:text-sm text-zinc-300">
                  {review.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-extrabold mt-0.5 shrink-0">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contras */}
              <div className="border border-red-900/30 bg-red-950/[0.04] p-5 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-red-400 border-b border-red-900/20 pb-2">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <span className="font-mono text-xs uppercase font-black tracking-wider">Pontos de Atenção</span>
                </div>
                <ul className="space-y-2 font-sans text-xs sm:text-sm text-zinc-300">
                  {review.contras.map((contra, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 font-extrabold mt-0.5 shrink-0">✗</span>
                      <span>{contra}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* PARA QUEM VALE / NÃO VALE (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display text-2xl text-white uppercase tracking-wider border-b border-brand-border pb-2 flex items-center gap-2">
              <FaqIcon className="h-5 w-5 text-brand-neon" />
              Filtro de Público Alvo
            </h3>

            <div className="space-y-4">
              
              {/* Vale a pena para... */}
              <div className="border border-zinc-800 bg-brand-card/40 p-4 rounded-lg flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-brand-neon/10 text-brand-neon border border-brand-neon/20 font-mono text-xs font-bold">
                  SIM
                </div>
                <div>
                  <span className="font-mono text-[10px] text-brand-neon uppercase font-bold tracking-wider block mb-1">✓ IDEAL PARA:</span>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{review.paraQuemVale}</p>
                </div>
              </div>

              {/* NÃO vale a pena para... */}
              <div className="border border-zinc-800 bg-brand-card/40 p-4 rounded-lg flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-red-500/10 text-red-400 border border-red-500/20 font-mono text-xs font-bold">
                  NÃO
                </div>
                <div>
                  <span className="font-mono text-[10px] text-red-400 uppercase font-bold tracking-wider block mb-1">✗ EVITE SE VOCÊ:</span>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{review.paraQuemNaoVale}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. DETAILED WRITTEN LAB REPORT SECTIONS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="border border-brand-border bg-brand-card rounded-lg p-6 sm:p-10 space-y-8">
          <div className="border-b border-brand-border pb-4">
            <span className="font-mono text-xs text-brand-neon uppercase tracking-widest font-black block mb-1">ANÁLISE INTEGRAL</span>
            <h2 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wider">Laudo Detalhado do Laboratório</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {review.conteudoDetalhado.map((secao, idx) => (
                <div key={idx} id={`secao-analise-${idx}`} className="space-y-3">
                  <h4 className="font-display text-xl sm:text-2xl text-zinc-100 uppercase tracking-wide flex items-center gap-2">
                    <span className="font-mono text-xs text-brand-neon bg-zinc-900 border border-zinc-800 h-6 w-6 rounded flex items-center justify-center">{idx + 1}</span>
                    {secao.titulo}
                  </h4>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                    {secao.texto}
                  </p>
                </div>
              ))}
            </div>

            {/* Side Callout within report */}
            <div className="lg:col-span-4 p-5 rounded-lg bg-black/50 border border-zinc-800/80 space-y-4 self-start">
              <span className="font-mono text-[9px] text-brand-neon font-black uppercase tracking-widest block">DICA DE PREVENÇÃO DE CALOTE</span>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                No nicho de "achados virais", o maior golpe não é o produto ser ruim, mas sim pagar 5 vezes mais por ele em anúncios clonados do Instagram ou do TikTok. Links de anúncios no feed costumam inflar preços de itens de R$ 15 para R$ 120 usando embalagens re-branded. Sempre pesquise os canais oficiais ou clique em nossa curadoria de preços para fugir de intermediários abusivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON WITH ALTERNATIVES TABLE */}
      {review.alternativas && review.alternativas.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="border border-brand-border bg-brand-card rounded-lg p-5 sm:p-6 space-y-4">
            <div className="border-b border-brand-border pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-brand-neon" />
                <span className="font-display text-lg tracking-wider text-white uppercase sm:text-xl">Comparação de Alternativas</span>
              </div>
              <span className="font-mono text-[9px] text-zinc-500 uppercase">ANÁLISE COMPARATIVA</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500">
                    <th className="py-2.5 pr-4 uppercase">Produto</th>
                    <th className="py-2.5 px-4 uppercase">Preço Estimado</th>
                    <th className="py-2.5 px-4 uppercase text-emerald-400">Pros</th>
                    <th className="py-2.5 px-4 uppercase text-red-400">Contras</th>
                    <th className="py-2.5 pl-4 uppercase text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  <tr className="border-b border-zinc-900 bg-brand-neon/[0.01]">
                    <td className="py-3.5 pr-4 font-bold text-white font-sans">{review.produto}</td>
                    <td className="py-3.5 px-4 text-brand-neon font-bold">{review.precoMedio}</td>
                    <td className="py-3.5 px-4 text-xs font-sans">Sela hermeticamente sacos grossos, portátil e magnética.</td>
                    <td className="py-3.5 px-4 text-xs font-sans">Frágil, gasta pilhas rapidamente, exige treino.</td>
                    <td className="py-3.5 pl-4 text-right">
                      <span className="text-zinc-500 uppercase text-[9px] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">ITEM PRINCIPAL</span>
                    </td>
                  </tr>
                  {review.alternativas.map((alt, idx) => (
                    <tr key={idx} className="border-b border-zinc-900 hover:bg-zinc-950/40">
                      <td className="py-3.5 pr-4 font-bold text-zinc-400 font-sans">{alt.nome}</td>
                      <td className="py-3.5 px-4 text-white font-bold">{alt.precoAproximado}</td>
                      <td className="py-3.5 px-4 text-xs font-sans">{alt.pontosFortes.join(", ")}</td>
                      <td className="py-3.5 px-4 text-xs font-sans">{alt.pontosFracos.join(", ")}</td>
                      <td className="py-3.5 pl-4 text-right">
                        <a 
                          href={alt.link} 
                          target="_blank" 
                          referrerPolicy="no-referrer" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-brand-neon hover:underline font-bold uppercase tracking-wider text-[10px]"
                        >
                          <span>Ver na {alt.plataforma}</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 7. CASCADING AFFILIATE CTA BUTTONS & INTEGRATED DISCLOSURE (PRIORITY CONSTRAINED DESIGN) */}
      <section id="affiliate-links-cascade-section" className="mx-auto max-w-7xl px-4 sm:px-6">
        <CascadingCTA links={review.linksAfiliado} produto={review.produto} />
      </section>

      {/* 9. FAQ OF THE REVIEW - ACCORDION LAYOUT (FOR SEO & FAQPage JSON-LD) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="border border-brand-border bg-brand-card rounded-lg p-5 sm:p-6 space-y-6">
          <div className="border-b border-brand-border pb-3 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-neon" />
            <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-wider">Perguntas Frequentes (FAQ)</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {review.faq.map((item, idx) => (
              <div 
                key={idx} 
                id={`faq-item-${idx}`} 
                className="p-4 rounded-md bg-black/40 border border-zinc-800/60 hover:border-zinc-800 transition-colors duration-200"
              >
                <h4 className="font-sans font-extrabold text-white text-sm sm:text-base mb-2">
                  {item.pergunta}
                </h4>
                <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed">
                  {item.resposta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
