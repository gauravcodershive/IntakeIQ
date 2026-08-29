"use client";

import React from "react";
import { ShieldCheck, Lock, Database, UserCheck, KeyRound, Server } from "lucide-react";
import Reveal from "../shared/Reveal";

export default function SecuritySection() {
  const securityPillars = [
    {
      icon: Lock,
      title: "Encryption in Transit & At Rest",
      desc: "All client file uploads and database records are safeguarded with TLS 1.3 in transit and AES-256 at rest.",
    },
    {
      icon: Database,
      title: "Per-Tenant Data Isolation",
      desc: "Multi-tenant architecture enforces strict logical boundaries. Data from one firm is completely partitioned from all others.",
    },
    {
      icon: UserCheck,
      title: "Role-Enforced Access Control",
      desc: "Granular permissions separate Admins, Case Managers, Review Staff, and external Client Participants.",
    },
    {
      icon: KeyRound,
      title: "Immutable Action Logging",
      desc: "Every document submission, review action, rejection reason, and status modification is permanently audit-logged.",
    },
    {
      icon: Server,
      title: "Isolated File Storage",
      desc: "Client documents are stored in cryptographically sealed object containers with zero public bucket exposure.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Verification Tokens",
      desc: "Time-limited, cryptographically signed portal access tokens ensure only verified clients can access their checklist.",
    },
  ];

  return (
    <section id="security" className="py-20 bg-white border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Enterprise Security & Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 tracking-tight">
            Security Designed for Confidential Client Data
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Professional service firms handle highly sensitive financial, tax, and legal records. IntakeIQ is architected from the ground up with enterprise-grade isolation and encryption.
          </p>
        </Reveal>

        {/* Security Grid */}
        <Reveal delay={100} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-card hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-3.5 border border-brand-100">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </Reveal>

      </div>
    </section>
  );
}
