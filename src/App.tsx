/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ReviewPage from "./pages/ReviewPage";
import CategoriaPage from "./pages/CategoriaPage";
import RankingPage from "./pages/RankingPage";
import Sobre from "./pages/Sobre";
import Metodologia from "./pages/Metodologia";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-brand-dark flex flex-col justify-between font-sans selection:bg-brand-neon selection:text-brand-dark overflow-x-hidden">
        
        {/* Subtle background industrial grid and grain overlay on the entire site */}
        <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none z-0"></div>

        {/* Global Navbar Header */}
        <Navbar />

        {/* Main Content Area */}
        <main id="main-content" className="relative z-10 flex-grow">
          <Routes>
            {/* Main paths */}
            <Route path="/" element={<Home />} />
            <Route path="/review/:slug" element={<ReviewPage />} />
            <Route path="/categoria/:slug" element={<CategoriaPage />} />
            <Route path="/rankings/:slug" element={<RankingPage />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/metodologia" element={<Metodologia />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />

            {/* Fallback to homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}
