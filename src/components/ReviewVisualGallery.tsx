/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useState} from "react";
import {Layers, Camera, AlertTriangle, ShieldCheck, HelpCircle} from "lucide-react";
import ProductBlueprint from "./ProductBlueprint";

interface ReviewVisualGalleryProps {
  slug: string;
  name: string;
  price?: string;
  metodologia: "testado" | "curadoria" | "misto";
  fotos: string[];
}

export default function ReviewVisualGallery({
  slug,
  name,
  price,
  metodologia,
  fotos
}: ReviewVisualGalleryProps) {
  // Check if we have valid real product photos
  const hasPhotos = fotos && fotos.length > 0 && fotos.some(f => f && !f.includes("placeholder"));
  
  // Tab state: 'blueprint' or 'real'
  const [activeTab, setActiveTab] = useState<"blueprint" | "real">(hasPhotos ? "real" : "blueprint");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Validation: If it is marked as "testado" but does not have real photos, trigger warnings
  const isMissingTestPhotos = metodologia === "testado" && !hasPhotos;

  return (
    <div id="review-visual-gallery" className="space-y-4">
      {/* Tab Switcher Headers */}
      <div className="flex items-center justify-between border-b border-brand-border pb-1">
        <div className="flex gap-2">
          {hasPhotos && (
            <button
              onClick={() => setActiveTab("real")}
              className={`flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] uppercase tracking-wider border-b-2 font-bold transition-all duration-200 ${
                activeTab === "real"
                  ? "border-brand-neon text-brand-neon"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Camera className="h-3.5 w-3.5" />
              <span>Foto Real de Laboratório</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("blueprint")}
            className={`flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] uppercase tracking-wider border-b-2 font-bold transition-all duration-200 ${
              activeTab === "blueprint"
                ? "border-brand-neon text-brand-neon"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Blueprint Técnico v1.0</span>
          </button>
        </div>

        <span className="font-mono text-[9px] text-zinc-500 uppercase">VIEWER_MODE: {activeTab.toUpperCase()}</span>
      </div>

      {/* Main Display Box */}
      <div className="relative">
        {activeTab === "real" && hasPhotos ? (
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-brand-border bg-black flex flex-col items-center justify-center p-2">
            {/* Grid overlay for technical laboratory look */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-10"></div>
            <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none z-10"></div>

            {/* Technical Lab Camera Reticle Overlays */}
            <div className="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-brand-neon/40 pointer-events-none z-10"></div>
            <div className="absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-brand-neon/40 pointer-events-none z-10"></div>
            <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-brand-neon/40 pointer-events-none z-10"></div>
            <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-brand-neon/40 pointer-events-none z-10"></div>

            <img
              src={fotos[selectedPhotoIndex]}
              alt={`Foto real de teste de ${name}`}
              className="w-full h-full object-contain relative z-0 filter brightness-95"
              referrerPolicy="no-referrer"
              onError={() => {
                // If image fails to load, gracefully fallback to blueprint tab
                setActiveTab("blueprint");
              }}
            />

            {/* Micro Metadata tag on physical photo */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-20">
              <span className="bg-brand-dark/90 text-brand-neon border border-brand-neon/30 font-mono text-[8px] uppercase px-2 py-0.5 rounded font-bold flex items-center gap-1">
                <Camera className="h-2.5 w-2.5" />
                <span>CAPTURA REAL</span>
              </span>
              <span className="bg-brand-dark/90 text-zinc-400 border border-zinc-800 font-mono text-[8px] uppercase px-2 py-0.5 rounded">
                LOTE FISCALIZADO #2026-A
              </span>
            </div>
          </div>
        ) : (
          <ProductBlueprint
            slug={slug}
            name={name}
            price={price}
            metodologia={metodologia}
          />
        )}
      </div>

      {/* Multiple photos thumbnail strip if there are more than 1 photo */}
      {activeTab === "real" && fotos && fotos.length > 1 && (
        <div className="flex gap-2 mt-2">
          {fotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedPhotoIndex(index)}
              className={`h-12 w-16 rounded border overflow-hidden bg-black transition-all duration-200 ${
                selectedPhotoIndex === index ? "border-brand-neon ring-1 ring-brand-neon" : "border-brand-border opacity-60 hover:opacity-100"
              }`}
            >
              <img src={photo} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      )}

      {/* Audit Warning block for "Testado por Nós" lacking actual real photos */}
      {isMissingTestPhotos && (
        <div className="p-3 bg-red-950/20 border-2 border-dashed border-red-900/40 rounded-lg flex items-start gap-3 mt-4 animate-pulse">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider font-bold block">
              ⚠️ ALERTA DE INTEGRIDADE EDITORIAL:
            </span>
            <p className="text-zinc-400 text-xs font-sans leading-relaxed">
              Esta análise foi catalogada como <strong className="text-white">"Testado por Nós"</strong>, contudo, o arquivo correspondente de imagens reais do lote está temporariamente inacessível. O sistema rebaixou o renderizador para o <strong className="text-brand-neon">Esquema Técnico Blueprint</strong> de segurança automática para auditar as dimensões físicas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
