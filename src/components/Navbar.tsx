/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Link, useLocation} from "react-router-dom";
import {Activity, FileText, Compass, Shield} from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Achados", icon: Compass },
    { path: "/metodologia", label: "Metodologia de Teste", icon: Activity },
    { path: "/sobre", label: "Nosso Manifesto", icon: FileText },
  ];

  return (
    <header id="app-header" className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-dark/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Logo / Brand Name */}
        <Link 
          id="logo-link"
          to="/" 
          className="flex items-center gap-2 group focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-brand-neon bg-brand-neon/10 font-mono text-xl font-bold text-brand-neon transition-transform group-hover:scale-105">
            VH
          </div>
          <span className="font-display text-2xl tracking-wider text-white transition-colors group-hover:text-brand-neon sm:text-3xl">
            VIRAL <span className="text-brand-neon">HACK</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav id="main-navigation" className="flex items-center gap-1 sm:gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                id={`nav-${link.path.replace("/", "home")}`}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md font-mono text-xs uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-brand-neon ${
                  isActive
                    ? "bg-brand-neon text-brand-dark font-bold border border-brand-neon"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
