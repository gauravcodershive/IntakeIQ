"use client";

import { useState } from "react";
import {
  FileText,
  History,
  Upload,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldCheck,
  FileCheck2,
  Loader2
} from "lucide-react";

type UploadState = "idle" | "uploading" | "done";

export default function DocumentChecklistMockup() {
  const [showVersions, setShowVersions] = useState<boolean>(true);
  const [uploadState, setUploadState] = useState<UploadState>("idle");

  const handleDropzoneActivate = () => {
    if (uploadState === "uploading") return;
    if (uploadState === "done") {
      setUploadState("idle");
      return;
    }
    setUploadState("uploading");
    window.setTimeout(() => setUploadState("done"), 900);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-mockup border border-slate-200/80 overflow-hidden font-sans text-left">
      {/* Mockup Header */}
      <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-500 text-xs hidden sm:inline ml-2">|</span>
          <span className="font-semibold text-slate-200 text-xs">
            Document Center: <span className="text-slate-400 font-normal">PBC Checklist & Version History</span>
          </span>
        </div>
        <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
          <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Document Item with Version Accordion */}
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50">
          <div className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-semibold text-slate-900">
                    2023 Partnership Agreement & Amendments
                  </h5>
                  <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100 uppercase">
                    Required
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full signed copy including all capital allocation exhibits.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => setShowVersions(!showVersions)}
                aria-expanded={showVersions}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 px-2.5 py-1 rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
              >
                <History className="w-3.5 h-3.5 text-slate-500" />
                <span>2 Versions</span>
                {showVersions ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/80">
                v2.0 Approved
              </span>
            </div>
          </div>

          {/* Version History Drawer */}
          {showVersions && (
            <div className="p-3.5 bg-slate-50/80 space-y-2 border-b border-slate-200/60 text-xs animate-fade-in">
              <div className="flex items-center justify-between font-semibold text-slate-600 text-[11px] uppercase tracking-wider mb-1">
                <span>Version Timeline</span>
                <span className="text-[10px] text-slate-400">Audit-logged</span>
              </div>

              {/* Version 2 */}
              <div className="flex items-center justify-between p-2 rounded bg-white border border-emerald-200 text-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    v2.0
                  </span>
                  <div>
                    <p className="font-medium text-slate-800">Signed_Partnership_Agmt_Executed_Final.pdf</p>
                    <p className="text-[10px] text-slate-400">Uploaded by Sarah Jenkins (Client) • Aug 16, 2:45 PM • 4.2 MB</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Approved by Firm
                </span>
              </div>

              {/* Version 1 */}
              <div className="flex items-center justify-between p-2 rounded bg-white/70 border border-slate-200 text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    v1.0
                  </span>
                  <div>
                    <p className="font-medium text-slate-700 line-through">Draft_Agmt_Unsigned.pdf</p>
                    <p className="text-[10px] text-slate-400">Uploaded by Sarah Jenkins • Aug 14, 10:12 AM • 3.8 MB (Superseded)</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-amber-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Re-submission Requested
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Live Upload Dropzone Component */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleDropzoneActivate}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleDropzoneActivate();
            }
          }}
          aria-label="Upload next required document"
          aria-live="polite"
          className="border-2 border-dashed border-brand-300 hover:border-brand-500 bg-brand-50/20 hover:bg-brand-50/40 p-4 rounded-lg text-center cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          {uploadState === "uploading" && (
            <div className="flex items-center justify-center gap-2 text-xs text-brand-700 font-semibold py-1">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading Tax_Return_2023.pdf…</span>
            </div>
          )}
          {uploadState === "done" && (
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-700 font-semibold py-1">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Tax_Return_2023.pdf uploaded successfully! (v1.0 created)</span>
            </div>
          )}
          {uploadState === "idle" && (
            <div className="flex flex-col items-center justify-center text-xs text-slate-600">
              <Upload className="w-5 h-5 text-brand-600 mb-1" />
              <p className="font-semibold text-slate-800">
                Click or drag files here to upload next requirement
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Supported formats: PDF, DOCX, XLSX, PNG, JPG (up to 50MB per file)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
