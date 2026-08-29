"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_STYLES: Record<
  ToastVariant,
  { icon: React.ElementType; iconClass: string; borderClass: string }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    borderClass: "border-l-emerald-500",
  },
  error: {
    icon: AlertCircle,
    iconClass: "text-rose-500",
    borderClass: "border-l-rose-500",
  },
  info: {
    icon: Info,
    iconClass: "text-brand-500",
    borderClass: "border-l-brand-500",
  },
};

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message: string, variant: ToastVariant) => {
      const id = counterRef.current++;
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => dismiss(id), 4500);
    },
    [dismiss]
  );

  const value: ToastContextValue = {
    success: (message) => push(message, "success"),
    error: (message) => push(message, "error"),
    info: (message) => push(message, "info"),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 w-[calc(100%-2.5rem)] max-w-sm pointer-events-none"
      >
        {toasts.map((t) => {
          const { icon: Icon, iconClass, borderClass } = VARIANT_STYLES[t.variant];
          return (
            <div
              key={t.id}
              role="status"
              className={`pointer-events-auto flex items-start gap-3 bg-white border border-slate-200 ${borderClass} border-l-4 rounded-xl shadow-dropdown px-4 py-3.5 animate-slide-up`}
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconClass}`} />
              <p className="text-sm font-medium text-slate-800 leading-snug flex-1">{t.message}</p>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="text-slate-400 hover:text-slate-600 transition shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
