"use client";

import React from "react";
import { Quote, Star, Building2 } from "lucide-react";
import Reveal from "../shared/Reveal";

export default function Testimonial() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden subtle-grid-dark">
      <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-1 text-amber-400 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-400" />
          ))}
        </div>

        {/* Large Pull Quote */}
        <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-100 leading-snug sm:leading-relaxed max-w-4xl mx-auto mb-8">
          &ldquo;Before IntakeIQ, our tax season kick-off was a nightmare of lost email attachments and incomplete questionnaires. Now, every client gets a clean, branded portal with a clear checklist. Our document collection cycle dropped from <span className="text-brand-400 font-bold">three weeks to under 48 hours</span>.&rdquo;
        </blockquote>

        {/* Attribution */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-lg border-2 border-slate-700 shadow-md">
            MK
          </div>
          <div>
            <div className="font-bold text-base text-white">Michael Krammer, CPA</div>
            <div className="text-xs text-slate-400">
              Managing Partner • Summit Advisory Group LLP (40+ Staff)
            </div>
          </div>
        </div>

      </Reveal>
    </section>
  );
}
