"use client";

import React from "react";
import { TenantProvider } from "@/lib/context/TenantContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import ToastProvider from "@/components/shared/ToastProvider";
import ConfirmProvider from "@/components/shared/ConfirmProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <TenantProvider>
          <AuthProvider>{children}</AuthProvider>
        </TenantProvider>
      </ConfirmProvider>
    </ToastProvider>
  );
}
