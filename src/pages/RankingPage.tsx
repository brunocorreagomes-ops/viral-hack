/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useParams, Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {Review} from "../types";
import CascadingCTA from "../components/CascadingCTA";
import {
  Compass,
  BadgeCheck,
  Zap,
  ArrowLeft,
  Award,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Check,
  Plus
} from "lucide-react";

// Types for additional products in rankings
interface RankItem {
  posicao: number;
  slug?: string;
  produto: string;
  precoMedio: string;
  notaGeral: number;
  metodologia: "testado" | "curadoria" | "misto";
  pros: string[];
  contras: string[];
  linksAfiliado: { plataforma: any; url: string; prioridade: number; prazoEntrega?: string }[];
  isFeaturedReview: boolean;
}

// Map slug to rankings lists
const RANKINGS_DATA: {
  [key: string]: {
    titulo: string;
    descricao: string;
    introducao: string;
    categoria: string;
    items: RankItem[];
  };
} = {
  cozinha: {
    titulo: "Melhores Achados de Cozinha de 2026",
    categoria: "cozinha",
    descricao: "O ranking definitivo dos utilitários de cozinha que viralizaram e realmente entregam o que prometem, analisados sob rigor de estresse físico.",
    introducao: "Antes de comprar aquele acessório que promete revolucionar sua cozinha no feed das redes sociais, consulte nossa auditoria de laboratório. Colocamos as mini-seladoras, processadores portáteis e clipes à prova de cozimento diário para classificar os melhores achados de cozinha.",
    items: [
      {
        posicao: 1,
        slug: "mini-seladora-portatil",
        produto: "Mini Seladora de Embalagens Portátil",
        precoMedio: "R$ 29,90",
        notaGeral: 8.0,
        metodologia: "testado",
        pros: [
          "Veda sacos de salgadinhos e grãos de forma 100% hermética",
          "Imã traseiro para fixar direto na porta da geladeira",
          "Super barata e compacta"
        ],
        contras: [
          "Exige pilhas AA alcalinas premium (Duracell)",
          "Requer prática para passar na velocidade correta"
        ],
        linksAfiliado: [
          {
            plataforma: "mercadolivre",
            url: "https://lista.mercadolivre.com.br/mini-seladora-portatil",
            prioridade: 1,
            prazoEntrega: "Chega amanhã na maioria das capitais"
          },
          {
            plataforma: "amazon",
            url: "https://www.amazon.com.br/s?k=mini+seladora+portatil+de+embalagem",
            prioridade: 2,
            prazoEntrega: "2-4 dias (Frete Prime)"
          }
        ],
        isFeaturedReview: true
      },
      {
        posicao: 2,
        produto: "Mini Processador de Alimentos USB (250ml)",
        precoMedio: "R$ 39,90",
        notaGeral: 7.2,
        metodologia: "curadoria",
        pros: [
          "Bateria interna recarregável por USB com excelente autonomia",
          "Lâminas triplas afiadas que trituram alho e cebola em 5 segundos",
          "Copo acrílico lavável sem risco de choque elétrico"
        ],
        contras: [
          "Capacidade pequena de 250ml",
          "Motor trava se colocar pedaços muito grandes de carne ou legumes duros"
        ],
        linksAfiliado: [
          {
            plataforma: "shopee",
            url: "https://shopee.com.br/search?keyword=mini%20processador%20de%20alimentos%20usb",
            prioridade: 1,
            prazoEntrega: "4-7 dias (Vendedores nacionais)"
          },
          {
            plataforma: "amazon",
            url: "https://www.amazon.com.br/s?k=mini+processador+alimentos+usb",
            prioridade: 2,
            prazoEntrega: "3-5 dias"
          }
        ],
        isFeaturedReview: false
      },
      {
        posicao: 3,
        produto: "Clipes de Vedação Plásticos (Pegador)",
        precoMedio: "R$ 12,00 (pacote com 10)",
        notaGeral: 6.0,
        metodologia: "curadoria",
        pros: [
          "Indestrutível: plástico simples que não quebra",
          "Operação instantânea em 1 segundo",
          "Não consome energia ou pilhas"
        ],
        contras: [
          "Não veda de forma totalmente hermética",
          "Ocupa bastante espaço na gaveta de talheres"
        ],
        linksAfiliado: [
          {
            plataforma: "amazon",
            url: "https://www.amazon.com.br/s?k=clipes+de+vedacao+plastico",
            prioridade: 1,
            prazoEntrega: "Frete Prime grátis"
          }
        ],
        isFeaturedReview: false
      }
    ]
  },
  organizacao: {
    titulo: "Melhores Acessórios de Organização e Escritório de 2026",
    categoria: "organizacao",
    descricao: "O veredito sobre as ferramentas de organização que colocam ordem no caos dos cabos, telas e mochilas, auditados com base em uso corporativo de longo prazo.",
    introducao: "Trabalhar em um ambiente bagunçado mina a produtividade. Mas será que os organizadores virais do TikTok valem a compra? Testamos e avaliamos os limpadores de tela, suportes e organizadores de cabos sob critérios de robustez real.",
    items: [
      {
        posicao: 1,
        produto: "Organizador de Cabos de Silicone Magnético",
        precoMedio: "R$ 29,90",
        notaGeral: 8.2,
        metodologia: "curadoria",
        pros: [
          "Base adesiva 3M de alta fixação para fixar em mesas de madeira ou vidro",
          "Presilhas magnéticas individuais mantêm os cabos no lugar sem esforço",
          "Evita que cabos de carregador caiam atrás da escrivaninha"
        ],
        contras: [
          "Ímãs podem soltar se o cabo for extremamente grosso",
          "Quantidade limitada a 5 presilhas por kit"
        ],
        linksAfiliado: [
          {
            plataforma: "amazon",
            url: "https://www.amazon.com.br/s?k=organizador+de+cabos+silicone+magnetico",
            prioridade: 1,
            prazoEntrega: "3-5 dias"
          },
          {
            plataforma: "aliexpress",
            url: "https://pt.aliexpress.com/w/wholesale-magnetic-cable-organizer-silicone.html",
            prioridade: 2,
            prazoEntrega: "8-12 dias"
          }
        ],
        isFeaturedReview: false
      },
      {
        posicao: 2,
        slug: "limpador-telas-2em1",
        produto: "Limpador de Telas Spray e Microfibra 2 em 1",
        precoMedio: "R$ 19,90",
        notaGeral: 7.7,
        metodologia: "misto",
        pros: [
          "Bloco integrado unindo spray limpador e flanela de microfibra",
          "Super compacto para carregar no bolso da mochila",
          "Frasco interno recarregável"
        ],
        contras: [
          "Reservatório pequeno de 10ml exige recarga constante",
          "Microfibra colada dificulta a secagem rápida após lavagem"
        ],
        linksAfiliado: [
          {
            plataforma: "shopee",
            url: "https://shopee.com.br/search?keyword=limpador%20de%20telas%202%20em%201",
            prioridade: 1,
            prazoEntrega: "4-8 dias (Nacional)"
          },
          {
            plataforma: "amazon",
            url: "https://www.amazon.com.br/s?k=limpador+de+telas+2+em+1+spray",
            prioridade: 2,
            prazoEntrega: "3-5 dias"
          }
        ],
        isFeaturedReview: true
      },
      {
        posicao: 3,
        produto: "Kit Limpa Telas Tradicional (Frasco + Flanela)",
        precoMedio: "R$ 24,90",
        notaGeral: 6.5,
        metodologia: "curadoria",
        pros: [
          "Frasco grande de 120ml que dura anos na gaveta",
          "Flanela de microfibra comum separada e fácil de lavar e secar",
          "Remove gorduras teimosas perfeitamente"
        ],
        contras: [
          "Impossível carregar de forma prática na mochila ou bolso",
          "Tampa do frasco tende a vazar se ficar deitado"
        ],
        linksAfiliado: [
          {
            plataforma: "amazon",
            url: "https://www.amazon.com.br/s?k=kit+limpa+telas+flanela",
            prioridade: 1,
            prazoEntrega: "Frete Prime disponível"
          }
        ],
        isFeaturedReview: false
      }
    ]
  },
  tech: {
    titulo: "Melhores Gadgets de Iluminação e Tecnologia de 2026",
    categoria: "tech",
    descricao: "O comparativo definitivo dos projetores de nebulosas e fitas inteligentes que dominam os setups gamers, classificando por custo e imersão visual.",
    introducao: "Luzes coloridas transformam qualquer quarto sem graça em um setup digno de streamer. Colocamos os projetores mais desejados do momento e fitas de LED inteligentes frente a frente para separar o brilho real da propaganda frágil.",
    items: [
      {
        posicao: 1,
        slug: "projetor-astronauta-galaxy",
        produto: "Luminária Projetor de Galáxia Astronauta",
        precoMedio: "R$ 69,90",
        notaGeral: 8.8,
        metodologia: "curadoria",
        pros: [
          "Efeito de nebulosa em movimento extremamente brilhante e colorido",
          "Cabeça magnética giratória 360° direciona para teto ou paredes",
          "Temporizador de desligamento automático integrado"
        ],
        contras: [
          "Laser verde de estrelas é muito forte para olhar diretamente",
          "O motor interno emite um ruído sutil de rotação"
        ],
        linksAfiliado: [
          {
            plataforma: "amazon",
            url: "https://www.amazon.com.br/s?k=projetor+astronauta+galaxia",
            prioridade: 1,
            prazoEntrega: "2-4 dias (Frete Prime grátis)"
          },
          {
            plataforma: "mercadolivre",
            url: "https://lista.mercadolivre.com.br/projetor-astronauta-galaxia",
            prioridade: 2,
            prazoEntrega: "Chega amanhã nas capitais"
          }
        ],
        isFeaturedReview: true
      },
      {
        posicao: 2,
        produto: "Fita LED RGB Inteligente Wi-Fi (5 metros)",
        precoMedio: "R$ 59,90",
        notaGeral: 8.5,
        metodologia: "curadoria",
        pros: [
          "Integração perfeita com Alexa e Google Home por comando de voz",
          "Ajuste infinito de cores pelo smartphone com sincronização musical",
          "Adesivo traseiro de alta fixação facilita instalação"
        ],
        contras: [
          "Dificuldade de conectar na rede Wi-Fi de 5GHz (só aceita 2.4GHz)",
          "A fita não pode ser emendada facilmente sem conectores extras"
        ],
        linksAfiliado: [
          {
            plataforma: "amazon",
            url: "https://www.amazon.com.br/s?k=fita+led+rgb+inteligente+wifi",
            prioridade: 1,
            prazoEntrega: "3-5 dias"
          }
        ],
        isFeaturedReview: false
      },
      {
        posicao: 3,
        produto: "Projetor Globo de Galáxia e Umidificador",
        precoMedio: "R$ 45,00",
        notaGeral: 7.0,
        metodologia: "curadoria",
        pros: [
          "Dupla função: ilumina o quarto e umidifica o ar seco",
          "Formato redondo de globo amigável e fofo",
          "Super barato"
        ],
        contras: [
          "Área de projeção é pequena e o efeito da nebulosa é estático",
          "Sem cabeça móvel ou articulação magnética de direção"
        ],
        linksAfiliado: [
          {
            plataforma: "amazon",
            url: "https://www.amazon.com.br/s?k=projetor+globo+galaxia+umidificador",
            prioridade: 1,
            prazoEntrega: "Frete Prime disponível"
          }
        ],
        isFeaturedReview: false
      }
    ]
  }
};

