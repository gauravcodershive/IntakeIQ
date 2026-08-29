"use client";

import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import Reveal from "../shared/Reveal";

interface PricingPreviewProps {
  onRequestDemo: (plan?: string) => void;
}

export default function PricingPreview({ onRequestDemo }: PricingPreviewProps) {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  const plans = [
    {
      name: "Starter",
      badge: "For Boutique Practices",
      priceMonthly: 89,
      priceAnnual: 69,
      description: "Everything you need to replace email onboarding for up to 5 team members.",
      features: [
        "Up to 5 firm staff & case managers",
        "Unlimited client onboarding portals",
        "Dynamic form builder with standard templates",
        "Document checklists with required/optional flags",
        "Document version history (v1, v2 lineage)",
        "Manual approve/reject review workflow",
        "Standard email status notifications",
      ],
      ctaText: "Get Started",
      highlighted: false,
    },
    {
      name: "Professional",
      badge: "Most Popular",
      priceMonthly: 199,
      priceAnnual: 159,
      description: "For growing accounting, legal, and advisory firms managing high client volume.",
      features: [
        "Up to 20 firm staff & case managers",
        "Custom firm subdomain (e.g. portal.firm.com)",
        "Full custom branding (logo, theme palette)",
        "Advanced conditional logic form branching",
        "Full immutable action audit trail",
        "Admin case tracking dashboard with pipeline filters",
        "Role-based permissions (Admin, Manager, Staff)",
        "Priority onboarding support",
      ],
      ctaText: "Request Firm Demo",
      highlighted: true,
    },
    {
      name: "Enterprise",
      badge: "Multi-Partner & Large Firms",
      priceMonthly: null,
      priceAnnual: null,
      description: "Dedicated tenant clusters, custom legal agreements, and customized onboarding configurations.",
      features: [
        "Unlimited firm staff & branch locations",
        "Multiple firm workspaces under one master parent",
        "Dedicated per-tenant database isolation option",
        "Custom master intake templates assistance",
        "Dedicated account manager & staff training",
        "99.9% uptime SLA guarantee",
      ],
      ctaText: "Contact Enterprise Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold">
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 tracking-tight">
            Predictable Plans for Growing Firms
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            All plans include unlimited client portal participants and secure file storage.
          </p>

          {/* Billing Switcher */}
          <div className="flex items-center justify-center pt-3">
            <div className="bg-slate-200/80 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-1.5 rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                  billingCycle === "annual"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Annual Billing <span className="text-[10px] text-emerald-600 font-bold ml-1">Save 20%</span>
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                  billingCycle === "monthly"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly Billing
              </button>
            </div>
          </div>
        </Reveal>

        {/* Pricing Cards */}
        <Reveal delay={100} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 relative ${
                  plan.highlighted
                    ? "bg-white border-2 border-brand-500 shadow-xl shadow-brand-500/10 lg:-translate-y-2"
                    : "bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    {!plan.highlighted && (
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 min-h-[32px] mb-4">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="py-4 border-y border-slate-100 mb-6">
                    {price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
                          ${price}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/ month</span>
                        <span className="text-[11px] text-slate-400 block ml-1">
                          (billed {billingCycle})
                        </span>
                      </div>
                    ) : (
                      <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Custom
                        <span className="text-xs text-slate-500 font-normal block">
                          Tailored to your firm size
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2.5 mb-8">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Included in {plan.name}:
                    </p>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => onRequestDemo(plan.name)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                      plan.highlighted
                        ? "bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white shadow-md hover:shadow-lg"
                        : "bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </Reveal>

      </div>
    </section>
  );
}
