/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AffiliateLink {
  plataforma: "amazon" | "mercadolivre" | "tiktokshop" | "shopee" | "aliexpress" | "temu" | "shein";
  url: string;
  prioridade: number; // Ordem de exibição
  prazoEntrega?: string;
}

export interface ReviewNotes {
  funcionalidade: number; // 0 a 10
  custoBeneficio: number; // 0 a 10
  durabilidade: number; // 0 a 10
  valeOHype: number; // 0 a 10
}

export interface FAQItem {
  pergunta: string;
  resposta: string;
}

export interface Alternativa {
  nome: string;
  precoAproximado: string;
  pontosFortes: string[];
  pontosFracos: string[];
  link: string;
  plataforma: string;
}

export interface Review {
  slug: string;
  produto: string;
  descricaoCurta: string; // Para listagem e SEO description
  categoria: string;
  metodologia: "testado" | "curadoria" | "misto";
  veredito: string; // Frase de veredito direto e chamativo
  vereditoDetalhado: string; // Parágrafo explicando a decisão
  precoMedio: string; // ex: "R$ 49,90"
  notas: ReviewNotes;
  pros: string[];
  contras: string[];
  paraQuemVale: string;
  paraQuemNaoVale: string;
  fotos: string[]; // URLs de imagens
  especificacoes: { [key: string]: string }; // Specs técnicas
  linksAfiliado: AffiliateLink[];
  alternativas: Alternativa[]; // Comparativo com 1-2 alternativas
  faq: FAQItem[];
  conteudoDetalhado: {
    titulo: string;
    texto: string;
  }[];
  dataPublicacao: string;
  dataAtualizacao: string;
}
