"use client";

import { useState } from "react";
import {
  Check,
  X,
  Shield,
  UserCheck,
  FileSpreadsheet
} from "lucide-react";

export default function ApprovalWorkflowMockup() {
  const [decision, setDecision] = useState<"pending" | "approved" | "rejected">("pending");
  const [rejectReason, setRejectReason] = useState<string>("");
  const [showRejectBox, setShowRejectBox] = useState<boolean>(false);

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
            Reviewer Station: <span className="text-slate-400 font-normal">Audit & Verification Console</span>
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-brand-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          <UserCheck className="w-3 h-3 text-brand-400" />
          <span>Role: Case Manager</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Document Review Card */}
        <div className="md:col-span-7 p-4 sm:p-5 border-b md:border-b-0 md:border-r border-slate-200 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-semibold text-slate-900">
                  2023_Financial_Statements_Audited.xlsx
                </h5>
                <p className="text-[11px] text-slate-500">
                  Uploaded by client • 8.4 MB • Version 1.0
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              Doc #8841
            </span>
          </div>

          {/* Verification Checklist */}
          <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-200 space-y-2 text-xs">
            <p className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider">
              Verification Checkpoints
            </p>
            <div className="space-y-1.5 text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-brand-600 focus:ring-brand-500" />
                <span>Auditor signature present & authenticated</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-brand-600 focus:ring-brand-500" />
                <span>All 4 quarters accounted for in balance sheet</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-brand-600 focus:ring-brand-500" />
                <span>Matches legal entity name exactly</span>
              </label>
            </div>
          </div>

          {/* Action Decision Row */}
          {decision === "pending" && !showRejectBox && (
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDecision("approved")}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1"
              >
                <Check className="w-4 h-4" />
                Approve Document
              </button>
              <button
                type="button"
                onClick={() => setShowRejectBox(true)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 border border-rose-200 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-1"
              >
                <X className="w-4 h-4" />
                Reject with Note
              </button>
            </div>
          )}

          {showRejectBox && decision === "pending" && (
            <div className="space-y-2 pt-1 animate-fade-in">
              <label className="block text-xs font-semibold text-rose-700">
                Reason for Rejection (sent to client): <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Schedule B missing page 3. Please re-upload full PDF."
                className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
              {!rejectReason.trim() && (
                <p className="text-[11px] text-rose-600">
                  A reason is required before you can confirm the rejection.
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={!rejectReason.trim()}
                  title={!rejectReason.trim() ? "Enter a reason for the client before confirming" : undefined}
                  onClick={() => {
                    setDecision("rejected");
                    setShowRejectBox(false);
                  }}
                  className="py-1.5 px-3 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-600 rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-1"
                >
                  Confirm Rejection
                </button>
                <button
                  type="button"
                  onClick={() => setShowRejectBox(false)}
                  className="py-1.5 px-3 text-xs font-medium text-slate-600 hover:bg-slate-100 active:bg-slate-200 rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {decision === "approved" && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800 animate-fade-in">
              <span className="font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Document Approved by Case Manager
              </span>
              <button
                type="button"
                onClick={() => setDecision("pending")}
                className="text-[11px] text-emerald-700 underline font-medium rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1"
              >
                Reset
              </button>
            </div>
          )}

          {decision === "rejected" && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between text-xs text-rose-800 animate-fade-in">
              <span className="font-semibold flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-600" />
                Document Rejected — Client Notified
              </span>
              <button
                type="button"
                onClick={() => setDecision("pending")}
                className="text-[11px] text-rose-700 underline font-medium rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-1"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Immutable Audit Trail Log */}
        <div className="md:col-span-5 p-4 sm:p-5 bg-slate-50/70 text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider">
              Immutable Audit Log
            </span>
            <Shield className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="space-y-3 text-[11px]">
            {decision === "approved" && (
              <div className="flex gap-2.5 animate-fade-in">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Document marked Approved</p>
                  <p className="text-slate-500">David Miller (Case Manager) • Just now</p>
                </div>
              </div>
            )}

            {decision === "rejected" && (
              <div className="flex gap-2.5 animate-fade-in">
                <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Document Rejected with note</p>
                  <p className="text-slate-500">David Miller (Case Manager) • Just now</p>
                </div>
              </div>
            )}

            <div className="flex gap-2.5">
              <div className="w-2 h-2 rounded-full bg-brand-500 mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-slate-800">File uploaded: v1.0</p>
                <p className="text-slate-500">Apex Holdings LLC (Client) • Today 09:14 AM</p>
              </div>
            </div>

            <div className="flex gap-2.5">
              <div className="w-2 h-2 rounded-full bg-slate-400 mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-slate-800">Requirement Assigned</p>
                <p className="text-slate-500">System Automation • Aug 14, 08:00 AM</p>
              </div>
            </div>

            <div className="flex gap-2.5">
              <div className="w-2 h-2 rounded-full bg-slate-300 mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-slate-800">Client Portal Link Opened</p>
                <p className="text-slate-500">IP: 198.51.100.42 • Aug 14, 08:32 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
