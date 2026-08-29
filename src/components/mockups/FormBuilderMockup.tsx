"use client";

import { useState } from "react";
import {
  GitBranch,
  CheckSquare,
  Type,
  Calendar,
  DollarSign,
  FileCheck,
  Eye
} from "lucide-react";

export default function FormBuilderMockup() {
  const [entityType, setEntityType] = useState<"corporation" | "individual" | "partnership">("corporation");
  const [activeTab, setActiveTab] = useState<"builder" | "preview">("builder");

  return (
    <div className="w-full bg-white rounded-xl shadow-mockup border border-slate-200/80 overflow-hidden font-sans text-left transition-all">
      {/* Top Builder Toolbar */}
      <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-500 text-xs hidden sm:inline ml-2">|</span>
          <span className="font-semibold text-slate-200 text-xs flex items-center gap-1.5 ml-1">
            Form Studio: <span className="font-normal text-slate-400">Master Corporate Onboarding Template (v3)</span>
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-800 rounded p-0.5 border border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab("builder")}
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900 ${
              activeTab === "builder" ? "bg-brand-500 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Builder Canvas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors duration-150 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900 ${
              activeTab === "preview" ? "bg-brand-500 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="w-3 h-3" />
            Live Form Test
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
        {activeTab === "builder" ? (
        <>
        {/* Left Palette: Available Field Types (Hidden on small mobile for space) */}
        <div className="hidden md:block md:col-span-4 bg-slate-50/70 border-r border-slate-200 p-3.5 text-xs">
          <div className="font-semibold text-slate-700 mb-2 flex items-center justify-between">
            <span>Form Field Blocks</span>
            <span className="text-[10px] text-slate-400 font-normal">Drag to Canvas</span>
          </div>

          <div className="space-y-1.5">
            {[
              { icon: Type, label: "Short / Long Text Input", desc: "Single line or multi-line" },
              { icon: DollarSign, label: "Currency / Numbers", desc: "Financial values with formatting" },
              { icon: Calendar, label: "Date & Period Picker", desc: "Fiscal year end, DOB" },
              { icon: CheckSquare, label: "Entity / Multi-Select", desc: "Dropdown or radio options" },
              { icon: FileCheck, label: "Document Attachment", desc: "Linked to file checklist" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-2 rounded-md bg-white border border-slate-200 text-slate-700 hover:border-brand-300 hover:shadow-xs transition cursor-grab"
              >
                <item.icon className="w-4 h-4 text-brand-600 shrink-0" />
                <div className="truncate">
                  <p className="font-medium text-[11px] text-slate-800 leading-tight">{item.label}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200">
            <p className="font-semibold text-slate-700 text-[11px] mb-1.5">Reusable Templates</p>
            <div className="space-y-1">
              <span className="block px-2 py-1 bg-brand-50 text-brand-700 rounded text-[10px] font-medium border border-brand-200/50 truncate">
                • Standard Corporate Tax Questionnaire
              </span>
              <span className="block px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] truncate">
                • Trust & Estate Intake Profile
              </span>
            </div>
          </div>
        </div>

        {/* Right Canvas: Form Builder & Conditional Logic Rule */}
        <div className="md:col-span-8 p-4 sm:p-5 bg-white space-y-4">
          {/* Active Section Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                Section 1: Entity Structure & Tax Profile
              </h5>
              <p className="text-[11px] text-slate-500">Configured with dynamic branching rules</p>
            </div>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
              Active Rule Set
            </span>
          </div>

          {/* Trigger Question */}
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              1. What is the legal entity classification? <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["corporation", "individual", "partnership"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEntityType(type)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md border text-center transition-colors duration-150 capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 ${
                    entityType === type
                      ? "bg-brand-500 text-white border-brand-500 shadow-xs font-semibold"
                      : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  {type === "corporation" ? "C/S-Corp" : type}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 italic">
              Click options above to test live conditional branching below.
            </p>
          </div>

          {/* Conditional Branching Visual Node */}
          <div className="relative pl-6 border-l-2 border-brand-400 space-y-2">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-brand-500 text-white flex items-center justify-center">
              <GitBranch className="w-2.5 h-2.5" />
            </div>

            <div className="bg-brand-50/70 border border-brand-200/80 rounded-lg p-2.5 text-xs text-brand-900">
              <span className="font-semibold text-brand-700">Conditional Logic: </span>
              {entityType === "corporation" && "IF Entity == Corporation → SHOW Officer Equity & FEIN Sub-fields"}
              {entityType === "individual" && "IF Entity == Individual → SHOW Social Security Number & Spouse Schedule"}
              {entityType === "partnership" && "IF Entity == Partnership → SHOW General Partner Schedule & K-1 Allocations"}
            </div>

            {/* Dynamic Branch Content */}
            {entityType === "corporation" && (
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2 animate-fade-in">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">Officer & Equity Ownership Table</span>
                  <span className="text-[10px] text-brand-600 font-medium">Auto-Revealed</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    disabled
                    placeholder="Officer Full Name"
                    className="p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-400 text-xs"
                  />
                  <input
                    type="text"
                    disabled
                    placeholder="Ownership % (e.g. 51%)"
                    className="p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-400 text-xs"
                  />
                </div>
              </div>
            )}

            {entityType === "individual" && (
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2 animate-fade-in">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">Personal Tax Profile</span>
                  <span className="text-[10px] text-brand-600 font-medium">Auto-Revealed</span>
                </div>
                <input
                  type="text"
                  disabled
                  placeholder="Filing Status (Single, Married Filing Jointly)"
                  className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-400 text-xs"
                />
              </div>
            )}

            {entityType === "partnership" && (
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2 animate-fade-in">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">Partnership Roster</span>
                  <span className="text-[10px] text-brand-600 font-medium">Auto-Revealed</span>
                </div>
                <input
                  type="text"
                  disabled
                  placeholder="Number of Partners / Schedule K-1 Recipients"
                  className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-400 text-xs"
                />
              </div>
            )}
          </div>
        </div>
        </>
        ) : (
          <div className="md:col-span-12 p-5 sm:p-8 bg-slate-50/60 flex items-start justify-center">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-card p-5 sm:p-6 space-y-5">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-600 uppercase tracking-wider">
                <Eye className="w-3.5 h-3.5" />
                <span>Client-Facing Preview</span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  What is the legal entity classification? <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["corporation", "individual", "partnership"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEntityType(type)}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-md border text-center transition-colors duration-150 capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 ${
                        entityType === type
                          ? "bg-brand-500 text-white border-brand-500 shadow-xs font-semibold"
                          : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      {type === "corporation" ? "C/S-Corp" : type}
                    </button>
                  ))}
                </div>
              </div>

              {entityType === "corporation" && (
                <div className="space-y-3 animate-fade-in">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Officer Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Jane Doe"
                      className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Ownership %</label>
                    <input
                      type="text"
                      placeholder="e.g. 51%"
                      className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {entityType === "individual" && (
                <div className="space-y-3 animate-fade-in">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Filing Status</label>
                  <input
                    type="text"
                    placeholder="Single, Married Filing Jointly…"
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
              )}

              {entityType === "partnership" && (
                <div className="space-y-3 animate-fade-in">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Number of Partners</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 general partners"
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
              )}

              <button
                type="button"
                disabled
                title="Preview only — not a live submission"
                className="w-full py-2.5 bg-slate-200 text-slate-500 text-sm font-semibold rounded-lg cursor-not-allowed"
              >
                Continue (Preview Only)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
