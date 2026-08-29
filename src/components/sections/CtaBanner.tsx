"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";
import Reveal from "../shared/Reveal";

interface CtaBannerProps {
  onRequestDemo: () => void;
}

export default function CtaBanner({ onRequestDemo }: CtaBannerProps) {
  return (
    <section className="py-20 bg-brand-950 text-white relative overflow-hidden subtle-grid-dark">
      {/* Decorative radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

      <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-300 text-xs font-semibold backdrop-blur-sm border border-white/10">
          <span>Start Modernizing Your Intake Today</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Ready to modernize your client onboarding?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Join leading accounting, legal, and advisory firms that have eliminated email tag, secured client documents, and accelerated their intake cycle.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => onRequestDemo()}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-brand-500 hover:bg-brand-600 active:bg-brand-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            <span>Request a Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#pricing"
            className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl backdrop-blur-sm transition text-center"
          >
            View Pricing Plans
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400 pt-4">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Dedicated firm sandbox setup</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Custom branding & subdomain</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>No credit card required for demo</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
