/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Helmet} from "react-helmet-async";
import {ShieldCheck, FileText} from "lucide-react";

export default function PoliticaPrivacidade() {
  return (
    <div id="privacy-page" className="mx-auto max-w-3xl px-4 py-12 sm:py-16 space-y-8">
      <Helmet>
        <title>Política de Privacidade | Viral Hack</title>
        <meta name="description" content="Nossa política de privacidade. Saiba como funcionam os cookies de comissão de afiliados das lojas oficiais." />
      </Helmet>

      {/* Page Title */}
      <div className="space-y-4 border-b border-brand-border pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-brand-neon/10 border border-brand-neon/20 font-mono text-[10px] text-brand-neon font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-neon" />
          <span>CONFORMIDADE DE SEGURANÇA</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-tight leading-none">
          POLÍTICA DE <span className="text-brand-neon">PRIVACIDADE</span>
        </h1>
        <p className="text-zinc-500 font-mono text-xs">ÚLTIMA ATUALIZAÇÃO: 09 DE JULHO DE 2026</p>
      </div>

      {/* Policy Text */}
      <div className="font-sans text-sm sm:text-base text-zinc-300 space-y-6 leading-relaxed">
        <p>
          No <strong>Viral Hack</strong>, respeitamos a sua privacidade e temos compromisso com a total transparência. Este documento explica como lidamos com dados em nossa plataforma informativa.
        </p>

        <h3 className="font-display text-xl text-white uppercase tracking-wider">1. Coleta de Dados Pessoais</h3>
        <p>
          O Viral Hack é uma plataforma estática de reviews e informações de produtos. Nós <strong>não</strong> exigimos cadastro, login ou fornecimento de informações pessoais (como nome, email, CPF ou telefone) para navegar em nosso conteúdo. Nenhum dado de pagamento é processado ou armazenado por nós.
        </p>

        <h3 className="font-display text-xl text-white uppercase tracking-wider">2. Cookies e Links de Afiliados</h3>
        <p>
          Utilizamos links de redirecionamento de afiliados para plataformas oficiais como <strong>Amazon, Mercado Livre, Shopee e AliExpress</strong>. 
          Quando você clica em um desses botões em nossa página de review, a respectiva loja de destino insere um pequeno arquivo de texto chamado "cookie" no seu navegador para rastrear que a compra originou-se do nosso site.
        </p>
        <p className="bg-brand-card p-4 rounded border border-brand-border font-mono text-xs text-zinc-400">
          * NOTA: Esses cookies servem estritamente para atribuir a nossa devida comissão caso você finalize a compra e costumam expirar automaticamente em um período que varia de 24 horas a 30 dias, dependendo do regulamento de cada loja parceira.
        </p>

        <h3 className="font-display text-xl text-white uppercase tracking-wider">3. Google Analytics e Estatísticas</h3>
        <p>
          Para entender o comportamento do público de forma agregada (quais reviews são mais lidos, de onde vem o tráfego), podemos usar ferramentas analíticas como Google Analytics. Essas ferramentas coletam dados puramente demográficos e genéricos (como navegador utilizado, país e tempo de permanência), incapazes de identificar pessoalmente qualquer usuário.
        </p>

        <h3 className="font-display text-xl text-white uppercase tracking-wider">4. Direitos do Usuário</h3>
        <p>
          Você pode, a qualquer momento, desativar cookies ou apagar o histórico de navegação nas configurações do seu navegador de internet para interromper o rastreamento de links de afiliado.
        </p>

        <div className="pt-6 border-t border-brand-border text-center font-mono text-xs text-zinc-500">
          <span>Se tiver qualquer dúvida sobre nossa política de segurança, entre em contato através das redes oficiais do Viral Hack.</span>
        </div>
      </div>

    </div>
  );
}
