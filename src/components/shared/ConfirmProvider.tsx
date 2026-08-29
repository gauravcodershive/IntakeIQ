"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "default";
}

type ConfirmFn = (options: ConfirmOptions | string) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

interface PendingConfirm extends Required<Omit<ConfirmOptions, "tone">> {
  tone: "danger" | "default";
}

export default function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<PendingConfirm | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback<ConfirmFn>((options) => {
    const normalized: PendingConfirm =
      typeof options === "string"
        ? { title: "Please confirm", message: options, confirmLabel: "Confirm", cancelLabel: "Cancel", tone: "default" }
        : {
            title: options.title ?? "Please confirm",
            message: options.message,
            confirmLabel: options.confirmLabel ?? "Confirm",
            cancelLabel: options.cancelLabel ?? "Cancel",
            tone: options.tone ?? "default",
          };

    setPending(normalized);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const settle = (value: boolean) => {
    resolverRef.current?.(value);
    resolverRef.current = null;
    setPending(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {pending && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
          onClick={() => settle(false)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-3">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center ${
                  pending.tone === "danger" ? "bg-rose-100 text-rose-600" : "bg-brand-50 text-brand-600"
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{pending.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{pending.message}</p>
            </div>
            <div className="px-6 pb-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => settle(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                {pending.cancelLabel}
              </button>
              <button
                type="button"
                onClick={() => settle(true)}
                className={`px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-sm transition ${
                  pending.tone === "danger"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-brand-500 hover:bg-brand-600"
                }`}
              >
                {pending.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return ctx;
}
