import React from "react";
import { CaseStatus, DocStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: CaseStatus | DocStatus | string;
  size?: "sm" | "md" | "lg";
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3 py-1.5 text-sm font-semibold",
  }[size];

  const getStyle = (s: string) => {
    switch (s) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Under Review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Form Submitted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Documents Pending":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Uploaded":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Invited":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Not Started":
        return "bg-slate-100 text-slate-600 border-slate-200";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getDotColor = (s: string) => {
    switch (s) {
      case "Approved":
        return "bg-emerald-500";
      case "Under Review":
        return "bg-amber-500 animate-pulse";
      case "Form Submitted":
        return "bg-blue-500";
      case "Documents Pending":
        return "bg-indigo-500";
      case "Uploaded":
        return "bg-sky-500";
      case "Invited":
        return "bg-purple-500";
      case "Not Started":
        return "bg-slate-400";
      case "Rejected":
        return "bg-rose-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${sizeClasses} ${getStyle(
        status
      )}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(status)}`} />
      <span>{status}</span>
    </span>
  );
}
