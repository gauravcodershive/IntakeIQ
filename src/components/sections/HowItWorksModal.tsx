"use client";

import React, { useEffect, useState } from "react";
import { X, ArrowRight, ArrowLeft, Layers, Send, FileCheck2, UserCheck, ShieldCheck } from "lucide-react";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestDemo: () => void;
}

export default function HowItWorksModal({ isOpen, onClose, onRequestDemo }: HowItWorksModalProps) {
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const steps = [
    {
      number: 1,
      title: "1. Build Reusable Intake Templates",
      tagline: "Create structured forms with conditional branching logic",
      description:
        "Assemble custom intake forms and PBC document checklists in minutes. Configure conditional rules (e.g., if entity is a Corporation, require Certificate of Incorporation and Officer schedules) that automatically tailor the onboarding flow for each client.",
      icon: Layers,
      highlight: "Drag-and-drop builder with rule-based branching",
    },
    {
      number: 2,
      title: "2. Send Branded Client Portal Links",
      tagline: "One isolated, white-labeled portal under your firm's brand",
      description:
        "Clients receive a direct, authenticated link to a clean onboarding portal featuring your firm's logo, colors, and custom subdomain. No messy email attachments or complex software downloads required.",
      icon: Send,
      highlight: "Isolated tenant architecture & custom firm branding",
    },
    {
      number: 3,
      title: "3. Frictionless Document Collection & Versioning",
      tagline: "Clients complete checklists with real-time status visibility",
      description:
        "Clients see an organized checklist of required and optional documents with clear instructions. When a client submits a new revision, version history is automatically maintained (v1.0, v2.0) with zero lost files.",
      icon: FileCheck2,
      highlight: "Immutable version history & per-document status tags",
    },
    {
      number: 4,
      title: "4. Review, Approve & Track to Completion",
      tagline: "Streamlined approve/reject workflow with role permissions",
      description:
        "Your case managers review uploaded files, approve clean submissions with one click, or reject with specific notes. Admins track the progress of every client case in real time from a centralized dashboard.",
      icon: UserCheck,
      highlight: "One-click approval workflow + complete audit trail",
    },
  ];

  const current = steps[step - 1];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-it-works-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-900 text-white px-6 py-5 flex items-center justify-between border-b border-brand-800">
          <div>
            <span className="text-xs uppercase font-semibold text-brand-300 tracking-wider">
              IntakeIQ Milestone 1 Workflow
            </span>
            <h3 id="how-it-works-title" className="text-xl font-bold text-white mt-0.5">
              How IntakeIQ Works
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50 text-xs">
          {steps.map((s) => (
            <button
              key={s.number}
              onClick={() => setStep(s.number)}
              className={`py-3 px-2 text-center font-medium transition-colors duration-150 border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset ${
                step === s.number
                  ? "bg-white text-brand-600 border-brand-500 font-bold shadow-xs"
                  : "text-slate-500 border-transparent hover:text-slate-800"
              }`}
            >
              <span className="hidden sm:inline">Step </span>{s.number}: {s.number === 1 ? "Template" : s.number === 2 ? "Portal" : s.number === 3 ? "Collect" : "Approve"}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-100 shadow-xs">
              <current.icon className="w-7 h-7" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-800 mb-1">
                {current.tagline}
              </span>
              <h4 className="text-xl font-bold text-slate-900">{current.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {current.description}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 text-xs text-slate-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Key Feature: <strong className="text-slate-900">{current.highlight}</strong></span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              title={step === 1 ? "You're on the first step" : undefined}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Step
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 active:bg-brand-700 rounded-lg shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestDemo();
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                Request Full Live Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
