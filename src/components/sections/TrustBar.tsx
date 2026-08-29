"use client";

import React from "react";
import { Building2, Scale, Landmark, Shield, Award, Briefcase } from "lucide-react";
import Reveal from "../shared/Reveal";

export default function TrustBar() {
  const logos = [
    { name: "Apex Advisory", icon: Building2, subtitle: "CPA & Advisors" },
    { name: "Sterling Legal", icon: Scale, subtitle: "Partners LLP" },
    { name: "Keystone Wealth", icon: Landmark, subtitle: "Private Wealth" },
    { name: "Summit Partners", icon: Award, subtitle: "Tax Consultants" },
    { name: "Horizon CPA Group", icon: Building2, subtitle: "Chartered Accountants" },
    { name: "Beacon Advisory", icon: Briefcase, subtitle: "Family Office" },
  ];

  return (
    <div className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-600 mb-8">
          Trusted by growing professional service firms
        </p>

        <Reveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 grayscale hover:grayscale-0 transition-all duration-200 opacity-85 hover:opacity-100 hover:-translate-y-0.5 group"
            >
              <logo.icon className="w-5 h-5 text-slate-600 group-hover:text-brand-600 transition-colors" />
              <div className="text-left">
                <span className="block font-bold text-xs text-slate-800 tracking-tight leading-tight">
                  {logo.name}
                </span>
                <span className="block text-[9px] text-slate-600 tracking-wider uppercase font-medium">
                  {logo.subtitle}
                </span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