export default function RankingPage() {
  const { slug } = useParams<{ slug: string }>();
  const rankingKey = slug?.toLowerCase() || "";

  // Fallback to kitchen ranking if route is general
  const activeRanking = RANKINGS_DATA[rankingKey] || RANKINGS_DATA.cozinha;

  // Render methodology badge nicely
  const renderMethodologyBadge = (metodologia: "testado" | "curadoria" | "misto") => {
    switch (metodologia) {
      case "testado":
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-neon/10 border border-brand-neon/30 rounded font-mono text-[9px] text-brand-neon font-black uppercase tracking-wider">
            <BadgeCheck className="h-3.5 w-3.5 shrink-0" />
            <span>Testado Real</span>
          </div>
        );
      case "misto":
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-yellow-400/10 border border-yellow-400/30 rounded font-mono text-[9px] text-yellow-400 font-black uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5 shrink-0" />
            <span>Misto</span>
          </div>
        );
      case "curadoria":
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded font-mono text-[9px] text-zinc-300 font-black uppercase tracking-wider">
            <Compass className="h-3.5 w-3.5 shrink-0" />
            <span>Curadoria</span>
          </div>
        );
    }
  };

  // SEO Canonical and schema URLs
  const appUrl = "https://viralhack.com.br";
  const canonicalUrl = `${appUrl}/rankings/${rankingKey}`;

  // Schema.org ItemList injection
  const schemaItemListJsonLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": activeRanking.titulo,
    "description": activeRanking.descricao,
    "url": canonicalUrl,
    "numberOfItems": activeRanking.items.length,
    "itemListElement": activeRanking.items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": item.produto,
        "description": item.pros[0],
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "BRL",
          "lowPrice": parseFloat(item.precoMedio.replace("R$ ", "").replace(",", ".")) || 20.0,
          "highPrice": (parseFloat(item.precoMedio.replace("R$ ", "").replace(",", ".")) || 20.0) * 1.5,
          "offerCount": item.linksAfiliado.length
        }
      }
    }))
  };

  return (
    <div id="ranking-page-container" className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      <Helmet>
        <title>{`${activeRanking.titulo} | Guia de Compra Sincero`}</title>
        <meta name="description" content={activeRanking.descricao} />
        {/* Schema.org FAQPage/ItemList JSON-LD tag injection */}
        <script type="application/ld+json">
          {JSON.stringify(schemaItemListJsonLD)}
        </script>
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-neon/10 border border-brand-neon/20 font-mono text-[10px] text-brand-neon font-bold uppercase tracking-widest">
            <Award className="h-3.5 w-3.5 text-brand-neon" />
            <span>Guia Comparativo de Elite [GEO-Optimized]</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
            {activeRanking.titulo}
          </h1>
          <p className="text-zinc-400 font-sans text-sm sm:text-base max-w-3xl leading-relaxed">
            {activeRanking.introducao}
          </p>
        </div>
      </div>

      {/* 2. SECURITY SYSTEM DISCLAIMER */}
      <div className="p-4 rounded-lg bg-zinc-950/80 border border-zinc-800 flex gap-3.5 items-start">
        <ShieldCheck className="h-5 w-5 text-brand-neon shrink-0 mt-0.5" />
        <div className="font-mono text-[11px] text-zinc-400 leading-relaxed">
          <span className="text-white font-bold block uppercase mb-1">CÓDIGO DE SINCERIDADE LAB #RA-2026:</span>
          Todos os links de afiliado listados abaixo abrem as lojas oficiais (Amazon, Mercado Livre). Nosso algoritmo rastreia vendedores com reputação verde e melhores prazos de entrega automáticos. O aviso de transparência comercial é inserido em 100% das opções de compra como barreira editorial de segurança.
        </div>
      </div>

      {/* 3. COMPARISON TABLE (Desktop Only) / CARDS (Mobile Only) */}
      <div className="space-y-8">
        
        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto border border-brand-border rounded-lg bg-brand-card">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-brand-border bg-black/40 text-zinc-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="py-4 px-6 text-center w-16">Rank</th>
                <th className="py-4 px-6 w-80">Produto</th>
                <th className="py-4 px-6 text-center w-28">Score</th>
                <th className="py-4 px-6 w-36">Preço Médio</th>
                <th className="py-4 px-6 w-44">Metodologia</th>
                <th className="py-4 px-6 w-96">Análise Rápida (Prós/Contras)</th>
                <th className="py-4 px-6 w-72">Onde Encontrar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-sm text-zinc-300">
              {activeRanking.items.map((item, idx) => (
                <tr
                  key={idx}
                  className={`transition-all duration-150 hover:bg-black/20 ${
                    item.isFeaturedReview ? "bg-brand-neon/[0.01]" : ""
                  }`}
                >
                  {/* Position */}
                  <td className="py-6 px-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-display text-4xl text-white font-bold leading-none block">
                        #{item.posicao}
                      </span>
                      {item.posicao === 1 && (
                        <span className="font-mono text-[8px] bg-brand-neon text-brand-dark px-1.5 py-0.5 rounded font-black tracking-widest mt-1 uppercase">
                          MELHOR
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Name and link if available */}
                  <td className="py-6 px-6">
                    <div className="space-y-1">
                      <span className="text-zinc-100 font-bold text-base block uppercase font-sans tracking-wide">
                        {item.produto}
                      </span>
                      {item.slug ? (
                        <Link
                          to={`/review/${item.slug}`}
                          className="inline-flex items-center gap-1 text-[10px] text-brand-neon font-mono uppercase font-black hover:underline"
                        >
                          <span>Ler Review Detalhada</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      ) : (
                        <span className="text-[10px] text-zinc-500 font-mono uppercase block">
                          Ficha Técnica Curada
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="py-6 px-6 text-center">
                    <div className="inline-flex items-baseline gap-0.5 font-mono text-base font-black text-brand-neon bg-black/60 border border-zinc-800 px-2.5 py-1 rounded">
                      <span className="font-display text-lg text-white">{item.notaGeral.toFixed(1)}</span>
                      <span className="text-[10px] text-zinc-500 font-normal">/10</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-6 px-6 font-mono text-xs text-white font-bold">
                    {item.precoMedio}
                  </td>

                  {/* Methodology */}
                  <td className="py-6 px-6">
                    {renderMethodologyBadge(item.metodologia)}
                  </td>

                  {/* Pros & Contras */}
                  <td className="py-6 px-6 space-y-3">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-brand-neon uppercase font-bold tracking-widest block">PRÓS</span>
                      <ul className="space-y-1">
                        {item.pros.map((p, i) => (
                          <li key={i} className="flex items-start gap-1 text-xs text-zinc-300">
                            <Check className="h-3 w-3 text-brand-neon shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-red-400 uppercase font-bold tracking-widest block">CONTRAS</span>
                      <ul className="space-y-1">
                        {item.contras.map((c, i) => (
                          <li key={i} className="flex items-start gap-1 text-xs text-zinc-400">
                            <span className="text-red-500 font-bold shrink-0">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>

                  {/* Embedded CascadingCTA */}
                  <td className="py-6 px-6">
                    <div className="w-64 scale-[0.9] origin-top-left -my-4">
                      <CascadingCTA links={item.linksAfiliado} produto={item.produto} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="lg:hidden space-y-6">
          {activeRanking.items.map((item, idx) => (
            <div
              key={idx}
              className={`border rounded-lg overflow-hidden bg-brand-card p-5 space-y-5 flex flex-col justify-between ${
                item.isFeaturedReview ? "border-brand-neon/30 bg-brand-neon/[0.01]" : "border-brand-border"
              }`}
            >
              {/* Header inside mobile card */}
              <div className="flex justify-between items-start border-b border-brand-border pb-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-4xl text-white font-bold leading-none block">
                      #{item.posicao}
                    </span>
                    {renderMethodologyBadge(item.metodologia)}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl text-zinc-100 uppercase tracking-wide">
                    {item.produto}
                  </h3>
                </div>

                <div className="flex items-baseline gap-0.5 font-mono text-sm font-black text-brand-neon bg-black/60 border border-zinc-800 px-2 py-0.5 rounded">
                  <span className="font-display text-base text-white">{item.notaGeral.toFixed(1)}</span>
                  <span className="text-[9px] text-zinc-500 font-normal">/10</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-500 uppercase">Preço Estimado</span>
                <span className="text-white font-bold text-sm">{item.precoMedio}</span>
              </div>

              {/* Pros & Contras */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-brand-neon uppercase font-bold tracking-widest block">PRÓS</span>
                  <ul className="space-y-1.5">
                    {item.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-brand-neon shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-red-400 uppercase font-bold tracking-widest block">CONTRAS</span>
                  <ul className="space-y-1.5">
                    {item.contras.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-400">
                        <span className="text-red-500 font-bold shrink-0">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Review Link inside card */}
              {item.slug && (
                <div className="pt-2">
                  <Link
                    to={`/review/${item.slug}`}
                    className="flex items-center justify-center gap-1.5 py-3 border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 rounded font-mono text-xs text-zinc-300 uppercase font-bold tracking-wider"
                  >
                    <span>Ler Análise Crítica Completa</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              {/* Embedded CascadingCTA for Mobile */}
              <div className="border-t border-brand-border pt-4">
                <span className="font-mono text-[9px] text-zinc-500 uppercase block tracking-widest mb-3 text-center">COMPRAR DO VENDEDOR RECOMENDADO</span>
                <CascadingCTA links={item.linksAfiliado} produto={item.produto} />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 4. METHODOLOGY DEEP LINK */}
      <section className="rounded-lg border border-brand-border bg-black/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-2">
          <span className="font-mono text-[10px] text-brand-neon uppercase tracking-wider block font-bold">★ GARANTIA EDITORIAL</span>
          <h4 className="font-display text-2xl text-white uppercase tracking-wide">Como é calculada a nota geral?</h4>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl font-sans leading-relaxed">
            Nenhum ranking é feito com base em preferência pessoal ou arranjos de comissão paralela. As pontuações derivam de um peso de ponderação fixo: 35% Funcionalidade, 25% Custo-Benefício, 20% Durabilidade e 20% Vale o Hype.
          </p>
        </div>
        <Link
          to="/metodologia"
          className="border border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark font-mono text-xs uppercase tracking-wider font-bold py-3 px-6 rounded transition-all duration-200 shrink-0"
        >
          Analisar os Pesos
        </Link>
      </section>

    </div>
  );
}
