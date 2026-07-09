/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Settings, ShieldCheck, Ruler, HelpCircle} from "lucide-react";

interface ProductBlueprintProps {
  slug: string;
  name: string;
  price?: string;
  metodologia?: string;
}

export default function ProductBlueprint({ slug, name, price, metodologia }: ProductBlueprintProps) {
  // Select the appropriate SVG blueprint based on slug
  const renderSvgBlueprint = () => {
    switch (slug) {
      case "mini-seladora-portatil":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full text-brand-neon" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Grid Lines background */}
            <defs>
              <pattern id="blueprint-grid-inner" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(204, 255, 0, 0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid-inner)" stroke="none" />
            
            {/* Measurements and Labels */}
            <g strokeWidth="0.75" opacity="0.6" className="text-zinc-500 font-mono text-[10px]">
              {/* Width label */}
              <path d="M 50 250 L 350 250" strokeDasharray="3,3" />
              <path d="M 50 246 L 50 254 M 350 246 L 350 254" />
              <text x="200" y="265" textAnchor="middle" fill="currentColor">10.0 cm [COMPRIMENTO]</text>
              
              {/* Height label */}
              <path d="M 360 80 L 360 210" strokeDasharray="3,3" />
              <path d="M 356 80 L 364 80 M 356 210 L 364 210" />
              <text x="375" y="150" textAnchor="middle" transform="rotate(90, 375, 150)" fill="currentColor">4.0 cm [ALTURA]</text>
            </g>

            {/* Main Body Silhouette */}
            <path d="M 80 180 
                     C 80 130, 110 100, 150 100 
                     L 300 100 
                     C 320 100, 330 110, 330 130 
                     L 330 180 
                     C 330 200, 310 210, 290 210 
                     L 120 210 
                     C 90 210, 80 200, 80 180 Z" 
                  strokeWidth="2" 
                  className="text-brand-neon"
            />
            
            {/* Hinge Split Line */}
            <path d="M 80 145 L 330 145" strokeDasharray="4,4" opacity="0.7" />

            {/* Element: Heating Pad (Hot zone) */}
            <rect x="270" y="125" width="30" height="20" rx="3" className="text-red-500" strokeWidth="2" fill="rgba(239, 68, 68, 0.15)" />
            
            {/* Connection Wire Diagram */}
            <path d="M 285 145 L 285 180 L 120 180" strokeDasharray="2,2" opacity="0.8" />
            
            {/* Battery Chamber Slot */}
            <rect x="120" y="155" width="70" height="30" rx="4" opacity="0.5" strokeDasharray="3,3" />
            <circle cx="140" cy="170" r="8" opacity="0.5" strokeDasharray="1,1" />
            <circle cx="170" cy="170" r="8" opacity="0.5" strokeDasharray="1,1" />
            <text x="155" y="173" textAnchor="middle" className="text-zinc-500 font-mono text-[9px]" stroke="none" fill="currentColor">PILHAS AA</text>

            {/* Magnetic strip bottom */}
            <rect x="150" y="205" width="100" height="5" fill="rgba(204, 255, 0, 0.2)" />
            <text x="200" y="200" textAnchor="middle" className="text-zinc-500 font-mono text-[8px]" stroke="none" fill="currentColor">IMÃ DE GELADEIRA</text>

            {/* Technical annotations with leader lines */}
            <g strokeWidth="0.75" className="text-zinc-400 font-mono text-[10px]" stroke="none" fill="currentColor">
              {/* Leader for heating pad */}
              <text x="310" y="70" textAnchor="start">RESISTÊNCIA CERÂMICA (PONTO QUENTE)</text>
              <path d="M 300 135 L 315 110 L 315 75" stroke="rgba(204, 255, 0, 0.5)" fill="none" strokeWidth="1" />
              <circle cx="300" cy="135" r="3" fill="currentColor" />

              {/* Leader for protection flap */}
              <text x="210" y="50" textAnchor="end">TRAVA PROTETORA MÓVEL</text>
              <path d="M 230 110 L 220 85 L 210 55" stroke="rgba(204, 255, 0, 0.5)" fill="none" strokeWidth="1" />
              <circle cx="230" cy="110" r="3" fill="currentColor" />

              {/* Title inside drawing */}
              <text x="30" y="40" className="text-brand-neon font-display text-sm tracking-widest" fill="currentColor">ESQUEMA TÉCNICO V1.0</text>
              <text x="30" y="55" className="text-zinc-500 text-[8px]" fill="currentColor">MODELO: BAG-SEALER-PORT-MINI</text>
            </g>
          </svg>
        );
      case "projetor-astronauta-galaxy":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full text-brand-neon" stroke="currentColor" fill="none" strokeWidth="1.5">
            <defs>
              <pattern id="blueprint-grid-inner" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(204, 255, 0, 0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid-inner)" stroke="none" />
            
            {/* Measurements and Labels */}
            <g strokeWidth="0.75" opacity="0.6" className="text-zinc-500 font-mono text-[10px]">
              <path d="M 100 260 L 300 260" strokeDasharray="3,3" />
              <path d="M 100 256 L 100 264 M 300 256 L 300 264" />
              <text x="200" y="275" textAnchor="middle" fill="currentColor">12.0 cm [DIÂMETRO BASE]</text>
              
              <path d="M 330 40 L 330 240" strokeDasharray="3,3" />
              <path d="M 326 40 L 334 40 M 326 240 L 334 240" />
              <text x="345" y="140" textAnchor="middle" transform="rotate(90, 345, 140)" fill="currentColor">22.5 cm [ALTURA TOTAL]</text>
            </g>

            {/* Astronaut Head Contour */}
            <circle cx="200" cy="110" r="50" strokeWidth="2" />
            
            {/* Helmet Visor (Projector Lens Chamber) */}
            <path d="M 165 110 C 165 80, 235 80, 235 110 C 235 130, 165 130, 165 110 Z" fill="rgba(204, 255, 0, 0.1)" strokeWidth="1.5" />
            
            {/* Nebula LED Lens (Left Eye area) */}
            <circle cx="185" cy="108" r="12" fill="rgba(204, 255, 0, 0.2)" />
            <circle cx="185" cy="108" r="4" fill="currentColor" />
            
            {/* Star Laser Aperture (Right Eye area) */}
            <circle cx="215" cy="108" r="6" className="text-green-500" fill="rgba(34, 197, 94, 0.2)" />
            <circle cx="215" cy="108" r="2" fill="currentColor" />

            {/* Head-to-Body Magnetic Joint */}
            <path d="M 175 155 C 175 150, 225 150, 225 155" strokeWidth="2" strokeDasharray="2,2" />

            {/* Astronaut Body Outline */}
            <path d="M 160 160 
                     L 150 200 
                     C 150 230, 250 230, 250 200 
                     L 240 160 Z" 
                  strokeWidth="1.5" 
            />

            {/* Cute spacesuit details */}
            <rect x="180" y="175" width="40" height="20" rx="3" opacity="0.7" />
            <line x1="190" y1="185" x2="210" y2="185" />
            <circle cx="185" cy="185" r="2" fill="currentColor" />

            {/* Base platform */}
            <ellipse cx="200" cy="240" rx="60" ry="12" strokeWidth="2" />
            <line x1="140" y1="240" x2="140" y2="245" />
            <line x1="260" y1="240" x2="260" y2="245" />
            
            {/* Technical annotations */}
            <g strokeWidth="0.75" className="text-zinc-400 font-mono text-[10px]" stroke="none" fill="currentColor">
              {/* Leader for LED Nebula */}
              <text x="80" y="60" textAnchor="end">CANHÃO LED NEBULOSA RGBW</text>
              <path d="M 180 102 L 140 70 L 85 70" stroke="rgba(204, 255, 0, 0.5)" fill="none" strokeWidth="1" />
              <circle cx="180" cy="102" r="3" fill="currentColor" />

              {/* Leader for Laser Star */}
              <text x="310" y="60" textAnchor="start">LASER VERDE 532nm (ESTRELAS)</text>
              <path d="M 218 105 L 260 75 L 305 75" stroke="rgba(204, 255, 0, 0.5)" fill="none" strokeWidth="1" />
              <circle cx="218" cy="105" r="3" fill="currentColor" />

              {/* Magnetic Joint indicator */}
              <text x="80" y="170" textAnchor="end">ACOPLAMENTO MAGNÉTICO 360°</text>
              <path d="M 185 152 L 140 170 L 85 170" stroke="rgba(204, 255, 0, 0.5)" fill="none" strokeWidth="1" />
              <circle cx="185" cy="152" r="3" fill="currentColor" />

              {/* Title inside drawing */}
              <text x="30" y="40" className="text-brand-neon font-display text-sm tracking-widest" fill="currentColor">ESQUEMA ÓPTICO V2.1</text>
              <text x="30" y="55" className="text-zinc-500 text-[8px]" fill="currentColor">MODELO: ASTRO-LUMI-GAL-G1</text>
            </g>
          </svg>
        );
      case "limpador-telas-2em1":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full text-brand-neon" stroke="currentColor" fill="none" strokeWidth="1.5">
            <defs>
              <pattern id="blueprint-grid-inner" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(204, 255, 0, 0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid-inner)" stroke="none" />
            
            {/* Measurements and Labels */}
            <g strokeWidth="0.75" opacity="0.6" className="text-zinc-500 font-mono text-[10px]">
              <path d="M 160 260 L 240 260" strokeDasharray="3,3" />
              <path d="M 160 256 L 160 264 M 240 256 L 240 264" />
              <text x="200" y="275" textAnchor="middle" fill="currentColor">3.0 cm [LARGURA]</text>
              
              <path d="M 290 50 L 290 230" strokeDasharray="3,3" />
              <path d="M 286 50 L 294 50 M 286 230 L 294 230" />
              <text x="305" y="140" textAnchor="middle" transform="rotate(90, 305, 140)" fill="currentColor">9.0 cm [ALTURA]</text>
            </g>

            {/* Outer Protective Acrylic Case - Translucent */}
            <rect x="155" y="45" width="90" height="190" rx="6" strokeWidth="1" strokeDasharray="4,2" opacity="0.6" />
            
            {/* Inner Core: Block with microfiber coating */}
            <rect x="160" y="50" width="80" height="180" rx="4" strokeWidth="2" className="text-brand-neon" />
            
            {/* Fabric Texture hatching representation */}
            <g opacity="0.3">
              <line x1="165" y1="80" x2="235" y2="80" strokeDasharray="1,2" />
              <line x1="165" y1="110" x2="235" y2="110" strokeDasharray="1,2" />
              <line x1="165" y1="140" x2="235" y2="140" strokeDasharray="1,2" />
              <line x1="165" y1="170" x2="235" y2="170" strokeDasharray="1,2" />
              <line x1="165" y1="200" x2="235" y2="200" strokeDasharray="1,2" />
            </g>

            {/* Spray Nozzle Head Top */}
            <rect x="190" y="25" width="20" height="25" rx="2" />
            <circle cx="200" cy="35" r="3" fill="currentColor" stroke="none" />
            
            {/* Fluid Intake straw inside block (translucent) */}
            <line x1="200" y1="50" x2="200" y2="190" strokeDasharray="3,3" opacity="0.7" />
            <rect x="185" y="60" width="30" height="120" rx="10" strokeDasharray="2,2" opacity="0.4" />
            <text x="200" y="125" textAnchor="middle" className="text-zinc-500 font-mono text-[9px]" stroke="none" fill="currentColor">RESERVATÓRIO 10ML</text>

            {/* Technical annotations */}
            <g strokeWidth="0.75" className="text-zinc-400 font-mono text-[10px]" stroke="none" fill="currentColor">
              {/* Leader for spray nozzle */}
              <text x="270" y="25" textAnchor="start">BICO ATOMIZADOR DE BRUMA</text>
              <path d="M 210 35 L 245 25 L 265 25" stroke="rgba(204, 255, 0, 0.5)" fill="none" strokeWidth="1" />
              <circle cx="210" cy="35" r="3" fill="currentColor" />

              {/* Leader for microfiber wrapper */}
              <text x="80" y="100" textAnchor="end">TECIDO MICROFIBRA DE ALTA DENSIDADE</text>
              <path d="M 165 120 L 120 100 L 85 100" stroke="rgba(204, 255, 0, 0.5)" fill="none" strokeWidth="1" />
              <circle cx="165" cy="120" r="3" fill="currentColor" />

              {/* Outer Case indicator */}
              <text x="80" y="190" textAnchor="end">ESTOJO ACRÍLICO DE TRANSPORTE</text>
              <path d="M 155 180 L 120 190 L 85 190" stroke="rgba(204, 255, 0, 0.5)" fill="none" strokeWidth="1" />
              <circle cx="155" cy="180" r="3" fill="currentColor" />

              {/* Title inside drawing */}
              <text x="30" y="40" className="text-brand-neon font-display text-sm tracking-widest" fill="currentColor">ESQUEMA MECÂNICO V1.2</text>
              <text x="30" y="55" className="text-zinc-500 text-[8px]" fill="currentColor">MODELO: CLEANER-BLOCK-2IN1</text>
            </g>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full text-brand-neon" stroke="currentColor" fill="none" strokeWidth="1.5">
            <rect width="100%" height="100%" fill="none" stroke="currentColor" strokeDasharray="4,4" opacity="0.3" />
            <circle cx="200" cy="150" r="40" stroke="currentColor" strokeDasharray="3,3" />
            <line x1="100" y1="150" x2="300" y2="150" strokeDasharray="2,2" opacity="0.5" />
            <line x1="200" y1="50" x2="200" y2="250" strokeDasharray="2,2" opacity="0.5" />
            <text x="200" y="155" textAnchor="middle" className="text-brand-neon font-mono text-xs" stroke="none" fill="currentColor">BLUEPRINT_PENDING</text>
            <text x="200" y="200" textAnchor="middle" className="text-zinc-500 font-mono text-[10px]" stroke="none" fill="currentColor">{name}</text>
          </svg>
        );
    }
  };

  return (
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-brand-border bg-black flex items-center justify-center p-4">
      {/* Blueprint background lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
      
      {/* SVG Container */}
      <div className="relative z-10 w-full h-full max-w-[340px] max-h-[255px]">
        {renderSvgBlueprint()}
      </div>

      {/* Decorative technical stamp corner details */}
      <div className="absolute top-2 left-2 flex items-center gap-1 font-mono text-[8px] text-zinc-500 bg-brand-dark/80 px-1.5 py-0.5 rounded border border-zinc-800">
        <Settings className="h-2 w-2 animate-spin-slow text-brand-neon" />
        <span>V_HACK LAB REVIEWS</span>
      </div>

      <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[8px] text-zinc-500 bg-brand-dark/80 px-1.5 py-0.5 rounded border border-zinc-800">
        <Ruler className="h-2.5 w-2.5 text-brand-neon" />
        <span>ESCALA: 1:1</span>
      </div>

      <div className="absolute bottom-2 left-2 flex flex-col font-mono text-[8px] text-zinc-500 bg-brand-dark/80 px-1.5 py-1 rounded border border-zinc-800">
        <div className="flex items-center gap-1">
          <ShieldCheck className="h-2.5 w-2.5 text-brand-neon" />
          <span className="uppercase text-white font-bold">{metodologia === "testado" ? "TESTE REAL" : metodologia === "misto" ? "FÓRMULA MISTA" : "CURADORIA ANALÍTICA"}</span>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 flex items-center gap-1 font-mono text-[9px] text-brand-neon bg-brand-dark/80 px-2 py-0.5 rounded border border-brand-neon/20 font-bold">
        <span>PREÇO REF: {price || "N/A"}</span>
      </div>
    </div>
  );
}
