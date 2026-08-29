"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  UploadCloud,
  FileText,
  ChevronRight,
  Building2,
  ShieldCheck,
  AlertCircle,
  Eye
} from "lucide-react";
import { useToast } from "@/components/shared/ToastProvider";

interface DocumentItem {
  id: string;
  title: string;
  category: string;
  status: "approved" | "uploaded" | "pending";
  required: boolean;
  fileSize?: string;
  version?: string;
}

const initialDocuments: DocumentItem[] = [
  {
    id: "doc-1",
    title: "Articles of Incorporation & Bylaws",
    category: "Corporate Formation",
    status: "approved",
    required: true,
    fileSize: "2.4 MB (PDF)",
    version: "v2.0",
  },
  {
    id: "doc-2",
    title: "2023 Audited Financial Statements",
    category: "Financial Disclosures",
    status: "uploaded",
    required: true,
    fileSize: "8.1 MB (XLSX)",
    version: "v1.0",
  },
  {
    id: "doc-3",
    title: "Form W-9 / Tax ID Verification",
    category: "Tax Compliance",
    status: "pending",
    required: true,
  },
  {
    id: "doc-4",
    title: "Proof of Commercial Liability Insurance",
    category: "Compliance & Risk",
    status: "pending",
    required: false,
  },
  {
    id: "doc-5",
    title: "Beneficial Ownership Information (BOI)",
    category: "Corporate Formation",
    status: "approved",
    required: true,
    fileSize: "1.1 MB (PDF)",
    version: "v1.0",
  },
];

export default function ClientPortalMockup({ compact = false }: { compact?: boolean }) {
  const toast = useToast();
  const [filter, setFilter] = useState<"all" | "pending" | "uploaded" | "approved">("all");
  const [activeBrand, setActiveBrand] = useState<"summit" | "sterling">("summit");
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);

  const filteredDocs = documents.filter((doc) => {
    if (filter === "all") return true;
    return doc.status === filter;
  });

  // Compact mode (used in the hero) shows one representative row per status
  // instead of the full checklist, so the illustration reads at a glance.
  const visibleDocs = compact ? filteredDocs.slice(0, 3) : filteredDocs;

  const handleUpload = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "uploaded", fileSize: d.fileSize ?? "1.8 MB (PDF)", version: "v1.0" } : d
      )
    );
    toast.success(`${doc?.title ?? "Document"} uploaded — pending review.`);
  };

  const isSummit = activeBrand === "summit";

  return (
    <div className="w-full bg-white rounded-xl shadow-mockup border border-slate-200/80 overflow-hidden font-sans text-left transition-all duration-300">
      {/* Mockup Top Browser / Tenant Bar */}
      <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-500 text-xs hidden sm:inline ml-2">|</span>
          <span className="font-mono text-[11px] text-slate-300 flex items-center gap-1.5 ml-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            https://{isSummit ? "summit-advisory" : "sterling-partners"}.intakeiq.portal/onboarding/case-408
          </span>
        </div>

        {/* Multi-Tenant Brand Switcher Preview */}
        <div className="flex items-center space-x-1 bg-slate-800/90 rounded-md p-0.5 border border-slate-700">
          <button
            type="button"
            onClick={() => setActiveBrand("summit")}
            className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900 ${
              isSummit ? "bg-brand-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Summit Advisory
          </button>
          <button
            type="button"
            onClick={() => setActiveBrand("sterling")}
            className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900 ${
              !isSummit ? "bg-tealAccent-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sterling Legal
          </button>
        </div>
      </div>

      {/* Branded Portal Header */}
      <div className={`p-4 sm:p-5 border-b border-slate-200 transition-colors ${
        isSummit ? "bg-slate-50/80" : "bg-teal-50/30"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-sm ${
              isSummit ? "bg-brand-900" : "bg-teal-900"
            }`}>
              {isSummit ? "SA" : "SL"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                  {isSummit ? "Summit Advisory Group" : "Sterling Legal Partners"}
                </h4>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-brand-50 text-brand-700 border border-brand-200/60">
                  Client Portal
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Case #408 • Apex Holdings LLC — Onboarding Package
              </p>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="flex items-center sm:text-right gap-3">
            <div className="flex-1 sm:flex-initial">
              <div className="flex items-center justify-between sm:justify-end gap-2 text-xs mb-1">
                <span className="text-slate-500 font-medium">Onboarding Progress:</span>
                <span className="font-bold text-slate-900">60% Complete</span>
              </div>
              <div className="w-full sm:w-36 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isSummit ? "bg-brand-500" : "bg-tealAccent-500"
                  }`} 
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        {!compact && (
          <div className="flex items-center gap-1 sm:gap-2 mt-4 pt-3 border-t border-slate-200/60 text-xs">
            <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Filter:</span>
            {(["all", "pending", "uploaded", "approved"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 ${
                  filter === f
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                {f === "all" ? `All Items (${documents.length})` : `${f.charAt(0).toUpperCase()}${f.slice(1)} (${documents.filter((d) => d.status === f).length})`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Checklist Items List */}
      <div className="p-4 sm:p-5 space-y-2.5 bg-white">
        {visibleDocs.map((doc) => (
          <div
            key={doc.id}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all duration-150 bg-slate-50/40 hover:bg-white gap-3"
          >
            <div className="flex items-start space-x-3">
              <div className="mt-0.5">
                {doc.status === "approved" && (
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
                {doc.status === "uploaded" && (
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                )}
                {doc.status === "pending" && (
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {doc.title}
                  </span>
                  {doc.required ? (
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
                      Required
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      Optional
                    </span>
                  )}
                  {doc.version && (
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      {doc.version}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                  <span>{doc.category}</span>
                  {doc.fileSize && <span>• {doc.fileSize}</span>}
                </div>
              </div>
            </div>

            {/* Action State */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              {doc.status === "approved" && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80">
                  <CheckCircle2 className="w-3 h-3" />
                  Approved
                </span>
              )}
              {doc.status === "uploaded" && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/80">
                  <Clock className="w-3 h-3" />
                  Under Review
                </span>
              )}
              {doc.status === "pending" && (
                <button
                  type="button"
                  onClick={() => handleUpload(doc.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 active:bg-brand-700 px-3 py-1.5 rounded-md shadow-xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  Upload File
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info Strip */}
      {!compact && (
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted with TLS 1.3 & AES-256</span>
          </div>
          <span className="font-medium text-slate-700">Role: Client Participant</span>
        </div>
      )}
    </div>
  );
}
