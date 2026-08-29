"use client";

import React, { useEffect, useRef } from "react";
import { ChecklistItem, DocVersion } from "@/lib/types";
import { X, History, FileText, Download, User, Calendar, HardDrive } from "lucide-react";

interface VersionHistoryModalProps {
  isOpen: boolean;
  item: ChecklistItem | null;
  onClose: () => void;
}

export default function VersionHistoryModal({
  isOpen,
  item,
  onClose,
}: VersionHistoryModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const versions = [...(item.versions || [])].sort((a, b) => b.version - a.version);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="version-history-title"
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 id="version-history-title" className="text-sm font-bold text-slate-900">Document Version History</h3>
              <p className="text-xs text-slate-500 truncate max-w-xs">{item.name}</p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close version history"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 active:scale-[0.98] rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Versions List */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3 text-xs">
          {versions.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-6">
              <History className="w-10 h-10 text-brand-200 mb-2" />
              <p className="text-slate-500">No versions uploaded yet.</p>
            </div>
          ) : (
            versions.map((ver, idx) => (
              <div
                key={ver.version}
                className={`p-3.5 rounded-xl border transition ${
                  idx === 0
                    ? "bg-brand-50/40 border-brand-200 ring-1 ring-brand-100"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-slate-800 text-white">
                      v{ver.version} {idx === 0 ? "(Current)" : ""}
                    </span>
                    <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                      {ver.fileName}
                    </span>
                  </div>

                  <a
                    href={ver.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-brand-700 bg-white hover:bg-brand-100/50 active:scale-[0.98] rounded-lg border border-brand-200 transition-all duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                  >
                    <Download className="w-3 h-3" />
                    <span>View / Open</span>
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-1">
                    <HardDrive className="w-3 h-3 text-slate-400" />
                    <span>{(ver.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    <span className="truncate">{ver.uploadedBy}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{new Date(ver.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 active:scale-[0.98] rounded-lg border border-slate-200 transition-all duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
