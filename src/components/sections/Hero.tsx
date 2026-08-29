"use client";

import React from "react";
import { ArrowRight, Play, ShieldCheck, CheckCircle2, Lock, Star } from "lucide-react";
import ClientPortalMockup from "../mockups/ClientPortalMockup";
import AnimatedCounter from "../shared/AnimatedCounter";

interface HeroProps {
  onRequestDemo: () => void;
  onSeeHowItWorks: () => void;
}

export default function Hero({ onRequestDemo, onSeeHowItWorks }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white subtle-grid border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div
            className="lg:col-span-6 space-y-6 text-center lg:text-left animate-slide-up"
            style={{ animationFillMode: "both" }}
          >
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span>Built for Accounting, Legal & Advisory Firms</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-900 leading-[1.1]">
              Client Onboarding, <br className="hidden sm:inline" />
              <span className="text-brand-500">Without the Chaos</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              IntakeIQ replaces email and spreadsheet onboarding with one branded client portal — collect forms and documents, and track every client&apos;s progress in real time.
            </p>

            {/* Credibility Line */}
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-0.5 text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
                <AnimatedCounter value={4.8} decimals={1} duration={1200} />
              </span>
              <span aria-hidden="true">·</span>
              <span>Trusted by 200+ professional service firms</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onRequestDemo()}
                className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-white bg-brand-500 hover:bg-brand-600 active:bg-brand-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onSeeHowItWorks}
                className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-slate-700 hover:text-brand-700 active:bg-slate-100 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-all duration-150 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <Play className="w-4 h-4 text-brand-500 fill-brand-500" />
                <span>See how it works</span>
              </button>
            </div>

            {/* Trust Micro-Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero client login friction</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Per-tenant schema isolation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Bank-grade 256-bit encryption</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Mockup */}
          <div
            className="lg:col-span-6 relative animate-slide-up"
            style={{ animationDelay: "150ms", animationFillMode: "both" }}
          >
            {/* Subtle glow backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-500/10 to-tealAccent-500/10 rounded-2xl filter blur-2xl -z-10 opacity-70" />
            
            {/* Mockup Frame */}
            <div className="transform lg:perspective-1000 lg:rotate-y-[-2deg] transition-transform duration-500 hover:rotate-0">
              <ClientPortalMockup compact />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
